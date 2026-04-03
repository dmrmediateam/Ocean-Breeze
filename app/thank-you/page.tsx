import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Thank You · Ocean Breeze",
  description:
    "Thank you for your interest in Ocean Breeze. The sales team will follow up shortly with the next steps.",
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar alwaysSolid />
      <main className="thank-you-page">
        <section className="thank-you-hero">
          <div className="thank-you-hero__ambient thank-you-hero__ambient--left" />
          <div className="thank-you-hero__ambient thank-you-hero__ambient--right" />

          <div className="thank-you-hero__inner">
            <div className="thank-you-hero__copy">
              <p className="section-eyebrow">Inquiry Received</p>
              <h1 className="thank-you-hero__title">
                Thank you. We&apos;ll be in touch shortly.
              </h1>
              <p className="thank-you-hero__body">
                Your inquiry has been received. A member of the Ocean Breeze team
                will follow up directly with the appropriate next steps and any
                additional information you may need.
              </p>

              <div className="thank-you-hero__actions">
                <Link
                  href="/"
                  className="thank-you-hero__cta thank-you-hero__cta--primary"
                >
                  Return to Ocean Breeze
                </Link>
                <Link
                  href="/#gallery"
                  className="thank-you-hero__cta thank-you-hero__cta--secondary"
                >
                  Explore the Gallery
                </Link>
              </div>
            </div>

            <div className="thank-you-hero__panel">
              <div className="thank-you-hero__image-wrap">
                <Image
                  src="/images/dock-sunset.webp"
                  alt="Ocean Breeze villa at sunset"
                  fill
                  priority
                  sizes="(max-width: 1024px) 44vw, 36vw"
                  className="thank-you-hero__image"
                />
              </div>

              <div className="thank-you-hero__panel-copy">
                <p className="thank-you-hero__panel-kicker">Next</p>
                <p className="thank-you-hero__panel-title">
                  We&apos;ll continue the conversation personally.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
