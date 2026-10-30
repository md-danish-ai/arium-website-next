import React from "react";
import { BackgroundFeatureSection } from "@ui-component";
import { SectionRendererProps } from "../../helper";
import { mapBackgroundFeature } from "@services/mappers/home.mapper";

export default function BackgroundFeatureRenderer({ section, index }: SectionRendererProps) {
  const props = mapBackgroundFeature(section);
  return <BackgroundFeatureSection key={`bg-feature-${index}`} {...props} />;
}
