import React from "react";
import { HomeHero } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function MainHeroRenderer({ section, index }: SectionRendererProps) {
  return (
    <HomeHero
      key={`main-hero-${index}`}
      heading={section.Heading || section.heading}
      description={section.Description || section.description}
      fontColor={section.FontColor || section.fontColor}
      bgColor={section.BgColor || section.bgColor}
      scrollText={section.ScrollText || section.scrollText}
    />
  );
}
