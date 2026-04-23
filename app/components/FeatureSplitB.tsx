"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSplitB() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
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
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 0%)", duration: 1, ease: "power3.inOut" },
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
    <section ref={sectionRef} className="split-section split-section--dark split-section--reverse">
      <div ref={contentRef} className="split-section__content">
        <div className="split-section__content-inner">
          <p className="section-eyebrow section-eyebrow--accent">
            The Interiors
          </p>
          <h2 className="section-title section-title--light">
            Light, space,
            <br />
            and refined detail
          </h2>
          <p className="section-body section-body--light">
            Inside, Ocean Breeze opens up to reveal soaring ceilings, warm
            timber cabinetry, and copper pendant lights casting a golden glow
            over the chef&apos;s kitchen. Every room flows seamlessly toward the
            water, and every detail has been considered.
          </p>
          <a
            href="#inquire"
            className="section-link section-link--light"
            data-track-click="Request Details"
            data-track-location="interiors-section"
            data-open-lead-form="request_details"
          >
            Request details &rarr;
          </a>
        </div>
      </div>

      <div ref={mediaRef} className="split-section__media">
        <Image
          src="/images/living2.webp"
          alt="Open great room and kitchen overlooking the water"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="split-section__image"
        />
      </div>
    </section>
  );
}
