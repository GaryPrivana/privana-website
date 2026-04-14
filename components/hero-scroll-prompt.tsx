'use client';

import { useEffect, useState } from 'react';

type HeroScrollPromptProps = {
  targetId: string;
  className?: string;
};

export function HeroScrollPrompt({ targetId, className }: HeroScrollPromptProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 80);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
      aria-label="Scroll to next section"
      className={`absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-sm font-medium tracking-[0.04em] text-white/52 transition-all duration-700 ease-out hover:text-white/72 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      } ${className ?? ''}`}
    >
      <span className="hero-scroll-drift inline-flex items-center gap-2">
        <span>Explore the future of club operations</span>
        <span aria-hidden="true" className="text-white/60">
          ↓
        </span>
      </span>
    </button>
  );
}
