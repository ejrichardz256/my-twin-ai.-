import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { tavily } from '@tavily/core';

export const runtime = 'edge';

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: 'You are the Digital Twin of [YOUR NAME]. Use the search tool to find live info.',
      prompt: message,
      tools: {
        search: tool({
          description: 'Search the web for live news and info',
          parameters: (z) => z.object({ query: z.string() }),
          execute: async ({ query }) => {
            const result = await tvly.search(query);
            return result;
          },
        }),
      },
    });

    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json({ reply: 'Error: ' + err.message });
  }
}
