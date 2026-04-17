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
    <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200 font-sans">
      <header className="p-4 border-b border-slate-700 bg-[#1e293b] shadow-xl">
        <h1 className="text-xl font-bold text-blue-400 tracking-tight">EJ // DIGITAL TWIN</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
              m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#334155] text-slate-100 rounded-tl-none border border-slate-600'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#1e293b] border-t border-slate-700">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            className="flex-1 p-3 rounded-xl bg-[#0f172a] border border-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Talk to EJ's Twin..."
          />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold transition-colors">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
