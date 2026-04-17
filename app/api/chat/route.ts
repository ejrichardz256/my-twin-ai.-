import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import { tavily } from '@tavily/core';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await generateText({
      // We remove 'models/' to see if it finds the stable v1 path
      model: google('gemini-1.5-flash'), 
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
    return Response.json({ reply: 'Status: ' + err.message });
  }
}
