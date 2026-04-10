import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const submission = {
      ...body,
      status: 'pending',
      type: 'vendor_lead',
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb
      .collection('vendor_form_submissions')
      .add(submission);

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Vendor submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}