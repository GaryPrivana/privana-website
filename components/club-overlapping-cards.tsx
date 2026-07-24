"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ArtsCultureClubIcon,
  BeachLeisureClubIcon,
  CityClubIcon,
  SportingLifestyleClubIcon,
} from "./icons";

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
    Icon: SportingLifestyleClubIcon,
    position: "object-[50%_42%]",
  },
  {
    tone: "club-card-tone-blue",
    Icon: CityClubIcon,
    position: "object-[50%_48%]",
  },
  {
    tone: "club-card-tone-charcoal",
    Icon: ArtsCultureClubIcon,
    position: "object-[52%_56%]",
  },
  {
    tone: "club-card-tone-teal",
    Icon: BeachLeisureClubIcon,
    position: "object-[55%_48%]",
  },
];

export function ClubOverlappingCards({ segments }: ClubOverlappingCardsProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h3 className="club-types-heading mx-auto max-w-[18ch] text-center text-pretty text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:max-w-none lg:whitespace-nowrap lg:text-[3.05rem]">
        Tailored <span className="editorial-emphasis">Exclusively</span> for Your Club
      </h3>

      <div className="mx-auto w-[min(88vw,86rem)] max-w-full">
        <div className="club-expanding-composition mt-3 sm:mt-4 md:mt-5">
          {segments.map((segment, index) => {
            const visuals = cardVisuals[index] ?? cardVisuals[0];
            const Icon = visuals.Icon;
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
                <span
                  className="club-card-readability-gradient"
                  aria-hidden="true"
                />
                <span className="club-card-glow" aria-hidden="true" />
                <span className="club-card-noise" aria-hidden="true" />
                <span className="club-card-content">
                  <Icon className="club-card-mark" aria-hidden="true" />
                  <span className="club-card-text">
                    <span className="club-card-title">{segment.title}</span>
                    <span className="club-card-copy">
                      {segment.supportingCopy}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
