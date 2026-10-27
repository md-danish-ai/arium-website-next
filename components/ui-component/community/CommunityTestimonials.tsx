import React from "react";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CommunityTestimonialsProps } from "./type";

const TESTIMONIAL_STYLES = [
  {
    "--kpi-color": "#00b4a0",
    "--glow-color": "0, 180, 160",
    "--footer-bg": "var(--color-secondary-teal)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties,
  {
    "--kpi-color": "#e8935a",
    "--glow-color": "232, 147, 90",
    "--footer-bg": "var(--color-secondary-peach)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties,
  {
    "--kpi-color": "#8b6fe6",
    "--glow-color": "139, 111, 230",
    "--footer-bg": "var(--color-secondary-purple)",
    "--footer-text": "var(--color-midnight-blue)",
    "--footer-role": "var(--color-midnight-blue)",
  } as React.CSSProperties,
];

export default function CommunityTestimonials({
  title,
  testimonials = [],
}: CommunityTestimonialsProps) {
  return (
    <section className="section-light bg-white py-20 relative overflow-hidden" id="testimonials">
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        <div className="text-center mb-16 md:mb-18">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="section-title reveal stagger-1 tracking-wide leading-relaxed text-[#162047] max-w-[880px] mx-auto"
          >
            {title}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <div
                key={index}
                className={`reveal stagger-${(index % 3) + 1} relative rounded-[24px] p-8 md:p-9 flex flex-col justify-between border border-white/60 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-1.5`}
                style={style}
              >
                <span className="text-4xl font-serif leading-none mb-3 opacity-40 text-[#162047]">
                  “
                </span>
                <Typography
                  as="p"
                  variant="b2"
                  className="text-[#162047]/85 leading-relaxed flex-1 mb-6"
                >
                  {testimonial.description}
                </Typography>
                <div className="pt-4 border-t border-black/10">
                  <Typography
                    as="p"
                    variant="h6"
                    weight="bold"
                    className="tracking-wide text-[#162047] m-0"
                  >
                    {testimonial.title}
                  </Typography>
                  <Typography as="p" variant="b4" className="text-[#162047]/60 mt-1 m-0">
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
