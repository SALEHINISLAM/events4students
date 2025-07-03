import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Initialize MongoDB connection
const mongoClient = new MongoClient(process.env.NEXT_MongoURI_KEY);
const db = mongoClient.db();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const limit = 12;

  try {
    await mongoClient.connect();
    
    const query = {
      adminApproval: true,
      isDeleted: { $ne: true },
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { organizerInstitution: { $regex: search, $options: 'i' } },
      ],
    };

    const events = await db
      .collection('events')
      .find(query,{
        projection:{
            title:1,
            startDate:1,
            endDate:1,
            location:1,
            coverPhotoUrl:1,
            isVerified:1,
            _id:1
        }
      })
      .sort({ startDate: 1, isVerified: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await db.collection('events').countDocuments(query);
    const hasMore = total > page * limit;

    return NextResponse.json({
      success: true,
      events,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } 
  finally {
    await mongoClient.close();
  }
}

export const dynamic = 'force-dynamic';