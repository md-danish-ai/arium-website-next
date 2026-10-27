import React from "react";
import { CtaWithGraphic } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function CtaWithGraphicRenderer({ section, index }: SectionRendererProps) {
  return (
    <CtaWithGraphic
      key={`cta-with-graphic-${index}`}
      heading={section.Heading || section.heading || section.title}
      description={section.Description || section.description || section.body}
      ctaText={section.ctaText || section.CtaText || section.ctaLabel}
      ctaLink={section.ctaLink || section.CtaLink || section.ctaUrl}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
