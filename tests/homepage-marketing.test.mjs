import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const homepage = readFileSync(new URL('../components/homepage.tsx', import.meta.url), 'utf8');
const carousel = readFileSync(new URL('../components/club-cube-carousel.tsx', import.meta.url), 'utf8');
const globals = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

test('admin-time card copy uses the requested two-line copy', () => {
  assert.match(homepage, /Assisted member communications\./);
  assert.match(homepage, /<br \/>/);
  assert.match(homepage, /Automated workflows\./);
});

test('all four club category titles render from the homepage data', () => {
  for (const title of [
    'Sporting & Lifestyle Clubs',
    'City Clubs',
    'Arts & Culture Clubs',
    'Beach & Leisure Clubs',
  ]) {
    assert.match(homepage, new RegExp(title.replace('&', '&')));
  }
});

test('desktop cube faces use non-button articles with active-only focusability', () => {
  assert.doesNotMatch(carousel, /<button\b/);
  assert.match(carousel, /<article\s+key=\{segment\.title\}/);
  assert.match(carousel, /tabIndex=\{activeIndex === index \? 0 : -1\}/);
  assert.match(carousel, /aria-hidden=\{activeIndex !== index\}/);
  assert.match(globals, /\.club-cube-face\[aria-hidden="true"\]\s*\{\s*pointer-events: none;/s);
});

test('reduced-motion and mobile fallbacks remain accessible before JavaScript updates', () => {
  assert.match(carousel, /className="club-cube-stage mx-auto hidden md:block"/);
  assert.match(carousel, /className="club-cube-fallback grid gap-5 md:hidden"/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(globals, /\.club-cube-stage\s*\{\s*display: none !important;/s);
  assert.match(globals, /\.club-cube-fallback\s*\{\s*display: grid !important;/s);
});

test('carousel avoids global synthetic resize events and uses a scoped observer', () => {
  assert.doesNotMatch(carousel, /dispatchEvent\(new Event\("resize"\)\)/);
  assert.match(carousel, /new ResizeObserver\(requestUpdate\)/);
  assert.match(carousel, /resizeObserver\?\.disconnect\(\)/);
});

test('active face progress is clamped, reversible, and avoids duplicate state updates', () => {
  assert.match(carousel, /Math\.min\(Math\.max\(rawProgress, 0\), 1\)/);
  assert.match(carousel, /const rotation = progress \* -270/);
  assert.match(carousel, /Math\.round\(progress \* \(segments\.length - 1\)\)/);
  assert.match(carousel, /if \(activeIndexRef\.current !== nextIndex\)/);
});

test('comparison section keeps the approved content and premium paired rows', () => {
  assert.match(homepage, /Built for the Next Generation/);
  assert.match(homepage, /of Club Operations\./);
  assert.match(homepage, /Replace disconnected systems and repetitive administration/);
  assert.match(homepage, /Fragmented tools and disconnected teams/);
  assert.match(homepage, /One connected platform across every department/);
  assert.match(homepage, /Before/);
  assert.match(homepage, /Privana/);
});

test('Safari 3D hardening stays scoped to the cube carousel', () => {
  assert.match(globals, /\.club-cube\s*\{[^}]*-webkit-transform-style: preserve-3d;/s);
  assert.match(globals, /\.club-cube-face\s*\{[^}]*-webkit-backface-visibility: hidden;/s);
});
