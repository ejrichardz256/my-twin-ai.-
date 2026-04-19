import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { tavily } from '@tavily/core';
import { z } from 'zod';

export const runtime = 'edge';

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: 'You are an AI Twin. Use search for real-time info.',
      prompt: message,
      tools: {
        search: tool({
          description: 'Search the web',
          parameters: z.object({ query: z.string() }),
          execute: async ({ query }: { query: string }) => {
            const res = await tvly.search(query);
            return res;
          },
        } as any),
      }
    } as any);

    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json({ reply: 'Error: ' + err.message });
  }
}
