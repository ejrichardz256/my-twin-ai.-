import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      // This is the specific model designed for the v1beta path
      model: google('gemini-1.5-flash-8b'), 
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    return Response.json({ reply: `System Error: ${error.message}` });
  }
}
