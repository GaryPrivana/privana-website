import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  SITE_UNLOCK_COOKIE_NAME,
  isValidUnlockCookie
} from '@/lib/temp-site-gate';

// TEMPORARY PRE-LAUNCH PROTECTION
// Redirect every request to /unlock until a valid unlock cookie is present.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isUnlockPath = pathname === '/unlock';
  const hasValidUnlockCookie = isValidUnlockCookie(
    request.cookies.get(SITE_UNLOCK_COOKIE_NAME)?.value
  );

  if (isUnlockPath) {
    if (hasValidUnlockCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (!hasValidUnlockCookie) {
    const unlockUrl = new URL('/unlock', request.url);
    return NextResponse.redirect(unlockUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/unlock|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml).*)'
  ]
};
