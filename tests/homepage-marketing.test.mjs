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

const categories = [
  ['Sporting & Lifestyle Clubs', 'Golf, racquet, wellness and multi-activity clubs.'],
  ['City Clubs', 'Private business, dining and members’ clubs.'],
  ['Arts & Culture Clubs', 'Creative, cultural and membership-led institutions.'],
  ['Beach & Leisure Clubs', 'Coastal, leisure and resort-style private clubs.'],
];

test('admin-time card copy uses the requested two-line copy', () => {
  assert.match(homepage, /Assisted member communications\./);
  assert.match(homepage, /<br \/>/);
  assert.match(homepage, /Automated workflows\./);
});

test('four category cards render with complete visible titles and descriptions', () => {
  assert.match(cards, /segments\.map/);
  assert.match(cards, /club-expanding-card/);
  assert.match(cards, /club-card-content/);
  assert.match(cards, /club-card-title">\{segment\.title\}/);
  assert.match(cards, /club-card-copy">\{segment\.supportingCopy\}/);
  for (const [title, copy] of categories) {
    assert.match(homepage, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(homepage, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.doesNotMatch(globals, /text-overflow:\s*ellipsis|line-clamp|overflow:\s*hidden[\s\S]{0,80}\.club-card-title/);
});

test('image reveal keeps exact current URLs and uses opacity instead of a flip', () => {
  for (const url of imageUrls) assert.match(homepage, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(cards, /club-card-image-layer/);
  assert.match(cards, /club-card-readability-gradient/);
  assert.match(cards, /is-image-active/);
  assert.match(globals, /\.club-card-image-layer \{[\s\S]*opacity: 0;[\s\S]*transition: opacity 560ms/);
  assert.match(globals, /\.club-expanding-card\.is-image-active \.club-card-image-layer,[\s\S]*opacity: 1;/);
  assert.doesNotMatch(cards + globals, /club-card-back|club-card-face|rotateY|preserve-3d|backface-visibility|--club-flip-half-delay/);
});

test('homepage keeps the required club section heading and existing section background', () => {
  assert.match(cards, /Tailored Exclusively for Your Club/);
  assert.match(homepage, /id="solutions"/);
  assert.match(homepage, /radial-gradient\(circle_at_15%_15%,rgba\(98,213,206,0\.18\),transparent_42%\)/);
  assert.doesNotMatch(cards, /rounded-\[34px\]|border border-white\/15|shadow-\[0_32px_80px/);
});

test('old overlap and flip mechanics are absent', () => {
  assert.doesNotMatch(homepage, /ClubCubeCarousel|club-cube-carousel/);
  assert.doesNotMatch(cards, /ResizeObserver|activeIndex|aria-live|addEventListener\("scroll"|sticky|min-h-\[340vh\]|grid-cols-2/);
  assert.doesNotMatch(cards + globals, /club-overlap-composition|club-overlap-card|md:left-\[|lg:left-\[|-rotate-\[|rotate-\[|z-index:\s*50|is-flipped|flippedCard|club-card-float|@keyframes club-card-float/);
});

test('desktop uses a bounded flex expanding row with readable inactive cards', () => {
  assert.match(globals, /@media \(min-width: 1024px\)[\s\S]*\.club-expanding-composition \{[\s\S]*display: flex;[\s\S]*width: min\(88vw, 86rem\);/);
  assert.match(globals, /\.club-expanding-card \{[\s\S]*flex: 1 1 25%;/);
  assert.match(globals, /\.club-expanding-composition:has\(\.club-expanding-card\.is-expanded\) \.club-expanding-card \{[\s\S]*flex-basis: 21%;/);
  assert.match(globals, /\.club-expanding-composition:has\(\.club-expanding-card\.is-expanded\) \.club-expanding-card\.is-expanded \{[\s\S]*flex-basis: 37%;/);
  assert.match(globals, /\.club-card-title \{[\s\S]*text-wrap: balance;[\s\S]*font-size: clamp/);
  assert.match(globals, /\.club-card-copy \{[\s\S]*font-size: clamp/);
});

test('hover and keyboard focus share the same expanded state and accessible control handling', () => {
  assert.match(cards, /const \[activeCard, setActiveCard\] = useState<string \| null>\(null\)/);
  assert.match(cards, /onPointerEnter=\{\(\) => setActiveCard\(segment\.title\)\}/);
  assert.match(cards, /onFocus=\{\(\) => setActiveCard\(segment\.title\)\}/);
  assert.match(cards, /isActive \? "is-expanded"/);
  assert.match(cards, /aria-pressed=\{isRevealed\}/);
  assert.match(globals, /\.club-expanding-card:focus-visible \{[\s\S]*outline:/);
});

test('tablet and mobile use non-overlapping flow layouts with one tap-active image', () => {
  assert.match(globals, /@media \(min-width: 768px\) and \(max-width: 1023px\)[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(globals, /@media \(max-width: 767px\)[\s\S]*grid-template-columns: 1fr;/);
  assert.match(cards, /const \[revealedCard, setRevealedCard\] = useState<string \| null>\(null\)/);
  assert.match(cards, /current === segment\.title \? null : segment\.title/);
  assert.doesNotMatch(globals, /position:\s*absolute[\s\S]{0,120}\.club-expanding-card/);
});

test('reduced-motion behaviour remains supported', () => {
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*transition-duration: 1ms !important;/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*flex-basis: 25%;/);
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
