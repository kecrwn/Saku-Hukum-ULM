import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { search } from 'duck-duck-scrape';
import { z } from 'zod';
import { externalLinks, quickFacts, campusHighlights, directDownloads } from '@/lib/site-data';
import { siteKnowledge } from '@/lib/site-knowledge';
import { lawKnowledgeBase, availableLawTopics } from '@/lib/knowledge';

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
2. Check the provided Knowledge Base first. Answer questions about contacts, curriculum, or downloads directly from it.
3. If the answer is NOT in the Knowledge Base, DO NOT state that you are checking online. Immediately try the web_search tool silently ONCE.
4. If web_search fails or isn't available, answer briefly from your general knowledge and politely add that this specific info isn't from the site's official curated guide. DO NOT dump raw technical errors.
5. ADAPTIVE LENGTH: Match your answer length to the question. A simple factual question gets a short 1-2 sentence answer. Broader questions can use structured markdown.
6. If a question is genuinely outside what you can help with, say so plainly and suggest what you can help with instead.
7. Use RICH MARKDOWN formatting. If comparing items or listing steps, you can use side-by-side columns by outputting EXACTLY this HTML structure:
   <div class="chat-columns"><div class="chat-col">Column 1 Content</div><div class="chat-col">Column 2 Content</div></div>
8. You have access to a massive offline database of Indonesian Laws via the read_local_law tool. Use it whenever asked about Indonesian Law. Available topics: ${availableLawTopics.map(t => t.id).join(', ')}. Do not tell the user you are using a tool, just use it.

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
            return { error: 'Search returned no results. Fallback to general knowledge immediately, but politely mention live search is unavailable.' };
          }
          return searchResults.results.slice(0, 3).map(r => ({ title: r.title, description: r.description, url: r.url }));
        } catch (err: any) { 
          console.error(`[web_search] API Failed:`, err.message);
          return { error: 'Search API is currently unavailable or rate-limited. Fallback to general knowledge immediately, but politely mention live search is unavailable.' }; 
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
    read_local_law: tool({
      description: 'Fetch extremely detailed comprehensive Indonesian Law knowledge base files. Use this before using web_search for Indonesian law topics.',
      parameters: z.object({ 
        topic_id: z.string().describe(`The ID of the topic or file name (e.g. 'pih', 'pidana', 'perdata', 'kuhp'). If unsure, try a related keyword.`) 
      }),
      execute: async ({ topic_id }) => {
        try {
          const fs = require('fs');
          const path = require('path');
          
          // Search both books and knowledge directories
          const dirs = [
            path.join(process.cwd(), 'src/lib/books'),
            path.join(process.cwd(), 'src/lib/knowledge')
          ];
          
          let foundPath = null;
          let availableFiles: string[] = [];

          for (const dir of dirs) {
            if (fs.existsSync(dir)) {
              const files = fs.readdirSync(dir).filter((f: string) => f.endsWith('.json'));
              availableFiles.push(...files.map((f: string) => f.replace('.json', '')));
              
              const exactMatch = files.find((f: string) => f === `${topic_id}.json`);
              if (exactMatch) {
                foundPath = path.join(dir, exactMatch);
                break;
              }
              
              // Fallback to partial match if exact match not found
              const partialMatch = files.find((f: string) => f.includes(topic_id) || topic_id.includes(f.replace('.json', '')));
              if (partialMatch && !foundPath) {
                foundPath = path.join(dir, partialMatch);
              }
            }
          }
          
          if (!foundPath) {
            return `Topic not found in local database. Available local topics: ${availableFiles.join(', ')}. Try using web_search or one of these available topics.`;
          }
          
          const rawData = fs.readFileSync(foundPath, 'utf8');
          const data = JSON.parse(rawData);
          
          // Strip out extremely long arrays or content if necessary to prevent context overflow,
          // but since these are meant to be comprehensive, we return it.
          // The LLM context window is large enough.
          return JSON.stringify(data);
        } catch (err: any) {
          console.error('[read_local_law] Error:', err.message);
          return "Failed to read local database. Fallback to web_search.";
        }
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

  // Keep the last 15 messages to prevent context drift and ensure system prompt is not dropped
  let trimmedMessages = messages.length > 15 ? messages.slice(-15) : [...messages];

  // TASK 1: Add a lightweight reminder of the core output rules appended fresh right before generation on every turn
  const lastUserIdx = trimmedMessages.findLastIndex((m: any) => m.role === 'user');
  if (lastUserIdx >= 0) {
    trimmedMessages[lastUserIdx] = {
      ...trimmedMessages[lastUserIdx],
      content: trimmedMessages[lastUserIdx].content + '\n\n[SYSTEM REMINDER: DO NOT output any reasoning, internal monologue, or <think> tags. Always answer directly and immediately. Do not say "Let me think". Just provide the final answer.]'
    };
  }

  for (const modelName of FALLBACK_CHAIN) {
    try {
      const model = getClient(modelName);
      const result = await streamText({
        model,
        system: systemPrompt,
        messages: trimmedMessages,
        tools,
        maxSteps: 3,
        maxTokens: TIER_TOKENS[modelName] || 2048
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
      maxTokens: 2048
    });
    return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': 'deepseek-chat-native' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'All models failed or quota exhausted.' }), { status: 500 });
  }
}
