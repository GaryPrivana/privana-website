import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const homepage = readFileSync(new URL('../components/homepage.tsx', import.meta.url), 'utf8');
const cards = readFileSync(new URL('../components/club-overlapping-cards.tsx', import.meta.url), 'utf8');
const globals = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

const imageUrls = [
  'https://privana-website-images.s3.amazonaws.com/GRID_Sporting+and+Lifestyle+Clubs.png',
  'https://privana-website-images.s3.amazonaws.com/GRID_city+clubs.png',
  'https://privana-website-images.s3.amazonaws.com/GRID_arts+and+culture+clubs+V2.png',
  'https://privana-website-images.s3.amazonaws.com/GRID_beach+clubs+V2.png',
];

test('admin-time card copy uses the requested two-line copy', () => {
  assert.match(homepage, /Assisted member communications\./);
  assert.match(homepage, /<br \/>/);
  assert.match(homepage, /Automated workflows\./);
});

test('all four club card front text faces render with titles and supporting copy', () => {
  for (const [title, copy] of [
    ['Sporting & Lifestyle Clubs', 'Golf, racquet, wellness and multi-activity clubs.'],
    ['City Clubs', 'Private business, dining and members’ clubs.'],
    ['Arts & Culture Clubs', 'Creative, cultural and membership-led institutions.'],
    ['Beach & Leisure Clubs', 'Coastal, leisure and resort-style private clubs.'],
  ]) {
    assert.match(homepage, new RegExp(title.replace('&', '&')));
    assert.match(homepage, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(cards, /club-card-front/);
  assert.match(cards, /club-card-title/);
  assert.match(cards, /club-card-copy/);
});

test('four image back faces render with the exact current image URLs', () => {
  for (const url of imageUrls) assert.match(homepage, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(cards, /club-card-back/);
  assert.match(cards, /className=\{`object-cover \$\{visuals\.position\}`\}/);
  assert.doesNotMatch(cards, /bg-gradient-to-t from-black|font-display|via-black/);
});

test('homepage keeps the required club section heading and removes the enclosing inner rounded panel', () => {
  assert.match(cards, /Tailored Exclusively for Your Club/);
  assert.match(homepage, /id="solutions"/);
  assert.match(homepage, /radial-gradient\(circle_at_15%_15%,rgba\(98,213,206,0\.18\),transparent_42%\)/);
  assert.doesNotMatch(cards, /rounded-\[34px\]|border border-white\/15|shadow-\[0_32px_80px|no duplicate inner radial/);
});

test('sticky, scroll-linked mechanics and 2x2 grid assumptions are absent from the club section', () => {
  assert.doesNotMatch(homepage, /ClubCubeCarousel|club-cube-carousel/);
  assert.doesNotMatch(cards, /ResizeObserver|activeIndex|aria-live|addEventListener\("scroll"|sticky|min-h-\[340vh\]|grid-cols-2/);
});

test('desktop overlapping editorial composition remains wide and does not recenter on interaction', () => {
  assert.match(cards, /club-overlap-composition/);
  assert.match(cards, /club-overlap-card/);
  assert.match(cards, /md:left-\[0%\].*md:-rotate-\[7deg\]/s);
  assert.match(cards, /md:left-\[21%\].*md:-rotate-\[1\.5deg\]/s);
  assert.match(cards, /md:left-\[42%\].*md:rotate-\[4\.5deg\]/s);
  assert.match(cards, /md:left-\[63%\].*md:-rotate-\[3deg\]/s);
  assert.match(globals, /max-width: 80rem/);
  assert.match(globals, /width: min\(42vw, 33\.25rem\)/);
  assert.doesNotMatch(globals, /left: 50%|translateX\(-50%\)/);
});

test('3D flip face classes and Safari-compatible backface visibility exist', () => {
  assert.match(cards, /club-card-inner/);
  assert.match(cards, /club-card-face club-card-front/);
  assert.match(cards, /club-card-face club-card-back/);
  assert.match(globals, /transform-style: preserve-3d;/);
  assert.match(globals, /-webkit-transform-style: preserve-3d;/);
  assert.match(globals, /backface-visibility: hidden;/);
  assert.match(globals, /-webkit-backface-visibility: hidden;/);
  assert.match(globals, /rotateY\(180deg\)/);
});

test('hover and keyboard focus raise z-index, lift, and flip in place', () => {
  assert.match(globals, /club-overlap-card:hover,[\s\S]*club-overlap-card:focus-visible,[\s\S]*club-overlap-card\.is-active,[\s\S]*z-index: 50;/);
  assert.match(cards, /const \[activeCard, setActiveCard\] = useState<string \| null>\(null\)/);
  assert.match(globals, /transform: translateY\(-6px\);/);
  assert.match(globals, /club-overlap-card:hover \.club-card-inner,[\s\S]*club-overlap-card:focus-visible \.club-card-inner,[\s\S]*transform: rotateY\(180deg\);/);
  assert.match(cards, /aria-label=\{`Show \$\{segment\.title\} image`\}/);
});

test('mobile removes overlap and rotation and supports tap-to-flip one card at a time', () => {
  assert.match(globals, /@media \(max-width: 767px\)[\s\S]*\.club-overlap-card \{[\s\S]*rotate: 0deg !important;[\s\S]*transform: none !important;[\s\S]*animation: none !important;/);
  assert.match(globals, /\.club-overlap-composition \{[\s\S]*display: grid;[\s\S]*gap: 1rem;/);
  assert.match(cards, /const \[flippedCard, setFlippedCard\] = useState<string \| null>\(null\)/);
  assert.match(cards, /current === segment\.title \? null : segment\.title/);
  assert.match(cards, /aria-pressed=\{isFlipped\}/);
  assert.match(cards, /is-flipped/);
});

test('floating animation is vertical-only and disabled for reduced-motion users', () => {
  assert.match(globals, /@keyframes club-card-float-up[\s\S]*translate: 0 -4px;/);
  assert.match(globals, /@keyframes club-card-float-down[\s\S]*translate: 0 4px;/);
  assert.match(globals, /club-card-float-slow[\s\S]*6\.8s/);
  assert.match(globals, /club-card-float-medium[\s\S]*7\.4s/);
  assert.match(globals, /club-card-float-late[\s\S]*5\.9s/);
  assert.match(globals, /club-card-float-long[\s\S]*7\.9s/);
  assert.match(globals, /animation-play-state: paused;/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none !important;/);
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
