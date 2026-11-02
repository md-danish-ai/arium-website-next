import React from "react";
import { IllustrationSplit } from "@ui-common";
import { mapSolutionsDas } from "@services/mappers/solutions.mapper";
import { SectionRendererProps } from "../../helper";

export default function SolutionsDasRenderer({ section, index }: SectionRendererProps) {
  const props = mapSolutionsDas(section);
  return <IllustrationSplit key={`solutions-das-${index}`} {...props} />;
}
