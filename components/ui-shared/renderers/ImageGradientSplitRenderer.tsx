import React from "react";
import { ImageGradientSplit } from "@ui-component";
import { SectionRendererProps } from "./helper";
import { mapCommunityImpact } from "@services/mappers/home.mapper";

export default function ImageGradientSplitRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityImpact(section);
  return (
    <ImageGradientSplit
      key={`image-gradient-split-${index}`}
      heading={props.heading}
      description={props.description}
      pointers={props.pointers}
      desktopImgUrl={props.desktopImgUrl}
      mobileImgUrl={props.mobileImgUrl}
      ctaText={props.ctaText}
      ctaUrl={props.ctaUrl}
      headingColor={props.headingColor}
      descriptionTextColor={props.descriptionTextColor}
    />
  );
}
