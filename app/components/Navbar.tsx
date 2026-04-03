"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#location", label: "Location" },
  { href: "/#inquire", label: "Inquire" },
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
        <Link className="navbar__brand" href="/" aria-label="Ocean Breeze home">
          <Image
            src="/images/OBLogo.png"
            alt="Ocean Breeze monogram"
            width={40}
            height={40}
            priority
            sizes="40px"
            className="navbar__brand-image"
          />
        </Link>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="navbar__link">
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
