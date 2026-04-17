import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import {
  DeviceFramePlaceholder,
  FeatureMediaPlaceholder,
  HeroProductPlaceholder,
  ProductShowcasePlaceholder,
  VideoPreviewPlaceholder
} from './media-placeholders';
import {
  CrmIcon,
  HotelIcon,
  InventoryIcon,
  MembershipIcon,
  OperationsIcon,
  ReservationsIcon
} from './icons';
import { aiChips, platformModules } from './site-data';
import { ContactFormSection } from './contact-form-section';
import { HeroScrollPrompt } from './hero-scroll-prompt';
import { HomepageHeader } from './homepage-header';
import { PrivanaLogo } from './privana-logo';

const demoLink = '#demo';
const heroFont = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap'
});
const sharedDemoCtaClass =
  'inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-xs font-semibold tracking-[0.1em] text-[#10131a] transition duration-300 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

const iconMap = {
  operations: OperationsIcon,
  crm: CrmIcon,
  reservations: ReservationsIcon,
  membership: MembershipIcon,
  hotel: HotelIcon,
  inventory: InventoryIcon
} as const;

const authorityValueCards = [
  {
    label: 'Up to',
    headline: '80% less admin time',
    description: 'Automate member communication, reporting and operational workflows.'
  },
  {
    label: 'Over',
    headline: '25+ modules unified',
    description: 'Run your entire club from one connected ecosystem.'
  },
  {
    label: 'Built for',
    headline: 'Modern Private Clubs',
    description: 'Designed for the world’s leading golf, country and lifestyle clubs.'
  }
];

const valuePillars = [
  'AI Concierge & Automation',
  'CRM & Lead Intelligence',
  'Reservations & Experience Management',
  'Membership Lifecycle Management',
  'Hospitality & Revenue Operations',
  'Finance, Reporting & Insights'
];

const comparisonRows = [
  {
    legacy: 'Fragmented tools and disconnected teams',
    modern: 'One connected platform across every department'
  },
  {
    legacy: 'Manual workflows and repetitive admin',
    modern: 'Intelligent automation with AI assistance'
  },
  {
    legacy: 'Static monthly reporting',
    modern: 'Real-time operational and member insight'
  },
  {
    legacy: 'Generic software not built for clubs',
    modern: 'Hospitality-first product design for premium clubs'
  },
  {
    legacy: 'Systems optimized for admin tasks',
    modern: 'Operations designed around member experience'
  }
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
          {/* Future cinematic media slot:
             Replace this backdrop layer with an absolute <video> or <Image> to run full-bleed behind the hero copy.
             Keep object-cover + inset-0 positioning so the section remains media-ready. */}
          <div className="pointer-events-none absolute inset-0 bg-[#020304]" />
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
              <p className="mx-auto mt-11 max-w-4xl text-balance text-lg font-normal leading-[1.24] tracking-[-0.008em] text-white/84 sm:text-[1.65rem] lg:max-w-none lg:text-[2.08rem] lg:whitespace-nowrap">
                Built for the World’s Most Exceptional Clubs
              </p>
              <div className="mt-16">
                <Link href={demoLink} className={sharedDemoCtaClass}>
                  BOOK A DEMO
                </Link>
              </div>
            </div>
          </div>

          <HeroScrollPrompt targetId="hero-showcase" className={heroFont.className} />
        </section>

        <section id="about" className={`section-pad bg-[#fbfafe] ${heroFont.className}`}>
          <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-[#111017] sm:text-6xl">
              <span className="text-[#af8bda]">Privana</span> is the
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              world leading, fully
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              <span className="text-[#5888d9]">AI powered</span> Club
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              Management
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              Software
            </h2>
            <p className="max-w-xl justify-self-end text-pretty text-xl leading-relaxed text-[#201a2d]/92">
              Connect departments, elevate hospitality, and make better decisions with one modern
              system built for premium clubs, private hospitality, and lifestyle-driven communities.
            </p>
          </div>
        </section>

        <section id="hero-showcase" className="bg-black px-6 pb-20 pt-8 text-white sm:pt-10">
          <div className="container-shell">
            <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
              <HeroProductPlaceholder
                title="Privana Command Dashboard"
                label="Hero Product Showcase"
                aspectRatio="16 / 9"
                previewLabel="Replace with imageSrc or videoSrc"
                className="w-full"
              />
              <div className="space-y-5">
                <DeviceFramePlaceholder
                  title="Live Operations Pulse"
                  label="Floating Widget"
                  aspectRatio="4 / 3"
                  glowMode="teal"
                  previewLabel="Replace with AWS image URL"
                />
                <DeviceFramePlaceholder
                  title="AI Concierge Queue"
                  label="Floating Widget"
                  aspectRatio="4 / 3"
                  glowMode="lilac"
                  previewLabel="Replace with AWS image URL"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e0dbea] bg-[#f3eff9] py-16 sm:py-20">
          <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {authorityValueCards.map((card) => (
              <article
                key={card.headline}
                className="group flex h-full min-h-[22rem] flex-col rounded-[1.85rem] border border-[#e5dfeb] bg-[#f6f4f8] p-8 shadow-[0_1px_0_rgba(17,16,23,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#ddd5e6] hover:shadow-[0_18px_42px_rgba(16,12,25,0.11)] sm:p-10"
              >
                <p className="text-sm font-medium tracking-[-0.01em] text-[#4a4356]/65">{card.label}</p>
                <h3 className="mt-7 max-w-[16ch] text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.03em] text-[#111017] sm:text-[2.65rem]">
                  {card.headline}
                </h3>
                <p className="mt-auto pt-10 text-lg leading-relaxed text-[#2f2a3c]/72">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="section-pad bg-white">
          <div className="container-shell space-y-10 sm:space-y-12">
            <h3
              className={`${heroFont.className} mx-auto max-w-4xl text-center text-2xl font-semibold leading-[1.04] tracking-[-0.02em] text-[#111017] sm:text-3xl lg:text-4xl`}
            >
              Tailored Exclusively for Your Club
            </h3>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: 'Sporting & Lifestyle Clubs',
                  image:
                    'https://privana-website-images.s3.amazonaws.com/GRID_Sporting+and+Lifestyle+Clubs.png',
                  examples: [
                    'Golf Clubs',
                    'Athletic Clubs',
                    'Equestrian Clubs',
                    'Shooting Clubs',
                    'Wellness Retreats'
                  ]
                },
                {
                  title: 'City Clubs',
                  image: 'https://privana-website-images.s3.amazonaws.com/GRID_city+clubs.png',
                  examples: [
                    'Business Clubs',
                    'Private Dining Clubs',
                    'Executive Clubs',
                    'Members Lounges',
                    'Networking Clubs'
                  ]
                },
                {
                  title: 'Arts & Culture Clubs',
                  image:
                    'https://privana-website-images.s3.amazonaws.com/GRID_arts+and+culture+clubs+V2.png',
                  examples: [
                    'Creative Clubs',
                    'Museum Societies',
                    'Arts Foundations',
                    'Literary Clubs',
                    'Performance Venues'
                  ]
                },
                {
                  title: 'Beach & Leisure Clubs',
                  image: 'https://privana-website-images.s3.amazonaws.com/GRID_beach+clubs+V2.png',
                  examples: [
                    'Beach Clubs',
                    'Coastal Resorts',
                    'Private Retreats',
                    'Leisure Clubs',
                    'Wellness Resorts'
                  ]
                }
              ].map((segment) => (
                <article
                  key={segment.title}
                  className="group relative aspect-[6/5] overflow-hidden rounded-[24px]"
                >
                  <Image
                    src={segment.image}
                    alt={segment.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/8 transition duration-500 ease-out group-hover:bg-black/55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 text-center sm:px-10">
                    <h4 className="max-w-[22rem] translate-y-1 font-display text-[1.35rem] font-medium tracking-[-0.01em] text-white/20 opacity-20 transition duration-500 ease-out group-hover:-translate-y-3 group-hover:text-white group-hover:opacity-100 sm:text-[1.55rem]">
                      {segment.title}
                    </h4>
                    <ul className="mt-3 space-y-1 text-sm font-light leading-relaxed text-white/0 opacity-0 transition duration-500 ease-out group-hover:opacity-100 group-hover:text-white/88 sm:text-[0.92rem]">
                      {segment.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="product-showcase" className="section-pad bg-[#121018] text-white">
          <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <ProductShowcasePlaceholder
              title="Primary Platform Experience"
              label="Enterprise Product Showcase"
              aspectRatio="16 / 10"
              previewLabel="Swap with dashboard screenshot or video"
            />
            <div className="space-y-7">
              <h3 className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                The Most Powerful Club Management Platform Ever Built.
              </h3>
              <p className="text-base leading-relaxed text-white/72">
                Privana unifies every operational layer of a premium club into one intelligent
                control system built for leadership teams, hospitality teams, and member-facing
                teams.
              </p>
              <ul className="grid gap-3 text-sm sm:grid-cols-2">
                {valuePillars.map((pillar) => (
                  <li key={pillar} className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3">
                    {pillar}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="intelligence" className="section-pad bg-[#f4f0fa]">
          <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-[#191522] sm:text-6xl">
                <span className="text-[#ae89da]">All</span> the tools.
                <br />
                <span className="text-[#5787d8]">None</span> of the admin.
              </h3>
            </div>
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                {aiChips.map((chip, chipIndex) => (
                  <span
                    key={chip}
                    className={`rounded-full px-4 py-2 text-sm text-[#2c2840]/85 shadow-sm ${
                      chipIndex % 2 === 0
                        ? 'border border-[#ded8ec] bg-[#f9f7fc]'
                        : 'border border-[#e8e1f3] bg-[#f1edf8]'
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <FeatureMediaPlaceholder
                title="AI Assistant & Insight Workspace"
                label="AI Product Preview"
                aspectRatio="16 / 9"
                previewLabel="Drop in AI screenshot / short recording"
              />
              <aside className="max-w-xl rounded-[28px] border border-[#d7cee8] bg-[#13111a] p-7 text-[#efebf8] shadow-[0_18px_55px_rgba(21,14,39,0.28)]">
                <p className="text-sm leading-relaxed text-[#efebf8]/90 sm:text-base">
                  Give club leaders real-time insight into member behaviour, operational
                  performance, and retention opportunities — without adding manual reporting
                  overhead.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section id="platform" className="section-pad bg-[#ede7f8]">
          <div className="container-shell space-y-10">
            <h3 className="font-display text-3xl font-medium tracking-[-0.01em] text-[#1a1722] sm:text-4xl">
              Platform Modules
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformModules.map((module) => {
                const Icon = iconMap[module.icon];
                return (
                  <article
                    key={module.title}
                    className="rounded-[24px] border border-[#ddd2ef] bg-[#f8f4ff] px-7 pb-7 pt-7 transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(72,45,112,0.12)]"
                  >
                    <Icon className="mb-5 h-6 w-6 text-[#a68ed0]" />
                    <h4 className="mb-3 text-[1.15rem] font-medium tracking-[-0.01em] text-[#201a2b]">
                      {module.title}
                    </h4>
                    <p className="mb-5 text-sm leading-7 text-[#3d3550]/75">{module.description}</p>
                    <FeatureMediaPlaceholder
                      title={`${module.title} Preview`}
                      label="Module Preview"
                      aspectRatio="16 / 10"
                      glowMode="neutral"
                      previewLabel="Replace with module screenshot"
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="comparison" className="section-pad bg-white">
          <div className="container-shell space-y-9">
            <h3 className="max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-[#191522] sm:text-5xl">
              Built for the Next Generation of Club Operations.
            </h3>
            <div className="overflow-hidden rounded-[28px] border border-[#ded7ea] bg-[#fbfafe]">
              <div className="grid grid-cols-2 border-b border-[#e3dded] text-xs uppercase tracking-[0.15em] text-[#3a324b]/75">
                <div className="px-6 py-4">Legacy Systems</div>
                <div className="bg-[#f2ecfa] px-6 py-4 text-[#272035]">Privana</div>
              </div>
              <div>
                {comparisonRows.map((row) => (
                  <div key={row.legacy} className="grid grid-cols-1 border-t border-[#e8e2f1] sm:grid-cols-2">
                    <div className="px-6 py-4 text-sm text-[#4f455f]/82">{row.legacy}</div>
                    <div className="bg-[#f7f3fd] px-6 py-4 text-sm font-medium text-[#1f1a2b]">
                      {row.modern}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience-preview" className="section-pad bg-[#121018] text-white">
          <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <h3 className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                Member Journeys, Booking Flows, and Revenue Operations — In Motion.
              </h3>
              <p className="text-base leading-relaxed text-white/72">
                Use this section for a full screen recording of your booking experience, member app,
                CRM workflow, or executive reporting sequence.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Perfect placement for future high-impact product film.</li>
                <li>• Supports AWS-hosted MP4 recording and poster frame.</li>
                <li>• Works for both desktop and mobile workflow demonstrations.</li>
              </ul>
            </div>
            <VideoPreviewPlaceholder
              title="Screen Recording Showcase"
              label="Motion Product Preview"
              aspectRatio="16 / 10"
              previewLabel="Attach videoSrc + posterSrc from AWS"
            />
          </div>
        </section>

        <section id="demo" className="section-pad bg-black text-white">
          <div className="container-shell">
            <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-[radial-gradient(circle_at_15%_15%,rgba(98,213,206,0.2),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(175,139,218,0.2),transparent_35%),linear-gradient(160deg,#0f0f15,#0a0a0f)] p-10 text-center shadow-[0_32px_80px_rgba(8,8,12,0.45)] sm:p-14">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
              <div className="relative z-10 flex flex-col gap-7">
                <h3 className="max-w-[16ch] self-center text-pretty text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-[3.15rem]">
                  Your Club Deserves Better Software.
                </h3>
                <p className="mx-auto max-w-2xl text-white/72">
                  Built for clubs that expect more from technology, hospitality, and execution.
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
            <div className="flex justify-start h-[2.5rem] w-[320px] sm:h-[3rem] sm:w-[390px]">
              <PrivanaLogo
                variant="white"
                sizes="(max-width: 640px) 320px, 390px"
                scale={2.1}
              />
            </div>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/55">
              Premium operations infrastructure for modern member-led clubs.
            </p>
          </div>
          <FooterColumn
            title="Information"
            links={[
              { label: 'Club Operations', href: '#platform' },
              { label: 'CRM', href: '#platform' },
              { label: 'Reservations', href: '#platform' },
              { label: 'Membership', href: '#platform' },
              { label: 'Hotel', href: '#platform' },
              { label: 'Inventory', href: '#platform' }
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: 'About', href: '#about' },
              { label: 'Team', href: '#about' },
              { label: 'Careers', href: '#contact' },
              { label: 'Partners', href: '#contact' }
            ]}
          />
          <FooterColumn
            title="Accreditations"
            links={[
              { label: 'GDPR Compliant', href: '#contact' },
              { label: 'SOC 2 Ready', href: '#contact' },
              { label: 'ISO 27001', href: '#contact' }
            ]}
          />
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/55">Follow Us</h4>
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
                <a href="https://x.com/privana" className="text-sm text-white/68 transition hover:text-white">
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
      <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/55">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white/68 transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
