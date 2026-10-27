import React from "react";
import { StatsWithImage } from "@ui-component";
import { SectionRendererProps } from "../../helper";
import { mapStatsWithImage } from "@services/mappers/home.mapper";

export default function StatsWithImageRenderer({ section, index }: SectionRendererProps) {
  const props = mapStatsWithImage(section);
  return (
    <StatsWithImage
      key={`stats-with-image-${index}`}
      heading={props.heading}
      stats={props.stats}
      mapImageSrc={props.mapImageSrc}
      headingColor={props.headingColor}
    />
  );
}
