import Script from "next/script";

const stats = [
  { value: "$6,500,000", label: "Listing Price" },
  { value: "6,000 sq ft", label: "Interior Space" },
  { value: "2022", label: "Built" },
];

export default function VideoFeature() {
  return (
    <section className="video-feature" id="property">
      <div className="video-feature__intro">
        <p className="section-eyebrow section-eyebrow--accent">The Property</p>
        <h2 className="video-feature__heading">See the estate in motion</h2>
      </div>

      <div className="video-feature__frame" data-video-feature data-playing="false">
        <video
          className="video-feature__video"
          controls
          playsInline
          preload="metadata"
          poster="/images/rooftop.webp"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <button
          type="button"
          className="video-feature__overlay"
          data-video-overlay
          aria-label="Play showcase video"
        >
          <span className="video-feature__overlay-icon" aria-hidden="true" />
        </button>
      </div>

      <div className="video-feature__stats" aria-label="Property highlights">
        {stats.map((stat) => (
          <div key={stat.value} className="video-feature__stat">
            <p className="video-feature__stat-value">{stat.value}</p>
            <p className="video-feature__stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <Script id="video-feature-controls" strategy="afterInteractive">
        {`
          (() => {
            const roots = document.querySelectorAll("[data-video-feature]");
            roots.forEach((root) => {
              const video = root.querySelector("video");
              const button = root.querySelector("[data-video-overlay]");
              if (!(video instanceof HTMLVideoElement) || !(button instanceof HTMLButtonElement)) {
                return;
              }

              const syncState = () => {
                root.dataset.playing = String(!video.paused && !video.ended);
              };

              button.addEventListener("click", async () => {
                if (video.paused) {
                  try {
                    await video.play();
                  } catch (_error) {
                    syncState();
                  }
                  return;
                }
                video.pause();
              });

              video.addEventListener("play", syncState);
              video.addEventListener("pause", syncState);
              video.addEventListener("ended", syncState);
              syncState();
            });
          })();
        `}
      </Script>
    </section>
  );
}
