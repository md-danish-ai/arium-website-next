import React from "react";
import { InnerPageHero } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function InnerPageHeroRenderer({ section, index }: SectionRendererProps) {
  return (
    <InnerPageHero
      key={`inner-hero-${index}`}
      id={`widget-inner-hero-${index}`}
      heroTag={section.HeroTag || section.heroTag || section.tag}
      heroTitle={section.HeroTitle || section.heroTitle || section.heading}
      heroDescription={section.HeroDescription || section.heroDescription || section.description}
      heroCtasLabel={section.heroCtasLabel || section.ctaLabel}
      heroCtasUrl={section.heroCtasUrl || section.ctaUrl}
      backgroundGradient={section.BackgroundGradient || section.backgroundGradient}
      contentMaxWidth={section.ContentMaxWidth || section.contentMaxWidth}
    />
  );
}
