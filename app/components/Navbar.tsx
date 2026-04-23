"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/#gallery", label: "Gallery", sectionId: "gallery" },
  { href: "/#amenities", label: "Amenities", sectionId: "amenities" },
  { href: "/#location", label: "Location", sectionId: "location" },
  { href: "/#inquire", label: "Inquire", sectionId: "inquire" },
];

export default function Navbar({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`navbar ${alwaysSolid ? "is-scrolled" : ""} ${
        isScrolled ? "is-scrolled" : ""
      } ${
        isMenuOpen ? "is-menu-open" : ""
      }`}
    >
      <div className="navbar__inner">
        <a
          className="navbar__brand"
          href="/#top"
          aria-label="Ocean Breeze — scroll to top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/images/OBLogo.png"
            alt="Ocean Breeze monogram"
            width={40}
            height={40}
            priority
            sizes="40px"
            className="navbar__brand-image"
          />
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeSection === link.sectionId ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link
            href="/#inquire"
            className="navbar__reserve"
            data-track-click="Request Details"
            data-track-location="navbar"
            data-open-lead-form="request_details"
          >
            Request Details
          </Link>
          <button
            type="button"
            className="navbar__toggle"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
          </button>
        </div>
      </div>

      <div className="navbar__mobile">
        <nav className="navbar__mobile-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#inquire"
            className="navbar__mobile-reserve"
            data-track-click="Request Details"
            data-track-location="navbar-mobile"
            data-open-lead-form="request_details"
            onClick={() => setIsMenuOpen(false)}
          >
            Request Details
          </Link>
        </nav>
      </div>
    </header>
  );
}
