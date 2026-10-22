import React from "react";
import { DetailedCardGrid } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function DetailedCardGridRenderer({ section, index }: SectionRendererProps) {
  return (
    <DetailedCardGrid
      key={`detailed-card-grid-${index}`}
      heading={section.Headings || section.Heading || section.heading}
      description={section.Description || section.description}
      bgColor={section.BgColor || section.bgColor}
      panelsCards={section.PanelsCards || section.panelsCards}
    />
  );
}
