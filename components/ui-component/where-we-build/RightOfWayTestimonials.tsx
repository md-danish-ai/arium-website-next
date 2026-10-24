import React from "react";
import { Typography } from "@ui-element";
import type { SubpageTestimonialItem } from "@data/where-subpages.data";

export interface RightOfWayTestimonialsProps {
  title: string;
  testimonials: SubpageTestimonialItem[];
}

const CARD_STYLES = [
  { kpi: "#00b4a0", glow: "0, 180, 160", bg: "var(--color-secondary-teal)" },
  { kpi: "#7c5cbf", glow: "124, 92, 191", bg: "var(--color-secondary-purple)" },
];

export default function RightOfWayTestimonials({
  title = "What community leaders are saying",
  testimonials,
}: RightOfWayTestimonialsProps) {
  return (
    <section className="bg-white py-20 relative overflow-hidden" id="testimonials">
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="container relative z-[2]">
        <div className="section-header text-center mb-16 md:mb-18">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {title}
          </Typography>
        </div>
        <div className="tm-row grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1040px] mx-auto w-full">
          {testimonials.map((card, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return (
              <div
                key={idx}
                className={`tm-panel reveal stagger-${idx + 2} relative rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5 w-full max-w-[504px] mx-auto`}
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
                <Typography
                  variant="quote"
                  as="blockquote"
                  className="tm-panel-text text-[#162047]/85 flex-1 mb-6"
                >
                  {card.quote}
                </Typography>
                <div className="tm-panel-footer pt-4 border-t border-black/10">
                  <Typography
                    variant="h6"
                    as="p"
                    weight="bold"
                    className="tm-panel-name text-[#162047] m-0"
                  >
                    {card.author}
                  </Typography>
                  <Typography
                    variant="b4"
                    as="p"
                    className="tm-panel-role text-[#162047]/60 mt-1 m-0"
                  >
                    {card.role}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
