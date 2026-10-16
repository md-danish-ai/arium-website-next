import React from "react";

interface TestimonialCard {
  title: string;
  badge: string;
  description: string;
}

interface CommunityTestimonialsProps {
  data?: {
    title?: string;
    cards?: TestimonialCard[];
  };
}

const TESTIMONIAL_STYLES = [
  { "--kpi-color": "#00b4a0", "--glow-color": "0, 180, 160", "--footer-bg": "var(--color-secondary-teal)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties,
  { "--kpi-color": "#e8935a", "--glow-color": "232, 147, 90", "--footer-bg": "var(--color-secondary-peach)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties,
  { "--kpi-color": "#8b6fe6", "--glow-color": "139, 111, 230", "--footer-bg": "var(--color-secondary-purple)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties,
];

const FALLBACK_TESTIMONIALS = [
  {
    title: "Dewitt",
    badge: "President & CEO, Downtown Austin Alliance",
    description: "Wireless connectivity is so critically important in today's economy. It's like roadways. It's infrastructure that we have to have.\"",
  },
  {
    title: "Rob",
    badge: "City Sustainability Director",
    description: "It's not just the technology and the connectivity, but it's how we work, too.\"",
  },
  {
    title: "Kari",
    badge: "Real Estate Agent",
    description: "I use my phone as my lifeline to get my job done.\"",
  }
];

export default function CommunityTestimonials({ data }: CommunityTestimonialsProps) {
  const testimonials = data?.cards?.length ? data.cards : FALLBACK_TESTIMONIALS;
  return (
    <section className="section-light" id="testimonials" style={{ background: "transparent", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true" style={{ opacity: 0.08 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "72px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "Communities support advanced connectivity"}
          </h2>
        </div>

        <div className="tm-row community-tm-row">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <div key={index} className={`tm-panel reveal stagger-${(index % 3) + 1}`} style={style}>
                <span className="tm-quote-symbol" style={{ color: "var(--footer-bg)" }}>“</span>
                <p className="tm-panel-text">{testimonial.description}</p>
                <div className="tm-panel-footer">
                  <p className="tm-panel-name">{testimonial.title}</p>
                  <p className="tm-panel-role">{testimonial.badge}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
