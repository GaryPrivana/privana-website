import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { ClubOverlappingCards, type ClubSegment } from "./club-overlapping-cards";
import { ContactFormSection } from "./contact-form-section";
import { HeroScrollPrompt } from "./hero-scroll-prompt";
import { HomepageHeader } from "./homepage-header";
import { PrivanaLogo } from "./privana-logo";
import { PrivanaFeatureShowcase } from "./privana-feature-showcase";
import { HomepageIntroReveal } from "./homepage-intro-reveal";
import { PrivanaAssistInteractiveDemo } from "./privana-assist-interactive-demo";
import { EditorialImageBreak } from "./editorial-image-break";

const demoLink = "#demo";
const heroFont = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
const sharedDemoCtaClass =
  "inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-xs font-semibold tracking-[0.1em] text-[#10131a] transition duration-300 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const authorityValueCards = [
  {
    label: "Up to",
    headline: "80% less admin time",
    description: (
      <>
        Assisted member communications.
        <br />
        Automated workflows.
      </>
    ),
  },
  {
    label: "Over",
    headline: "25+ modules unified",
    description: "Run your entire club from one connected ecosystem.",
  },
  {
    label: "Built for",
    headline: "Modern Private Clubs",
    description:
      "Designed for the world’s leading golf, country and lifestyle clubs.",
  },
];

const clubSegments: ClubSegment[] = [
  {
    title: "Sporting & Lifestyle Clubs",
    image:
      "https://privana-website-images.s3.amazonaws.com/GRID_Sporting+and+Lifestyle+Clubs.png",
    examples: [
      "Golf Clubs",
      "Athletic Clubs",
      "Equestrian Clubs",
      "Shooting Clubs",
      "Wellness Retreats",
    ],
    supportingCopy: "Golf, racquet, wellness and multi-activity clubs.",
  },
  {
    title: "City Clubs",
    image:
      "https://privana-website-images.s3.amazonaws.com/GRID_city+clubs.png",
    examples: [
      "Business Clubs",
      "Private Dining Clubs",
      "Executive Clubs",
      "Members Lounges",
      "Networking Clubs",
    ],
    supportingCopy: "Private business, dining and members’ clubs.",
  },
  {
    title: "Arts & Culture Clubs",
    image:
      "https://privana-website-images.s3.amazonaws.com/GRID_arts+and+culture+clubs+V2.png",
    examples: [
      "Creative Clubs",
      "Museum Societies",
      "Arts Foundations",
      "Literary Clubs",
      "Performance Venues",
    ],
    supportingCopy: "Creative, cultural and membership-led institutions.",
  },
  {
    title: "Beach & Leisure Clubs",
    image:
      "https://privana-website-images.s3.amazonaws.com/GRID_beach+clubs+V2.png",
    examples: [
      "Beach Clubs",
      "Coastal Resorts",
      "Private Retreats",
      "Leisure Clubs",
      "Wellness Resorts",
    ],
    supportingCopy: "Coastal, leisure and resort-style private clubs.",
  },
];

export function Homepage() {
  return (
    <>
      <HomepageHeader
        demoLink={demoLink}
        heroFontClassName={heroFont.className}
        heroDemoCtaClass={sharedDemoCtaClass}
      />

      <main id="top" className="bg-[#f5f3f8]">
        <section
          id="hero"
          className={`relative isolate flex min-h-screen overflow-hidden bg-[#020304] px-6 pb-16 pt-36 text-white sm:pb-20 sm:pt-44 ${heroFont.className}`}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="https://privana-website-images.s3.eu-north-1.amazonaws.com/website_hero_background_video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 bg-black/70" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(101,215,206,0.16),transparent_42%),radial-gradient(circle_at_85%_22%,rgba(142,106,198,0.14),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.68)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-18rem] h-[28rem] bg-[radial-gradient(ellipse_at_center,rgba(101,215,206,0.08),transparent_65%)]" />

          <div className="container-shell relative z-10 flex flex-1 items-center">
            <div className="mx-auto w-full max-w-6xl text-center">
              <div className="mx-auto h-[clamp(15rem,34vw,24rem)] w-full max-w-[1800px]">
                <PrivanaLogo
                  variant="white"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1800px"
                  scale={2.45}
                />
              </div>
              <p className="hero-editorial-line mx-auto mt-11 max-w-4xl text-balance text-lg font-normal leading-[1.24] tracking-[-0.008em] text-white/84 sm:text-[1.65rem] lg:max-w-none lg:text-[2.08rem] lg:whitespace-nowrap">
                Built for the World’s Most <span className="signature-emphasis">Exceptional</span> Clubs
              </p>
              <div className="mt-16">
                <Link href={demoLink} className={sharedDemoCtaClass}>
                  BOOK A DEMO
                </Link>
              </div>
            </div>
          </div>

          <HeroScrollPrompt
            targetId="hero-showcase"
            className={heroFont.className}
          />
        </section>

        <HomepageIntroReveal heroFontClassName={heroFont.className} />

        <PrivanaFeatureShowcase />

        <PrivanaAssistInteractiveDemo />

        <section className="authority-value-transition-section">
          <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {authorityValueCards.map((card) => (
              <article
                key={card.headline}
                className="group flex h-full min-h-[22rem] flex-col rounded-[1.85rem] border border-[#e5dfeb] bg-[#f6f4f8] p-8 shadow-[0_1px_0_rgba(17,16,23,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#ddd5e6] hover:shadow-[0_18px_42px_rgba(16,12,25,0.11)] sm:p-10"
              >
                <p className="text-sm font-medium tracking-[-0.01em] text-[#4a4356]/65">
                  {card.label}
                </p>
                <h3 className="mt-7 max-w-[16ch] text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.03em] text-[#111017] sm:text-[2.65rem]">
                  {card.headline}
                </h3>
                <p className="mt-auto pt-10 text-lg leading-relaxed text-[#2f2a3c]/72">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="solutions"
          className="bg-[radial-gradient(circle_at_15%_15%,rgba(98,213,206,0.18),transparent_42%),radial-gradient(circle_at_85%_12%,rgba(175,139,218,0.2),transparent_36%),linear-gradient(160deg,#0f0f15,#0a0a0f)] py-14 text-white sm:py-16 lg:py-20"
        >
          <div className="container-shell">
            <ClubOverlappingCards segments={clubSegments} />
          </div>
        </section>

        <EditorialImageBreak />

        <section id="demo" className="section-pad bg-black text-white">
          <div className="container-shell">
            <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-[radial-gradient(circle_at_15%_15%,rgba(98,213,206,0.2),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(175,139,218,0.2),transparent_35%),linear-gradient(160deg,#0f0f15,#0a0a0f)] p-10 text-center shadow-[0_32px_80px_rgba(8,8,12,0.45)] sm:p-14">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
              <div className="relative z-10 flex flex-col gap-7">
                <h3 className="max-w-[16ch] self-center text-pretty text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-[3.15rem]">
                  Your Club Deserves Better Software.
                </h3>
                <p className="mx-auto max-w-2xl text-white/72">
                  Built for clubs that expect more from technology, hospitality,
                  and execution.
                </p>
                <div>
                  <Link
                    href="https://example.com/book-demo"
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 px-7 py-3 text-xs font-medium tracking-[0.14em] text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    BOOK A DEMO <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactFormSection />

      <footer id="contact" className="bg-black pb-20 pt-16 text-white">
        <div className="container-shell grid gap-12 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.55fr)_repeat(4,minmax(0,1fr))] lg:gap-x-14">
          <div className="max-w-[420px] text-left justify-self-start">
            <div className="relative h-[5.5rem] w-[800px] max-w-full">
              <Image
                src="https://privana-website-images.s3.amazonaws.com/Privana%20Logo%20-%20White%20Text%20%28Transparent%20BG%29.png"
                alt="Privana"
                fill
                sizes="420px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/55">
              Premium operations infrastructure for modern member-led clubs.
            </p>
          </div>
          <FooterColumn
            title="Information"
            links={[
              { label: "Club Operations", href: "#connected-platform" },
              { label: "CRM", href: "#connected-platform" },
              { label: "Reservations", href: "#connected-platform" },
              { label: "Membership", href: "#connected-platform" },
              { label: "Hotel", href: "#connected-platform" },
              { label: "Inventory", href: "#connected-platform" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "#about" },
              { label: "Team", href: "#about" },
              { label: "Careers", href: "#contact" },
              { label: "Partners", href: "#contact" },
            ]}
          />
          <FooterColumn
            title="Accreditations"
            links={[
              { label: "GDPR Compliant", href: "#contact" },
              { label: "SOC 2 Ready", href: "#contact" },
              { label: "ISO 27001", href: "#contact" },
            ]}
          />
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/55">
              Follow Us
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.linkedin.com/company/privana"
                  className="text-sm text-white/68 transition hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/privana"
                  className="text-sm text-white/68 transition hover:text-white"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/privana"
                  className="text-sm text-white/68 transition hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/55">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/68 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
