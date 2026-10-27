import React from "react";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

interface TestimonialCard {
  personName: string;
  personMessage: string;
  personDesignation: string;
  cardfooterBg?: string; // hex color e.g. "#bcf6f2"
}

interface TestimonialsSectionProps {
  heading?: string;
  description?: string;
  cards: TestimonialCard[];
}

// Cycling footer bg colors matching the existing site palette (CSS variable or hex)
const FOOTER_STYLES = [
  { bg: "var(--color-secondary-teal)", glow: "0, 180, 160" },
  { bg: "var(--color-secondary-purple)", glow: "139, 111, 230" },
  { bg: "var(--color-secondary-peach)", glow: "232, 147, 90" },
  { bg: "var(--color-secondary-yellow)", glow: "235, 210, 0" },
];

export default function TestimonialsSection({
  heading,
  description,
  cards,
}: TestimonialsSectionProps) {
  if (!cards || cards.length === 0) return null;

  const cols = Math.min(cards.length, 4);

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden py-20 max-[600px]:py-[50px] bg-white"
        id="testimonials"
      >
        <div
          className="infra-grid-bg absolute inset-0 opacity-[0.08] pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-[2]">
          {(heading || description) && (
            <div className="text-center mb-12 md:mb-16 max-[600px]:mb-8">
              {heading && (
                <Typography
                  variant="h3"
                  uppercase
                  className="section-title reveal stagger-1 text-midnight text-center min-[1080px]:whitespace-nowrap max-[600px]:leading-[1.4] max-[600px]:tracking-[0.1em] max-[600px]:whitespace-normal"
                >
                  {heading}
                </Typography>
              )}
              {description && (
                <Typography
                  variant="b1"
                  className="section-description reveal stagger-2 max-w-[680px] mx-auto mt-4 text-midnight text-center"
                >
                  {description}
                </Typography>
              )}
            </div>
          )}

          <div
            className={`grid mx-auto w-full ${cols === 1 ? "max-w-xl grid-cols-1" : cols === 2 ? "max-w-[1040px] grid-cols-1 md:grid-cols-2 gap-8" : cols === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}`}
          >
            {cards.map((card, idx) => {
              const fallback = FOOTER_STYLES[idx % FOOTER_STYLES.length];
              const footerBg = card.cardfooterBg || fallback.bg;

              return (
                <div
                  key={idx}
                  className={`reveal stagger-${(idx % 4) + 1} relative bg-midnight rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.075),0_30px_60px_rgba(0,0,0,0.05)] cursor-default overflow-hidden flex flex-col h-full w-full max-w-[504px] mx-auto`}
                >
                  <span
                    className="font-serif text-[5rem] leading-none opacity-50 absolute top-5 left-7 pointer-events-none select-none text-teal"
                    style={{ color: footerBg }}
                  >
                    “
                  </span>
                  <Typography
                    variant="quote"
                    className="z-[1] grow pt-10 text-white relative m-0 mb-6"
                  >
                    {card.personMessage}
                  </Typography>
                  <div
                    className="mx-[-32px] sm:mx-[-40px] mb-[-32px] sm:mb-[-40px] px-8 sm:px-10 py-5 border-t border-white/10 shrink-0"
                    style={{ backgroundColor: footerBg }}
                  >
                    <Typography
                      variant="h5"
                      as="p"
                      uppercase
                      weight="bold"
                      className="text-midnight m-0 tracking-[0.02em]"
                    >
                      {card.personName}
                    </Typography>
                    <Typography
                      variant="b4"
                      weight="normal"
                      className="text-midnight/80 mt-1 mb-0 normal-case"
                    >
                      {card.personDesignation}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
