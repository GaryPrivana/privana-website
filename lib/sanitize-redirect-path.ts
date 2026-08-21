export function sanitizeRedirectPath(value: string | string[] | null | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (
    !candidate ||
    !candidate.startsWith('/') ||
    candidate.startsWith('//') ||
    candidate.startsWith('/\\')
  ) {
    return '/';
  }

  return candidate;
}
