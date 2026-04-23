"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicBreak() {
  // Outer wrapper is the scroll-travel container (CSS sticky approach).
  // GSAP scrubs values only — never moves DOM nodes — so React stays happy.
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const image = imageRef.current;
    const quote = quoteRef.current;
    if (!wrap || !image || !quote) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        image,
        { scale: 1.05 },
        { scale: 1.2, ease: "none" },
        0,
      ).fromTo(
        quote,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 },
        0.3,
      );

      return () => tl.kill();
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        quote,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 80%",
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    // Tall wrapper gives scroll travel distance; inner section stays sticky
    <div ref={wrapRef} className="cinematic-break-wrap" aria-label="Quote break">
      <section className="cinematic-break">
        <div ref={imageRef} className="cinematic-break__image" />
        <div className="cinematic-break__overlay" />
        <blockquote className="cinematic-break__content">
          <p ref={quoteRef} className="cinematic-break__quote">
            &ldquo;Some places you visit. This one you never leave.&rdquo;
          </p>
        </blockquote>
      </section>
    </div>
  );
}
