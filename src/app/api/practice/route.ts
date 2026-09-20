import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { pasalData } from '@/lib/pasal-data';

const API_KEYS = {
  'deepseek-ai/deepseek-v4-flash-0731': process.env.NVIDIA_DEEPSEEK_KEY || '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',
  'groq/llama-3.1-8b-instant': process.env.GROQ_API_KEY || '',
  'nvidia/nemotron-3-super-120b-a12b': process.env.NVIDIA_API_KEY || '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',
};

const groqProvider = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: API_KEYS['groq/llama-3.1-8b-instant'],
});

const deepseekProvider = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY || '',
});

function getClient(modelName: string) {
  if (modelName.startsWith('groq/')) return groqProvider(modelName.replace('groq/', ''));
  if (modelName === 'deepseek-chat') return deepseekProvider('deepseek-chat');
  return createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey: API_KEYS[modelName as keyof typeof API_KEYS],
  })(modelName);
}

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const { analysis, scenario, model = 'deepseek-ai/deepseek-v4-flash-0731' } = body;
  if (!analysis || !scenario) {
    return new Response(JSON.stringify({ error: 'Missing analysis or scenario' }), { status: 400 });
  }

  const systemPrompt = `You are an expert Indonesian law professor evaluating a student's case analysis. 
You will review the student's analysis of the following scenario based strictly on the Indonesian Criminal Code (KUHP Baru) data provided below.
Provide constructive, objective feedback. Return your response as a structured JSON matching the provided schema. Do not output anything else except the JSON.
Ensure you use rich markdown formatting (bold, italic, bullet points) inside the JSON fields (issueFeedback, citationFeedback, applicationFeedback, missedElements) so the frontend can render it beautifully.

SCENARIO:
${scenario}

AVAILABLE PASAL DATA (KUHP Baru):
${JSON.stringify(pasalData.map(p => ({ article: p.articleNumber, text: p.officialText, explanation: p.explanation })))}
`;

  const fallbackModels = ['deepseek-ai/deepseek-v4-flash-0731', 'groq/llama-3.1-8b-instant', 'nvidia/nemotron-3-super-120b-a12b'];
  const modelsToTry = [model, ...fallbackModels.filter(m => m !== model)];
  
  for (const currentModel of modelsToTry) {
    try {
      const { object } = await generateObject({
        model: getClient(currentModel),
        system: systemPrompt,
        prompt: `Student's Analysis: ${analysis}`,
        schema: z.object({
          issueFeedback: z.string().describe("Feedback on how well the student identified the legal issues"),
          citationFeedback: z.string().describe("Feedback on the student's use of specific articles (Pasal) and citations"),
          applicationFeedback: z.string().describe("Feedback on how the student applied the law to the facts of the scenario"),
          missedElements: z.string().describe("Any elements of the offense or alternative arguments the student missed")
        })
      });
      return Response.json(object);
    } catch (err: any) {
      console.error(`Practice API Error with model ${currentModel}:`, err);
    }
  }

  return new Response(JSON.stringify({ error: 'Failed to generate feedback after trying all fallback models.' }), { status: 500 });
}
