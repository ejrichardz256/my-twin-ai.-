import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch('https://openai.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await res.json();
    
    if (data.error) {
      return NextResponse.json({ reply: `OpenAI Error: ${data.error.message}` });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ reply: "System Error: Connection failed. Check Vercel logs." });
  }
}
