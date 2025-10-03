import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Initialize MongoDB connection
const mongoClient = new MongoClient(process.env.NEXT_MongoURI_KEY);
const db = mongoClient.db();

export async function GET(request, { params }) {
    const { id } = await params;

    try {
        await mongoClient.connect();

        const event = await db
            .collection('events')
            .findOne({ _id: new ObjectId(id), adminApproval: true });

        if (!event) {
            return NextResponse.json(
                { success: false, message: 'Event not found or not approved' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            event,
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await mongoClient.close();
    }
}

export const dynamic = 'force-dynamic';