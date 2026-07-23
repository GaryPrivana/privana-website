import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const homepage = readFileSync(
  new URL("../components/homepage.tsx", import.meta.url),
  "utf8",
);
const cards = readFileSync(
  new URL("../components/club-overlapping-cards.tsx", import.meta.url),
  "utf8",
);
const globals = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);

const imageUrls = [
  "https://privana-website-images.s3.amazonaws.com/GRID_Sporting+and+Lifestyle+Clubs.png",
  "https://privana-website-images.s3.amazonaws.com/GRID_city+clubs.png",
  "https://privana-website-images.s3.amazonaws.com/GRID_arts+and+culture+clubs+V2.png",
  "https://privana-website-images.s3.amazonaws.com/GRID_beach+clubs+V2.png",
];

const categories = [
  [
    "Sporting & Lifestyle Clubs",
    "Golf, racquet, wellness and multi-activity clubs.",
  ],
  ["City Clubs", "Private business, dining and members’ clubs."],
  [
    "Arts & Culture Clubs",
    "Creative, cultural and membership-led institutions.",
  ],
  ["Beach & Leisure Clubs", "Coastal, leisure and resort-style private clubs."],
];

test("admin-time card copy uses the requested two-line copy", () => {
  assert.match(homepage, /Assisted member communications\./);
  assert.match(homepage, /<br \/>/);
  assert.match(homepage, /Automated workflows\./);
});

test("four category cards render with complete visible titles and descriptions", () => {
  assert.match(cards, /segments\.map/);
  assert.match(cards, /club-expanding-card/);
  assert.match(cards, /club-card-content/);
  assert.match(cards, /club-card-title">\{segment\.title\}/);
  assert.match(cards, /club-card-copy">[\s\S]*\{segment\.supportingCopy\}/);
  for (const [title, copy] of categories) {
    assert.match(
      homepage,
      new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
    assert.match(
      homepage,
      new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
  assert.doesNotMatch(
    globals,
    /text-overflow:\s*ellipsis|line-clamp|overflow:\s*hidden[\s\S]{0,80}\.club-card-title/,
  );
});

test("image reveal keeps exact current URLs and uses opacity instead of a flip", () => {
  for (const url of imageUrls)
    assert.match(
      homepage,
      new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  assert.match(cards, /club-card-image-layer/);
  assert.match(cards, /club-card-readability-gradient/);
  assert.match(cards, /is-image-active/);
  assert.match(
    globals,
    /\.club-card-image-layer \{[\s\S]*opacity: 0;[\s\S]*transition: opacity 560ms/,
  );
  assert.match(
    globals,
    /\.club-expanding-card\.is-image-active \.club-card-image-layer,[\s\S]*opacity: 1;/,
  );
  assert.doesNotMatch(
    cards,
    /club-card-back|club-card-face|rotateY|preserve-3d|backface-visibility|--club-flip-half-delay/,
  );
});

test("homepage keeps the required club section heading and existing section background", () => {
  assert.match(cards, /Tailored Exclusively for Your Club/);
  assert.match(homepage, /id="solutions"/);
  assert.match(
    homepage,
    /radial-gradient\(circle_at_15%_15%,rgba\(98,213,206,0\.18\),transparent_42%\)/,
  );
  assert.doesNotMatch(
    cards,
    /rounded-\[34px\]|border border-white\/15|shadow-\[0_32px_80px/,
  );
});

test("old overlap and flip mechanics are absent", () => {
  assert.doesNotMatch(homepage, /ClubCubeCarousel|club-cube-carousel/);
  assert.doesNotMatch(
    cards,
    /ResizeObserver|activeIndex|aria-live|addEventListener\("scroll"|sticky|min-h-\[340vh\]|grid-cols-2/,
  );
  assert.doesNotMatch(
    cards + globals,
    /club-overlap-composition|club-overlap-card|md:left-\[|lg:left-\[|-rotate-\[|rotate-\[|z-index:\s*50|is-flipped|flippedCard|club-card-float|@keyframes club-card-float/,
  );
});

test("desktop uses a bounded flex expanding row with readable inactive cards", () => {
  assert.match(
    globals,
    /@media \(min-width: 1024px\)[\s\S]*\.club-expanding-composition \{[\s\S]*display: flex;[\s\S]*width: 100%;/,
  );
  assert.match(globals, /\.club-expanding-card \{[\s\S]*flex: 1 1 25%;/);
  assert.match(
    globals,
    /\.club-expanding-composition:has\(\.club-expanding-card\.is-expanded\)[\s\S]*\.club-expanding-card \{[\s\S]*flex-basis: 21%;/,
  );
  assert.match(
    globals,
    /\.club-expanding-composition:has\(\.club-expanding-card\.is-expanded\)[\s\S]*\.club-expanding-card\.is-expanded \{[\s\S]*flex-basis: 37%;/,
  );
  assert.match(
    globals,
    /\.club-card-title \{[\s\S]*text-wrap: balance;[\s\S]*font-size: clamp/,
  );
  assert.match(globals, /\.club-card-copy \{[\s\S]*font-size: clamp/);
});

test("club cards are centred and use meaningful decorative semantic icons", () => {
  assert.match(cards, /className="mx-auto w-\[min\(88vw,86rem\)\] max-w-full"/);
  assert.match(
    globals,
    /\.club-expanding-composition \{[\s\S]*width: 100%;[\s\S]*max-width: min\(88vw, 86rem\);[\s\S]*margin-inline: auto;/,
  );
  assert.doesNotMatch(
    cards,
    /left:\s*-|margin-left:\s*-|translateX|translate-x|translate3d|transform:\s*translateX/,
  );

  for (const icon of [
    "SportingLifestyleClubIcon",
    "CityClubIcon",
    "ArtsCultureClubIcon",
    "BeachLeisureClubIcon",
  ]) {
    assert.match(cards, new RegExp(icon));
  }
  assert.match(
    cards,
    /<Icon className="club-card-mark" aria-hidden="true" \/>/,
  );
  assert.doesNotMatch(
    cards,
    /visuals\.mark|<path d=\{visuals\.mark\}|viewBox="0 0 112 112"/,
  );
  assert.match(
    globals,
    /\.club-card-mark \{[\s\S]*width: clamp\(2\.7rem, 3\.75vw, 3\.9rem\);[\s\S]*height: clamp\(2\.7rem, 3\.75vw, 3\.9rem\);[\s\S]*opacity: 0\.32;/,
  );
  assert.match(
    globals,
    /\.club-card-content \{[\s\S]*justify-content: space-between;[\s\S]*gap: clamp\(2rem, 5vw, 4\.25rem\);/,
  );
  assert.match(
    globals,
    /\.club-card-text \{[\s\S]*margin-top: auto;[\s\S]*gap: clamp\(1\.05rem, 1\.2vw, 1\.35rem\);/,
  );
});

test("hover and keyboard focus share the same expanded state and accessible control handling", () => {
  assert.match(
    cards,
    /const \[activeCard, setActiveCard\] = useState<string \| null>\(null\)/,
  );
  assert.match(
    cards,
    /onPointerEnter=\{\(\) => setActiveCard\(segment\.title\)\}/,
  );
  assert.match(cards, /onFocus=\{\(\) => setActiveCard\(segment\.title\)\}/);
  assert.match(cards, /isActive \? "is-expanded"/);
  assert.match(cards, /aria-pressed=\{isRevealed\}/);
  assert.match(
    globals,
    /\.club-expanding-card:focus-visible \{[\s\S]*outline:/,
  );
});

test("tablet and mobile use non-overlapping flow layouts with one tap-active image", () => {
  assert.match(
    globals,
    /@media \(min-width: 768px\) and \(max-width: 1023px\)[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/,
  );
  assert.match(
    globals,
    /@media \(max-width: 767px\)[\s\S]*grid-template-columns: 1fr;/,
  );
  assert.match(
    cards,
    /const \[revealedCard, setRevealedCard\] = useState<string \| null>\(null\)/,
  );
  assert.match(cards, /current === segment\.title \? null : segment\.title/);
  assert.doesNotMatch(
    globals,
    /position:\s*absolute[\s\S]{0,120}\.club-expanding-card/,
  );
});

test("reduced-motion behaviour remains supported", () => {
  assert.match(
    globals,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*transition-duration: 1ms !important;/,
  );
  assert.match(
    globals,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*flex-basis: 25%;/,
  );
});

test("comparison section keeps the approved content and premium paired rows", () => {
  assert.match(homepage, /Built for the Next Generation/);
  assert.match(homepage, /of Club Operations\./);
  assert.match(
    homepage,
    /Replace disconnected systems and repetitive administration/,
  );
  assert.match(homepage, /Fragmented tools and disconnected teams/);
  assert.match(homepage, /One connected platform across every department/);
  assert.match(homepage, /Before/);
  assert.match(homepage, /Privana/);
});

test("premium feature showcase is inserted immediately after the AI-powered intro", () => {
  const intro = homepage.indexOf('id="about"');
  const showcase = homepage.indexOf("<PrivanaFeatureShowcase demoLink={demoLink} />");
  const heroShowcase = homepage.indexOf('id="hero-showcase"');
  assert.ok(intro >= 0);
  assert.ok(showcase > intro);
  assert.ok(heroShowcase > showcase);
  assert.match(homepage, /PrivanaFeatureShowcase demoLink=\{demoLink\}/);
});

const featureShowcase = readFileSync(
  new URL("../components/privana-feature-showcase.tsx", import.meta.url),
  "utf8",
);

test("premium feature showcase keeps eight accessible chapters and demo CTA", () => {
  for (const copy of [
    "One platform. Every part of your club.",
    "Know every member.",
    "Every experience, beautifully managed.",
    "Built for the way clubs play.",
    "Run the entire operation.",
    "One financial truth.",
    "Your club can listen, respond and react.",
    "Your club already knows the answer.",
    "BOOK A DEMO",
  ]) {
    assert.match(featureShowcase, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(featureShowcase, /aria-labelledby="connected-platform-heading"/);
  assert.match(featureShowcase, /prefers-reduced-motion: reduce/);
  assert.match(featureShowcase, /ScrollTrigger/);
  assert.doesNotMatch(featureShowcase, /removeEventListener\("scroll"/);
  assert.match(featureShowcase, /href=\{demoLink\}/);
});


test("feature showcase emits final unit-bearing CSS values without CSS var multiplication", () => {
  assert.match(featureShowcase, /"--object-rotate-x": deg\(mix\("rx"\)\)/);
  assert.match(featureShowcase, /"--panel-one-x": px\(mix\("p1x"\)\)/);
  assert.match(featureShowcase, /"--ambient-x": `\$\{mix\("ambientX"\)\.toFixed\(2\)\}%`/);
  assert.match(featureShowcase, /const CHAPTER_REST_PORTION = 0\.42/);
  assert.match(featureShowcase, /const chapterFloat = progress \* total/);
  assert.match(featureShowcase, /const activeIndex = Math\.min\(total - 1, Math\.max\(0, Math\.floor\(chapterFloat\)\)\)/);
  assert.match(featureShowcase, /const localProgress = activeIndex >= total - 1 \? 0 : clamp01/);
  assert.match(featureShowcase, /const easedProgress = ease\(localProgress\)/);
  assert.doesNotMatch(globals, /calc\([^)]*var\([^)]*\)[^)]*\*/);
});

test("feature showcase desktop uses ScrollTrigger pinning instead of sticky scroll math", () => {
  assert.match(globals, /\.privana-feature-showcase \{[\s\S]*min-height: auto;[\s\S]*overflow: visible;/);
  assert.match(globals, /\.privana-feature-pin \{[\s\S]*position: relative;[\s\S]*height: 100svh;[\s\S]*min-height: 0;[\s\S]*box-sizing: border-box;[\s\S]*overflow: hidden;/);
  assert.doesNotMatch(globals, /min-height: 900svh/);
  assert.doesNotMatch(globals, /\.privana-feature-pin \{[\s\S]*position: sticky/);
  assert.match(featureShowcase, /gsap\.registerPlugin\(ScrollTrigger\)/);
  assert.match(featureShowcase, /ScrollTrigger\.create\(\{[\s\S]*pin,[\s\S]*scrub: true,[\s\S]*onUpdate: \(self\) => \{[\s\S]*applyShowcaseProgress\(self\.progress\)/);
  assert.doesNotMatch(featureShowcase, /getBoundingClientRect\(/);
  assert.doesNotMatch(featureShowcase, /offsetHeight - window\.innerHeight/);
  assert.match(featureShowcase, /trigger\.kill\(\)/);
  assert.match(featureShowcase, /mm\.revert\(\)/);
  assert.match(featureShowcase, /context\.revert\(\)/);
  assert.match(featureShowcase, /\(min-width: 901px\) and \(prefers-reduced-motion: no-preference\)/);
  assert.match(featureShowcase, /if \(!section \|\| !pin \|\| reducedMotion\) return/);
});

test("feature showcase updates continuous progress outside React state", () => {
  assert.match(featureShowcase, /const activeIndexRef = useRef\(0\)/);
  assert.match(featureShowcase, /section\.style\.setProperty\(property, value\)/);
  assert.doesNotMatch(featureShowcase, /setProgress/);
  assert.match(featureShowcase, /setActiveIndex\(values\.activeIndex\)/);
});

test("feature showcase final CTA is scoped to the final chapter and reuses demoLink", () => {
  assert.match(featureShowcase, /const isFinal = index === showcaseChapters\.length - 1/);
  assert.match(featureShowcase, /<FinalCta demoLink=\{demoLink\}/);
  assert.match(featureShowcase, /<Link href=\{demoLink\}/);
});
