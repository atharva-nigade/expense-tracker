import { NextResponse } from 'next/server';

const COOKIE_NAME = process.env.COOKIE_NAME || 'expensetracker_session';

export function middleware(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const url = req.nextUrl.clone();

  const isAuthPage = url.pathname.startsWith('/auth');
  const isApiAuth = url.pathname.startsWith('/api/auth');
  const isPublic = url.pathname === '/';

  if (!token && !isAuthPage && !isApiAuth && !isPublic) {
    url.pathname = '/auth/sign-in';
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)'
  ]
};
