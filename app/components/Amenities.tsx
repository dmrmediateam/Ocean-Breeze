"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Amenity = {
  label: string;
  icon: ReactNode;
};

const amenities: Amenity[] = [
  {
    label: "Pool",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 9c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3 15c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Terrace",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 7h16M6 12h12M8 17h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Overwater Dock",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3v9m0 0 4-4m-4 4-4-4M8 14a4 4 0 0 0 8 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 19c2 1.3 4 1.3 6 0s4-1.3 6 0 4 1.3 6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Fire Pit Lounge",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4c2.5 2 3.8 4.1 3.8 6.4A3.8 3.8 0 0 1 12 14.2a3.8 3.8 0 0 1-3.8-3.8c0-1.5.6-2.9 1.9-4.3.1 1.4.5 2.4 1.1 3.1C12 7.9 12.4 6.1 12 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M7 19h10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Gourmet Kitchen",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 4v7M9 4v7M6 7h3M14 4v16M18 4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-1V4h1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Wine Wall",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 4h8v2a4 4 0 0 1-8 0V4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 10v6m-3 3h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Sauna",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 14h12v4H6v-4Zm2-5v3m4-5v5m4-3v3M9 21h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Smart Lighting",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9 18h6m-5 3h4m-6-8a5 5 0 1 1 8 0c-.9.9-1.5 2-1.8 3h-4.4c-.3-1-.9-2.1-1.8-3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Ocean Views",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    label: "Outdoor BBQ",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 11h12l-1 4H7l-1-4Zm2 4-1 5m9-5 1 5M9 7a3 3 0 1 1 6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Concierge Service",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 15h14m-12 0a5 5 0 1 1 10 0M12 6v2m-7 10h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Private Parking",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 15h12l-1.5-5h-9L6 15Zm1 0-1 3m11-3 1 3M8 18a1 1 0 1 0 0 .01M16 18a1 1 0 1 0 0 .01"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;
    if (!section || !content || !grid) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      tl.fromTo(
        content,
        { x: -48, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      ).fromTo(
        grid.querySelectorAll(".amenities__item"),
        { scale: 0.7, opacity: 0, y: 16 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.06,
        },
        "-=0.4",
      );

      return () => tl.kill();
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [content, grid.querySelectorAll(".amenities__item")],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="amenities" id="amenities">
      <div className="amenities__inner">
        <div ref={contentRef} className="amenities__content">
          <p className="section-eyebrow section-eyebrow--accent">
            Everything you need
          </p>
          <h2 className="section-title">
            Thoughtfully designed
            <br />
            for exceptional ownership
          </h2>
          <p className="section-body">
            From the chef&apos;s kitchen to the pool and terrace, every element
            of Ocean Breeze has been chosen to elevate refined waterfront
            living.
          </p>
        </div>

        <div ref={gridRef} className="amenities__grid">
          {amenities.map((item) => (
            <div key={item.label} className="amenities__item">
              <div className="amenities__icon">{item.icon}</div>
              <p className="amenities__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
