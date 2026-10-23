import React from "react";
import { AboutContentWithSideGraphic } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function ContentWithSideGraphicRenderer({ section, index }: SectionRendererProps) {
  return (
    <AboutContentWithSideGraphic
      key={`content-side-graphic-${index}`}
      Heading={section.Heading || section.heading}
      Description={section.Description || section.description || section.body || section.Body}
      Image={section.Image || section.image || section.media || section.Media}
      Gradient={section.Gradient || section.gradient || section.BgGradient}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
