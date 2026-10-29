import React from "react";
import { SubPageHeroBanner } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function SubPageHeroRenderer({ section, index }: SectionRendererProps) {
  return (
    <SubPageHeroBanner
      key={`sub-hero-${index}`}
      id={`widget-sub-hero-${index}`}
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
