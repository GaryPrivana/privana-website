import { Suspense } from 'react';
import { UnlockScreen } from './unlock-screen';

type UnlockPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function sanitizeRedirectPath(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (!candidate || !candidate.startsWith('/')) {
    return '/';
  }

  return candidate;
}

export default async function UnlockPage({ searchParams }: UnlockPageProps) {
  const params = (await searchParams) ?? {};
  const redirectPath = sanitizeRedirectPath(params.next);

  return (
    <Suspense>
      <UnlockScreen redirectPath={redirectPath} />
    </Suspense>
  );
}
