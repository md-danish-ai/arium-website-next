import React from "react";

interface TestimonialCard {
  personName: string;
  personMessage: string;
  personDesignation: string;
  cardfooterBg?: string; // hex color e.g. "#bcf6f2"
}

interface SharedTestimonialsProps {
  heading?: string;
  description?: string;
  cards: TestimonialCard[];
}

// Cycling footer bg colors matching the existing site palette (CSS variable or hex)
const FOOTER_STYLES = [
  { bg: "var(--color-secondary-teal)",   glow: "0, 180, 160" },
  { bg: "var(--color-secondary-purple)", glow: "139, 111, 230" },
  { bg: "var(--color-secondary-peach)",  glow: "232, 147, 90" },
  { bg: "var(--color-secondary-yellow)", glow: "235, 210, 0" },
];

export default function SharedTestimonials({ heading, description, cards }: SharedTestimonialsProps) {
  if (!cards || cards.length === 0) return null;

  // Width adapts: 1-2 cards = wider (max-width 1040px), 3+ = full width multi-col
  const isWideLayout = cards.length <= 2;
  const cols = Math.min(cards.length, 4);

  return (
    // Wrap in row-storyteller-flow so it gets the same radial gradient light background
    <div className="row-storyteller-flow">
      <section
        className="section-light"
        id="testimonials"
        style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}
      >
        <div className="infra-grid-bg" aria-hidden="true" style={{ opacity: 0.08 }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {(heading || description) && (
            <div className="section-header text-center" style={{ marginBottom: "72px" }}>
              {heading && (
                <h2
                  className="section-title reveal stagger-1"
                  style={{ fontWeight: 400, letterSpacing: "0.06em", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}
                >
                  {heading}
                </h2>
              )}
              {description && (
                <p
                  className="section-description reveal stagger-2"
                  style={{ maxWidth: "680px", margin: "16px auto 0", color: "#162047" }}
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Use the exact same tm-row / tm-panel classes as original components */}
          <div
            className="tm-row"
            style={{
              display: "grid",
              maxWidth: isWideLayout ? "1040px" : "100%",
              margin: "0 auto",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: cols >= 3 ? "24px" : "32px",
            } as React.CSSProperties}
          >
            {cards.map((card, idx) => {
              const fallback = FOOTER_STYLES[idx % FOOTER_STYLES.length];
              const footerBg = card.cardfooterBg || fallback.bg;
              const glowColor = fallback.glow;

              return (
                <div
                  key={idx}
                  className={`tm-panel reveal stagger-${(idx % 4) + 1}`}
                  style={{
                    "--glow-color": glowColor,
                    "--footer-bg": footerBg,
                    "--footer-text": "var(--color-midnight-blue)",
                    "--footer-role": "var(--color-midnight-blue)",
                  } as React.CSSProperties}
                >
                  <span className="tm-quote-symbol" style={{ color: "var(--footer-bg)" }}>“</span>
                  <p className="tm-panel-text">{card.personMessage}</p>
                  <div className="tm-panel-footer">
                    <p className="tm-panel-name">{card.personName}</p>
                    <p className="tm-panel-role">{card.personDesignation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
