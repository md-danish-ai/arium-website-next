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
  { kpi: "#e8935a", glow: "232, 147, 90", bg: "var(--color-secondary-peach)" },
];

export default function PrivateVenuesTestimonials({ data }: PrivateVenuesTestimonialsProps) {
  const testimonials =
    data?.cards && data.cards.length > 0
      ? data.cards
      : [
          {
            description:
              "Fans today want to share their experiences in real-time. Without reliable in-building connectivity, it doesn't matter how great the event is; they feel disconnected. Adding a dedicated small cell network transformed our venue.\"",
            title: "David L.",
            badge: "Director of Operations, Major Sports Arena",
          },
          {
            description:
              'Our property is a mixed-use development, and tenants expect seamless cellular coverage from the parking garage to the top floor. Custom wireless solutions proved to be the key differentiator for leasing."',
            title: "Maria C.",
            badge: "Commercial Real Estate Developer",
          },
        ];

  return (
    <section
      className="section-light bg-transparent py-20 relative overflow-hidden"
      id="testimonials"
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="container relative z-[2]">
        <div className="section-header text-center mb-16 md:mb-18">
          <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-wide max-w-[880px] mx-auto text-3xl md:text-4xl leading-relaxed text-[#162047]">
            {data?.title || "What venue operators are saying"}
          </h2>
        </div>
        <div className="tm-row grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1040px] mx-auto">
          {testimonials.map((card, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return (
              <div
                key={idx}
                className={`tm-panel reveal stagger-${idx + 1} relative rounded-[24px] p-8 md:p-10 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5`}
                style={
                  {
                    "--kpi-color": style.kpi,
                    "--glow-color": style.glow,
                    "--footer-bg": style.bg,
                    "--footer-text": "var(--color-midnight-blue)",
                    "--footer-role": "var(--color-midnight-blue)",
                  } as React.CSSProperties
                }
              >
                <span
                  className="tm-quote-symbol text-4xl font-serif leading-none mb-3 opacity-40"
                  style={{ color: style.kpi }}
                >
                  “
                </span>
                <p className="tm-panel-text text-base italic text-[#162047]/85 leading-relaxed flex-1 mb-6">
                  {card.description}
                </p>
                <div className="tm-panel-footer pt-4 border-t border-black/10">
                  <p className="tm-panel-name font-heading font-bold text-sm tracking-wide text-[#162047] m-0">
                    {card.title}
                  </p>
                  <p className="tm-panel-role text-xs text-[#162047]/60 mt-1 m-0">{card.badge}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
