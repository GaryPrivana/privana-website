import Image from "next/image";

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
  "club-card-float-slow md:left-[2%] md:top-[2.25rem] md:-rotate-[5deg] lg:left-[1%]",
  "club-card-float-medium md:left-[25%] md:top-[0.5rem] md:-rotate-[1deg] lg:left-[25%]",
  "club-card-float-late md:left-[49%] md:top-[1.4rem] md:rotate-[3deg] lg:left-[49%]",
  "club-card-float-long md:left-[72%] md:top-[3.15rem] md:-rotate-[3deg] lg:left-[72%]",
];

export function ClubOverlappingCards({ segments }: ClubOverlappingCardsProps) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-[radial-gradient(circle_at_15%_15%,rgba(98,213,206,0.2),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(175,139,218,0.2),transparent_35%),linear-gradient(160deg,#0f0f15,#0a0a0f)] px-5 py-9 shadow-[0_32px_80px_rgba(8,8,12,0.45)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <h3 className="max-w-[18ch] text-center text-pretty text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-[2.75rem] lg:text-[3.05rem]">
          Tailored Exclusively for Your Club
        </h3>

        <div className="club-overlap-composition mt-7 w-full md:mt-8">
          {segments.map((segment, index) => (
            <article
              key={segment.title}
              className={`club-overlap-card ${cardClasses[index] ?? ""}`}
            >
              <Image
                src={segment.image}
                alt={segment.title}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 34vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/28 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-6">
                <h4 className="font-display text-[1.28rem] font-medium leading-tight tracking-[-0.01em] text-white sm:text-[1.45rem]">
                  {segment.title}
                </h4>
                <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-white/74">
                  {segment.supportingCopy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
