"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSplitA() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!section || !media || !content) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      });

      tl.fromTo(
        media,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" },
      )
        .fromTo(
          media.querySelector("img"),
          { scale: 1.1 },
          { scale: 1, duration: 1.2, ease: "power2.out" },
          "<",
        )
        .fromTo(
          content.querySelectorAll(".section-eyebrow, .section-title, .section-body, .section-link"),
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.6",
        );

      return () => tl.kill();
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="split-section">
      <div ref={mediaRef} className="split-section__media">
        <Image
          ref={imageRef}
          src="/images/rooftop.webp"
          alt="Pool and terrace overlooking the sea"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="split-section__image"
        />
      </div>

      <div ref={contentRef} className="split-section__content">
        <div className="split-section__content-inner">
          <p className="section-eyebrow section-eyebrow--accent">The Terrace</p>
          <h2 className="section-title">
            A terrace
            <br />
            open to the sea
          </h2>
          <p className="section-body">
            As the sun dips below the horizon, the terrace becomes one of the
            most inviting spaces at Ocean Breeze. A pool, fire pit lounge, and
            sweeping ocean views set the tone for long afternoons and relaxed
            evenings.
          </p>
          <a href="#gallery" className="section-link">
            See all photos &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
