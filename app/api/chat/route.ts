import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import { tavily } from '@tavily/core';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

    const result = await generateText({
      model: google('gemini-2.0-flash'),
      system: 'You are the Digital Twin of EJ. Use search for live info.',
      prompt: message,
      tools: {
        search: tool({
          description: 'web search',
          parameters: z.object({ query: z.string() }),
          // @ts-ignore
          execute: async ({ query }) => JSON.stringify(await tvly.search(query)),
        }),
      },
    });

    return Response.json({ reply: result.text });
  } catch (err: any) {
    return Response.json({ reply: 'Error: ' + err.message });
  }
}
