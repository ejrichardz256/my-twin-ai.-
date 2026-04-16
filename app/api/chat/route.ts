import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // This checks which name Vercel is actually using
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!key) {
      return Response.json({ reply: "DEBUG: Vercel cannot find GEMINI_API_KEY. Check your spelling in Settings!" });
    }

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: message,
      apiKey: key,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    return Response.json({ reply: `System Error: ${error.message}` });
  }
}
