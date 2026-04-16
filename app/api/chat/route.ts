export const runtime = 'edge';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. This is the PROVIDER format (defining the key separately)
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // 2. Now the model uses that provider
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    return Response.json({ reply: "Twin offline. Check Vercel keys!" });
  }
}
	

