'use client';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'twin', content: data.reply }]);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      <header className="p-4 border-b border-[#ffd700]/30 bg-[#111] shadow-2xl">
        <h1 className="text-xl font-black text-[#ffd700] tracking-widest text-center uppercase">
          EJ's_DIGITAL_TWIN
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
              m.role === 'user' 
              ? 'bg-[#ffd700] text-black font-semibold rounded-tr-none' 
              : 'bg-[#1a1a1a] text-slate-100 rounded-tl-none border border-[#ffd700]/20'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#111] border-t border-[#ffd700]/20">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            className="flex-1 p-4 rounded-xl bg-black border border-[#ffd700]/30 text-[#ffd700] placeholder-[#ffd700]/50 focus:outline-none focus:border-[#ffd700] transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Command EJ's Twin..."
          />
          <button onClick={sendMessage} className="bg-[#ffd700] hover:bg-[#ffcc00] text-black px-8 py-4 rounded-xl font-black transition-transform active:scale-95 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
