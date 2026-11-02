import React from "react";
import { IllustrationSplit } from "@ui-common";
import { mapSolutionsSmallCells, mapSolutionsDas } from "@services/mappers/solutions.mapper";
import { SectionRendererProps } from "../../helper";

export default function SolutionsSmallCellsRenderer({
  section,
  section: { title = "", illustration_image_alignment },
  index,
}: SectionRendererProps) {
  const isDas =
    illustration_image_alignment === "Left" ||
    title.toLowerCase().includes("antenna") ||
    title.toLowerCase().includes("das");

  return (
    <IllustrationSplit
      key={`solutions-smallcells-${index}`}
      {...(isDas ? mapSolutionsDas(section) : mapSolutionsSmallCells(section))}
    />
  );
}
