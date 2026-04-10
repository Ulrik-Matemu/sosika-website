import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Using setDoc with email as ID prevents duplicate entries for the same person
    await adminDb.collection('newsletter_subscribers').doc(email.toLowerCase()).set({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      active: true,
      source: 'footer_newsletter'
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}