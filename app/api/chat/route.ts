import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ reply: "DEBUG: GEMINI_API_KEY missing in Vercel." });
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      // We add 'models/' to the front to fix the 'Not Found' error
      model: google('models/gemini-1.5-flash'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    return Response.json({ reply: `Google Error: ${error.message}` });
  }
}
