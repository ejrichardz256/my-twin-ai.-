import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: 'You are Ej. You have access to a search tool. For any real-time info like sports scores, you MUST use the search tool before answering.',
      prompt: message,
      tools: {
        search: tool({
          description: 'Search the web for live scores and news',
          parameters: z.object({ query: z.string() }),
          execute: async ({ query }: any) => {
            const res = await fetch('https://tavily.com', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ api_key: process.env.TAVILY_API_KEY, query }),
            });
            return await res.json();
          },
        } as any),
      },
      maxSteps: 5,
    } as any);
    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json({ reply: 'Error: ' + err.message });
  }
}
