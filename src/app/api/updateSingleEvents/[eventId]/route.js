import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { BlobServiceClient } from '@azure/storage-blob';

// Initialize MongoDB connection
const mongoClient = new MongoClient(process.env.NEXT_MongoURI_KEY);

// Initialize Azure Blob Storage
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

async function uploadToBlob(containerName, file) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists({ access: 'blob' });

  const blobName = `${Date.now()}-${file.name}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: file.type }
  });

  return blockBlobClient.url;
}

export async function PUT(request,{params}) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const formData = await request.formData();
    const { eventId } = params;

    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Extract files
    const coverPhoto = formData.get('coverPhoto');
    const verificationDocument = formData.get('verificationDocument');

    // Extract other form data
    const eventData = {
      title: formData.get('eventTitle'),
      description: formData.get('eventDescription'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      eventType: formData.get('eventType'),
      registrationLink: formData.get('registrationLink'),
      eventWebsite: formData.get('eventWebsite'),
      socialMediaLink: formData.get('socialMediaLink'),
      location: formData.get('location'),
      organizerInstitution: formData.get('organizerInstitution'),
      organizerWebsite: formData.get('organizerWebsite'),
      organizerSocialMediaLink: formData.get('organizerSocialMediaLink'),
      isOrganizer: formData.get('isOrganizer'),
      organizerRole: formData.get('organizerRole'),
      updatedAt: new Date(),
    };

    // Upload files to Azure Blob Storage if provided
    const uploads = [];
    if (coverPhoto) {
      uploads.push(uploadToBlob('event-covers', coverPhoto));
    }
    if (verificationDocument) {
      uploads.push(uploadToBlob('verification-docs', verificationDocument));
    }

    const [coverPhotoUrl, verificationDocUrl] = await Promise.all(uploads);

    // Update event in MongoDB
    const updateData = {
      ...eventData,
      ...(coverPhotoUrl && { coverPhotoUrl }),
      ...(verificationDocUrl && { verificationDocUrl }),
    };

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Event not found or no changes made' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, eventId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await mongoClient.close();
  }
}

export const dynamic = 'force-dynamic';