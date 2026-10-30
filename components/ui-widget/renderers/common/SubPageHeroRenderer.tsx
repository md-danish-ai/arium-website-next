import React from "react";
import { SubPageHeroBanner } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function SubPageHeroRenderer({
  section: { tag, title, description, CTA_text, CTA_url, background_gradient, content_max_width },
  index,
}: SectionRendererProps) {
  return (
    <SubPageHeroBanner
      key={`sub-hero-${index}`}
      id={`widget-sub-hero-${index}`}
      tag={tag}
      title={title}
      description={description}
      CTA_text={CTA_text}
      CTA_url={CTA_url}
      background_gradient={background_gradient}
      content_max_width={content_max_width}
    />
  );
}
