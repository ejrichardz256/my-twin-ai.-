import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // This part checks if the key exists before trying to use it
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ reply: "DEBUG: The GEMINI_API_KEY is missing from Vercel settings!" });
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    // This will now show the REAL error from Google (like 'Invalid Key' or 'Quota Exceeded')
    return Response.json({ reply: `Google Error: ${error.message}` });
  }
}
