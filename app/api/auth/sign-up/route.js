import supabase from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { setSessionCookie } from '@/lib/cookies';

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);

    const { data: user, error } = await supabase
      .from('users')
      .insert({ email, password_hash: hash, name })
      .select('id, email, name')
      .single();

    if (error) {
      console.error('Signup error:', error);
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    const token = await signToken({ sub: user.id, email: user.email });
    setSessionCookie(token);

    return NextResponse.json({ user });
  } catch (e) {
    console.error('Server error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
