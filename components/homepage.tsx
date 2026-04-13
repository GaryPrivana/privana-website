import Image from 'next/image';
import Link from 'next/link';
import {
  CrmIcon,
  HotelIcon,
  InventoryIcon,
  MembershipIcon,
  MenuIcon,
  OperationsIcon,
  ReservationsIcon
} from './icons';
import { aiChips, navItems, platformModules } from './site-data';

const demoLink = '#demo';

const iconMap = {
  operations: OperationsIcon,
  crm: CrmIcon,
  reservations: ReservationsIcon,
  membership: MembershipIcon,
  hotel: HotelIcon,
  inventory: InventoryIcon
} as const;

export function Homepage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30">
        <div className="container-shell py-5">
          <nav
            className="rounded-full border border-white/15 bg-black/60 px-4 py-3 text-white backdrop-blur-xl sm:px-5"
            aria-label="Primary"
          >
            <div className="flex items-center justify-between gap-4">
              <Link href="#top" className="text-sm font-semibold tracking-[0.2em] text-[#66d7d1]">
                PRIVANA
              </Link>

              <ul className="hidden items-center gap-8 text-sm md:flex">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="hidden md:block">
                <Link
                  href={demoLink}
                  className="rounded-full border border-white/35 px-5 py-2 text-xs font-medium tracking-[0.12em] text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  BOOK A DEMO
                </Link>
              </div>

              <details className="group relative md:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <MenuIcon className="h-4 w-4" />
                  Menu
                </summary>
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/20 bg-black/90 p-3 shadow-premium">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={demoLink}
                    className="mt-3 block rounded-xl border border-white/35 px-3 py-2 text-center text-xs font-medium tracking-[0.12em] text-white"
                  >
                    BOOK A DEMO
                  </Link>
                </div>
              </details>
            </div>
          </nav>
        </div>
      </header>

      <main id="top" className="bg-[#f5f3f8]">
        <section id="hero" className="bg-black px-6 pb-24 pt-36 text-white sm:pt-44">
          <div className="container-shell text-center">
            <div className="mx-auto mb-10 h-5 w-5 rotate-45 rounded-sm border border-[#62d5ce] bg-[#62d5ce]/20" />
            <h1 className="mx-auto max-w-3xl text-balance font-display text-5xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-7xl">
              Hi, I&apos;m <span className="text-[#62d5ce]">Privana</span>.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base font-light leading-relaxed text-white/72 sm:text-lg">
              Operational Excellence for the World&apos;s Finest Clubs.
            </p>
            <div className="mt-11">
              <Link
                href={demoLink}
                className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3 text-xs font-medium tracking-[0.14em] text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                BOOK A DEMO <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad bg-[#fbfafe]">
          <div className="container-shell grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <h2 className="max-w-4xl text-balance font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-[#15131b] sm:text-6xl">
              <span className="text-[#af8bda]">Privana</span> is the world leading, fully{' '}
              <span className="text-[#5888d9]">AI powered</span> Club Management Software.
            </h2>
            <p className="max-w-xl self-end justify-self-end text-pretty text-lg leading-relaxed text-[#363042]/75">
              Connect departments, elevate hospitality, and make better decisions with one modern
              system built for premium clubs, private hospitality, and lifestyle-driven communities.
            </p>
          </div>
        </section>

        <section id="solutions" className="section-pad bg-white">
          <div className="container-shell space-y-10 sm:space-y-12">
            <h3 className="font-display text-3xl font-medium tracking-[-0.01em] text-[#131118] sm:text-4xl">
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
                    'https://privana-website-images.s3.amazonaws.com/GRID_arts+and+culture+clubs.png',
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
                  image: 'https://privana-website-images.s3.amazonaws.com/GRID_beach+clubs.png',
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
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-500 ease-out group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 p-6 sm:p-7">
                    <h4 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white sm:text-[1.85rem]">
                      {segment.title}
                    </h4>
                    <ul className="mt-4 space-y-1 text-sm leading-relaxed text-white/80 sm:text-[0.95rem]">
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
              <aside className="max-w-xl rounded-[28px] bg-[#13111a] p-7 text-[#efebf8] shadow-[0_18px_55px_rgba(21,14,39,0.28)]">
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
                    className="rounded-[24px] border border-[#ddd2ef] bg-[#f8f4ff] px-7 pb-8 pt-8 transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(72,45,112,0.12)]"
                  >
                    <Icon className="mb-6 h-6 w-6 text-[#c6b3e2]" />
                    <h4 className="mb-3 text-[1.15rem] font-medium tracking-[-0.01em] text-[#201a2b]">
                      {module.title}
                    </h4>
                    <p className="text-sm leading-7 text-[#3d3550]/75">{module.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="demo" className="section-pad bg-black text-white">
          <div className="container-shell flex flex-col gap-8 rounded-[32px] border border-white/15 bg-white/[0.03] p-10 text-center sm:p-14">
            <h3 className="text-balance font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
              Built for clubs that expect more from their software.
            </h3>
            <p className="text-white/72">Request a personalised walkthrough of Privana.</p>
            <div>
              <Link
                href="https://example.com/book-demo"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-7 py-3 text-xs font-medium tracking-[0.14em] text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                BOOK A DEMO <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-black py-16 text-white">
        <div className="container-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h4 className="mb-3 text-base font-semibold tracking-[0.14em] text-[#62d5ce]">PRIVANA</h4>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
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
            <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-white/55">Follow Us</h4>
            <ul className="space-y-2">
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
      <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-white/55">{title}</h4>
      <ul className="space-y-2">
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
