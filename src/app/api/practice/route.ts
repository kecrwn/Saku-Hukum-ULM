import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { pasalData } from '@/lib/pasal-data';

// Maps frontend display names to actual model identifiers
const PROVIDER_TO_MODEL: Record<string, string> = {
  'DeepSeek Flash': 'deepseek-ai/deepseek-v4-flash-0731',
  'Llama 3.1 8B': 'groq/llama-3.1-8b-instant',
  'Nemotron 30B': 'nvidia/nemotron-3-super-120b-a12b',
  'Qwen 3.8 Flash Next': 'Qwen/Qwen3.8-Flash-Next',
};

const MODEL_TIMEOUT_MS = 30_000; // 30 seconds per model attempt

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
  if (modelName.startsWith('groq/')) return groqProvider(modelName.replace('groq/', ''));
  if (modelName === 'llama-3.1-8b-instant') return groqProvider('llama-3.1-8b-instant');
  if (modelName === 'deepseek-chat' || modelName.startsWith('deepseek/')) return deepseekProvider(modelName.replace('deepseek/', ''));
  if (modelName.startsWith('Qwen/')) return huggingfaceProvider(modelName);
  const apiKey = getApiKeyForModel(modelName);
  return createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey,
  })(modelName);
}

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const { analysis, scenario, provider } = body;
  if (!analysis || !scenario) {
    return new Response(JSON.stringify({ error: 'Missing analysis or scenario' }), { status: 400 });
  }

  // Resolve the display name to a model identifier, with a safe default
  const model = (provider && PROVIDER_TO_MODEL[provider]) || 'deepseek-ai/deepseek-v4-flash-0731';

  const systemPrompt = `You are an expert Indonesian law professor evaluating a student's case analysis. 
You will review the student's analysis of the following scenario based strictly on the Indonesian Criminal Code (KUHP Baru) data provided below.
Provide constructive, objective feedback. Return your response as a structured JSON matching the provided schema. Do not output anything else except the JSON.
Ensure you use rich markdown formatting (bold, italic, bullet points) inside the JSON fields (issueFeedback, citationFeedback, applicationFeedback, missedElements) so the frontend can render it beautifully.

CRITICAL: You MUST NOT output any <think> tags or internal reasoning. ONLY output the raw JSON object. Any text outside the JSON will cause a system failure.

SCENARIO:
${scenario}

AVAILABLE PASAL DATA (KUHP Baru):
${JSON.stringify(pasalData.map(p => ({ article: p.articleNumber, text: p.officialText, explanation: p.explanation })))}
`;

  const fallbackModels = ['deepseek-ai/deepseek-v4-flash-0731', 'groq/llama-3.1-8b-instant', 'nvidia/nemotron-3-super-120b-a12b', 'Qwen/Qwen3.8-Flash-Next'];
  const modelsToTry = [model, ...fallbackModels.filter(m => m !== model)];
  const errors: { model: string; error: string }[] = [];

  for (const currentModel of modelsToTry) {
    const key = getApiKeyForModel(currentModel);
    if (!key) {
      console.warn(`[practice] Skipping ${currentModel}: No API key configured`);
      continue;
    }

    try {
      // Wrap each attempt in a timeout so we don't hang forever
      let timer: ReturnType<typeof setTimeout>;
      const result = await Promise.race([
        generateObject({
          model: getClient(currentModel),
          system: systemPrompt,
          prompt: `Student's Analysis: ${analysis}`,
          temperature: 0.1,
          schema: z.object({
            issueFeedback: z.string().describe("Feedback on how well the student identified the legal issues"),
            citationFeedback: z.string().describe("Feedback on the student's use of specific articles (Pasal) and citations"),
            applicationFeedback: z.string().describe("Feedback on how the student applied the law to the facts of the scenario"),
            missedElements: z.string().describe("Any elements of the offense or alternative arguments the student missed")
          })
        }).then(res => { clearTimeout(timer); return res; }),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error(`Timeout: ${currentModel} did not respond within ${MODEL_TIMEOUT_MS / 1000}s`)), MODEL_TIMEOUT_MS);
        }),
      ]);

      return Response.json(result.object);
    } catch (err: any) {
      const message = err?.message || String(err);
      console.error(`[practice] Error with model ${currentModel}:`, message);
      errors.push({ model: currentModel, error: message });

      // Groq's Llama may fail on structured output (generateObject with Zod).
      if (currentModel.startsWith('groq/')) {
        console.warn(`[practice] Groq structured output failed for ${currentModel}, falling through to next model.`);
      }
    }
  }

  return Response.json(
    { error: 'Failed to generate feedback after trying all fallback models.', details: errors },
    { status: 500 }
  );
}
