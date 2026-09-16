import fs from 'fs';
import { execSync } from 'child_process';
const models = ["nvidia/llama-3.1-nemotron-70b-instruct", "meta/llama3-70b-instruct", "mistralai/mistral-large", "meta/llama-3.2-90b-vision-instruct", "nvidia/llama-3.1-nemoguard-8b-content-safety"];
for (const model of models) {
  try {
    const res = execSync(`curl -s -X POST "https://integrate.api.nvidia.com/v1/chat/completions" -H "Authorization: Bearer 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" -H "Content-Type: application/json" -d '{"model":"${model}","messages":[{"role":"user","content":"Hi"}],"max_tokens":10}'`);
    console.log(model, "->", res.toString());
  } catch (e) {}
}
