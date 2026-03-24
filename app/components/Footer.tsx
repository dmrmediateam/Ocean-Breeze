import Image from "next/image";

const footerLinks = [
  { href: "#gallery", label: "Gallery" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#enquire", label: "Enquire" },
];

export default function Footer() {
  return (
    <footer className="footer">
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
            <a key={link.href} href={link.href} className="footer__link">
              {link.label}
            </a>
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
