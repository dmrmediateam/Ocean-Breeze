import Image from "next/image";

export default function FeatureSplitA() {
  return (
    <section className="split-section">
      <div className="split-section__media">
        <Image
          src="/images/rooftop.webp"
          alt="Pool and terrace overlooking the sea"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="split-section__image"
        />
      </div>

      <div className="split-section__content">
        <div className="split-section__content-inner">
          <p className="section-eyebrow section-eyebrow--accent">The Terrace</p>
          <h2 className="section-title">
            A terrace
            <br />
            open to the sea
          </h2>
          <p className="section-body">
            As the sun dips below the horizon, the terrace becomes one of the
            most inviting spaces at Ocean Breeze. A pool, fire pit lounge, and
            sweeping ocean views set the tone for long afternoons and relaxed
            evenings.
          </p>
          <a href="#gallery" className="section-link">
            See all photos &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
