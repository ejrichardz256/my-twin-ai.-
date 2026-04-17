import { Pinecone } from '@pinecone-database/pinecone';

export async function testPinecone() {
  try {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const indexes = await pc.listIndexes();
    return { success: true, count: indexes.indexes?.length || 0 };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
