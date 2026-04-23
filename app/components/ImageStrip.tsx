"use client";

import { useEffect, useRef } from "react";

const stripImages = [
  { src: "/images/rooftop.webp", alt: "Pool and terrace at golden hour" },
  { src: "/images/dock-aerial.webp", alt: "Aerial view of the overwater dock" },
  { src: "/images/kitchen.webp", alt: "Gourmet kitchen with copper pendants" },
  { src: "/images/living.webp", alt: "Living room with sculpted lighting" },
  { src: "/images/dock-sunset.webp", alt: "Golden sunset at the private dock" },
  { src: "/images/living2.webp", alt: "Great room opening to the water" },
  { src: "/images/01-HIGH.webp", alt: "Ocean Breeze waterfront villa exterior" },
  { src: "/images/02-HIGH.webp", alt: "Ocean Breeze villa pool" },
  { src: "/images/03-HIGH.webp", alt: "Ocean Breeze villa terrace" },
  { src: "/images/04-HIGH.webp", alt: "Ocean Breeze villa dock" },
];

// Duplicate for seamless loop
const images = [...stripImages, ...stripImages];

const BASE_SPEED = 0.5; // px per frame at rest
const SCROLL_MULTIPLIER = 0.04;
const HOVER_SPEED = 0.06;
const LERP_FACTOR = 0.08;

export default function ImageStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const targetSpeedRef = useRef(BASE_SPEED);
  const currentSpeedRef = useRef(BASE_SPEED);
  const isHoveredRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstSet = track.querySelectorAll<HTMLElement>(".image-strip__item");
    const itemCount = firstSet.length / 2;
    const itemWidth = firstSet[0]?.offsetWidth ?? 320;
    const gap = 12;
    halfWidthRef.current = (itemWidth + gap) * itemCount;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollYRef.current;
      lastScrollYRef.current = window.scrollY;
      if (!isHoveredRef.current) {
        targetSpeedRef.current = BASE_SPEED + Math.abs(delta) * SCROLL_MULTIPLIER;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      const targetSpeed = isHoveredRef.current ? HOVER_SPEED : targetSpeedRef.current;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * LERP_FACTOR;

      if (targetSpeedRef.current > BASE_SPEED && !isHoveredRef.current) {
        targetSpeedRef.current -= (targetSpeedRef.current - BASE_SPEED) * 0.04;
      }

      posRef.current += currentSpeedRef.current;

      if (posRef.current >= halfWidthRef.current) {
        posRef.current -= halfWidthRef.current;
      }

      if (track) {
        track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="image-strip" aria-label="Property photo reel">
      <div
        className="image-strip__viewport"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div
          ref={trackRef}
          className="image-strip__track"
          aria-hidden="true"
        >
          {images.map((img, i) => (
            <div key={i} className="image-strip__item">
              {/* Using regular img for performance in this infinite scroll context */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="image-strip__image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
