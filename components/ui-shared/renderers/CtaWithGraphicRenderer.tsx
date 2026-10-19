import React from "react";
import { SharedCtaWithGraphic } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function CtaWithGraphicRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedCtaWithGraphic
      key={`cta-graphic-${index}`}
      heading={section.Heading || section.heading || section.title}
      description={section.Description || section.description || section.body}
      ctaText={section.CtaText || section.ctaText || section.ctaLabel}
      ctaLink={section.CtaLink || section.ctaLink || section.ctaUrl}
      graphic={section.Graphic || section.graphic || section.Image || section.image}
      bgColor={section.BgColor || section.bgColor}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
