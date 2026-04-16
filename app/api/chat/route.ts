import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // This looks for the key you set in Vercel
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    console.error(error);
    return Response.json({ 
      reply: "Brain offline. Make sure GEMINI_API_KEY is saved in Vercel and hit 'Redeploy'!" 
    });
  }
}
