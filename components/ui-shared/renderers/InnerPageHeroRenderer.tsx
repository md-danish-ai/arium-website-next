import React from "react";
import { SharedInnerPageHero } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function InnerPageHeroRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedInnerPageHero
      key={`inner-hero-${index}`}
      id={`widget-inner-hero-${index}`}
      heroTag={section.heroTag}
      heroTitle={section.heroTitle}
      heroDescription={section.heroDescription}
      heroCtasLabel={section.heroCtasLabel}
      heroCtasUrl={section.heroCtasUrl}
      backgroundGradient={section.BackgroundGradient}
      contentMaxWidth={section.ContentMaxWidth}
    />
  );
}
