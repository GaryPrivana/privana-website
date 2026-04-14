'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MenuIcon } from './icons';
import { navItems } from './site-data';

type HomepageHeaderProps = {
  demoLink: string;
  heroFontClassName: string;
  heroDemoCtaClass: string;
};

const TOP_THRESHOLD = 20;
const DIRECTION_THRESHOLD = 6;

export function HomepageHeader({
  demoLink,
  heroFontClassName,
  heroDemoCtaClass
}: HomepageHeaderProps) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      const atTop = currentScrollY <= TOP_THRESHOLD;

      setIsAtTop(atTop);

      if (atTop) {
        setScrollDirection('up');
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        setScrollDirection(delta > 0 ? 'down' : 'up');
        lastScrollY = currentScrollY;
      }
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeader();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isVisible = isAtTop || scrollDirection === 'up';
  const hasFrostedStyle = !isAtTop;

  const headerModeClass = hasFrostedStyle
    ? 'border-b border-black/10 bg-white/92 shadow-[0_10px_30px_rgba(16,19,26,0.14)] backdrop-blur-xl'
    : 'border-b border-transparent bg-transparent';

  const navTextClass = hasFrostedStyle
    ? 'text-[#1a1f2a]/82 hover:text-[#10131a]'
    : 'text-white/68 hover:text-white';
  const navFocusOffsetClass = hasFrostedStyle
    ? 'focus-visible:ring-offset-white/90'
    : 'focus-visible:ring-offset-black';

  const topCtaClass = hasFrostedStyle
    ? 'inline-flex items-center justify-center rounded-full bg-[#10131a] px-8 py-3 text-xs font-semibold tracking-[0.1em] text-white transition duration-300 hover:bg-[#1b2030] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10131a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
    : heroDemoCtaClass;

  const menuSummaryClass = hasFrostedStyle
    ? 'border border-black/15 text-[#111827] hover:text-[#0b0f19] focus-visible:ring-black/40'
    : 'border border-white/20 text-white/90 hover:text-white focus-visible:ring-white/70';

  const mobilePanelClass = hasFrostedStyle
    ? 'border-black/10 bg-white/95 shadow-[0_16px_42px_rgba(16,19,26,0.16)] backdrop-blur-xl'
    : 'border-white/20 bg-black/90 shadow-premium';

  const mobileLinkClass = hasFrostedStyle
    ? 'text-[#1b2230]/80 hover:bg-black/[0.04] hover:text-[#10131a]'
    : 'text-white/80 hover:bg-white/10 hover:text-white';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transform-gpu transition-all duration-500 ease-out ${heroFontClassName} ${headerModeClass} ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-[118%] opacity-0 pointer-events-none'
      }`}
    >
      <div className="container-shell py-4 sm:py-5">
        <nav className="px-1" aria-label="Primary">
          <div className="flex items-center justify-between gap-4">
            <Link href="#top" className="text-sm font-semibold tracking-[0.2em] text-[#74cbc5]">
              PRIVANA
            </Link>

            <ul className="hidden items-center gap-10 text-sm font-medium md:flex">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/60 focus-visible:ring-offset-2 ${navTextClass} ${navFocusOffsetClass}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Link href={demoLink} className={topCtaClass}>
                BOOK A DEMO
              </Link>
            </div>

            <details className="group relative md:hidden">
              <summary
                className={`flex cursor-pointer list-none items-center gap-2 rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 ${menuSummaryClass}`}
              >
                <MenuIcon className="h-4 w-4" />
                Menu
              </summary>
              <div
                className={`absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border p-3 ${mobilePanelClass}`}
              >
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-3 py-2 text-sm transition ${mobileLinkClass}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={demoLink} className={`${topCtaClass} mt-3 flex w-full`}>
                  BOOK A DEMO
                </Link>
              </div>
            </details>
          </div>
        </nav>
      </div>
    </header>
  );
}
