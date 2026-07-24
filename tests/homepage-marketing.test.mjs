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


test("homepage intro has scroll reveal structure without changing final desktop layout classes", () => {
  assert.match(homepage, /id="about"/);
  assert.match(homepage, /className=\{`homepage-intro-reveal bg-\[#fbfafe\] \$\{heroFont\.className\}`\}/);
  assert.match(homepage, /className="homepage-intro-sticky section-pad"/);
  assert.match(homepage, /homepage-intro-layout container-shell grid items-center gap-12 lg:grid-cols-\[1\.3fr_1fr\] lg:gap-20/);
  assert.match(homepage, /homepage-intro-brand text-\[#af8bda\]">Privana/);
  assert.match(homepage, /homepage-intro-line-2">world leading, fully/);
  assert.match(homepage, /homepage-intro-line-3">[\s\S]*text-\[#5888d9\]">AI powered/);
  assert.match(homepage, /homepage-intro-copy max-w-xl justify-self-end text-pretty text-xl leading-relaxed text-\[#201a2d\]\/92/);
});

test("homepage intro desktop reveal is scroll-linked, sticky, bounded, and overflow safe", () => {
  assert.match(globals, /\.homepage-intro-reveal \{[\s\S]*overflow: clip;/);
  assert.match(globals, /@media \(min-width: 1024px\) and \(prefers-reduced-motion: no-preference\)[\s\S]*\.homepage-intro-reveal \{[\s\S]*min-height: 175svh;[\s\S]*view-timeline-name: --homepage-intro-reveal;/);
  assert.match(globals, /\.homepage-intro-sticky \{[\s\S]*position: sticky;[\s\S]*top: 0;[\s\S]*min-height: 100svh;[\s\S]*overflow: hidden;/);
  assert.match(globals, /animation-timeline: --homepage-intro-reveal;/);
  assert.match(globals, /container-type: inline-size;/);
  assert.match(globals, /@keyframes intro-brand-scroll-reveal[\s\S]*0% \{[\s\S]*opacity: 0;[\s\S]*translate3d\(min\(44cqw, 34rem\), 1\.15em, 0\) scale\(1\.16\)/);
  assert.match(globals, /@keyframes intro-brand-scroll-reveal[\s\S]*18% \{[\s\S]*translate3d\(min\(44cqw, 34rem\), 0, 0\) scale\(1\.16\)[\s\S]*38%,[\s\S]*translate3d\(0, 0, 0\) scale\(1\)/);
  assert.doesNotMatch(globals, /\.homepage-intro-reveal \{[\s\S]{0,160}overflow-x: visible/);
});

test("homepage intro reveals each headline fragment in strict ordered scroll ranges", () => {
  assert.match(globals, /\.homepage-intro-brand \{[\s\S]*animation: intro-brand-scroll-reveal linear both;[\s\S]*animation-range: entry 0% cover 100%;/);
  assert.match(globals, /\.homepage-intro-fragment \{[\s\S]*animation: intro-is-the-scroll-reveal linear both;[\s\S]*animation-range: entry 38% cover 45%;/);
  assert.match(globals, /\.homepage-intro-line-2 \{[\s\S]*animation: intro-line-2-scroll-reveal linear both;[\s\S]*animation-range: entry 45% cover 54%;/);
  assert.match(globals, /\.homepage-intro-line-3 \{[\s\S]*animation: intro-line-3-scroll-reveal linear both;[\s\S]*animation-range: entry 54% cover 63%;/);
  assert.match(globals, /\.homepage-intro-line-4 \{[\s\S]*animation: intro-line-4-scroll-reveal linear both;[\s\S]*animation-range: entry 63% cover 70%;/);
  assert.match(globals, /\.homepage-intro-line-5 \{[\s\S]*animation: intro-line-5-scroll-reveal linear both;[\s\S]*animation-range: entry 70% cover 77%;/);
  assert.match(globals, /\.homepage-intro-copy \{[\s\S]*animation: intro-copy-scroll-reveal linear both;[\s\S]*animation-range: entry 80% cover 90%;/);
  assert.match(globals, /\.homepage-intro-fragment,[\s\S]*\.homepage-intro-copy \{[\s\S]*opacity: 0;/);
  assert.doesNotMatch(globals, /intro-line-scroll-reveal/);
});

test("homepage intro reduced-motion and mobile variants avoid desktop pinning and horizontal motion", () => {
  assert.match(globals, /@media \(max-width: 1023px\) and \(prefers-reduced-motion: no-preference\)[\s\S]*intro-mobile-reveal/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.homepage-intro-sticky \{[\s\S]*position: static;[\s\S]*min-height: auto;/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.homepage-intro-line,[\s\S]*\.homepage-intro-copy \{[\s\S]*opacity: 1 !important;[\s\S]*transform: none !important;[\s\S]*animation: none !important;/);
  assert.doesNotMatch(globals, /@media \(max-width: 1023px\)[\s\S]*translate3d\(clamp/);
});

test("assist demo flows directly into the authority value cards", () => {
  const intro = homepage.indexOf('id="about"');
  const showcase = homepage.indexOf("<PrivanaFeatureShowcase />");
  const assist = homepage.indexOf("<PrivanaAssistInteractiveDemo />");
  const valueCards = homepage.indexOf('className="authority-value-transition-section"');
  assert.ok(intro >= 0);
  assert.ok(showcase > intro);
  assert.ok(assist > showcase);
  assert.ok(valueCards > assist);
  assert.equal(homepage.includes('id="hero-showcase"'), false);
  assert.equal(homepage.includes("Privana Command Dashboard"), false);
  assert.equal(homepage.includes("Live Operations Pulse"), false);
  assert.equal(homepage.includes("AI Concierge Queue"), false);
  assert.match(homepage, /PrivanaAssistInteractiveDemo/);
});

const featureShowcase = readFileSync(
  new URL("../components/privana-feature-showcase.tsx", import.meta.url),
  "utf8",
);
const assistDemo = readFileSync(
  new URL("../components/privana-assist-interactive-demo.tsx", import.meta.url),
  "utf8",
);
const assistData = readFileSync(
  new URL("../components/privana-assist-demo-data.ts", import.meta.url),
  "utf8",
);

test("premium feature showcase keeps eight accessible chapters and removes final demo CTA", () => {
  for (const copy of [
    "One platform. Every part of your club.",
    "Know every member.",
    "Every experience, beautifully managed.",
    "Built for the way clubs play.",
    "Run the entire operation.",
    "One financial truth.",
    "Your club can listen, respond and react.",
    "Your club already knows the answer.",
  ]) {
    assert.match(featureShowcase, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(featureShowcase, /aria-labelledby="connected-platform-heading"/);
  assert.match(featureShowcase, /prefers-reduced-motion: reduce/);
  assert.match(featureShowcase, /ScrollTrigger/);
  assert.doesNotMatch(featureShowcase, /removeEventListener\("scroll"/);
  assert.doesNotMatch(featureShowcase, /See Privana in action|BOOK A DEMO|FinalCta|href=\{demoLink\}/);
});


test("feature showcase emits final unit-bearing CSS values without CSS var multiplication", () => {
  assert.match(featureShowcase, /"--object-rotate-x": deg\(mix\("rx"\)\)/);
  assert.match(featureShowcase, /"--panel-one-x": px\(mix\("p1x"\)\)/);
  assert.match(featureShowcase, /"--ambient-x": `\$\{mix\("ambientX"\)\.toFixed\(2\)\}%`/);
  assert.match(featureShowcase, /const CHAPTER_REST_PORTION = 0\.42/);
  assert.match(featureShowcase, /const CHAPTER_PROGRESS_END = 0\.88/);
  assert.match(featureShowcase, /const FINAL_HOLD_END = 0\.96/);
  assert.match(featureShowcase, /const chapterProgress = clamp01\(progress \/ CHAPTER_PROGRESS_END\)/);
  assert.match(featureShowcase, /const chapterFloat = chapterProgress \* total/);
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

test("feature showcase adds a short pinned upward exit without scroll-jacking", () => {
  assert.match(featureShowcase, /--showcase-exit-y/);
  assert.match(featureShowcase, /--showcase-exit-opacity/);
  assert.match(featureShowcase, /lerp\(1, 0\.88, exitProgress\)/);
  assert.match(featureShowcase, /--showcase-warm-blend-opacity/);
  assert.match(featureShowcase, /<div className="privana-feature-scene">/);
  assert.match(globals, /\.privana-feature-scene \{[\s\S]*transform: translate3d\(0, var\(--showcase-exit-y, 0svh\), 0\)/);
  assert.doesNotMatch(globals, /\.privana-feature-pin \{[\s\S]{0,180}transform: translate3d/);
  assert.match(globals, /\.privana-feature-showcase::after \{[\s\S]*--showcase-warm-blend-opacity/);
  assert.doesNotMatch(featureShowcase, /wheel|preventDefault/);
});

test("assist demo contains exact preset scenarios and no API calls", () => {
  for (const question of [
    "What should I know today?",
    "Which members are becoming less engaged?",
    "Draft an email to members about Saturday’s event.",
  ]) assert.match(assistData + assistDemo, new RegExp(question.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(assistData, /id: "daily-briefing"/);
  assert.match(assistData, /id: "member-engagement"/);
  assert.match(assistData, /id: "email-draft"/);
  assert.doesNotMatch(assistDemo + assistData, /fetch\(|XMLHttpRequest|axios|openai|api\//i);
});

test("assist demo state machine controls typing, waiting, cancellation, and cleanup", () => {
  assert.match(assistData, /type DemoPhase =/);
  assert.match(assistData, /"typing-question"/);
  assert.match(assistData, /export const TYPING_SPEED_MS = 22/);
  assert.match(assistData, /export const ASSIST_WAIT_MS = 1000/);
  assert.match(assistDemo, /sequenceRef/);
  assert.match(assistDemo, /clearTimers\(\)/);
  assert.match(assistDemo, /setSubmittedUserMessage\(""\)/);
  assert.match(assistDemo, /setComposerText\(scenario\.question\.slice\(0, index\)\)/);
  assert.match(assistDemo, /setPhase\("complete"\)/);
  assert.match(assistDemo, /useEffect\(\(\) => \(\) => clearTimers\(\)/);
});

test("assist responses render complete briefing, three member cards, email asset, and accessible buttons", () => {
  assert.match(assistDemo, /<button key=\{scenario\.id\} type="button"/);
  assert.match(assistDemo, /aria-live="polite"/);
  assert.match(assistDemo, /className="assist-history-button"/);
  assert.doesNotMatch(assistDemo, /aria-expanded=\{historyOpen\}/);
  assert.doesNotMatch(assistDemo, /setHistoryOpen/);
  assert.doesNotMatch(assistDemo, /assist-history-panel/);
  assert.match(assistDemo, /aria-readonly="true"/);
  assert.match(assistData, /Review members/);
  assert.match(assistData, /Eleanor Whitmore/);
  assert.match(assistData, /Marcus Bennett/);
  assert.match(assistData, /Sophie Laurent/);
  assert.equal((assistData.match(/memberNo: "/g) || []).length, 3);
  assert.match(assistDemo, /assist-member-grid/);
  assert.match(assistDemo, /EmailDraftAsset/);
  assert.match(assistDemo, /EMAIL DRAFT/);
  assert.match(assistDemo, /Ready for review/);
  assert.match(globals, /\.assist-member-grid \{[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(globals, /@media \(max-width: 620px\)[\s\S]*\.assist-member-grid, \.assist-briefing-list article \{ grid-template-columns: 1fr; \}/);
});


test("assist demo separates intro and experience stages", () => {
  assert.match(assistDemo, /className="privana-assist-demo-intro container-shell"/);
  assert.match(assistDemo, /className="privana-assist-demo-experience container-shell"/);
  assert.ok(assistDemo.indexOf('privana-assist-demo-intro') < assistDemo.indexOf('privana-assist-demo-experience'));
  assert.doesNotMatch(globals, /\.privana-assist-demo-section > \.container-shell \{[\s\S]*grid-template-rows: auto minmax\(0, 1fr\) auto/);
  assert.doesNotMatch(globals, /max-height: calc\(100svh - var\(--site-header-height/);
});

test("assist demo uses stable desktop product-window sizing", () => {
  assert.match(globals, /@media \(min-width: 901px\)[\s\S]*\.assist-product-window \{[\s\S]*height: clamp\(34rem, 68svh, 42rem\);[\s\S]*min-height: 34rem;[\s\S]*max-height: 42rem;[\s\S]*display: grid;[\s\S]*grid-template-rows: auto auto minmax\(0, 1fr\) auto;/);
  assert.match(globals, /\.assist-product-window \{[\s\S]*width: min\(100%, 70rem\);/);
  assert.doesNotMatch(globals, /\.assist-product-window \{[\s\S]{0,220}height: 100%;/);
  assert.doesNotMatch(globals, /\.assist-product-window \{[\s\S]{0,220}height: auto;/);
});

test("assist conversation is the only internally scrolling demo content", () => {
  assert.match(globals, /\.assist-conversation \{[\s\S]*min-height: 0;[\s\S]*overflow-y: auto;/);
  assert.match(globals, /@media \(min-width: 901px\)[\s\S]*\.assist-conversation \{ min-height: 0; overflow-y: auto; \}/);
});

test("assist history button stays in first window row and prompts stay outside modal", () => {
  assert.match(assistDemo, /<div className="assist-window-header">[\s\S]*assist-topbar[\s\S]*assist-history-button/);
  assert.doesNotMatch(assistDemo, /historyOpen/);
  assert.doesNotMatch(assistDemo, /assist-history-panel/);
  assert.ok(assistDemo.indexOf('className="assist-prompt-area"') > assistDemo.indexOf('</div>\n\n          <div className="assist-prompt-area"'));
  assert.match(globals, /\.assist-prompt-area \{ margin: 1\.5rem auto 0; max-width: 70rem; \}/);
  assert.match(globals, /\.assist-prompt-grid \{ display: grid; grid-template-columns: repeat\(3, minmax\(0,1fr\)\);/);
});

test("assist demo preserves mobile flow and short-height desktop fallback", () => {
  assert.match(globals, /@media \(min-width: 901px\) and \(max-height: 760px\)[\s\S]*height: clamp\(31rem, 66svh, 36rem\);[\s\S]*min-height: 31rem;[\s\S]*max-height: 36rem;/);
  assert.match(globals, /@media \(max-width: 900px\)[\s\S]*\.assist-conversation \{ height: clamp\(27rem, 70vh, 34rem\); \}/);
  assert.match(globals, /@media \(max-width: 620px\)[\s\S]*\.assist-conversation \{ height: 30rem; padding: \.85rem; \}/);
  assert.match(globals, /@media \(max-width: 900px\)[\s\S]*\.assist-prompt-grid \{ grid-template-columns: 1fr; \}/);
});

test("assist demo supports reduced motion branch", () => {
  assert.match(assistDemo, /prefers-reduced-motion: reduce/);
  assert.match(assistData, /REDUCED_MOTION_WAIT_MS = 250/);
  assert.match(assistDemo, /if \(reducedMotion\) \{/);
  assert.match(assistDemo, /if \(reducedMotion \|\| assistScrollPauseUsedThisVisit\) return/);
  assert.match(assistDemo, /setComposerText\(scenario\.question\)/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.assist-thinking i, \.assist-composer i \{ animation: none; \}/);
});

test("assist demo adds a one-time, desktop-only scroll pause that releases on continued scroll", () => {
  assert.match(assistDemo, /ASSIST_SCROLL_PAUSE_MS = 400/);
  assert.match(assistDemo, /DESKTOP_SCROLL_PAUSE_QUERY = "\(min-width: 901px\) and \(pointer: fine\)"/);
  assert.match(assistDemo, /let assistScrollPauseUsedThisVisit = false/);
  assert.match(assistDemo, /useAssistScrollPause\(\{ targetRef: experienceRef, hasInteractedRef, reducedMotion \}\)/);
  assert.match(assistDemo, /intersectionRatio >= 1/);
  assert.match(assistDemo, /window\.addEventListener\("wheel", releaseOnContinuedScroll, \{ passive: false, capture: true \}\)/);
  assert.match(assistDemo, /window\.addEventListener\("touchmove", handleTouchMove, \{ passive: false, capture: true \}\)/);
  assert.match(assistDemo, /event\.preventDefault\(\)/);
  assert.match(assistDemo, /releasePause\(\)/);
  assert.match(assistDemo, /hasInteractedRef\.current = true/);
});
