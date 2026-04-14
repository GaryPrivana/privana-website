# Privana Marketing Website

Production-ready Next.js marketing site for **Privana**, designed as a premium, responsive, single-page homepage.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Semantic HTML and accessible component structure
- Optimized for deployment on Vercel

## Project Structure

```text
app/
  layout.tsx           # Global metadata/SEO and root layout
  page.tsx             # Homepage entry
  globals.css          # Global styles + utilities
components/
  homepage.tsx         # Main homepage sections
  site-data.ts         # Copy/image/module content arrays
  icons.tsx            # Reusable SVG icons
public/assets/clubs/   # Replaceable club segment imagery
```

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Git Integration

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import project in Vercel dashboard.
3. Accept defaults (Framework Preset: Next.js).
4. Deploy.

## Swapping Images and Copy

- Replace club segment image files in `public/assets/clubs/` and keep filenames, or update paths in `components/site-data.ts`.
- Update headlines, descriptions, nav labels, chips, and footer links in `components/homepage.tsx`.
- Update metadata and SEO copy in `app/layout.tsx`.


## Contact Form (Resend)

The homepage includes a premium contact form section that submits to `POST /api/contact` and sends emails via Resend.

Set these environment variables in Vercel (Project Settings → Environment Variables):

- `RESEND_API_KEY` (required)
- `CONTACT_FORM_TO` (optional, defaults to `admin@privana.club`)
- `CONTACT_FORM_FROM` (optional, defaults to `Privana Website <noreply@your-verified-domain.com>`)

Before going live, verify your sender domain/email in Resend and set `CONTACT_FORM_FROM` to that verified identity.

## Notes

- Primary navigation and CTAs are wired to section anchors plus a demo booking placeholder URL for quick replacement.
- No backend or CMS dependency yet; content is code-based for speed and deployment simplicity.


## Quick Content Wiring

- In-page nav targets are configured in `components/site-data.ts` (`navItems`) and section IDs in `components/homepage.tsx`.
- Demo CTA currently points to `https://example.com/book-demo` and can be replaced in one place via `demoLink` / CTA hrefs in `components/homepage.tsx`.
- Social links are real anchors with aria labels and currently use placeholder brand URLs that should be swapped before launch.
- OG sharing graphic placeholder is `public/og-image.svg` and metadata references are in `app/layout.tsx`.
