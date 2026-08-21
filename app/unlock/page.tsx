import { Suspense } from 'react';
import { sanitizeRedirectPath } from '@/lib/sanitize-redirect-path';
import { UnlockScreen } from './unlock-screen';

type UnlockPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UnlockPage({ searchParams }: UnlockPageProps) {
  const params = (await searchParams) ?? {};
  const redirectPath = sanitizeRedirectPath(params.next);

  return (
    <Suspense>
      <UnlockScreen redirectPath={redirectPath} />
    </Suspense>
  );
}
