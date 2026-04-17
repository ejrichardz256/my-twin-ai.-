import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import { tavily } from '@tavily/core';

export async function POST(req: Request) {
  const { message } = await req.json();
  const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

  const result = await generateText({
    model: google('gemini-1.5-flash'),
    system: 'You are the Digital Twin of EJ. Use the search tool for live data.',
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
