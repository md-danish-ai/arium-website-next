import React from "react";
import { Typography, AboutStatCard } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { AboutStatsCardsProps } from "./type";

export default function AboutStatsCards({ title, description, Cards = [] }: AboutStatsCardsProps) {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-[2]">
      <Container className="relative z-[2]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            weight="light"
            className="section-title reveal text-midnight m-0 mb-0"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-1 max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 m-0"
            >
              {description}
            </Typography>
          )}
        </div>

        {/* Cards Grid: 1 col on mobile (< 768px), 3 cols on tablet/desktop (>= 768px) */}
        <div className="grid grid-cols-1 w-full max-w-[520px] mx-auto md:max-w-none md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-stretch reveal stagger-1">
          {Cards.map((item, index) => (
            <AboutStatCard
              key={item.id ?? index}
              title={item.title}
              description={item.description}
              badge={item.badge}
              background_color={item.background_color}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
