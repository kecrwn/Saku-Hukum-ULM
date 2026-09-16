const testModel = async (name, model, key) => {
  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 10
      })
    });
    console.log(`${name}: ${res.status}`);
    const data = await res.text();
    console.log(`Response: ${data.substring(0, 150)}...`);
  } catch (e) {
    console.log(`${name} Error: ${e.message}`);
  }
};

const run = async () => {
  await testModel('Kimi (Nvidia fallback)', 'meta/llama-3.1-8b-instruct', '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');
  await testModel('Ultra 550B', 'nvidia/nemotron-3-ultra-550b-a55b', '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');
  await testModel('Lightning 30B', 'nvidia/nemotron-3.5-lightning-30b-a3b', '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');
};
run();
