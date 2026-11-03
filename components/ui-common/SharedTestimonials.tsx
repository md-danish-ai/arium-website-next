import React from "react";
import { Typography, TestimonialCard } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { SubpageTestimonialCard } from "@data/where-subpages.data";

export type SharedTestimonialCard = SubpageTestimonialCard;

export interface SharedTestimonialsProps {
  title: string;
  cards: SubpageTestimonialCard[];
}

export default function SharedTestimonials({ title, cards }: SharedTestimonialsProps) {
  if (!cards || cards.length === 0) return null;

  const cols = Math.min(cards.length, 4);

  return (
    <section className="relative overflow-hidden py-20 bg-white" id="testimonials">
      <div
        className="infra-grid-bg absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        {title && (
          <div className="section-header text-center mb-16">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              className="section-title reveal stagger-1 tracking-[0.06em] mx-auto text-midnight"
            >
              {title}
            </Typography>
          </div>
        )}

        <div
          className={`tm-row grid mx-auto ${
            cols === 1
              ? "max-w-xl grid-cols-1"
              : cols === 2
                ? "max-w-[1040px] grid-cols-1 md:grid-cols-2 gap-8"
                : cols === 3
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          }`}
        >
          {cards.map((card, idx) => (
            <TestimonialCard key={card.id ?? idx} index={idx} {...card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
