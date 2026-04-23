import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#location", label: "Location" },
  { href: "/#inquire", label: "Inquire" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta-row">
        <div className="footer__cta-row-inner">
          <p className="footer__cta-row-heading">Request the full listing package</p>
          <p className="footer__cta-row-sub">
            Pricing support material, ownership details, and a direct response from the sales team.
          </p>
          <Link
            href="/#inquire"
            className="footer__cta-row-button"
            data-track-click="Request Details"
            data-track-location="footer-cta-row"
            data-open-lead-form="request_details"
          >
            Request Details &rarr;
          </Link>
        </div>
      </div>

      <div className="footer__top">
        <div className="footer__brand">
          <Image
            src="/images/OBLogo.png"
            alt="Ocean Breeze monogram"
            width={36}
            height={36}
            sizes="36px"
            className="footer__logo"
          />
          <p className="footer__brand-copy">Ocean Breeze &middot; Turks &amp; Caicos</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="footer__production">A DMR Media Production</p>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; 2026 Ocean Breeze. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
