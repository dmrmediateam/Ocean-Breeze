"use client";

import { useEffect, useRef, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show after scrolling 80vh past the hero
    const heroThreshold = window.innerHeight * 0.8;

    const onScroll = () => {
      setVisible(window.scrollY > heroThreshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide when the enquiry section is visible
    const inquireEl = document.getElementById("inquire");
    if (!inquireEl) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
        } else {
          setVisible(window.scrollY > heroThreshold);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(inquireEl);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <div
        className={`floating-cta ${visible ? "floating-cta--visible" : ""}`}
        aria-hidden={!visible}
      >
        <a
          href="#inquire"
          className="floating-cta__button"
          data-track-click="Request Details"
          data-track-location="floating-cta"
          data-open-lead-form="request_details"
          tabIndex={visible ? 0 : -1}
        >
          Request Details
        </a>
      </div>
    </>
  );
}
