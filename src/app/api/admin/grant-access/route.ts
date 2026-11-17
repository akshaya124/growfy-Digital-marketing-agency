import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { email, role, adminEmail, collectionName, docId, password } = await request.json();

    if (!email || !role || !adminEmail || !collectionName || !docId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized: Only the admin can perform this action' },
        { status: 401 }
      );
    }

    // 1. Check if user already exists in Auth
    let userRecord;
    let isNewUser = false;
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      // If user already exists and a new password was provided, update it
      if (password) {
        await adminAuth.updateUser(userRecord.uid, { password });
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        isNewUser = true;
        // User doesn't exist, create them
        userRecord = await adminAuth.createUser({
          email,
          password: password || (Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase() + "!"),
        });
      } else {
        throw error; // Re-throw other errors
      }
    }

    // 2. Save/Update the user's role in Firestore users collection
    await adminDb.collection('users').doc(userRecord.uid).set({
      email,
      role, // "TEAM_MEMBER" or "CLIENT"
      createdAt: new Date().toISOString(),
      createdBy: adminEmail
    }, { merge: true });

    // 3. Update the whitelist if it's a team member
    if (role === 'TEAM_MEMBER') {
      await adminDb.collection('team_whitelist').doc(email.toLowerCase()).set({
        email: email.toLowerCase(),
        addedAt: new Date().toISOString(),
      }, { merge: true });
    }

    // 4. Update the profile document in the team or clients collection
    await adminDb.collection(collectionName).doc(docId).update({
      hasLoginAccess: true,
      uid: userRecord.uid
    });

    return NextResponse.json({ 
      success: true, 
      user: { 
        uid: userRecord.uid, 
        email: userRecord.email,
        role 
      } 
    });

  } catch (error: any) {
    console.error('Error granting access:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to grant access' },
      { status: 500 }
    );
  }
}
