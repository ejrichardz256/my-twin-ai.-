import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: message,
      apiKey: process.env.OPENAI_API_KEY,
    });

    return Response.json({ reply: text });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Connection failed. Make sure your OpenAI key has credits!" });
  }
}
