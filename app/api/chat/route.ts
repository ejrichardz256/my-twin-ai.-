import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: 'You are a helpful AI twin.',
      prompt: message,
    });

    return Response.json({ reply: text });
  } catch (error: any) {
    console.error('Build/Runtime Error:', error);
    return Response.json({ 
      reply: "Connection failed. Verify your OpenAI Key in Vercel and check your billing balance." 
    });
  }
}
