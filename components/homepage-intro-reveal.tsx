"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);


type HomepageIntroRevealProps = {
  heroFontClassName: string;
};

export function HomepageIntroReveal({ heroFontClassName }: HomepageIntroRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const fragmentRef = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const line5Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const brand = brandRef.current;
    const fragment = fragmentRef.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const line4 = line4Ref.current;
    const line5 = line5Ref.current;
    const copy = copyRef.current;

    if (!section || !brand || !fragment || !line2 || !line3 || !line4 || !line5 || !copy) return;

    const revealTargets = [fragment, line2, line3, line4, line5, copy];
    const brandSettleX = () => Math.min(96, Math.max(48, window.innerWidth * 0.055));

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(brand, { autoAlpha: 0, x: brandSettleX, y: "1.35em", scale: 1.12, transformOrigin: "left center" });
        gsap.set(revealTargets, { autoAlpha: 0, y: "0.28em" });
        gsap.set(copy, { y: "1.25rem" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            end: "top 22%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(brand, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0)
          .to(brand, { x: 0, scale: 1, duration: 0.16, ease: "power2.inOut" }, 0.2)
          .to(fragment, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.34)
          .to(line2, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.42)
          .to(line3, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.5)
          .to(line4, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.58)
          .to(line5, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.66)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.09, ease: "power2.out" }, 0.76)
          .to({}, { duration: 0.15 }, 0.85);

        let active = true;
        const refresh = () => {
          if (!active) return;
          if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
          rafRef.current = window.requestAnimationFrame(() => {
            if (!active) return;
            rafRef.current = 0;
            ScrollTrigger.refresh();
          });
        };

        window.addEventListener("resize", refresh);
        window.addEventListener("orientationchange", refresh);
        document.fonts?.ready.then(refresh);
        refresh();

        return () => {
          active = false;
          window.removeEventListener("resize", refresh);
          window.removeEventListener("orientationchange", refresh);
          if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });
    }, section);

    return () => {
      mm.revert();
      context.revert();
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`homepage-intro-reveal bg-[#fbfafe] ${heroFontClassName}`}
      aria-labelledby="homepage-intro-heading"
    >
      <div ref={sceneRef} className="homepage-intro-sticky section-pad">
        <div className="homepage-intro-layout container-shell grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <h2
            id="homepage-intro-heading"
            className="homepage-intro-heading max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-[#111017] sm:text-6xl"
          >
            <span className="homepage-intro-line homepage-intro-line-primary">
              <span ref={brandRef} className="homepage-intro-brand text-[#af8bda]">Privana</span>{" "}
              <span ref={fragmentRef} className="homepage-intro-fragment">is the</span>
            </span>
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            <span ref={line2Ref} className="homepage-intro-line homepage-intro-line-2">world leading, fully</span>
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            <span ref={line3Ref} className="homepage-intro-line homepage-intro-line-3">
              <span className="text-[#5888d9]">AI powered</span> Club
            </span>
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            <span ref={line4Ref} className="homepage-intro-line homepage-intro-line-4">Management</span>
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            <span ref={line5Ref} className="homepage-intro-line homepage-intro-line-5">Software</span>
          </h2>
          <p ref={copyRef} className="homepage-intro-copy max-w-xl justify-self-end text-pretty text-xl leading-relaxed text-[#201a2d]/92">
            Connect departments, elevate hospitality, and make better
            decisions with one modern system built for premium clubs, private
            hospitality, and lifestyle-driven communities.
          </p>
        </div>
      </div>
    </section>
  );
}
