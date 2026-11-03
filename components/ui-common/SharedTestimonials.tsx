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
    <section
      className="relative overflow-hidden py-14 min-[769px]:py-20 bg-white"
      id="testimonials"
    >
      <div
        className="infra-grid-bg absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        {title && (
          <div className="section-header text-center mb-10 min-[769px]:mb-16">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              className="section-title reveal stagger-1 tracking-[0.06em] mx-auto text-midnight [text-wrap:balance] max-w-[880px]"
            >
              {title}
            </Typography>
          </div>
        )}

        <div
          className={`tm-row flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] gap-3.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch mx-auto min-[769px]:grid min-[769px]:overflow-visible min-[769px]:pb-0 ${
            cols === 1
              ? "max-w-xl min-[769px]:grid-cols-1"
              : cols === 2
                ? "max-w-[1040px] min-[769px]:grid-cols-2 min-[769px]:gap-8"
                : cols === 3
                  ? "max-w-[1200px] min-[769px]:grid-cols-3 min-[769px]:gap-6"
                  : "max-w-[1400px] min-[769px]:grid-cols-4 min-[769px]:gap-6"
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
