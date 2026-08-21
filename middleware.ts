import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  SITE_UNLOCK_COOKIE_NAME,
  isMarketingWebsiteGateRequired,
  isValidUnlockCookie
} from '@/lib/temp-site-gate';
import { sanitizeRedirectPath } from '@/lib/sanitize-redirect-path';

// TEMPORARY PRE-LAUNCH PROTECTION
// Redirect every request to /unlock until a valid unlock cookie is present.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isUnlockPath = pathname === '/unlock';

  if (!isMarketingWebsiteGateRequired()) {
    if (isUnlockPath) {
      const redirectTarget = sanitizeRedirectPath(request.nextUrl.searchParams.get('next'));
      return NextResponse.redirect(new URL(redirectTarget, request.url));
    }

    return NextResponse.next();
  }

  const hasValidUnlockCookie = await isValidUnlockCookie(
    request.cookies.get(SITE_UNLOCK_COOKIE_NAME)?.value
  );

  if (isUnlockPath) {
    if (hasValidUnlockCookie) {
      const redirectTarget = sanitizeRedirectPath(request.nextUrl.searchParams.get('next'));
      return NextResponse.redirect(new URL(redirectTarget, request.url));
    }

    return NextResponse.next();
  }

  if (!hasValidUnlockCookie) {
    const unlockUrl = new URL('/unlock', request.url);
    const originalPath = `${pathname}${request.nextUrl.search}`;
    unlockUrl.searchParams.set('next', originalPath);
    return NextResponse.redirect(unlockUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/unlock|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml).*)'
  ]
};
