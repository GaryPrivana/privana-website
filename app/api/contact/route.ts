import { NextResponse } from 'next/server';
import {
  ContactFieldName,
  contactFieldLabels,
  contactFieldOrder,
  hasContactErrors,
  sanitizeContactInput,
  validateContactInput
} from '@/lib/contact-form';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FALLBACK_TO_EMAIL = 'admin@privana.club';
const DEFAULT_FROM = 'Privana Website <noreply@your-verified-domain.com>';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseBody(body: unknown) {
  if (!body || typeof body !== 'object') {
    return { website: '', sanitized: sanitizeContactInput({}) };
  }

  const website =
    typeof (body as { website?: unknown }).website === 'string'
      ? (body as { website: string }).website.trim()
      : '';

  const fields = contactFieldOrder.reduce((acc, fieldName) => {
    acc[fieldName] = (body as Record<ContactFieldName, unknown>)[fieldName];
    return acc;
  }, {} as Record<ContactFieldName, unknown>);

  return { website, sanitized: sanitizeContactInput(fields) };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO?.trim() || FALLBACK_TO_EMAIL;
  const from = process.env.CONTACT_FORM_FROM?.trim() || DEFAULT_FROM;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Contact form is not configured yet. Please try again shortly.' },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const { website, sanitized } = parseBody(body);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const validationErrors = validateContactInput(sanitized);
  if (hasContactErrors(validationErrors)) {
    return NextResponse.json(
      { error: 'Please complete every required field.', fieldErrors: validationErrors },
      { status: 400 }
    );
  }

  const emailHtml = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111827;line-height:1.6;">
      <h2 style="margin:0 0 12px;">New Privana walkthrough request</h2>
      <p style="margin:0 0 16px;">A new request was submitted from the website contact form.</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;">
        ${contactFieldOrder
          .map(
            (fieldName) => `
          <tr>
            <td style="border:1px solid #e5e7eb;padding:8px 10px;font-weight:600;width:180px;vertical-align:top;">${contactFieldLabels[fieldName]}</td>
            <td style="border:1px solid #e5e7eb;padding:8px 10px;white-space:pre-wrap;">${escapeHtml(sanitized[fieldName])}</td>
          </tr>
        `
          )
          .join('')}
      </table>
    </div>
  `;

  const emailText = contactFieldOrder
    .map((fieldName) => `${contactFieldLabels[fieldName]}: ${sanitized[fieldName]}`)
    .join('\n');

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'Privana Website: Private Walkthrough Request',
      reply_to: sanitized.email,
      html: emailHtml,
      text: emailText
    })
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again shortly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
