import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool, appendResponseCookies } from 'ai';
import { search } from 'duck-duck-scrape';
import { z } from 'zod';
import { externalLinks, quickFacts, campusHighlights } from '@/lib/site-data';
import { siteKnowledge } from '@/lib/site-knowledge';

// Basic in-memory rate limiting for serverless invocation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

let lastSweep = Date.now();
function sweepRateLimitMap() {
  const now = Date.now();
  if (now - lastSweep > 5 * 60 * 1000) {
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
    lastSweep = now;
  }
}

function checkRateLimit(ip: string) {
  sweepRateLimitMap();
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 15;
  
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

const API_KEYS = {
  'nvidia/nemotron-3.5-lightning-30b-a3b': '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',
  'nvidia/nemotron-3-super-120b-a12b': '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',
  'moonshotai/kimi-k3': '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',
  'deepseek-ai/deepseek-v4-flash-0731': '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'
};

const FALLBACK_CHAIN = [
  'nvidia/nemotron-3.5-lightning-30b-a3b',
  'nvidia/nemotron-3-super-120b-a12b',
  'moonshotai/kimi-k3',
  'deepseek-ai/deepseek-v4-flash-0731'
];

function getNvidiaClient(apiKey: string) {
  return createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey: apiKey,
  });
}

const deepseekProvider = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded.' }), { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const { messages, model: requestedModel } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid messages array' }), { status: 400 });
  }

  const systemPrompt = `You are Jaksa, a helpful, light-hearted bilingual assistant for Saku Hukum ULM (Universitas Lambung Mangkurat's unofficial study companion for the Prosecutor track).
You are extremely POLYGLOT. You must seamlessly understand and reply in the EXACT language the user speaks in (Indonesian, English, Spanish, Arabic, Japanese, or ANY other language). Keep your tone simple, clear, and direct.

KNOWLEDGE BASE:
- Saku Hukum ULM is a personal study guide, NOT the official ULM website.
- Quick Facts: ${JSON.stringify(quickFacts)}
- Campus Highlights: ${JSON.stringify(campusHighlights)}
- External Links: ${JSON.stringify(externalLinks)}

INSTRUCTIONS:
1. Use the knowledge base provided to answer questions about ULM.
2. If the user asks something outside this knowledge base, you HAVE FULL PERMISSION and are EXPECTED to use the web_search tool.
3. If the user asks for details about specific site pages, use the readSiteContent tool.
4. Keep answers to greetings or simple factual questions very short and direct. Only elaborate on complex topics.
5. Use RICH MARKDOWN formatting to make your answers beautiful and readable (bolding, lists).`;

  const tools = {
    web_search: tool({
      description: 'Search the web for real-time information not in the knowledge base.',
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }) => {
        try {
          const searchResults = await search(query);
          return searchResults.results.slice(0, 3).map(r => ({ title: r.title, description: r.description, url: r.url }));
        } catch { return { error: 'Search failed' }; }
      },
    }),
    readSiteContent: tool({
      description: 'Read the detailed summary of a specific site page.',
      parameters: z.object({ path: z.string() }),
      execute: async ({ path }) => {
        const page = siteKnowledge.find(p => p.path === path);
        return page ? page.summary : "Page not found.";
      },
    }),
  };

  const startIndex = FALLBACK_CHAIN.indexOf(requestedModel) >= 0 ? FALLBACK_CHAIN.indexOf(requestedModel) : 0;
  const modelsToTry = FALLBACK_CHAIN.slice(startIndex).concat(FALLBACK_CHAIN.slice(0, startIndex));

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const apiKey = API_KEYS[modelName as keyof typeof API_KEYS];
      const provider = getNvidiaClient(apiKey);
      const model = provider(modelName);

      const result = await streamText({
        model,
        system: systemPrompt,
        messages,
        tools,
        maxSteps: 3,
      });

      return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': modelName } });
    } catch (error: any) {
      console.error(`Error with model ${modelName}:`, error.message);
      lastError = error;
      const rawError = (error?.message || '').toLowerCase();
      if (rawError.includes('quota') || rawError.includes('429') || rawError.includes('402')) {
        continue; // Try next model in chain
      } else {
        break; // If it's a 400 bad request, don't retry blindly
      }
    }
  }

  // Final fallback to DeepSeek Native API
  try {
    const result = await streamText({
      model: deepseekProvider('deepseek-chat'),
      system: systemPrompt,
      messages,
      tools,
      maxSteps: 3,
    });
    return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': 'deepseek-chat-native' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'All models failed or quota exhausted.' }), { status: 500 });
  }
}
