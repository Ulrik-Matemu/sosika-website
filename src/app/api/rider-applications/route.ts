import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin'; // Adjust path to your admin setup

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Add a timestamp for better record keeping
    const submission = {
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    const docRef = await adminDb
      .collection('rider_form_submissions')
      .add(submission);

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Firebase submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}