import React from "react";
import { GlobeCTA } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function GlobeCTARenderer({ section, index }: SectionRendererProps) {
  return (
    <GlobeCTA
      key={`globe-cta-${index}`}
      title={section.title || section.heading}
      heading={section.heading}
      description={section.description || section.body}
      buttonText={section.ctaLabel || section.buttonText || section.ctaText || "Contact Us"}
      buttonLink={section.ctaUrl || section.buttonLink || section.ctaLink || "/contact"}
    />
  );
}
