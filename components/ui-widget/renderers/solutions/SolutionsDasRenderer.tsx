import React from "react";
import { SolutionsDas } from "@ui-component/solutions";
import { mapSolutionsDas } from "@services/mappers/solutions.mapper";
import { SectionRendererProps } from "../../helper";

export default function SolutionsDasRenderer({ section, index }: SectionRendererProps) {
  const props = mapSolutionsDas(section);
  return <SolutionsDas key={`solutions-das-${index}`} {...props} />;
}
