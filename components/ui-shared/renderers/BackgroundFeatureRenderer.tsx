import React from "react";
import { BackgroundFeatureSection } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function BackgroundFeatureRenderer({ section, index }: SectionRendererProps) {
  return (
    <BackgroundFeatureSection
      key={`bg-feature-${index}`}
      Heading={section.Heading || section.heading}
      Description={section.Description || section.description}
      BackgroundImage={section.BackgroundImage || section.backgroundImage}
      CTALabel={section.CTALabel || section.ctaLabel}
      CTALink={section.CTALink || section.ctaLink}
      FeatureCards={section.FeatureCards || section.featureCards || []}
      FontColorHeading={section.FontColorHeading}
      FontColorDescription={section.FontColorDescription}
      MaxWidthText={section.MaxWidthText || section.maxWidthText || section.maxWidth || section.MaxWidth}
    />
  );
}
