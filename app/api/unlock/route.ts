import { NextResponse } from 'next/server';
import {
  SITE_UNLOCK_CODE,
  SITE_UNLOCK_COOKIE_NAME,
  getUnlockCookieValue
} from '@/lib/temp-site-gate';

// TEMPORARY PRE-LAUNCH PROTECTION
// Validates unlock code and stores unlocked state in an HTTP-only cookie.
export async function POST(request: Request) {
  let code = '';

  try {
    const body = await request.json();
    code = typeof body?.code === 'string' ? body.code.trim() : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!/^\d{6}$/.test(code) || code !== SITE_UNLOCK_CODE) {
    return NextResponse.json({ error: 'Invalid code.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SITE_UNLOCK_COOKIE_NAME,
    value: getUnlockCookieValue(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });

  return response;
}
