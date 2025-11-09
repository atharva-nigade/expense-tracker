import { cookies } from 'next/headers';

const COOKIE_NAME = process.env.COOKIE_NAME || 'expensetracker_session';

export function setSessionCookie(token) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function getSessionToken() {
  return cookies().get(COOKIE_NAME)?.value || null;
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
}
