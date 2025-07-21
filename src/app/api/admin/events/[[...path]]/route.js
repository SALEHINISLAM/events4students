import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { BlobServiceClient } from '@azure/storage-blob';

// Initialize MongoDB connection
const mongoClient = new MongoClient(process.env.NEXT_MongoURI_KEY);
const db = mongoClient.db();

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
    blobHTTPHeaders: { blobContentType: file.type },
  });

  return blockBlobClient.url;
}

export async function GET(request, { params }) {
  const path = params.path || [];
  const endpoint = path[0] || '';

  try {
    await mongoClient.connect();

    if (endpoint === 'unapproved') {
      const events = await db
        .collection('events')
        .find({ adminApproval: false, isDeleted: { $ne: true } })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ success: true, events });
    } else if (endpoint === 'all') {
      const events = await db
        .collection('events')
        .find({ isDeleted: { $ne: true } })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ success: true, events });
    } else if (endpoint === 'edit' && path[1]) {
      const event = await db
        .collection('events')
        .findOne({ _id: new ObjectId(path[1]), isDeleted: { $ne: true } });
      if (!event) {
        return NextResponse.json(
          { success: false, message: 'Event not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, event });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid endpoint' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await mongoClient.close();
  }
}

export async function PUT(request, { params }) {
  const path = params.path || [];
  const endpoint = path[0] || '';
  const id = path[1];

  try {
    await mongoClient.connect();

    if (endpoint === 'approve' && id) {
      const result = await db
        .collection('events')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { adminApproval: true, updatedAt: new Date() } }
        );
      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { success: false, message: 'Event not found or already approved' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    } else if (endpoint === 'delete' && id) {
      const result = await db
        .collection('events')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { isDeleted: true, updatedAt: new Date() } }
        );
      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { success: false, message: 'Event not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    } else if (endpoint === 'edit' && id) {
      const formData = await request.formData();
      // Extract files
      const coverPhotoType = formData.get("coverPhotoType")
      const coverPhotoFile = formData.get('coverPhotoFile');
      const coverPhotoUrl = formData.get('coverPhotoUrl');
      const eventData = {
        title: formData.get('eventTitle'),
        description: formData.get('eventDescription'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        eventType: formData.get('eventType'),
        socialMediaLink: formData.get('socialMediaLink'),
        eventWebsite: formData.get('eventWebsite'),
        registrationLink: formData.get('registrationLink'),
        location: formData.get('location'),
        organizerInstitution: formData.get('organizerInstitution'),
        organizerWebsite: formData.get('organizerWebsite'),
        organizerSocialMediaLink: formData.get('organizerSocialMediaLink'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        contactNumber: formData.get('contactNumber'),
        isOrganizer: formData.get('isOrganizer'),
        organizerRole: formData.get('organizerRole'),
        isVerified: formData.get('isVerified') === 'true',
        updatedAt: new Date(),
      };

      const uploads = [];
      let finalCoverPhotoUrl = null;
      const verificationDocument = formData.get('verificationDocument');
      if (coverPhotoType === 'file' && coverPhotoFile) {
        uploads.push(uploadToBlob('event-covers', coverPhotoFile));
      } else if (coverPhotoType === 'url' && coverPhotoUrl) {
        finalCoverPhotoUrl = coverPhotoUrl;
      }
      if (verificationDocument) {
        uploads.push(uploadToBlob('verification-docs', verificationDocument));
      }

      const [uploadedCoverPhotoUrl, verificationDocUrl] = await Promise.all(uploads);
      if (coverPhotoType === "file") {
        finalCoverPhotoUrl = uploadedCoverPhotoUrl;
      }
      const updateData = {
        ...eventData,
        ...(finalCoverPhotoUrl && { coverPhotoUrl: finalCoverPhotoUrl }),
        ...(verificationDocUrl && { verificationDocUrl }),
      };

      const result = await db
        .collection('events')
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { success: false, message: 'Event not found or no changes made' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid endpoint' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await mongoClient.close();
  }
}

export const dynamic = 'force-dynamic';