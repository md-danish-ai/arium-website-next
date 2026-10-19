import React from "react";
import { SharedHighlightList } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function HighlightListRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedHighlightList
      key={`highlight-list-${index}`}
      heading={section.Heading || section.heading || section.title}
      description={section.Description || section.description || section.body}
      image={section.Image || section.image || section.Media || section.media}
      ctaLabel={section.ctaLabel || section.CtaLabel || section.ctaText}
      ctaUrl={section.ctaUrl || section.CtaUrl || section.ctaLink}
      listItems={section.Name || section.name || section.ListItems || section.listItems}
    />
  );
}
