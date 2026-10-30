import React from "react";
import { Typography } from "@ui-element";
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
          {cards.map((card, idx) => {
            const footerBg = card.card_footer_bg || (idx % 2 === 0 ? "#bcf6f2" : "#ffdac8");

            return (
              <div
                key={card.id ?? idx}
                className={`tm-panel reveal stagger-${(idx % 4) + 1} relative bg-midnight rounded-[28px] p-9 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.075),0_30px_60px_rgba(0,0,0,0.05)] cursor-default overflow-hidden flex flex-col h-full`}
              >
                <span
                  className="tm-quote-symbol font-serif text-[5rem] leading-none opacity-50 absolute top-5 left-7 pointer-events-none select-none text-teal"
                  style={{ color: footerBg }}
                >
                  “
                </span>
                <p className="tm-panel-text font-body z-[1] grow pt-10 text-[1.05rem] italic font-light leading-[1.8] text-white relative m-0 mb-6">
                  {card.person_message}
                </p>
                <div
                  className="tm-panel-footer mx-[-36px] sm:mx-[-40px] mb-[-36px] sm:mb-[-40px] px-9 sm:px-10 py-5 border-t border-white/10 shrink-0"
                  style={{ backgroundColor: footerBg }}
                >
                  <p className="tm-panel-name font-heading font-bold text-base text-midnight m-0 tracking-[0.02em]">
                    {card.person_name}
                  </p>
                  <p className="tm-panel-role text-xs text-midnight/80 mt-1 mb-0 font-normal">
                    {card.person_designation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
