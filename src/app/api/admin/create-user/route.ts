import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { email, password, role, adminEmail } = await request.json();

    if (!email || !password || !role || !adminEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic security check: ensure the request is coming from the true admin
    // In a full production app, you would verify the session cookie or token.
    // For now, we'll double check the environment variable matches.
    if (adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized: Only the admin can perform this action' },
        { status: 401 }
      );
    }

    // 1. Create the user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
    });

    // 2. Save the user's role in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      email,
      role, // "TEAM_MEMBER" or "CLIENT"
      createdAt: new Date().toISOString(),
      createdBy: adminEmail
    });

    // Also update the whitelist just in case any old logic still uses it
    if (role === 'TEAM_MEMBER') {
      await adminDb.collection('team_whitelist').doc(email.toLowerCase()).set({
        email: email.toLowerCase(),
        addedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ 
      success: true, 
      user: { 
        uid: userRecord.uid, 
        email: userRecord.email,
        role 
      } 
    });

  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}
