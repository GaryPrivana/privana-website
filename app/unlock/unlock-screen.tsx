'use client';

import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PrivanaLogo } from '../../components/privana-logo';

const CODE_LENGTH = 6;

type UnlockScreenProps = {
  redirectPath: string;
};

export function UnlockScreen({ redirectPath }: UnlockScreenProps) {
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(Array.from({ length: CODE_LENGTH }, () => ''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const code = useMemo(() => digits.join(''), [digits]);

  const focusInput = (index: number) => {
    const target = inputRefs.current[index];
    if (!target) return;

    target.focus();
    target.select();
  };

  const updateDigit = (index: number, value: string) => {
    const numeric = value.replace(/\D/g, '');
    const nextDigits = [...digits];

    if (!numeric) {
      nextDigits[index] = '';
      setDigits(nextDigits);
      setError('');
      return;
    }

    nextDigits[index] = numeric[0];
    setDigits(nextDigits);
    setError('');

    if (index < CODE_LENGTH - 1) {
      focusInput(index + 1);
      return;
    }

    if (nextDigits.every(Boolean)) {
      void submitCode(nextDigits.join(''));
    }
  };

  const clearFrom = (index: number) => {
    const nextDigits = [...digits];
    nextDigits[index] = '';
    setDigits(nextDigits);
    setError('');
  };

  const submitCode = async (value: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: value })
      });

      if (!response.ok) {
        setError('Invalid code. Access denied.');
        setDigits(Array.from({ length: CODE_LENGTH }, () => ''));
        focusInput(0);
        return;
      }

      router.replace(redirectPath);
      router.refresh();
    } catch {
      setError('Unable to validate code. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length !== CODE_LENGTH) {
      setError('Enter all 6 digits.');
      return;
    }

    await submitCode(code);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      clearFrom(index - 1);
      focusInput(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const onPaste = (pasteValue: string) => {
    const parsed = pasteValue.replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!parsed) return;

    const nextDigits = Array.from({ length: CODE_LENGTH }, (_, idx) => parsed[idx] ?? '');
    setDigits(nextDigits);
    setError('');

    if (parsed.length === CODE_LENGTH) {
      void submitCode(parsed);
      return;
    }

    focusInput(parsed.length);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03070d] px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(32,110,180,0.12),transparent_45%),radial-gradient(circle_at_18%_20%,rgba(67,159,205,0.08),transparent_32%)]"
      />

      <section className="relative z-10 w-full max-w-3xl text-center">
        <div className="mx-auto mb-14 h-[clamp(12rem,20vw,20rem)] w-full max-w-[1900px]">
          <PrivanaLogo
            variant="white"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1900px"
            scale={2.4}
          />
        </div>

        <h1 className="mx-auto mb-11 max-w-[22ch] text-balance text-3xl font-semibold text-white sm:text-5xl">
          Enter website access code
        </h1>

        <form onSubmit={onSubmit} className="space-y-7" noValidate>
          <div className="flex justify-center gap-2.5 sm:gap-4">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputRefs.current[index] = node;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                autoFocus={index === 0}
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                disabled={isSubmitting}
                aria-label={`Code digit ${index + 1}`}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => onKeyDown(event, index)}
                onPaste={(event) => {
                  event.preventDefault();
                  onPaste(event.clipboardData.getData('text'));
                }}
                className="h-16 w-12 rounded-2xl border border-white/10 bg-white/[0.03] text-center text-2xl font-medium text-white outline-none transition-all duration-200 placeholder:text-white/30 focus:border-cyan-300/80 focus:bg-[#10141c] focus:shadow-[0_0_0_1px_rgba(128,220,255,0.7),0_0_26px_rgba(25,124,196,0.24)] sm:h-20 sm:w-[5.25rem]"
              />
            ))}
          </div>

          <div className="space-y-3">
            {error ? (
              <p className="text-xs tracking-wide text-red-300" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-xs uppercase tracking-[0.22em] text-[#b8d8ef]/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03070d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Verifying…' : 'Unlock'}
          </button>
        </form>
      </section>
    </main>
  );
}
