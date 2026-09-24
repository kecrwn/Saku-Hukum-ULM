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

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const API_KEYS: Record<string, string> = {
  'nvidia/nemotron-3.5-lightning-30b-a3b': process.env.NVIDIA_LIGHTNING_KEY || process.env.NVIDIA_API_KEY || '',
  'groq/llama-3.1-8b-instant': process.env.GROQ_API_KEY || '',
  'nvidia/nemotron-3-super-120b-a12b': process.env.NVIDIA_SUPER_KEY || process.env.NVIDIA_API_KEY || '',
  'moonshotai/kimi-k3': process.env.NVIDIA_KIMI_KEY || process.env.NVIDIA_API_KEY || '',
  'deepseek-ai/deepseek-v4-flash-0731': process.env.NVIDIA_DEEPSEEK_KEY || process.env.NVIDIA_API_KEY || '',
};

const groqProvider = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});

const deepseekProvider = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY || '',
});

const huggingfaceProvider = createOpenAI({
  baseURL: 'https://api-inference.huggingface.co/v1/',
  apiKey: process.env.HUGGINGFACE_API_KEY || '',
});

function getApiKeyForModel(modelName: string): string {
  if (modelName.startsWith('groq/') || modelName === 'llama-3.1-8b-instant') {
    return process.env.GROQ_API_KEY || '';
  }
  if (modelName === 'deepseek-chat' || modelName.startsWith('deepseek/')) {
    return process.env.DEEPSEEK_API_KEY || '';
  }
  if (modelName.startsWith('Qwen/')) {
    return process.env.HUGGINGFACE_API_KEY || '';
  }
  return API_KEYS[modelName] || process.env.NVIDIA_API_KEY || '';
}

function getClient(modelName: string) {
  if (modelName.startsWith('groq/')) {
    return groqProvider(modelName.replace('groq/', ''));
  }
  if (modelName === 'llama-3.1-8b-instant') {
    return groqProvider('llama-3.1-8b-instant');
  }
  if (modelName === 'deepseek-chat' || modelName.startsWith('deepseek/')) {
    return deepseekProvider(modelName.replace('deepseek/', ''));
  }
  if (modelName.startsWith('Qwen/')) {
    return huggingfaceProvider(modelName);
  }
  const apiKey = getApiKeyForModel(modelName);
  return createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey,
  })(modelName);
}

const TIER_TOKENS: Record<string, number> = {
  'nvidia/nemotron-3.5-lightning-30b-a3b': 512,
  'groq/llama-3.1-8b-instant': 512,
  'llama-3.1-8b-instant': 512,
  'nvidia/nemotron-3-super-120b-a12b': 1024,
  'moonshotai/kimi-k3': 2048,
  'deepseek-ai/deepseek-v4-flash-0731': 2048,
  'deepseek-chat': 2048,
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

const systemPrompt = `You are Jaksa, the AI assistant for Saku Hukum ULM (shULM), a warm, helpful, and simple bilingual study assistant. Saku Hukum ULM is an AI-powered legal platform for students at Universitas Lambung Mangkurat, providing KUHP tools, case flowcharts, glossary, and case practice. You must utilize this knowledge to assist students.
You are extremely POLYGLOT. You must seamlessly reply in the EXACT language the user speaks. Keep your tone warm, simple, and jargon-free.

CRITICAL RULES (FOLLOW EXACTLY):
1. SPEED & ZERO HALLUCINATION: NO INTERNAL MONOLOGUE. Give concise, direct answers. ALWAYS answer directly and immediately. DO NOT output any reasoning, debate, or narrate your thought process (e.g. do not say "Let me think" or "The rule says..."). Just provide the final answer. Immediately use your site knowledge.
2. Check the provided Knowledge Base first. Answer questions about contacts, curriculum, or downloads directly from it.
3. SITE LINKING (URL MAPPING): ALWAYS provide working relative markdown links [Link](/path) when mentioning site features. Explicit URL Mapping:
   - About: /tentang
   - Curriculum: /kurikulum
   - Facilities: /fasilitas
   - Career: /karier
   - Student Affairs (Kemahasiswaan): /kemahasiswaan
   - Digital Law Library & Reading Room (Ruang Baca): /ruang-baca
   - Specific Books/Reading (Ruang Baca): /ruang-baca/[id]
   - Documents & Downloads: /dokumen
   - Article Dictionary (Kamus Pasal): /pasal (CRITICAL: RECOMMEND and link to this dedicated dictionary whenever students ask about specific KUHP articles)
4. If the answer is NOT in the Knowledge Base, DO NOT state that you are checking online. Immediately try the web_search tool silently ONCE.
5. If web_search fails or isn't available, answer briefly from your general knowledge and politely add that this specific info isn't from the site's official curated guide. DO NOT dump raw technical errors.
6. ADAPTIVE LENGTH: Match your answer length to the question. A simple factual question gets a short 1-2 sentence answer. Broader questions can use structured markdown.
7. If a question is genuinely outside what you can help with, say so plainly and suggest what you can help with instead.
8. Use RICH MARKDOWN formatting for a premium reading experience. Break down complex information into bullet points. Use **bolding** strategically to highlight key terms, deadlines, or important concepts. Format legal statutory articles and citations using <cite> tags (e.g. <cite>Pasal 338 KUHP</cite>). Tastefully use emojis. If comparing items, use tables or side-by-side columns:
   <div class="chat-columns"><div class="chat-col">Column 1 Content</div><div class="chat-col">Column 2 Content</div></div>
9. You have access to a massive offline database of Indonesian Laws via the read_local_law tool. Use it whenever asked about Indonesian Law. Available topics: ${availableLawTopics.map(t => t.id).join(', ')}. Do not tell the user you are using a tool, just use it.
10. READING EXPERIENCE & BOOK CONTROLS (Pass 15 Additions):
   The digital reading room (/ruang-baca and /ruang-baca/[id]) provides an optimized long-form reading environment:
   - Text-Size Controls: Readers can dynamically switch typography sizes between Small (16px), Medium (19px), and Large (24px) via the font size control button ("Ukuran Font").
   - Reading Themes: Readers can toggle between Light (Terang), Sepia (warm paper tone), and Night (Malam / dark mode) themes for visual comfort.
   - Smooth Scroll & Navigation Controls: Smooth scroll-to-top auto-triggers on chapter selection. Dedicated "Bab Sebelumnya" (Previous Chapter) and "Bab Selanjutnya" (Next Chapter) navigation buttons appear at the foot of each chapter. Large data tables feature isolated horizontal scroll tracks so standard body text never wraps awkwardly.
   - Rich Typography & Citations: Body text is formatted in clean, left-aligned serif (Lora) to prevent rivering, and statutory articles are emphasized with distinctive <cite> tag styling.
   Inform users about these reading room features whenever they ask about reading law books, font sizing, navigation, or study interface options.

KNOWLEDGE BASE:
- Saku Hukum ULM is a personal study guide, NOT the official ULM website.
- Quick Facts: ${JSON.stringify(quickFacts)}
- Campus Highlights: ${JSON.stringify(campusHighlights)}
- External Links: ${JSON.stringify(externalLinks)}
- Site Knowledge: ${JSON.stringify(siteKnowledge)}
- Law Knowledge Base: ${JSON.stringify(lawKnowledgeBase)}`;

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
  const fastTierModels = ['groq/llama-3.1-8b-instant', 'nvidia/nemotron-3.5-lightning-30b-a3b'];
  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasLightning = Boolean(process.env.NVIDIA_LIGHTNING_KEY || process.env.NVIDIA_API_KEY);

  let initialFastModel: string;
  let fallbackFastModel: string;

  if (hasGroq && !hasLightning) {
    initialFastModel = 'groq/llama-3.1-8b-instant';
    fallbackFastModel = 'nvidia/nemotron-3.5-lightning-30b-a3b';
  } else if (!hasGroq && hasLightning) {
    initialFastModel = 'nvidia/nemotron-3.5-lightning-30b-a3b';
    fallbackFastModel = 'groq/llama-3.1-8b-instant';
  } else {
    initialFastModel = fastTierModels[Math.floor(Math.random() * fastTierModels.length)];
    fallbackFastModel = fastTierModels.find(m => m !== initialFastModel) as string;
  }

  const allAvailableModels = [
    initialFastModel,
    fallbackFastModel,
    'nvidia/nemotron-3-super-120b-a12b',
    'moonshotai/kimi-k3',
    'deepseek-ai/deepseek-v4-flash-0731',
    'Qwen/Qwen3.8-Flash-Next'
  ];

  let FALLBACK_CHAIN: string[];
  if (requestedModel && requestedModel !== 'fast-tier') {
    FALLBACK_CHAIN = [
      requestedModel,
      ...allAvailableModels.filter(m => m !== requestedModel)
    ];
  } else {
    FALLBACK_CHAIN = allAvailableModels;
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
    const key = getApiKeyForModel(modelName);
    if (!key) {
      console.warn(`[chat] Skipping ${modelName}: No API key configured.`);
      continue;
    }

    try {
      const model = getClient(modelName);
      const result = await streamText({
        model,
        system: systemPrompt,
        messages: trimmedMessages,
        tools,
        maxSteps: 3,
        temperature: modelName.startsWith('Qwen/') ? 0.1 : 0.3,
        maxTokens: TIER_TOKENS[modelName] || 2048
      });

      return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': modelName } });
    } catch (error: any) {
      console.error(`[chat] Error with model ${modelName}:`, error?.message || error);
      // Gracefully continue to the next model in the fallback chain on any error
      continue;
    }
  }

  // Final fallback to DeepSeek Native API if everything else fails and DEEPSEEK_API_KEY is configured
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      console.log('[chat] Attempting final fallback to deepseek-chat-native');
      const result = await streamText({
        model: deepseekProvider('deepseek-chat'),
        system: systemPrompt,
        messages: trimmedMessages,
        tools,
        maxSteps: 3,
        maxTokens: 2048
      });
      return result.toDataStreamResponse({ sendUsage: true, headers: { 'X-Model-Used': 'deepseek-chat-native' } });
    } catch (error: any) {
      console.error('[chat] Error with deepseek-chat-native fallback:', error?.message || error);
    }
  }

  return new Response(JSON.stringify({ error: 'All models failed or quota exhausted.' }), { 
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}
