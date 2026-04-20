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
      system: 'You are Ej, the Digital Twin. When someone asks if you are back or who you are, answer as Ej. You are cool, helpful, and represent the real Ej in this chat.',
      prompt: message,
      tools: {
        search: tool({
          description: 'Search the web',
          parameters: z.object({ query: z.string() }),
          execute: async ({ query }: any) => {
            const response = await fetch('https://tavily.com', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                api_key: process.env.TAVILY_API_KEY,
                query,
              }),
            });
            return await response.json();
          },
        } as any),
      },
    } as any);

    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json({ reply: 'Error: ' + err.message });
  }
}
