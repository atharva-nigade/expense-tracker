import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/cookies';

export async function POST() {
  try {
    clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
