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

const cardClasses = [
  "club-card-float-slow md:left-[4%] md:top-[3.05rem] md:-rotate-[7deg] lg:left-[4%]",
  "club-card-float-medium md:left-[20.5%] md:top-[0.45rem] md:-rotate-[1.5deg] lg:left-[20.5%]",
  "club-card-float-late md:left-[38.5%] md:top-[2.2rem] md:rotate-[4.5deg] lg:left-[38.5%]",
  "club-card-float-long md:left-[54%] md:top-[1.1rem] md:-rotate-[3deg] lg:left-[54%]",
];

const cardVisuals = [
  {
    tone: "club-card-front-stone",
    mark: "M28 58C42 42 54 26 76 22C68 42 54 58 28 58ZM30 66C56 66 72 52 84 34C84 62 66 80 38 84C34 78 31 72 30 66Z",
    position: "object-[50%_42%]",
  },
  {
    tone: "club-card-front-blue",
    mark: "M28 30H84V42H28V30ZM34 50H78V62H34V50ZM42 70H70V82H42V70Z",
    position: "object-[50%_48%]",
  },
  {
    tone: "club-card-front-charcoal",
    mark: "M56 22L68 46L94 50L75 68L80 94L56 81L32 94L37 68L18 50L44 46L56 22Z",
    position: "object-[52%_56%]",
  },
  {
    tone: "club-card-front-teal",
    mark: "M20 67C33 54 46 54 59 67C70 78 82 78 94 67V82C80 92 67 91 55 80C43 69 32 69 20 82V67Z",
    position: "object-[55%_48%]",
  },
];

const displayTitles: Record<string, string> = {
  "Sporting & Lifestyle Clubs": "Sporting &\nLifestyle Clubs",
  "Arts & Culture Clubs": "Arts & Culture\nClubs",
  "Beach & Leisure Clubs": "Beach & Leisure\nClubs",
};

export function ClubOverlappingCards({ segments }: ClubOverlappingCardsProps) {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl">
      <h3 className="mx-auto max-w-[18ch] text-center text-pretty text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.05rem]">
        Tailored Exclusively for Your Club
      </h3>

      <div className="club-overlap-composition mt-3 w-full sm:mt-4 md:mt-5">
        {segments.map((segment, index) => {
          const visuals = cardVisuals[index] ?? cardVisuals[0];
          const displayTitle = displayTitles[segment.title] ?? segment.title;
          const isFlipped = flippedCard === segment.title;

          return (
            <button
              key={segment.title}
              type="button"
              aria-label={`Show ${segment.title} image`}
              aria-pressed={isFlipped}
              onClick={() =>
                setFlippedCard((current) =>
                  current === segment.title ? null : segment.title,
                )
              }
              className={`club-overlap-card ${isFlipped ? "is-flipped" : ""} ${cardClasses[index] ?? ""}`}
            >
              <span className="sr-only">
                {segment.title}. {segment.supportingCopy}
              </span>
              <span className="club-card-inner">
                <span className={`club-card-face club-card-front ${visuals.tone}`}>
                  <span className="club-card-glow" />
                  <span className="club-card-noise" />
                  <svg
                    className="club-card-mark"
                    viewBox="0 0 112 112"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={visuals.mark} fill="currentColor" />
                  </svg>
                  <span className="club-card-title">
                    {displayTitle.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                  <span className="club-card-copy">{segment.supportingCopy}</span>
                </span>
                <span className="club-card-face club-card-back">
                  <Image
                    src={segment.image}
                    alt=""
                    fill
                    className={`object-cover ${visuals.position}`}
                    sizes="(max-width: 767px) 92vw, (max-width: 1023px) 36vw, 430px"
                  />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
