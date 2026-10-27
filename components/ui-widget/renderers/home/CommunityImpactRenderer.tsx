import React from "react";
import { GradientImageSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { mapCommunityImpact } from "@services/mappers/home.mapper";

export default function CommunityImpactRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityImpact(section);
  return (
    <GradientImageSplit
      key={`community-impact-${index}`}
      id="community"
      heading={props.heading}
      description={props.description}
      pointers={props.pointers}
      desktopImageUrl={props.desktopImgUrl}
      mobileImageUrl={props.mobileImgUrl}
      ctaText={props.ctaText}
      ctaUrl={props.ctaUrl}
      headingColor={props.headingColor}
      descriptionTextColor={props.descriptionTextColor}
    />
  );
}
