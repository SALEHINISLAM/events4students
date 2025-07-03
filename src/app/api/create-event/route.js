// app/api/events/create/route.js
import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { MongoClient } from 'mongodb';

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
        blobHTTPHeaders: { blobContentType: file.type }
    });

    return blockBlobClient.url;
}

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Generate a 6-digit security code
        const securityCode = randomBytes(3).toString('hex').toUpperCase();

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
            organizerRole: formData.get('organizerRole')
        };

        // Upload files to Azure Blob Storage
        const uploads = [];
        if (coverPhoto) {
            uploads.push(uploadToBlob('event-covers', coverPhoto));
        }
        if (verificationDocument) {
            uploads.push(uploadToBlob('verification-docs', verificationDocument));
        }

        const [coverPhotoUrl, verificationDocUrl] = await Promise.all(uploads);

        // Insert into MongoDB
        const result = await db.collection('events').insertOne({
            ...eventData,
            securityCode,
            isVerified: false,
            adminApproval: false,
            isDeleted: false,
            coverPhotoUrl: coverPhotoUrl || null,
            verificationDocUrl: verificationDocUrl || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            eventId: result.insertedId,
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    } finally {
        await mongoClient.close();
    }
}

export const dynamic = 'force-dynamic';