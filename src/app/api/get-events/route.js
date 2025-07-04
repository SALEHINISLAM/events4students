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
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const todayString = `${year}-${month}-${day}T${hours}:${minutes}`;
  console.log(todayString);
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
      .aggregate([
        { $match: query },
        {
          $addFields: {
            isExpired: {
              $cond: {
                if: { $gte: ['$endDate', todayString] },
                then: 0, // Unexpired events
                else: 1, // Expired events
              },
            },
          },
        },
        {
          $sort: {
            isExpired: 1, // Unexpired (0) before expired (1)
            startDate: 1, // Soonest events first
            isVerified: -1, // Verified events first
            createdAt: -1, // Newer events first
          },
        }, {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            title: 1,
            startDate: 1,
            endDate: 1,
            location: 1,
            coverPhotoUrl: 1,
            _id: 1,
            isExpired: 1, // Include for UI purposes
          },
        },
      ])
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