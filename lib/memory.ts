import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function saveMemory(text: string) {
  // This will store what EJ says or learns
  const index = pc.index('ej-twin-memory');
  // Logic to save data goes here once your index is ready
}
