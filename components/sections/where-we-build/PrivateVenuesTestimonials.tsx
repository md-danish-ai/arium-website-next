import React from "react";

interface TestimonialCard {
  title?: string;
  description?: string;
  badge?: string;
}

interface PrivateVenuesTestimonialsProps {
  data?: {
    title?: string;
    cards?: TestimonialCard[];
  };
}

const CARD_STYLES = [
  { kpi: "#00b4a0", glow: "0, 180, 160", bg: "var(--color-secondary-teal)" },
  { kpi: "#e8935a", glow: "232, 147, 90", bg: "var(--color-secondary-peach)" }
];

export default function PrivateVenuesTestimonials({ data }: PrivateVenuesTestimonialsProps) {
  const testimonials = data?.cards && data.cards.length > 0 ? data.cards : [
    {
      description: "Fans today want to share their experiences in real-time. Without reliable in-building connectivity, it doesn't matter how great the event is; they feel disconnected. Adding a dedicated small cell network transformed our venue.\"",
      title: "David L.",
      badge: "Director of Operations, Major Sports Arena"
    },
    {
      description: "Our property is a mixed-use development, and tenants expect seamless cellular coverage from the parking garage to the top floor. Custom wireless solutions proved to be the key differentiator for leasing.\"",
      title: "Maria C.",
      badge: "Commercial Real Estate Developer"
    }
  ];

  return (
    <section className="section-light" id="testimonials" style={{ background: "transparent", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true" style={{ opacity: 0.08 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "72px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", maxWidth: "880px", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "What venue operators are saying"}
          </h2>
        </div>
        <div className="tm-row" style={{ maxWidth: "1040px", margin: "0 auto" }}>
          {testimonials.map((card, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return (
              <div key={idx} className={`tm-panel reveal stagger-${idx + 1}`} style={{ "--kpi-color": style.kpi, "--glow-color": style.glow, "--footer-bg": style.bg, "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties}>
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
