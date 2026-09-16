import { POST } from './src/app/api/chat/route.ts';
const req = new Request('http://localhost:3000/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages: [{ role: 'user', content: 'test' }] })
});
POST(req).then(async res => {
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
}).catch(console.error);
