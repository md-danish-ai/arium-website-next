import React from "react";
import { AboutContentWithSideGraphic } from "@ui-component";
import { SectionRendererProps } from "./helper";
import { mapAboutStory } from "@services/mappers/about.mapper";

export default function ContentWithSideGraphicRenderer({ section, index }: SectionRendererProps) {
  const props = mapAboutStory(section);
  return <AboutContentWithSideGraphic key={`content-side-graphic-${index}`} {...props} />;
}
