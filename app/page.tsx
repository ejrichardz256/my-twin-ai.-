"use client";
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'system', content: 'Twin Online. Ready for mission.' }]);

  const handleSend = async () => {
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    
    // This is where we call your API (Logic Lobe)
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Sidebar: Memory Vault */}
      <div style={{ width: '250px', borderRight: '1px solid #333', padding: '20px' }}>
        <h3>Memory Vault</h3>
        <p style={{ fontSize: '12px', color: '#888' }}>Syncing with Mobile...</p>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
          <li>✓ Preference: Direct Tone</li>
          <li>✓ Location: Active</li>
        </ul>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px', borderBottom: '1px solid #333' }}>
          <h2>AI Twin: Mission Control</h2>
        </header>
        
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: '15px', color: m.role === 'user' ? '#0070f3' : '#fff' }}>
              <strong>{m.role === 'user' ? 'You: ' : 'Twin: '}</strong>{m.content}
            </div>
          ))}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid #333', display: 'flex' }}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }} 
            placeholder="Give a command..." 
          />
          <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px 20px', background: '#0070f3', borderRadius: '8px', border: 'none', color: '#fff' }}>Send</button>
        </div>
      </div>
    </div>
  );
}
