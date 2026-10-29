import React from "react";
import { ImageGradientSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { mapCommunityImpact } from "@services/mappers/home.mapper";

export default function CommunityImpactRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityImpact(section);
  return <ImageGradientSplit key={`community-impact-${index}`} id="community" {...props} />;
}
