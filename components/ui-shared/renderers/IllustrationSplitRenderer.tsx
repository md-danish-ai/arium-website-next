import React from "react";
import { IllustrationSplit } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function IllustrationSplitRenderer({ section, index }: SectionRendererProps) {
  return (
    <IllustrationSplit
      key={`illustration-split-${index}`}
      id={`widget-illustration-split-${index}`}
      heading={section.heading || section.Heading}
      description={section.description || section.Description}
      media={section.media || section.Media}
      mediaAlignment={section.mediaAlignment || section.MediaAlignment}
      statistics={section.statistics || section.Statistics}
      showBottomDivider={section.showBottomDivider || section.ShowBottomDivider}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
