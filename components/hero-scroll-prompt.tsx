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
      className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-sm font-medium tracking-[0.06em] text-white/70 transition-all duration-500 hover:text-white ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      } ${className ?? ''}`}
    >
      <span className="hero-scroll-drift inline-flex items-center gap-2">
        <span>See the future of club operations</span>
        <span aria-hidden="true">↓</span>
      </span>
    </button>
  );
}
