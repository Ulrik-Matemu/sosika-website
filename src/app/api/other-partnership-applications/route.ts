import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const submission = {
      ...body,
      status: 'unread',
      source: 'general_partnership_form',
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb
      .collection('partnership_leads') // Separate collection for general inquiries
      .add(submission);

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Partnership submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}