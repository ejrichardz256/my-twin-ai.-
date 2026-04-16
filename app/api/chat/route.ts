import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      // Adding 'models/' prefix as requested by your specific error log
      model: google('models/gemini-1.5-flash'), 
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    // If 'models/' doesn't work, we'll try 'gemini-1.5-flash-latest' next
    return Response.json({ reply: `Connection error: ${error.message}` });
  }
}
