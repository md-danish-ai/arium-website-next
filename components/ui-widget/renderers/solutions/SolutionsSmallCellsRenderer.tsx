import React from "react";
import { SolutionsSmallCells, SolutionsDas } from "@ui-component/solutions";
import { mapSolutionsSmallCells, mapSolutionsDas } from "@services/mappers/solutions.mapper";
import { SectionRendererProps } from "../../helper";

export default function SolutionsSmallCellsRenderer({ section, index }: SectionRendererProps) {
  const heading = (
    section.heading ||
    section.Heading ||
    section.title ||
    section.Title ||
    ""
  ).toLowerCase();
  const rawAlignment = section.mediaAlignment || section.MediaAlignment;
  const isDas =
    rawAlignment === "Left" ||
    rawAlignment === "Media Left" ||
    heading.includes("antenna") ||
    heading.includes("das");

  if (isDas) {
    const props = mapSolutionsDas(section);
    return <SolutionsDas key={`solutions-das-${index}`} {...props} />;
  }

  const props = mapSolutionsSmallCells(section);
  return <SolutionsSmallCells key={`solutions-smallcells-${index}`} {...props} />;
}
