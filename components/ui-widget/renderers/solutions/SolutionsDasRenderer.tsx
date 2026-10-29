import React from "react";
import { SolutionsIllustrationSplit } from "@ui-component/solutions";
import { mapSolutionsDas } from "@services/mappers/solutions.mapper";
import { SectionRendererProps } from "../../helper";

export default function SolutionsDasRenderer({ section, index }: SectionRendererProps) {
  const props = mapSolutionsDas(section);
  return <SolutionsIllustrationSplit key={`solutions-das-${index}`} {...props} />;
}
