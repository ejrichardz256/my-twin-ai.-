import { createGoogleGenerativeAI } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const response = await fetch(
      `https://googleapis.com${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();
    const names = data.models ? data.models.map((m: any) => m.name) : 'No models found';
    return Response.json({ reply: 'Supported Models: ' + JSON.stringify(names) });
  } catch (error: any) {
    return Response.json({ reply: 'Error listing models: ' + error.message });
  }
}