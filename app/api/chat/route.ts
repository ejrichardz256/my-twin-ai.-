import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: message,
      apiKey: process.env.GEMINI_API_KEY, // Matches your Vercel name
    });

    return Response.json({ reply: text });
  } catch (error) {
    return Response.json({ reply: "Gemini error. Check Vercel keys!" });
  }
}
