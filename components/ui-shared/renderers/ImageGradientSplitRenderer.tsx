import React from "react";
import { SharedImageGradientSplit } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function ImageGradientSplitRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedImageGradientSplit
      key={`image-gradient-split-${index}`}
      heading={section.Heading || section.heading || section.title}
      description={section.Description || section.description || section.body}
      sectionPointers={section.sectionPointers || section.SectionPointers}
      ctaText={section.CtaText || section.ctaText || section.ctaLabel}
      ctaUrl={section.CtaUrl || section.ctaUrl || section.ctaLink}
      bgImage={section.BgImage || section.bgImage || section.Image || section.image}
      HeadingColor={section.HeadingColor}
      DescriptionTextColor={section.DescriptionTextColor}
    />
  );
}
