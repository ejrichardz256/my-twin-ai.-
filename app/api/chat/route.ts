import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import { tavily } from '@tavily/core';

export async function POST(req: Request) {
  const { message } = await req.json();
  const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });
  const result = await generateText({
    model: google('gemini-2.0-flash'),
    system: 'You are the Digital Twin of EJ. You represent him. Use search for live info.',
    prompt: message,
    tools: {
      search: tool({
        description: 'web search',
        parameters: z.object({ query: z.string() }),
        execute: async ({ query }) => JSON.stringify(await tvly.search(query)),
      }),
    },
    maxSteps: 3,
  });
  return Response.json({ reply: result.text });
}
cat << 'EOF' >> ~/my-twin-web/app/api/chat/route.ts
  const result = await generateText({
    model: google('gemini-2.0-flash'),
    system: 'You are the Digital Twin of EJ. You represent him. Use search for live info.',
    prompt: message,
    tools: {
      search: tool({
        description: 'web search',
        parameters: z.object({ query: z.string() }),
        execute: async ({ query }) => JSON.stringify(await tvly.search(query)),
      }),
    },
    maxSteps: 3,
  });
  return Response.json({ reply: result.text });
}
  const result = await generateText({
    model: google('gemini-2.0-flash'),
    system: 'You are the Digital Twin of EJ. You represent him. Use search for live info.',
    prompt: message,
    tools: {
      search: tool({
        description: 'web search',
        parameters: z.object({ query: z.string() }),
        execute: async ({ query }) => JSON.stringify(await tvly.search(query)),
      }),
    },
    maxSteps: 3,
  });
  return Response.json({ reply: result.text });
}
