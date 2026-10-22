import React from "react";
import { StatsWithImage } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function StatsWithImageRenderer({ section, index }: SectionRendererProps) {
  return (
    <StatsWithImage
      key={`stats-with-image-${index}`}
      heading={section.Heading || section.heading || section.title}
      statscards={section.Statscard || section.statscards}
      image={section.Image || section.image || section.Media || section.media}
      HeadingColor={section.HeadingColor}
    />
  );
}
