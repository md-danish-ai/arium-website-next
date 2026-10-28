import React from "react";
import { CenteredImageCTA } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { mapCareersCta } from "@services/mappers/home.mapper";

export default function CenteredImageCTARenderer({ section, index }: SectionRendererProps) {
  const props = mapCareersCta(section);
  return <CenteredImageCTA key={`centered-image-cta-${index}`} {...props} />;
}
