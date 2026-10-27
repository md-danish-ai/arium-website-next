import React from "react";
import { DetailedCardGrid } from "@ui-component";
import { SectionRendererProps } from "../../helper";
import { mapInfrastructure } from "@services/mappers/home.mapper";

export default function DetailedCardGridRenderer({ section, index }: SectionRendererProps) {
  const props = mapInfrastructure(section);
  return (
    <DetailedCardGrid
      key={`detailed-card-grid-${index}`}
      heading={props.heading}
      description={props.description}
      bgColor={props.bgColor}
      cards={props.cards}
    />
  );
}
