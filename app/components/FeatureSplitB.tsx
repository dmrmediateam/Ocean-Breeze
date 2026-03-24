import Image from "next/image";

export default function FeatureSplitB() {
  return (
    <section className="split-section split-section--dark split-section--reverse">
      <div className="split-section__content">
        <div className="split-section__content-inner">
          <p className="section-eyebrow section-eyebrow--accent">
            The Interiors
          </p>
          <h2 className="section-title section-title--light">
            Light, space,
            <br />
            and refined detail
          </h2>
          <p className="section-body section-body--light">
            Inside, Ocean Breeze opens up to reveal soaring ceilings, warm
            timber cabinetry, and copper pendant lights casting a golden glow
            over the chef&apos;s kitchen. Every room flows seamlessly toward the
            water, and every detail has been considered.
          </p>
          <a href="#enquire" className="section-link section-link--light">
            Request details &rarr;
          </a>
        </div>
      </div>

      <div className="split-section__media">
        <Image
          src="/images/living2.webp"
          alt="Open great room and kitchen overlooking the water"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="split-section__image"
        />
      </div>
    </section>
  );
}
