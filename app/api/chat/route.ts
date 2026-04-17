import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      // Switching to the most compatible model name for v1beta
      model: google('gemini-pro'), 
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    return Response.json({ reply: `Brain Error: ${error.message}` });
  }
}
