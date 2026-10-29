import React from "react";
import { IllustrationSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function IllustrationSplitRenderer({
  section: {
    title,
    title_color,
    description,
    description_color,
    illustration_image,
    illustration_image_alignment,
    show_bottom_divider,
    statistics,
  },
  index,
}: SectionRendererProps) {
  return (
    <IllustrationSplit
      key={`illustration-split-${index}`}
      id={`widget-illustration-split-${index}`}
      title={title}
      title_color={title_color}
      description={description}
      description_color={description_color}
      illustration_image={illustration_image}
      illustration_image_alignment={illustration_image_alignment}
      show_bottom_divider={Boolean(show_bottom_divider)}
      statistics={statistics}
    />
  );
}
