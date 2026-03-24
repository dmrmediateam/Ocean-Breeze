import Image from "next/image";

export default function FeatureSplitA() {
  return (
    <section className="split-section">
      <div className="split-section__media">
        <Image
          src="/images/rooftop.webp"
          alt="Rooftop infinity pool overlooking the sea"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="split-section__image"
        />
      </div>

      <div className="split-section__content">
        <div className="split-section__content-inner">
          <p className="section-eyebrow section-eyebrow--accent">The Rooftop</p>
          <h2 className="section-title">
            An infinity pool
            <br />
            above the sea
          </h2>
          <p className="section-body">
            As the sun dips below the horizon, the rooftop transforms into the
            most coveted seat in Turks &amp; Caicos. A heated infinity pool,
            fire pit lounge, and 360&deg; ocean views, this is where evenings
            begin and end.
          </p>
          <a href="#gallery" className="section-link">
            See all photos &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
