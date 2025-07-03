import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Initialize MongoDB connection
const mongoClient = new MongoClient(process.env.NEXT_MongoURI_KEY);
const db = mongoClient.db();

export async function POST(request) {
  try {
    const { eventId, securityCode } = await request.json();

    if (!eventId || !securityCode) {
      return NextResponse.json(
        { success: false, message: 'Event ID and security code are required' },
        { status: 400 }
      );
    }

    const event = await db.collection('events').findOne({ 
      _id: new ObjectId(eventId),
      securityCode 
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Invalid event ID or security code' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error) {
    console.error('Error verifying event:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await mongoClient.close();
  }
}

export const dynamic = 'force-dynamic';