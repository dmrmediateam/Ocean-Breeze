"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#gallery", label: "Gallery" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#enquire", label: "Enquire" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className={`navbar ${isScrolled ? "is-scrolled" : ""} ${
        isMenuOpen ? "is-menu-open" : ""
      }`}
    >
      <div className="navbar__inner">
        <a className="navbar__brand" href="#top" aria-label="Ocean Breeze home">
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
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href="#enquire" className="navbar__reserve">
            Request Details
          </a>
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
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#enquire"
            className="navbar__mobile-reserve"
            onClick={() => setIsMenuOpen(false)}
          >
            Request Details
          </a>
        </nav>
      </div>
    </header>
  );
}
