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
      system: 'You are Ej. You have unlimited access to the internet via your search tool. Use it for ANY real-time events, sports, weather, stock prices, tech trends, or general knowledge that requires up-to-date facts. Always prioritize searching over saying you do not know.',
      prompt: message,
      tools: {
        search: tool({
          description: 'Search the internet for any and all real-time events, facts, and live information',
          parameters: z.object({ query: z.string() }),
          execute: async ({ query }: any) => {
            const res = await fetch('https://tavily.com', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                api_key: process.env.TAVILY_API_KEY, 
                query,
                search_depth: "advanced" 
              }),
            });
            return await res.json();
          },
        } as any),
      },
      maxSteps: 5,
    } as any);

    return Response.json({ reply: text });
  } catch (err: any) {
    const errorMsg = err.message.includes('quota') 
      ? 'Google is rate-limiting the free tier. Please wait 60 seconds before asking again!' 
      : err.message;
    return Response.json({ reply: 'Error: ' + errorMsg });
  }
}
