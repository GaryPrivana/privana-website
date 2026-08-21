import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { sanitizeRedirectPath } from '../lib/sanitize-redirect-path.ts';
import {
  getUnlockCookieValue,
  isMarketingWebsiteGateRequired,
  isValidAccessCode,
  isValidUnlockCookie,
} from '../lib/temp-site-gate.ts';

const routeSource = readFileSync(new URL('../app/api/unlock/route.ts', import.meta.url), 'utf8');
const frontendSource = readFileSync(new URL('../app/unlock/unlock-screen.tsx', import.meta.url), 'utf8');
const middlewareSource = readFileSync(new URL('../middleware.ts', import.meta.url), 'utf8');
const pageSource = readFileSync(new URL('../app/unlock/page.tsx', import.meta.url), 'utf8');

const TEST_CODE = ['2', '8', '4', '0', '6', '1'].join('');

async function withGateEnvironment({ required, code }, callback) {
  const previousRequired = process.env.PRIVANA_MARKETING_WEBSITE_CODE_REQUIRED;
  const previousCode = process.env.PRIVANA_MARKETING_WEBSITE;

  if (required === undefined) delete process.env.PRIVANA_MARKETING_WEBSITE_CODE_REQUIRED;
  else process.env.PRIVANA_MARKETING_WEBSITE_CODE_REQUIRED = required;
  if (code === undefined) delete process.env.PRIVANA_MARKETING_WEBSITE;
  else process.env.PRIVANA_MARKETING_WEBSITE = code;

  try {
    return await callback();
  } finally {
    if (previousRequired === undefined) delete process.env.PRIVANA_MARKETING_WEBSITE_CODE_REQUIRED;
    else process.env.PRIVANA_MARKETING_WEBSITE_CODE_REQUIRED = previousRequired;
    if (previousCode === undefined) delete process.env.PRIVANA_MARKETING_WEBSITE;
    else process.env.PRIVANA_MARKETING_WEBSITE = previousCode;
  }
}

test('only explicit case-insensitive false disables the gate', async () => {
  for (const required of ['false', 'FALSE', ' FaLsE ']) {
    await withGateEnvironment({ required, code: undefined }, () => {
      assert.equal(isMarketingWebsiteGateRequired(), false);
    });
  }

  for (const required of [undefined, '', '   ', 'true', 'yes', '0', 'false-ish']) {
    await withGateEnvironment({ required, code: TEST_CODE }, () => {
      assert.equal(isMarketingWebsiteGateRequired(), true);
    });
  }
});

test('enabled gate accepts the configured code and rejects an incorrect code', async () => {
  await withGateEnvironment({ required: 'true', code: TEST_CODE }, () => {
    assert.equal(isMarketingWebsiteGateRequired(), true);
    assert.equal(isValidAccessCode(TEST_CODE), true);
    assert.equal(isValidAccessCode('000000'), false);
  });
});

test('enabled gate fails closed when its access code is missing or blank', async () => {
  await withGateEnvironment({ required: 'true', code: undefined }, () => {
    assert.equal(isValidAccessCode(TEST_CODE), false);
  });
  await withGateEnvironment({ required: 'true', code: '   ' }, () => {
    assert.equal(isValidAccessCode(TEST_CODE), false);
  });
});

test('enabled gate retains secure HMAC unlock-session behavior', async () => {
  await withGateEnvironment({ required: 'true', code: TEST_CODE }, async () => {
    const cookie = await getUnlockCookieValue();
    assert.ok(cookie);
    assert.notEqual(cookie, TEST_CODE);
    assert.match(cookie, /^[a-f0-9]{64}$/);
    assert.equal(await isValidUnlockCookie(cookie), true);
    assert.equal(await isValidUnlockCookie('granted_v1'), false);
  });
});

test('middleware bypasses cookie work when disabled and redirects direct unlock visits', () => {
  const disabledCheck = middlewareSource.indexOf('if (!isMarketingWebsiteGateRequired())');
  const cookieCheck = middlewareSource.indexOf('await isValidUnlockCookie(');

  assert.ok(disabledCheck >= 0 && disabledCheck < cookieCheck);
  assert.match(middlewareSource, /if \(isUnlockPath\)[\s\S]*sanitizeRedirectPath[\s\S]*NextResponse\.redirect/);
  assert.match(middlewareSource, /return NextResponse\.next\(\);[\s\S]*await isValidUnlockCookie/);
});

test('redirect sanitizer preserves local next destinations and rejects external forms', () => {
  assert.equal(sanitizeRedirectPath('/solutions?view=all'), '/solutions?view=all');
  assert.equal(sanitizeRedirectPath(['/requested', '/ignored']), '/requested');
  assert.equal(sanitizeRedirectPath(undefined), '/');
  assert.equal(sanitizeRedirectPath('https://example.com'), '/');
  assert.equal(sanitizeRedirectPath('//example.com/path'), '/');
  assert.equal(sanitizeRedirectPath('/\\example.com/path'), '/');
  assert.match(pageSource, /sanitizeRedirectPath\(params\.next\)/);
  assert.match(pageSource, /<UnlockScreen redirectPath=\{redirectPath\}/);
});

test('disabled unlock API succeeds before reading a code or creating a cookie', () => {
  const disabledCheck = routeSource.indexOf('if (!isMarketingWebsiteGateRequired())');
  const requestRead = routeSource.indexOf('await request.json()');
  const cookieCreation = routeSource.indexOf('await getUnlockCookieValue()');

  assert.ok(disabledCheck >= 0 && disabledCheck < requestRead);
  assert.ok(disabledCheck < cookieCreation);
  assert.match(routeSource, /if \(!isMarketingWebsiteGateRequired\(\)\) \{\s*return NextResponse\.json\(\{ ok: true \}\)/);
});

test('API and browser expose neither environment value', () => {
  assert.match(routeSource, /NextResponse\.json\(\{ ok: false \}/);
  assert.match(routeSource, /NextResponse\.json\(\{ ok: true \}\)/);
  assert.doesNotMatch(routeSource, /PRIVANA_MARKETING_WEBSITE(?:_CODE_REQUIRED)?/);
  assert.doesNotMatch(routeSource, /configuredCode|submittedCode/);
  assert.doesNotMatch(routeSource, new RegExp(TEST_CODE));

  assert.match(frontendSource, /fetch\('\/api\/unlock'/);
  assert.match(frontendSource, /JSON\.stringify\(\{ code: value \}\)/);
  assert.doesNotMatch(frontendSource, /PRIVANA_MARKETING_WEBSITE|SITE_UNLOCK_CODE/);
  assert.doesNotMatch(frontendSource, /isMarketingWebsiteGateRequired|code\s*===|code\s*!==/);
  assert.doesNotMatch(frontendSource, new RegExp(TEST_CODE));
});

test('successful validation retains the requested next redirect and session refresh', () => {
  assert.match(frontendSource, /router\.replace\(redirectPath\)/);
  assert.match(frontendSource, /router\.refresh\(\)/);
});
