import React from "react";
import ImageCardGrid from "@ui-common/ImageCardGrid";
import { mapCommunityBenefits } from "@services/mappers/community.mapper";
import { SectionRendererProps } from "../../helper";

export default function CommunityBenefitsRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityBenefits(section);
  return (
    <ImageCardGrid
      key={`community-benefits-${index}`}
      title={props.title}
      headingColor={props.headingColor}
      cards={props.cards}
    />
  );
}
