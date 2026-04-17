import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: 'You are the Digital Twin of [EJ]. You are helpful, intelligent, and represent your creator in a cool, modern way. If asked who you are, explain that you are his digital representative.',
      prompt: message,
    });
    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json({ reply: 'Error: ' + err.message });
  }
}
