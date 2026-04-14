'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  ContactFieldName,
  contactFieldLabels,
  contactFieldOrder,
  emptyContactFormInput,
  hasContactErrors,
  sanitizeContactInput,
  validateContactInput
} from '@/lib/contact-form';

const SUCCESS_MESSAGE = 'Your message has been sent! Our team will contact you very soon.';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const inputBaseClass =
  'mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62d5ce] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a11]';

export function ContactFormSection() {
  const [formValues, setFormValues] = useState(emptyContactFormInput());
  const [errors, setErrors] = useState<Partial<Record<ContactFieldName, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isSending = status === 'sending';

  const canSubmit = useMemo(() => {
    const sanitized = sanitizeContactInput(formValues);
    const validationErrors = validateContactInput(sanitized);
    return !hasContactErrors(validationErrors);
  }, [formValues]);

  function handleFieldChange(field: ContactFieldName, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    let requestSucceeded = false;

    const formData = new FormData(form);
    const sanitizedData = sanitizeContactInput(
      Object.fromEntries(
        contactFieldOrder.map((fieldName) => [fieldName, formData.get(fieldName)])
      ) as Record<ContactFieldName, unknown>
    );

    const validationErrors = validateContactInput(sanitizedData);

    if (hasContactErrors(validationErrors)) {
      setErrors(validationErrors);
      setStatus('error');
      setStatusMessage('Please complete every field before sending your message.');
      return;
    }

    setErrors({});
    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...sanitizedData, website: formData.get('website') ?? '' })
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; fieldErrors?: Partial<Record<ContactFieldName, string>> }
        | null;

      if (!response.ok) {
        setErrors(payload?.fieldErrors ?? {});
        setStatus('error');
        setStatusMessage(payload?.error ?? 'Something went wrong. Please try again shortly.');
        return;
      }

      requestSucceeded = true;
      setStatus('success');
      setStatusMessage(SUCCESS_MESSAGE);
      setFormValues(emptyContactFormInput());
      form.reset();
    } catch {
      if (requestSucceeded) {
        return;
      }
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again shortly.');
    }
  }

  return (
    <section aria-labelledby="private-walkthrough" className="bg-black py-12 text-white sm:py-16">
      <div className="container-shell">
        <div className="grid gap-10 rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_12%_12%,rgba(98,213,206,0.13),transparent_48%),radial-gradient(circle_at_90%_5%,rgba(175,139,218,0.2),transparent_35%),linear-gradient(165deg,#0d0c14,#07070b)] p-7 shadow-[0_36px_84px_rgba(6,6,10,0.55)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="self-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#62d5ce]/90">Private Walkthrough</p>
            <h3
              id="private-walkthrough"
              className="mt-4 max-w-md text-balance font-display text-3xl font-medium leading-tight tracking-[-0.01em] sm:text-5xl"
            >
              Request a Private Walkthrough
            </h3>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Speak directly with our team about how Privana can elevate operations, hospitality,
              and member experience for your club.
            </p>
          </div>

          <form
            className="rounded-[28px] border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {contactFieldOrder.map((fieldName) => {
                const isMessageField = fieldName === 'message';
                const label = contactFieldLabels[fieldName];

                return (
                  <div key={fieldName} className={isMessageField ? 'sm:col-span-2' : ''}>
                    <label className="text-xs font-medium uppercase tracking-[0.13em] text-white/65" htmlFor={fieldName}>
                      {label}
                    </label>
                    {isMessageField ? (
                      <textarea
                        id={fieldName}
                        name={fieldName}
                        rows={5}
                        required
                        className={inputBaseClass}
                        value={formValues[fieldName]}
                        onChange={(event) => handleFieldChange(fieldName, event.target.value)}
                        aria-invalid={Boolean(errors[fieldName])}
                        aria-describedby={errors[fieldName] ? `${fieldName}-error` : undefined}
                      />
                    ) : (
                      <input
                        id={fieldName}
                        name={fieldName}
                        type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'}
                        autoComplete={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'on'}
                        required
                        className={inputBaseClass}
                        value={formValues[fieldName]}
                        onChange={(event) => handleFieldChange(fieldName, event.target.value)}
                        aria-invalid={Boolean(errors[fieldName])}
                        aria-describedby={errors[fieldName] ? `${fieldName}-error` : undefined}
                      />
                    )}
                    {errors[fieldName] ? (
                      <p id={`${fieldName}-error`} className="mt-2 text-xs text-[#f8a7c0]">
                        {errors[fieldName]}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {statusMessage ? (
              <p
                className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                  status === 'success'
                    ? 'border-[#62d5ce]/40 bg-[#62d5ce]/10 text-[#b8f3ef]'
                    : 'border-[#f8a7c0]/35 bg-[#f8a7c0]/10 text-[#ffd5e3]'
                }`}
                role={status === 'error' ? 'alert' : 'status'}
              >
                {statusMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSending || !canSubmit}
              className="mt-6 inline-flex min-w-[185px] items-center justify-center rounded-full border border-white/35 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a11]"
            >
              {isSending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
