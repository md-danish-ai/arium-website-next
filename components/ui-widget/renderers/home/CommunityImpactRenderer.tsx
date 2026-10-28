import React from "react";
import { GradientImageSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { mapCommunityImpact } from "@services/mappers/home.mapper";

export default function CommunityImpactRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityImpact(section);
  return <GradientImageSplit key={`community-impact-${index}`} id="community" {...props} />;
}
