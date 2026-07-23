import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const homepage = readFileSync(new URL('../components/homepage.tsx', import.meta.url), 'utf8');
const cards = readFileSync(new URL('../components/club-overlapping-cards.tsx', import.meta.url), 'utf8');
const globals = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

test('admin-time card copy uses the requested two-line copy', () => {
  assert.match(homepage, /Assisted member communications\./);
  assert.match(homepage, /<br \/>/);
  assert.match(homepage, /Automated workflows\./);
});

test('all four club category cards render with titles and supporting copy', () => {
  for (const [title, copy] of [
    ['Sporting & Lifestyle Clubs', 'Golf, racquet, wellness and multi-activity clubs.'],
    ['City Clubs', 'Private business, dining and members’ clubs.'],
    ['Arts & Culture Clubs', 'Creative, cultural and membership-led institutions.'],
    ['Beach & Leisure Clubs', 'Coastal, leisure and resort-style private clubs.'],
  ]) {
    assert.match(homepage, new RegExp(title.replace('&', '&')));
    assert.match(homepage, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(cards, /segments\.map\(\(segment, index\) =>/);
  assert.match(cards, /<article\s+key=\{segment\.title\}/);
});

test('homepage keeps the required club section heading and dark radial background language', () => {
  assert.match(cards, /Tailored Exclusively for Your Club/);
  assert.match(homepage, /id="solutions"/);
  assert.match(homepage, /radial-gradient\(circle_at_15%_15%,rgba\(98,213,206,0\.18\),transparent_42%\)/);
  assert.match(cards, /radial-gradient\(circle_at_15%_15%,rgba\(98,213,206,0\.2\),transparent_45%\)/);
});

test('cube implementation and sticky scroll mechanics are removed from the club section', () => {
  assert.doesNotMatch(homepage, /ClubCubeCarousel|club-cube-carousel/);
  assert.doesNotMatch(cards, /Cube|cube|ResizeObserver|activeIndex|aria-live|tabIndex|addEventListener\("scroll"|sticky|min-h-\[340vh\]/);
  assert.doesNotMatch(globals, /club-cube|perspective|preserve-3d|backface-visibility|rotateY|transform-style/);
});

test('desktop overlapping-card composition classes exist without interactive card semantics', () => {
  assert.match(cards, /club-overlap-composition/);
  assert.match(cards, /club-overlap-card/);
  assert.match(cards, /md:left-\[2%\].*md:-rotate-\[5deg\]/s);
  assert.match(cards, /md:left-\[25%\].*md:-rotate-\[1deg\]/s);
  assert.match(cards, /md:left-\[49%\].*md:rotate-\[3deg\]/s);
  assert.match(cards, /md:left-\[72%\].*md:-rotate-\[3deg\]/s);
  assert.doesNotMatch(cards, /<button\b|role="button"|onClick|group-hover|hover:/);
});

test('floating animation is vertical-only and disabled for reduced-motion users', () => {
  assert.match(globals, /@keyframes club-card-float-up[\s\S]*translate: 0 -8px;/);
  assert.match(globals, /@keyframes club-card-float-down[\s\S]*translate: 0 8px;/);
  assert.match(globals, /club-card-float-slow[\s\S]*6\.8s/);
  assert.match(globals, /club-card-float-medium[\s\S]*7\.4s/);
  assert.match(globals, /club-card-float-late[\s\S]*5\.9s/);
  assert.match(globals, /club-card-float-long[\s\S]*7\.9s/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none !important;/);
  assert.doesNotMatch(globals, /scale\(|rotate\(/);
});

test('mobile fallback removes overlap and rotation while preserving readable cards', () => {
  assert.match(globals, /@media \(max-width: 767px\)[\s\S]*\.club-overlap-card \{[\s\S]*rotate: 0deg !important;[\s\S]*transform: none !important;[\s\S]*animation: none !important;/);
  assert.match(globals, /\.club-overlap-composition \{[\s\S]*display: grid;[\s\S]*gap: 1rem;/);
  assert.match(cards, /className="object-cover"/);
  assert.match(cards, /bg-gradient-to-t from-black\/88 via-black\/28 to-transparent/);
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
