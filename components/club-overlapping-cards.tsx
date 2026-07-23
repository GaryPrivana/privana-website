"use client";

import Image from "next/image";
import { useState } from "react";

export type ClubSegment = {
  title: string;
  image: string;
  examples: string[];
  supportingCopy: string;
};

type ClubOverlappingCardsProps = {
  segments: ClubSegment[];
};

const cardVisuals = [
  {
    tone: "club-card-tone-stone",
    mark: "M28 58C42 42 54 26 76 22C68 42 54 58 28 58ZM30 66C56 66 72 52 84 34C84 62 66 80 38 84C34 78 31 72 30 66Z",
    position: "object-[50%_42%]",
  },
  {
    tone: "club-card-tone-blue",
    mark: "M28 30H84V42H28V30ZM34 50H78V62H34V50ZM42 70H70V82H42V70Z",
    position: "object-[50%_48%]",
  },
  {
    tone: "club-card-tone-charcoal",
    mark: "M56 22L68 46L94 50L75 68L80 94L56 81L32 94L37 68L18 50L44 46L56 22Z",
    position: "object-[52%_56%]",
  },
  {
    tone: "club-card-tone-teal",
    mark: "M20 67C33 54 46 54 59 67C70 78 82 78 94 67V82C80 92 67 91 55 80C43 69 32 69 20 82V67Z",
    position: "object-[55%_48%]",
  },
];

export function ClubOverlappingCards({ segments }: ClubOverlappingCardsProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[86rem]">
      <h3 className="mx-auto max-w-[18ch] text-center text-pretty text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.05rem]">
        Tailored Exclusively for Your Club
      </h3>

      <div className="club-expanding-composition mt-3 w-full sm:mt-4 md:mt-5">
        {segments.map((segment, index) => {
          const visuals = cardVisuals[index] ?? cardVisuals[0];
          const isActive = activeCard === segment.title;
          const isRevealed = isActive || revealedCard === segment.title;

          return (
            <button
              key={segment.title}
              type="button"
              aria-label={`${isRevealed ? "Hide" : "Reveal"} ${segment.title} image`}
              aria-pressed={isRevealed}
              onPointerEnter={() => setActiveCard(segment.title)}
              onPointerLeave={() =>
                setActiveCard((current) =>
                  current === segment.title ? null : current,
                )
              }
              onFocus={() => setActiveCard(segment.title)}
              onBlur={() =>
                setActiveCard((current) =>
                  current === segment.title ? null : current,
                )
              }
              onClick={() =>
                setRevealedCard((current) =>
                  current === segment.title ? null : segment.title,
                )
              }
              className={`club-expanding-card ${visuals.tone} ${
                isActive ? "is-expanded" : ""
              } ${isRevealed ? "is-image-active" : ""}`}
            >
              <span className="club-card-image-layer" aria-hidden="true">
                <Image
                  src={segment.image}
                  alt=""
                  fill
                  className={`club-card-image object-cover ${visuals.position}`}
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 38vw"
                />
              </span>
              <span className="club-card-readability-gradient" aria-hidden="true" />
              <span className="club-card-glow" aria-hidden="true" />
              <span className="club-card-noise" aria-hidden="true" />
              <span className="club-card-content">
                <svg
                  className="club-card-mark"
                  viewBox="0 0 112 112"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d={visuals.mark} fill="currentColor" />
                </svg>
                <span className="club-card-text">
                  <span className="club-card-title">{segment.title}</span>
                  <span className="club-card-copy">{segment.supportingCopy}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
