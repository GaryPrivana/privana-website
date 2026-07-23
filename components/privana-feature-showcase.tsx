"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  CrmIcon,
  InventoryIcon,
  MembershipIcon,
  OperationsIcon,
  ReservationsIcon,
  SportingLifestyleClubIcon,
} from "./icons";

type Chapter = {
  eyebrow?: string;
  headline: string;
  body: string;
  tone: string;
  align: "left" | "right";
  icon?: typeof OperationsIcon;
  visual: "connected" | "members" | "hospitality" | "sport" | "operations" | "accounting" | "voice" | "assist";
};

type ShowcaseValues = {
  progress: number;
  chapterFloat: number;
  activeIndex: number;
  localProgress: number;
  easedProgress: number;
  css: Record<string, string>;
};

export const showcaseChapters: Chapter[] = [
  { eyebrow: "THE CLUB, CONNECTED", headline: "One platform. Every part of your club.", body: "Privana brings your people, operations, hospitality and intelligence together in one beautifully connected system.", tone: "connected", align: "left", icon: OperationsIcon, visual: "connected" },
  { headline: "Know every member.", body: "Profiles, families, memberships, communications and the complete member relationship in one place.", tone: "members", align: "right", icon: MembershipIcon, visual: "members" },
  { headline: "Every experience, beautifully managed.", body: "Dining, events, rooms, spa, fitness and reservations working together across the club.", tone: "hospitality", align: "left", icon: ReservationsIcon, visual: "hospitality" },
  { headline: "Built for the way clubs play.", body: "Golf, racquet, fitness, competitions, lessons and facilities—without disconnected systems.", tone: "sport", align: "right", icon: SportingLifestyleClubIcon, visual: "sport" },
  { headline: "Run the entire operation.", body: "POS, inventory, payroll, safety, compliance and daily workflows inside the same operating system.", tone: "operations", align: "left", icon: InventoryIcon, visual: "operations" },
  { headline: "One financial truth.", body: "Revenue, receivables, payments, member accounts and reporting connected from the moment a transaction happens.", tone: "accounting", align: "right", visual: "accounting" },
  { headline: "Your club can listen, respond and react.", body: "Integrated communications and connected environments bring calls, alerts, facilities and service into Privana.", tone: "voice", align: "left", icon: CrmIcon, visual: "voice" },
  { eyebrow: "PRIVANA ASSIST", headline: "Your club already knows the answer.", body: "Ask questions, uncover opportunities and take action across the entire organisation with one club-aware AI assistant.", tone: "assist", align: "right", visual: "assist" },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const CHAPTER_REST_PORTION = 0.42;
const DESKTOP_SCROLL_CHAPTERS = 8;

gsap.registerPlugin(ScrollTrigger);
const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;
const ease = (value: number) => value * value * (3 - 2 * value);
const px = (value: number) => `${value.toFixed(2)}px`;
const deg = (value: number) => `${value.toFixed(2)}deg`;

const objectStates = [
  { rx: 18, ry: -22, rz: -4, scale: .92, p1x: 0, p1y: 0, p2x: 0, p2y: 0, p3r: 0, ring: .15, lines: 0, ledger: 0, nodes: 0, ambientX: 28, ambientY: 18 },
  { rx: 12, ry: 32, rz: 2, scale: .98, p1x: -112, p1y: -24, p2x: 104, p2y: 18, p3r: -8, ring: .22, lines: .28, ledger: .15, nodes: .2, ambientX: 38, ambientY: 22 },
  { rx: 8, ry: -44, rz: -1, scale: 1.02, p1x: -70, p1y: 54, p2x: 76, p2y: -58, p3r: 12, ring: .35, lines: .62, ledger: .2, nodes: .38, ambientX: 48, ambientY: 18 },
  { rx: 24, ry: 18, rz: 28, scale: .96, p1x: -92, p1y: -78, p2x: 96, p2y: 72, p3r: 42, ring: .76, lines: .42, ledger: .12, nodes: .54, ambientX: 58, ambientY: 26 },
  { rx: 32, ry: -16, rz: 0, scale: 1, p1x: -42, p1y: 0, p2x: 42, p2y: 0, p3r: 90, ring: .42, lines: .18, ledger: .42, nodes: .34, ambientX: 62, ambientY: 34 },
  { rx: 15, ry: 46, rz: -7, scale: 1.04, p1x: -118, p1y: 8, p2x: 118, p2y: -8, p3r: 0, ring: .25, lines: .22, ledger: .92, nodes: .22, ambientX: 50, ambientY: 28 },
  { rx: 4, ry: -58, rz: 4, scale: .99, p1x: -62, p1y: -46, p2x: 64, p2y: 48, p3r: -28, ring: 1, lines: .88, ledger: .3, nodes: 1, ambientX: 42, ambientY: 20 },
  { rx: 0, ry: 0, rz: 0, scale: 1.08, p1x: 0, p1y: 0, p2x: 0, p2y: 0, p3r: 0, ring: .7, lines: .5, ledger: .12, nodes: .72, ambientX: 50, ambientY: 16 },
];

export function getShowcaseValues(rawProgress: number, total = showcaseChapters.length): ShowcaseValues {
  const progress = clamp01(rawProgress);
  const chapterFloat = progress * total;
  const activeIndex = Math.min(total - 1, Math.max(0, Math.floor(chapterFloat)));
  const segmentProgress = activeIndex >= total - 1 ? 0 : chapterFloat - activeIndex;
  const transitionStart = CHAPTER_REST_PORTION;
  const localProgress = activeIndex >= total - 1 ? 0 : clamp01((segmentProgress - transitionStart) / (1 - transitionStart));
  const easedProgress = ease(localProgress);
  const baseIndex = activeIndex;
  const current = objectStates[baseIndex] ?? objectStates[0];
  const next = objectStates[Math.min(total - 1, baseIndex + 1)] ?? current;
  const mix = (key: keyof typeof current) => lerp(current[key], next[key], easedProgress);

  return {
    progress,
    chapterFloat,
    activeIndex,
    localProgress,
    easedProgress,
    css: {
      "--object-rotate-x": deg(mix("rx")),
      "--object-rotate-y": deg(mix("ry")),
      "--object-rotate-z": deg(mix("rz")),
      "--object-scale": mix("scale").toFixed(4),
      "--panel-one-x": px(mix("p1x")),
      "--panel-one-y": px(mix("p1y")),
      "--panel-two-x": px(mix("p2x")),
      "--panel-two-y": px(mix("p2y")),
      "--panel-one-rotate": deg(mix("p3r")),
      "--panel-two-rotate": deg(mix("p3r") * -1),
      "--ambient-x": `${mix("ambientX").toFixed(2)}%`,
      "--ambient-y": `${mix("ambientY").toFixed(2)}%`,
      "--copy-transition": easedProgress.toFixed(4),
      "--ring-opacity": mix("ring").toFixed(4),
      "--signal-opacity": mix("lines").toFixed(4),
      "--ledger-opacity": mix("ledger").toFixed(4),
      "--node-opacity": mix("nodes").toFixed(4),
      "--showcase-progress-value": progress.toFixed(4),
    },
  };
}

export function PrivanaFeatureShowcase({ demoLink }: { demoLink: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = showcaseChapters[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reducedMotion) return;

    const applyShowcaseProgress = (progress: number) => {
      const values = getShowcaseValues(progress);

      for (const [property, value] of Object.entries(values.css)) {
        section.style.setProperty(property, value);
      }

      if (values.activeIndex !== activeIndexRef.current) {
        activeIndexRef.current = values.activeIndex;
        setActiveIndex(values.activeIndex);
      }
    };

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        applyShowcaseProgress(0);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * DESKTOP_SCROLL_CHAPTERS}`,
          pin,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            applyShowcaseProgress(self.progress);
          },
        });

        const refresh = () => {
          if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
          rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = 0;
            ScrollTrigger.refresh();
          });
        };

        window.addEventListener("orientationchange", refresh);
        document.fonts?.ready.then(refresh);
        refresh();

        return () => {
          window.removeEventListener("orientationchange", refresh);
          if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
          trigger.kill();
        };
      });
    }, section);

    return () => {
      mm.revert();
      context.revert();
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="connected-platform" className={`privana-feature-showcase tone-${active.tone}`} aria-labelledby="connected-platform-heading">
      <div ref={pinRef} className="privana-feature-pin container-shell">
        <div className="privana-feature-copy privana-feature-copy-left">
          {showcaseChapters.map((chapter, index) => <ChapterCopy key={chapter.headline} chapter={chapter} index={index} activeIndex={activeIndex} side="left" demoLink={demoLink} />)}
        </div>
        <div className="privana-feature-stage" aria-hidden="true"><PrivanaObject activeIndex={activeIndex} /></div>
        <div className="privana-feature-copy privana-feature-copy-right">
          {showcaseChapters.map((chapter, index) => <ChapterCopy key={chapter.headline} chapter={chapter} index={index} activeIndex={activeIndex} side="right" demoLink={demoLink} />)}
        </div>
        <div className="privana-feature-indicator" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}<span />{String(showcaseChapters.length).padStart(2, "0")}</div>
      </div>
      <div className="container-shell privana-feature-mobile-flow">
        {showcaseChapters.map((chapter, index) => <MobileChapter key={chapter.headline} chapter={chapter} index={index} demoLink={demoLink} />)}
      </div>
    </section>
  );
}

function ChapterCopy({ chapter, index, activeIndex, side, demoLink }: { chapter: Chapter; index: number; activeIndex: number; side: "left" | "right"; demoLink: string }) {
  if (chapter.align !== side) return null;
  const isFinal = index === showcaseChapters.length - 1;
  return <article className={`privana-chapter-copy ${index === activeIndex ? "is-active" : ""} ${isFinal ? "is-final" : ""}`}>{chapter.eyebrow && <p>{chapter.eyebrow}</p>}<h2 id={index === 0 ? "connected-platform-heading" : undefined}>{chapter.headline}</h2><span>{chapter.body}</span>{isFinal && <FinalCta demoLink={demoLink} />}</article>;
}

function FinalCta({ demoLink }: { demoLink: string }) { return <div className="privana-feature-cta"><p>See Privana in action</p><Link href={demoLink} className="privana-feature-button">BOOK A DEMO</Link></div>; }
function MobileChapter({ chapter, index, demoLink }: { chapter: Chapter; index: number; demoLink: string }) { const Icon = chapter.icon; return <article className={`privana-mobile-chapter tone-${chapter.tone}`}><div className="privana-mobile-visual" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><MiniVisual visual={chapter.visual} Icon={Icon} /></div>{chapter.eyebrow && <p>{chapter.eyebrow}</p>}<h2>{chapter.headline}</h2><p>{chapter.body}</p>{index === showcaseChapters.length - 1 && <FinalCta demoLink={demoLink} />}</article>; }
function PrivanaObject({ activeIndex }: { activeIndex: number }) { const chapter = showcaseChapters[activeIndex]; const Icon = chapter.icon; return <div className={`privana-object visual-${chapter.visual}`}><div className="privana-object-shadow" /><div className="privana-object-assembly"><span className="privana-plane plane-back"/><span className="privana-plane plane-left"/><span className="privana-plane plane-right"/><span className="privana-plane plane-top"/><div className="privana-object-core"><div className="privana-object-mark">P</div>{Icon && <Icon className="privana-object-icon" />}</div><FeatureGeometry visual={chapter.visual} /></div></div>; }
function FeatureGeometry({ visual }: { visual: Chapter["visual"] }) { return <div className={`feature-geometry geometry-${visual}`}><span/><span/><span/><span/><span/><span/></div>; }
function MiniVisual({ visual, Icon }: { visual: Chapter["visual"]; Icon?: typeof OperationsIcon }) { return <div className={`mini-visual geometry-${visual}`}>{Icon ? <Icon /> : <span/>}<i/><i/><i/></div>; }
