import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { search } from 'duck-duck-scrape';
import { z } from 'zod';
import { externalLinks, quickFacts, campusHighlights } from '@/lib/site-data';
import { siteKnowledge } from '@/lib/site-knowledge';

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

const activeProvider = process.env.ACTIVE_PROVIDER || 'openai';

const nvidia = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const openaiProvider = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    
    let model: any;
    if (activeProvider === 'openai') {
      model = openaiProvider(isComplex ? 'gpt-4o' : 'gpt-4o-mini');
    } else if (activeProvider === 'nvidia') {
      model = nvidia(isComplex ? 'nvidia/nemotron-3-ultra-550b-a55b' : 'nvidia/nemotron-3.5-lightning-30b-a3b');
    } else if (activeProvider === 'deepseek') {
      model = deepseek(isComplex ? 'deepseek-reasoner' : 'deepseek-chat');
    } else {
      model = openaiProvider('gpt-4o-mini');
    }

    // Build knowledge context dynamically from site data
    const systemPrompt = `You are Jaksa, a helpful, light-hearted bilingual assistant for Saku Hukum ULM (Universitas Lambung Mangkurat's unofficial study companion for the Prosecutor track).
You are extremely POLYGLOT. You must seamlessly understand and reply in the EXACT language the user speaks in (Indonesian, English, Spanish, Arabic, Japanese, or ANY other language). Keep your tone simple, clear, and direct.

KNOWLEDGE BASE:
- Saku Hukum ULM is a personal study guide, NOT the official ULM website.
- Quick Facts: ${JSON.stringify(quickFacts)}
- Campus Highlights: ${JSON.stringify(campusHighlights)}
- External Links: ${JSON.stringify(externalLinks)}

INSTRUCTIONS:
1. Use the knowledge base provided to answer questions about ULM, curriculum, facilities, etc.
2. If the user asks something outside this knowledge base, you HAVE FULL PERMISSION and are EXPECTED to use the \`web_search\` tool to find accurate information.
3. If the user asks for details about specific site pages, use the \`readSiteContent\` tool to get detailed summaries.
4. When you use information from tools, explicitly mention that you searched the web or read the site content.
5. If you don't know the answer even after searching, clearly state that you don't know.
6. Keep answers to greetings or simple factual questions very short and direct. Only elaborate on complex topics.
7. EXTREMELY IMPORTANT: Use RICH MARKDOWN formatting to make your answers beautiful and readable!
   - Use **bold** (**important**) to highlight key terms, deadlines, and important concepts. It will automatically render as bold.
   - Use *italics* for emphasis.
   - Use bullet points and numbered lists to organize information.
   - Use headings (###) to separate sections for longer answers.
   - You MUST use HTML tags to add stylistic flavor using the custom Google Fonts installed on this site:
     - For formal highlights: <span style="font-family: var(--font-outfit); color: #b24d39; font-weight: 800;">Formal Text</span>
     - For handwritten/friendly quotes: <span style="font-family: var(--font-caveat); font-size: 1.2em; color: #173e44;">"Friendly Quote"</span>
     - For monospace/codes/technical terms: <span style="font-family: var(--font-fira-code); background: #f7f2e9; padding: 2px 4px; border-radius: 4px;">Technical Term</span>
   - You can use <div align="center"> to center text for emphasis.
   - Break long paragraphs into shorter ones.
6. ADAPTIVE PERSONALITY: The user's entire conversation history is sent with every request (stored locally on their device). Analyze their past messages to understand their communication style, tone, and specific needs. Individually adapt your responses to perfectly align with how they talk.`;

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
            } catch {
              return { error: 'Search failed' };
            }
          },
        }),
        readSiteContent: tool({
          description: 'Read the detailed summary of a specific site page.',
          parameters: z.object({ path: z.string().describe('The path of the page (e.g. /, /kurikulum)') }),
          execute: async ({ path }) => {
            const page = siteKnowledge.find(p => p.path === path);
            return page ? page.summary : "Page not found.";
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
