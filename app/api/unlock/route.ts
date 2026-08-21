import { NextResponse } from 'next/server';
import {
  SITE_UNLOCK_COOKIE_NAME,
  getUnlockCookieValue,
  isMarketingWebsiteGateRequired,
  isValidAccessCode
} from '@/lib/temp-site-gate';

// TEMPORARY PRE-LAUNCH PROTECTION
// Validates unlock code and stores unlocked state in an HTTP-only cookie.
export async function POST(request: Request) {
  if (!isMarketingWebsiteGateRequired()) {
    return NextResponse.json({ ok: true });
  }

  let code = '';

  try {
    const body = await request.json();
    code = typeof body?.code === 'string' ? body.code.trim() : '';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isValidAccessCode(code)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieValue = await getUnlockCookieValue();
  if (!cookieValue) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SITE_UNLOCK_COOKIE_NAME,
    value: cookieValue,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });

  return response;
}
