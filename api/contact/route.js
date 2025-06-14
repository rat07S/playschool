// app/api/contact/route.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://sit22it012:eOFILilCZRuR8AYH@cluster0.1p33pyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json(); // read JSON from body

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('tinysteps');
    const collection = db.collection('messages');

    await collection.insertOne({ name, email, message, timestamp: new Date() });
    await client.close();

    return new Response(JSON.stringify({ success: true, message: 'Message sent!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
