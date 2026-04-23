const stats = [
  {
    value: "1 of 12",
    label: "Waterfront lots in Chalk Sound",
    description: "Exceptional scarcity on the most coveted stretch of coast in the Caribbean.",
  },
  {
    value: "180°",
    label: "Unobstructed ocean views",
    description: "Panoramic sightlines from every primary living space and the rooftop terrace.",
  },
  {
    value: "0%",
    label: "Income tax — Turks & Caicos",
    description: "No income, capital gains, or inheritance tax. The most favourable tax environment in the region.",
  },
  {
    value: "94%",
    label: "Average rental occupancy",
    description: "Chalk Sound luxury villas consistently outperform the regional rental market.",
  },
];

export default function InvestmentStats() {
  return (
    <section className="investment-stats" id="investment">
      <div className="investment-stats__inner">
        <div className="investment-stats__header">
          <p className="section-eyebrow section-eyebrow--accent">The Investment</p>
          <h2 className="investment-stats__title">
            By every measure,
            <br />
            <em>an exceptional asset</em>
          </h2>
        </div>

        <div className="investment-stats__grid">
          {stats.map((stat) => (
            <div key={stat.value} className="investment-stats__card">
              <p className="investment-stats__value">{stat.value}</p>
              <p className="investment-stats__label">{stat.label}</p>
              <p className="investment-stats__desc">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
