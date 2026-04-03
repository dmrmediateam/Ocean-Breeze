"use client";

import { useRef, useState } from "react";

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 14h4l5 4V6L8 10H4v4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 9 21 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 9 17 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 14h4l5 4V6L8 10H4v4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.5a3.5 3.5 0 0 1 0 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.5 7a7 7 0 0 1 0 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMuted = () => {
    if (!videoRef.current) {
      return;
    }

    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="hero" id="top">
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__copy">
          <p className="hero__eyebrow hero__animated">Turks &amp; Caicos Islands</p>
          <h1 className="hero__title">
            <span className="hero__title-line hero__animated">Ocean</span>
            <span
              className="hero__title-line hero__title-line--italic hero__animated"
              style={{ animationDelay: "0.3s" }}
            >
              Breeze
            </span>
          </h1>
          <p
            className="hero__subline hero__animated"
            style={{ animationDelay: "0.45s" }}
          >
            Waterfront Villa &middot; Chalk Sound &middot; 5 Bedrooms
          </p>
          <div
            className="hero__price hero__animated"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="hero__price-label">Offered at</p>
            <p className="hero__price-value">$6,500,000</p>
            <p className="hero__price-meta">
              6,000 interior sq ft &middot; built 2022
            </p>
          </div>
          <p
            className="hero__lead hero__animated"
            style={{ animationDelay: "0.75s" }}
          >
            A newly built waterfront estate in Chalk Sound with cinematic ocean
            views, a private dock, pool, terrace, and the level of privacy
            serious buyers rarely find on Providenciales.
          </p>
          <div
            className="hero__cta-group hero__animated"
            style={{ animationDelay: "0.9s" }}
          >
            <a
              href="#inquire"
              className="hero__cta hero__cta--primary"
              data-track-click="Request Details"
              data-track-location="hero"
              data-open-lead-form="request_details"
            >
              Request Details
            </a>
            <a
              href="#inquire"
              className="hero__cta hero__cta--secondary"
              data-track-click="Schedule a Showing"
              data-track-location="hero"
              data-open-lead-form="schedule_showing"
            >
              Schedule a Showing
            </a>
          </div>
        </div>

        <div className="hero__actions">
          <button
            type="button"
            className="hero__sound-toggle"
            onClick={toggleMuted}
            aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
          >
            {isMuted ? <MutedIcon /> : <UnmutedIcon />}
          </button>

          <a href="#property" className="hero__scroll-indicator">
            <span className="hero__scroll-line" />
            <span className="hero__scroll-text">scroll</span>
          </a>
        </div>
      </div>
    </section>
  );
}
