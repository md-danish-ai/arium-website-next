import React from "react";
import { Typography, TestimonialCard } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
export interface SharedTestimonialCard {
  id: number | string;
  person_name: string;
  person_message: string;
  person_designation: string;
  card_footer_bg?: string | null;
}

export interface SharedTestimonialsProps {
  title: string;
  cards: SharedTestimonialCard[];
}

export default function SharedTestimonials({ title, cards }: SharedTestimonialsProps) {
  if (!cards || cards.length === 0) return null;

  const isWideLayout = cards.length <= 2;
  const cols = Math.min(cards.length, 4);

  return (
    <section className="relative overflow-hidden py-14 md:py-20 bg-white" id="testimonials">
      <div
        className="infra-grid-bg absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />
      <Container className="relative z-[2]">
        {title && (
          <div className="section-header text-center mb-10 md:mb-16">
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

        {isWideLayout ? (
          <div
            className={`tm-row flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] gap-3.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch justify-start sm:justify-center mx-auto md:grid md:overflow-visible md:pb-0 ${
              cols === 1 ? "max-w-xl md:grid-cols-1" : "max-w-[1040px] md:grid-cols-2 md:gap-8"
            }`}
          >
            {cards.map((card, idx) => (
              <TestimonialCard
                key={card.id ?? idx}
                index={idx}
                className="md:min-w-0 md:max-w-none md:w-auto md:shrink md:h-full"
                {...card}
              />
            ))}
          </div>
        ) : (
          <div
            className={`tm-row flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] gap-3.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch mx-auto lg:grid lg:overflow-visible lg:pb-0 ${
              cols === 3
                ? "max-w-[1200px] lg:grid-cols-3 lg:gap-6"
                : "max-w-[1400px] lg:grid-cols-4 lg:gap-6"
            }`}
          >
            {cards.map((card, idx) => (
              <TestimonialCard
                key={card.id ?? idx}
                index={idx}
                className="lg:min-w-0 lg:max-w-none lg:w-auto lg:shrink lg:h-full"
                {...card}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
