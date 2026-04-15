export default function Home() {
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>AI Twin: Mission Control</h1>
      <div style={{ border: '1px solid #ccc', height: '400px', marginBottom: '10px' }}>
        {/* Chat messages will go here */}
        <p style={{ padding: '10px' }}>System: Twin is online. Waiting for command...</p>
      </div>
      <input type="text" placeholder="Type a command..." style={{ width: '80%', padding: '10px' }} />
      <button style={{ padding: '10px' }}>Send</button>
    </main>
  );
}
