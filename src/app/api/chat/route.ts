import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { search } from 'duck-duck-scrape';
import { z } from 'zod';
import { externalLinks, quickFacts, campusHighlights } from '@/lib/site-data';

// Basic in-memory rate limiting for serverless invocation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
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

const activeProvider = process.env.ACTIVE_PROVIDER || 'nvidia';

const nvidia = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment.' }), { status: 429 });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request', { status: 400 });
    }
    
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    // Basic routing heuristic: use complex model if long query or analytical keywords
    const isComplex = lastMessage.length > 200 || 
                      lastMessage.includes('analisis') || 
                      lastMessage.includes('bandingkan') || 
                      lastMessage.includes('mengapa') ||
                      lastMessage.includes('why') ||
                      lastMessage.includes('explain');
    
    let model;
    if (activeProvider === 'nvidia') {
      model = nvidia(isComplex ? 'nvidia/nemotron-3-ultra-550b-a55b' : 'nvidia/nemotron-3.5-lightning-30b-a3b');
    } else if (activeProvider === 'deepseek') {
      model = deepseek(isComplex ? 'deepseek-reasoner' : 'deepseek-chat');
    } else {
      model = nvidia('nvidia/nemotron-3.5-lightning-30b-a3b');
    }

    // Build knowledge context dynamically from site data
    const systemPrompt = `You are Jaksa, a helpful, light-hearted bilingual assistant for Saku Hukum ULM (Universitas Lambung Mangkurat's unofficial study companion for the Prosecutor track).
Answer in the language the user writes in (Indonesian or English). Keep your tone simple, clear, and direct.

KNOWLEDGE BASE:
- Saku Hukum ULM is a personal study guide, NOT the official ULM website.
- Quick Facts: ${JSON.stringify(quickFacts)}
- Campus Highlights: ${JSON.stringify(campusHighlights)}
- External Links: ${JSON.stringify(externalLinks)}

INSTRUCTIONS:
1. Use the knowledge base provided to answer questions about ULM, curriculum, facilities, etc.
2. If the user asks something outside this knowledge base, you MUST use the \`web_search\` tool to find accurate information.
3. When you use information from the \`web_search\` tool, explicitly mention that you searched the web for it.
4. If you don't know the answer even after searching, clearly state that you don't know.`;

    const result = await streamText({
      model,
      system: systemPrompt,
      messages,
      tools: {
        web_search: tool({
          description: 'Search the web for real-time information not in the knowledge base.',
          parameters: z.object({ query: z.string().describe('The search query') }),
          execute: async ({ query }) => {
            try {
              const searchResults = await search(query);
              return searchResults.results.slice(0, 3).map(r => ({ title: r.title, description: r.description, url: r.url }));
            } catch (e) {
              return { error: 'Search failed' };
            }
          },
        }),
      },
      maxSteps: 3, // allow the model to call the tool and then respond
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request.' }), { status: 500 });
  }
}
