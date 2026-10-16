import React from "react";

interface TestimonialCard {
  title?: string;
  description?: string;
  badge?: string;
}

interface RightOfWayTestimonialsProps {
  data?: {
    title?: string;
    cards?: TestimonialCard[];
  };
}

const CARD_STYLES = [
  { kpi: "#00b4a0", glow: "0, 180, 160", bg: "var(--color-secondary-teal)" },
  { kpi: "#7c5cbf", glow: "124, 92, 191", bg: "var(--color-secondary-purple)" }
];

export default function RightOfWayTestimonials({ data }: RightOfWayTestimonialsProps) {
  const testimonials = data?.cards && data.cards.length > 0 ? data.cards : [
    {
      description: "Arium Networks has been a great partner. They understand how important it is to be collaborative and get the right inputs, so that we have a great design.\"",
      title: "Kurt Woehr",
      badge: "Director of RAN Engineering, AT&T"
    },
    {
      description: "Arium Networks has the skills and the techniques to work hand-in-hand with the city and implement a project of this scale.\"",
      title: "Joe Slowik",
      badge: "Director of Operations, Verizon"
    }
  ];

  return (
    <section className="section-light" id="testimonials" style={{ background: "transparent", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true" style={{ opacity: 0.08 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "72px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", maxWidth: "880px", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "What community leaders are saying"}
          </h2>
        </div>
        <div className="tm-row" style={{ maxWidth: "1040px", margin: "0 auto" }}>
          {testimonials.map((card, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return (
              <div key={idx} className={`tm-panel reveal stagger-${idx + 2}`} style={{ "--kpi-color": style.kpi, "--glow-color": style.glow, "--footer-bg": style.bg, "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties}>
                <span className="tm-quote-symbol" style={{ color: "var(--footer-bg)" }}>“</span>
                <p className="tm-panel-text">{card.description}</p>
                <div className="tm-panel-footer">
                  <p className="tm-panel-name">{card.title}</p>
                  <p className="tm-panel-role">{card.badge}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
