import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { search } from 'duck-duck-scrape';
import { z } from 'zod';
import { externalLinks, quickFacts, campusHighlights } from '@/lib/site-data';
import { siteKnowledge } from '@/lib/site-knowledge';

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
  'nvidia/nemotron-3.5-lightning-30b-a3b': process.env.NVIDIA_LIGHTNING_KEY || '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',
  'groq/llama-3.1-8b-instant': process.env.GROQ_API_KEY || '',
  'nvidia/nemotron-3-super-120b-a12b': process.env.NVIDIA_SUPER_KEY || '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',
  'moonshotai/kimi-k3': process.env.NVIDIA_KIMI_KEY || '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',
  'deepseek-ai/deepseek-v4-flash-0731': process.env.NVIDIA_DEEPSEEK_KEY || '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'
};

const groqProvider = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: API_KEYS['groq/llama-3.1-8b-instant'],
});

const deepseekProvider = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

function getClient(modelName: string) {
  if (modelName.startsWith('groq/')) return groqProvider(modelName.replace('groq/', ''));
  return createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey: API_KEYS[modelName as keyof typeof API_KEYS],
  })(modelName);
}

const TIER_TOKENS: Record<string, number> = {
  'nvidia/nemotron-3.5-lightning-30b-a3b': 250,
  'groq/llama-3.1-8b-instant': 250,
  'nvidia/nemotron-3-super-120b-a12b': 1024,
  'moonshotai/kimi-k3': 2048,
  'deepseek-ai/deepseek-v4-flash-0731': 2048
};

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

  const systemPrompt = `You are Jaksa, a warm, helpful, and simple bilingual study assistant for Saku Hukum ULM (Universitas Lambung Mangkurat's unofficial Prosecutor track guide).
You are extremely POLYGLOT. You must seamlessly reply in the EXACT language the user speaks. Keep your tone warm, simple, and jargon-free.

CRITICAL RULES (FOLLOW EXACTLY):
1. NO INTERNAL MONOLOGUE. ALWAYS answer directly and immediately. DO NOT output any reasoning, debate, or narrate your thought process (e.g. do not say "Let me think" or "The rule says..."). Just provide the final answer.
2. Check the provided Knowledge Base first.
3. If the answer is NOT in the Knowledge Base, DO NOT state that you are checking online. Immediately try the web_search tool silently ONCE.
4. If web_search fails or isn't available, answer briefly from your general knowledge and politely add that this specific info isn't from the site's official curated guide.
5. Use RICH MARKDOWN formatting to make your answers beautiful and readable (bolding, lists).

KNOWLEDGE BASE:
- Saku Hukum ULM is a personal study guide, NOT the official ULM website.
- Quick Facts: ${JSON.stringify(quickFacts)}
- Campus Highlights: ${JSON.stringify(campusHighlights)}
- External Links: ${JSON.stringify(externalLinks)}`;

  const tools = {
    web_search: tool({
      description: 'Search the web for real-time information not in the knowledge base.',
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }) => {
        try {
          console.log(`[web_search] Query executed: ${query}`);
          const searchResults = await search(query, { safeSearch: 1 });
          if (!searchResults || !searchResults.results || searchResults.results.length === 0) {
            return { error: 'Search returned no results. Fallback to general knowledge immediately.' };
          }
          return searchResults.results.slice(0, 3).map(r => ({ title: r.title, description: r.description, url: r.url }));
        } catch (err: any) { 
          console.error(`[web_search] API Failed:`, err.message);
          return { error: 'Search API is currently unavailable or rate-limited. Fallback to general knowledge immediately without stating the search failed.' }; 
        }
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

  // Determine fast tier load balancing
  const fastTierModels = ['nvidia/nemotron-3.5-lightning-30b-a3b', 'groq/llama-3.1-8b-instant'];
  const initialFastModel = fastTierModels[Math.floor(Math.random() * fastTierModels.length)];
  const fallbackFastModel = fastTierModels.find(m => m !== initialFastModel) as string;

  let FALLBACK_CHAIN = [
    initialFastModel,
    fallbackFastModel,
    'nvidia/nemotron-3-super-120b-a12b',
    'moonshotai/kimi-k3',
    'deepseek-ai/deepseek-v4-flash-0731'
  ];

  // If a user explicitly requested a higher tier model, start the chain from there
  if (requestedModel === 'nvidia/nemotron-3-super-120b-a12b') {
    FALLBACK_CHAIN = ['nvidia/nemotron-3-super-120b-a12b', 'moonshotai/kimi-k3', 'deepseek-ai/deepseek-v4-flash-0731', initialFastModel];
  } else if (requestedModel === 'moonshotai/kimi-k3') {
    FALLBACK_CHAIN = ['moonshotai/kimi-k3', 'deepseek-ai/deepseek-v4-flash-0731', 'nvidia/nemotron-3-super-120b-a12b', initialFastModel];
  } else if (requestedModel === 'deepseek-ai/deepseek-v4-flash-0731') {
    FALLBACK_CHAIN = ['deepseek-ai/deepseek-v4-flash-0731', 'moonshotai/kimi-k3', 'nvidia/nemotron-3-super-120b-a12b', initialFastModel];
  }

  for (const modelName of FALLBACK_CHAIN) {
    try {
      const model = getClient(modelName);
      const result = await streamText({
        model,
        system: systemPrompt,
        messages,
        tools,
        maxSteps: 3,
        maxTokens: TIER_TOKENS[modelName] || 1024
      });

      return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': modelName } });
    } catch (error: any) {
      console.error(`Error with model ${modelName}:`, error.message);
      const rawError = (error?.message || '').toLowerCase();
      // Retry if it's a rate limit or quota issue
      if (rawError.includes('quota') || rawError.includes('429') || rawError.includes('402') || rawError.includes('too many requests')) {
        continue;
      }
    }
  }

  // Final fallback to DeepSeek Native API if everything else fails
  try {
    const result = await streamText({
      model: deepseekProvider('deepseek-chat'),
      system: systemPrompt,
      messages,
      tools,
      maxSteps: 3,
      maxTokens: 1024
    });
    return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': 'deepseek-chat-native' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'All models failed or quota exhausted.' }), { status: 500 });
  }
}
