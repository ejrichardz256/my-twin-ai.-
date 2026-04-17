import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
export const runtime = 'edge';
export async function POST(req: Request) {
const { message } = await req.json();
const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const { text } = await generateText({ model: google('gemini-1.5-flash-latest'), prompt: message });
return Response.json({ reply: text });
}