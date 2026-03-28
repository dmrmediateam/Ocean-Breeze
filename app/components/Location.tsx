const locationStats = [
  { value: "15 min", label: "Providenciales Airport" },
  { value: "5 min", label: "Sapodilla Bay Beach" },
  { value: "#1 Rated", label: "Caribbean Beach" },
];

const propertyAddress =
  "Ocean Breeze Villa, 245 Chalk Sound Dr, TKCA 1ZZ, Turks & Caicos Islands";
const mapQuery = encodeURIComponent(propertyAddress);

export default function Location() {
  return (
    <section className="location" id="location">
      <div className="location__intro">
        <p className="section-eyebrow section-eyebrow--accent">Location</p>
        <h2 className="location__title">Turks &amp; Caicos Islands</h2>
        <p className="section-body location__body">
          Situated on one of the most spectacular stretches of coastline in the
          Caribbean, Ocean Breeze places you just 5 minutes from Sapodilla Bay
          Beach and only 15 minutes from Providenciales International Airport.
        </p>
      </div>

      <div className="location__image-wrap">
        <iframe
          title="Map showing Ocean Breeze villa in Chalk Sound"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="location__map-surface"
        />

        <div className="location__stats">
          {locationStats.map((stat) => (
            <div key={stat.value} className="location__stat">
              <p className="location__stat-value">{stat.value}</p>
              <p className="location__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="location__map-actions">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noreferrer"
          className="section-link location__map-link"
        >
          Open in maps &rarr;
        </a>
        <div className="location__address-block">
          <p className="location__map-label">Property Address</p>
          <p className="location__map-address">{propertyAddress}</p>
        </div>
      </div>
    </section>
  );
}
