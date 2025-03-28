import { NextResponse } from 'next/server';
import { getSession } from '@/services/auth.server';

export async function GET(): Promise<Response> {
  try {
    const session = getSession();
    return NextResponse.json({
      user: session ? {
        uid: session.uid,
        email: session.email,
        displayName: session.displayName,
      } : null
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
