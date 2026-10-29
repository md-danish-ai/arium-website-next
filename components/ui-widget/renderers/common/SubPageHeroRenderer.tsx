import React from "react";
import { SubPageHeroBanner } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function SubPageHeroRenderer({ section, index }: SectionRendererProps) {
  return (
    <SubPageHeroBanner
      key={`sub-hero-${index}`}
      id={`widget-sub-hero-${index}`}
      tag={section.tag}
      title={section.title}
      description={section.description}
      CTA_text={section.CTA_text}
      CTA_url={section.CTA_url}
      background_gradient={section.background_gradient}
      content_max_width={section.content_max_width}
    />
  );
}
