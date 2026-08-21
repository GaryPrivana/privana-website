// TEMPORARY PRE-LAUNCH SITE GATE
// Remove this file + middleware/unlock route/page when marketing site goes live.

export const SITE_UNLOCK_COOKIE_NAME = 'privana_site_unlocked';

const COOKIE_PAYLOAD = 'privana-marketing-site:granted:v1';

export function isMarketingWebsiteGateRequired() {
  return process.env.PRIVANA_MARKETING_WEBSITE_CODE_REQUIRED?.trim().toLowerCase() !== 'false';
}

function getConfiguredAccessCode() {
  const configuredCode = process.env.PRIVANA_MARKETING_WEBSITE?.trim();
  return configuredCode || null;
}

function valuesMatch(left: string, right: string) {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  let difference = leftBytes.length ^ rightBytes.length;
  const comparisonLength = Math.max(leftBytes.length, rightBytes.length);

  for (let index = 0; index < comparisonLength; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
}

export function isValidAccessCode(submittedCode: unknown) {
  const configuredCode = getConfiguredAccessCode();

  if (!configuredCode || typeof submittedCode !== 'string') {
    return false;
  }

  const normalizedCode = submittedCode.trim();
  return /^\d{6}$/.test(normalizedCode) && valuesMatch(normalizedCode, configuredCode);
}

async function createCookieValue(configuredCode: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(configuredCode),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(COOKIE_PAYLOAD)
  );

  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function getUnlockCookieValue() {
  const configuredCode = getConfiguredAccessCode();
  return configuredCode ? createCookieValue(configuredCode) : null;
}

export async function isValidUnlockCookie(value?: string) {
  const expectedValue = await getUnlockCookieValue();
  return Boolean(expectedValue && value && valuesMatch(value, expectedValue));
}
