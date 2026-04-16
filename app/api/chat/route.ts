import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Create the Google instance with your specific Vercel key name
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // 2. Generate the text
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Gemini error. Check Vercel keys!" });
  }
}
