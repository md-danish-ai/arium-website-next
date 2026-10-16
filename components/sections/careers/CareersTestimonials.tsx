import React from "react";

interface TestimonialCard {
  title: string;
  badge: string;
  description: string;
}

interface CareersTestimonialsProps {
  data?: {
    title?: string;
    cards?: TestimonialCard[];
  };
}

const TESTIMONIAL_STYLES = [
  { "--kpi-color": "#00b4a0", "--glow-color": "0, 180, 160", "--footer-bg": "var(--color-secondary-teal)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties, // Teal
  { "--kpi-color": "#8b6fe6", "--glow-color": "139, 111, 230", "--footer-bg": "var(--color-secondary-purple)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties, // Purple
  { "--kpi-color": "#e8935a", "--glow-color": "232, 147, 90", "--footer-bg": "var(--color-secondary-peach)", "--footer-text": "var(--color-midnight-blue)", "--footer-role": "var(--color-midnight-blue)" } as React.CSSProperties, // Peach
];

const FALLBACK_TESTIMONIALS = [
  {
    title: "Gabe Villalobos",
    badge: "Project Manager",
    description: "At Arium Networks, you're surrounded by individuals who are experts in their respective fields that push you to want to grow and excel. You are heard and your opinions hold value.\""
  },
  {
    title: "Emily Cates",
    badge: "Permitting Specialist",
    description: "Working here, I've been able to learn, grow, and feel truly valued. It has been incredibly rewarding—and thanks to the benefits, it even helped make starting my family possible.\""
  },
  {
    title: "Anthony Price",
    badge: "Client Services Manager",
    description: "Working at Arium Networks is energizing because of the strong sense of ownership and accountability across the team. I get to move fast, solve challenges, and deliver outcomes that truly matter.\""
  },
  {
    title: "Jessica Fernandez",
    badge: "Senior External Affairs Manager",
    description: "The best part of my role is being surrounded by accomplished people across the organization, working toward the same shared goal of building better connectivity. That makes the work especially rewarding.\""
  }
];

export default function CareersTestimonials({ data }: CareersTestimonialsProps) {
  const testimonials = data?.cards?.length ? data.cards : FALLBACK_TESTIMONIALS;
  return (
    <section className="section-light" id="testimonials" style={{ background: "transparent", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true" style={{ opacity: 0.08 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "72px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", maxWidth: "880px", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "Meet the Arium Networks Team"}
          </h2>
        </div>
        <div className="tm-row careers-tm-row">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <div key={index} className={`tm-panel reveal stagger-${(index % 4) + 1}`} style={style}>
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
