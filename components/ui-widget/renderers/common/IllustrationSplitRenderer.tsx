import React from "react";
import { IllustrationSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function IllustrationSplitRenderer({ section, index }: SectionRendererProps) {
  const heading = (section.heading ||
    section.Heading ||
    section.title ||
    section.Title ||
    "") as string;
  const rawAlignment = (section.mediaAlignment || section.MediaAlignment || "") as string;

  const isMediaLeft =
    rawAlignment.toLowerCase() === "left" ||
    rawAlignment.toLowerCase() === "media left" ||
    heading.toLowerCase().includes("antenna") ||
    heading.toLowerCase().includes("das");

  // Normalize stats if in different formats
  const statistics =
    section.statistics ||
    section.Statistics ||
    (Array.isArray(section.stats)
      ? section.stats.map(
          (s: {
            value?: string;
            label?: string;
            Number?: string;
            Label?: string;
            number?: string;
          }) => ({
            Number: s.Number || s.value || s.number,
            Label: s.Label || s.label,
          })
        )
      : undefined);

  return (
    <IllustrationSplit
      key={`illustration-split-${index}`}
      id={`widget-illustration-split-${index}`}
      heading={heading}
      description={section.description || section.Description || section.body || section.Body}
      media={section.media || section.Media}
      mediaAlignment={isMediaLeft ? "Left" : "Right"}
      statistics={statistics}
      showBottomDivider={section.showBottomDivider ?? section.ShowBottomDivider}
      HeadingColor={section.HeadingColor}
      DescriptionColor={section.DescriptionColor}
    />
  );
}
