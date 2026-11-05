import React from "react";
import { IllustrationSplit, type IllustrationSplitStatItem } from "@ui-common";
import { SectionRendererProps } from "../../helper";

export default function IllustrationSplitRenderer({ section, index }: SectionRendererProps) {
  const {
    title,
    title_color,
    description,
    description_color,
    illustration_image,
    illustration_image_alignment,
    show_bottom_divider,
    statistics,
  } = section || {};

  const titleStr = typeof title === "string" ? title.toLowerCase() : "";
  const isDas =
    titleStr.includes("antenna") ||
    titleStr.includes("das") ||
    illustration_image_alignment === "Left" ||
    illustration_image_alignment === "Media Left";
  const isSmallCells = titleStr.includes("small cell") || titleStr.includes("small cells");

  const resolvedBottomDivider = isSmallCells
    ? false
    : isDas
      ? show_bottom_divider !== undefined
        ? Boolean(show_bottom_divider)
        : true
      : Boolean(show_bottom_divider);

  return (
    <IllustrationSplit
      key={`illustration-split-${index}`}
      id={`widget-illustration-split-${index}`}
      title={title as string | undefined}
      title_color={title_color as string | undefined}
      description={description as string | undefined}
      description_color={description_color as string | undefined}
      illustration_image={illustration_image}
      illustration_image_alignment={
        illustration_image_alignment as "Right" | "Left" | "Media Right" | "Media Left" | undefined
      }
      show_bottom_divider={resolvedBottomDivider}
      statistics={statistics as IllustrationSplitStatItem[] | undefined}
      background={section?.background as string | undefined}
    />
  );
}
