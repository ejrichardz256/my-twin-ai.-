import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      model: google('models/gemini-1.5-flash'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    console.error(error);
    return Response.json({ reply: "Twin connection error. Checking API permissions..." });
  }
}
