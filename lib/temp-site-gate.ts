// TEMPORARY PRE-LAUNCH SITE GATE
// Remove this file + middleware/unlock route/page when marketing site goes live.

export const SITE_UNLOCK_COOKIE_NAME = 'privana_site_unlocked';

// TEMPORARY: hardcoded unlock code requested for pre-launch protection.
export const SITE_UNLOCK_CODE = '794613';

// TEMPORARY: static cookie token checked by middleware.
const SITE_UNLOCK_COOKIE_VALUE = 'granted_v1';

export const getUnlockCookieValue = () => SITE_UNLOCK_COOKIE_VALUE;

export const isValidUnlockCookie = (value?: string) => {
  return value === SITE_UNLOCK_COOKIE_VALUE;
};
