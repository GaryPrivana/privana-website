"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type ClubSegment = {
  title: string;
  image: string;
  examples: string[];
};

type ClubCubeCarouselProps = {
  segments: ClubSegment[];
};

const faceTransforms = [
  "rotateY(0deg) translateZ(var(--cube-depth))",
  "rotateY(90deg) translateZ(var(--cube-depth))",
  "rotateY(180deg) translateZ(var(--cube-depth))",
  "rotateY(270deg) translateZ(var(--cube-depth))",
];

export function ClubCubeCarousel({ segments }: ClubCubeCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cube = cubeRef.current;

    if (!section || !cube) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineViewport = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const updateCube = () => {
      frame = 0;

      if (reduceMotion.matches || !fineViewport.matches) {
        cube.style.transform = "rotateY(0deg)";
        if (activeIndexRef.current !== 0) {
          activeIndexRef.current = 0;
          setActiveIndex(0);
        }
        return;
      }

      const rect = section.getBoundingClientRect();
      const maxTravel = section.offsetHeight - window.innerHeight;
      const rawProgress = maxTravel > 0 ? -rect.top / maxTravel : 0;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const rotation = progress * -270;
      const nextIndex = Math.min(
        segments.length - 1,
        Math.round(progress * (segments.length - 1)),
      );

      cube.style.transform = `rotateY(${rotation}deg)`;
      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateCube);
      }
    };

    const refresh = () => requestUpdate();

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(requestUpdate) : null;

    updateCube();
    resizeObserver?.observe(section);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", refresh);
    reduceMotion.addEventListener("change", refresh);
    fineViewport.addEventListener("change", refresh);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", refresh);
      reduceMotion.removeEventListener("change", refresh);
      fineViewport.removeEventListener("change", refresh);
    };
  }, [segments.length]);

  return (
    <div
      ref={sectionRef}
      className="club-cube-section relative md:min-h-[280vh]"
    >
      <div className="club-cube-sticky md:sticky md:top-0 md:flex md:min-h-screen md:items-center md:justify-center md:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#554b66]/70 md:mb-8">
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(segments.length).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-[#cfc4df]" />
            <span className="text-[#2b2437]">
              {segments[activeIndex]?.title}
            </span>
          </div>

          <div
            className="club-cube-stage mx-auto hidden md:block"
            aria-live="polite"
          >
            <div ref={cubeRef} className="club-cube">
              {segments.map((segment, index) => (
                <article
                  key={segment.title}
                  className="club-cube-face group absolute inset-0 overflow-hidden rounded-[24px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6bc0] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                  style={{ transform: faceTransforms[index] }}
                  tabIndex={activeIndex === index ? 0 : -1}
                  aria-hidden={activeIndex !== index}
                >
                  <ClubSegmentCard segment={segment} sizes="min(82vw, 760px)" />
                </article>
              ))}
            </div>
          </div>

          <div className="club-cube-fallback grid gap-5 md:hidden">
            {segments.map((segment) => (
              <article
                key={segment.title}
                className="group relative aspect-[6/5] overflow-hidden rounded-[24px]"
              >
                <ClubSegmentCard segment={segment} sizes="100vw" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClubSegmentCard({
  segment,
  sizes,
}: {
  segment: ClubSegment;
  sizes: string;
}) {
  return (
    <>
      <Image
        src={segment.image}
        alt={segment.title}
        fill
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-black/8 transition duration-500 ease-out group-hover:bg-black/55 group-focus-visible:bg-black/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 text-center sm:px-10">
        <h4 className="max-w-[22rem] translate-y-1 font-display text-[1.35rem] font-medium tracking-[-0.01em] text-white/20 opacity-20 transition duration-500 ease-out group-hover:-translate-y-3 group-hover:text-white group-hover:opacity-100 group-focus-visible:-translate-y-3 group-focus-visible:text-white group-focus-visible:opacity-100 sm:text-[1.55rem]">
          {segment.title}
        </h4>
        <ul className="mt-3 space-y-1 text-sm font-light leading-relaxed text-white/0 opacity-0 transition duration-500 ease-out group-hover:opacity-100 group-hover:text-white/88 group-focus-visible:opacity-100 group-focus-visible:text-white/88 sm:text-[0.92rem]">
          {segment.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
