import React from "react";
import { CenteredImageCTA } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function CenteredImageCTARenderer({ section, index }: SectionRendererProps) {
  return (
    <CenteredImageCTA
      key={`centered-image-cta-${index}`}
      heading={section.Heading || section.heading || section.title}
      text={section.Text || section.text || section.description || section.body}
      ctaLabel={section.ctaLabel || section.CtaLabel || section.ctaText}
      ctaUrl={section.ctaUrl || section.CtaUrl || section.ctaLink}
      bgImage={section.BgImage || section.bgImage || section.Image || section.image}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
