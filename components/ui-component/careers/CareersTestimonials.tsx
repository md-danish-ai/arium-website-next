import React from "react";
import { Typography, TestimonialCard } from "@ui-element";
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
      className="section-light bg-[#ededee] py-20 relative overflow-hidden"
      id="testimonials"
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        <div className="text-center mb-16 md:mb-18">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {title}
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {testimonials.map((testimonial, index) => {
            const style = TESTIMONIAL_STYLES[index % TESTIMONIAL_STYLES.length];
            return (
              <TestimonialCard
                key={index}
                index={index}
                title={testimonial.title}
                badge={testimonial.badge}
                description={testimonial.description}
                style={style}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
