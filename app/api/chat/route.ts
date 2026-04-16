import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      // Using the stable version string that works globally
      model: google('gemini-1.5-flash-latest'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    console.error(error);
    return Response.json({ reply: "Connection failed. Checking model availability..." });
  }
}
