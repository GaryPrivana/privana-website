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
import { aiChips, clubSegments, navItems, platformModules } from './site-data';

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
            className="rounded-full border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-xl sm:px-5"
            aria-label="Primary"
          >
            <div className="flex items-center justify-between gap-4">
              <Link href="#top" className="text-lg font-semibold tracking-wide">
                Privana
              </Link>

              <ul className="hidden items-center gap-8 text-sm md:flex">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="hidden md:block">
                <Link
                  href={demoLink}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-base-900 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Request a Demo
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
                    className="mt-3 block rounded-xl bg-white px-3 py-2 text-center text-sm font-medium text-base-900"
                  >
                    Request a Demo
                  </Link>
                </div>
              </details>
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        <section
          id="hero"
          className="relative overflow-hidden bg-base-900 bg-hero pb-20 pt-36 text-white sm:pt-44"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-20 top-16 h-80 w-80 rounded-full bg-accent-gold/30 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[130px]" />
          </div>
          <div className="container-shell relative">
            <div className="max-w-3xl space-y-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                Premium Club Management Platform
              </p>
              <h1 className="text-balance font-display text-4xl font-medium leading-tight sm:text-6xl">
                The Operating System for Modern Private Clubs.
              </h1>
              <p className="max-w-2xl text-pretty text-lg text-white/75 sm:text-xl">
                Operational excellence across members, bookings, hospitality,
                finance, CRM, and club experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={demoLink}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-base-900 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base-900"
                >
                  Request a Demo
                </Link>
                <Link
                  href="#platform"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base-900"
                >
                  Explore the Platform
                </Link>
              </div>
              <p className="text-sm text-white/65">
                Built for ambitious clubs delivering exceptional member
                experiences.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad bg-base-50">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <h2 className="text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
              Privana is a modern club management platform built for the world’s
              most service-driven clubs.
            </h2>
            <p className="max-w-xl self-end text-lg leading-relaxed text-base-900/70">
              Unify operations, elevate member experience, and reduce admin
              across every department.
            </p>
          </div>
        </section>

        <section id="solutions" className="section-pad bg-white">
          <div className="container-shell space-y-12">
            <h3 className="font-display text-3xl font-medium sm:text-4xl">
              Tailored Exclusively for Your Club
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clubSegments.map((segment) => (
                <article
                  key={segment.title}
                  className="group relative h-72 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={segment.image}
                    alt={segment.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
                  <div className="absolute inset-x-4 bottom-4">
                    <h4 className="text-lg font-medium text-white">{segment.title}</h4>
                    <p className="mt-1 text-sm text-white/75">{segment.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="intelligence" className="section-pad bg-base-100">
          <div className="container-shell grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-balance font-display text-3xl font-medium sm:text-5xl">
                All the tools. None of the admin.
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {aiChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-base-900/10 bg-white px-4 py-2 text-sm text-base-900/80 shadow-sm transition hover:-translate-y-0.5"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <aside className="rounded-2xl bg-base-900 p-6 text-base-100 shadow-premium">
                <p className="text-sm leading-relaxed text-base-100/85">
                  Give club leaders real-time insight into member behaviour,
                  operational performance, and retention opportunities.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section id="platform" className="section-pad bg-white">
          <div className="container-shell space-y-10">
            <h3 className="font-display text-3xl font-medium sm:text-4xl">Platform Modules</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformModules.map((module) => {
                const Icon = iconMap[module.icon];
                return (
                  <article
                    key={module.title}
                    className="rounded-2xl border border-base-100 bg-base-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-premium"
                  >
                    <Icon className="mb-4 h-6 w-6 text-accent-gold" />
                    <h4 className="mb-3 text-xl font-medium">{module.title}</h4>
                    <p className="text-sm leading-relaxed text-base-900/70">
                      {module.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="demo" className="section-pad bg-base-900 text-white">
          <div className="container-shell flex flex-col gap-8 rounded-3xl border border-white/15 bg-white/5 p-10 text-center sm:p-14">
            <h3 className="text-balance font-display text-3xl font-medium sm:text-4xl">
              Built for clubs that expect more from their software.
            </h3>
            <p className="text-white/75">
              Request a personalised walkthrough of Privana.
            </p>
            <div>
              <Link
                href="https://example.com/book-demo"
                className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-base-900 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base-900"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-black py-16 text-white">
        <div className="container-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h4 className="mb-3 text-lg font-semibold">Privana</h4>
            <p className="text-sm text-white/60">
              Premium operations infrastructure for modern member-led clubs.
            </p>
          </div>
          <FooterColumn
            title="Platform"
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
            title="Compliance"
            links={[
              { label: 'GDPR', href: '#contact' },
              { label: 'SOC 2', href: '#contact' },
              { label: 'ISO 27001', href: '#contact' }
            ]}
          />
          <div>
            <h4 className="mb-3 text-sm uppercase tracking-[0.18em] text-white/70">
              Contact
            </h4>
            <a
              href="mailto:hello@privana.club"
              className="text-sm text-white/80 transition hover:text-white"
            >
              hello@privana.club
            </a>
            <ul className="mt-5 flex gap-3" aria-label="Social links">
              <li>
                <a
                  href="https://www.linkedin.com/company/privana"
                  aria-label="Privana on LinkedIn"
                  className="card-glass inline-flex rounded-full px-3 py-1 text-xs transition hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/privana"
                  aria-label="Privana on X"
                  className="card-glass inline-flex rounded-full px-3 py-1 text-xs transition hover:text-white"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/privana"
                  aria-label="Privana on Instagram"
                  className="card-glass inline-flex rounded-full px-3 py-1 text-xs transition hover:text-white"
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
      <h4 className="mb-3 text-sm uppercase tracking-[0.18em] text-white/70">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white/80 transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
