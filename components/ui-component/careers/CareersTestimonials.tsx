import React from "react";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CareersTestimonialsProps } from "./type";

const TESTIMONIAL_STYLES = [
  {
    "--kpi-color": "#00b4a0",
    "--glow-color": "0, 180, 160",
    "--footer-bg": "var(--color-secondary-teal)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties, // Teal
  {
    "--kpi-color": "#8b6fe6",
    "--glow-color": "139, 111, 230",
    "--footer-bg": "var(--color-secondary-purple)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties, // Purple
  {
    "--kpi-color": "#e8935a",
    "--glow-color": "232, 147, 90",
    "--footer-bg": "var(--color-secondary-peach)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties, // Peach
];

export default function CareersTestimonials({
  title,
  testimonials = [],
}: CareersTestimonialsProps) {
  return (
    <section
      className="section-light bg-transparent py-20 relative overflow-hidden"
      id="testimonials"
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        <div className="section-header text-center mb-16 md:mb-18">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {title}
          </Typography>
        </div>
        <div className="tm-row careers-tm-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <div
                key={index}
                className={`tm-panel reveal stagger-${(index % 4) + 1} relative rounded-[24px] p-7 md:p-8 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5`}
                style={style}
              >
                <span className="tm-quote-symbol text-4xl font-serif leading-none mb-3 opacity-40 text-[#162047]">
                  “
                </span>
                <Typography
                  variant="quote"
                  as="blockquote"
                  className="tm-panel-text text-[#162047]/85 flex-1 mb-6"
                >
                  {testimonial.description}
                </Typography>
                <div className="tm-panel-footer pt-4 border-t border-black/10">
                  <Typography
                    variant="h6"
                    as="p"
                    weight="bold"
                    className="tm-panel-name text-[#162047] m-0"
                  >
                    {testimonial.title}
                  </Typography>
                  <Typography
                    variant="b4"
                    as="p"
                    className="tm-panel-role text-[#162047]/60 mt-1 m-0"
                  >
                    {testimonial.badge}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
