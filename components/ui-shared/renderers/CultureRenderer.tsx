import React from "react";
import { SharedCulture } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function CultureRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedCulture
      key={`culture-${index}`}
      Heading={section.Heading || section.heading || section.title}
      Description={section.Description || section.description || section.body}
      Pillarcard={section.Pillarcard || section.pillarcard || section.Cards || section.cards}
      CtaButton={section.CtaButton || section.ctaButton || section.Cta?.[0]?.label}
      CTALink={section.CTALink || section.ctaLink || section.Cta?.[0]?.url}
      BgImage={section.BgImage || section.bgImage || section.Media || section.media || section.image}
      BgGradient={section.BgGradient || section.bgGradient}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
