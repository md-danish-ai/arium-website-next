import React from "react";
import { SolutionsIndustries } from "@ui-component/solutions";
import { mapSolutionsIndustries } from "@services/mappers/solutions.mapper";
import { SectionRendererProps } from "../../helper";

export default function SolutionsIndustriesRenderer({ section, index }: SectionRendererProps) {
  const props = mapSolutionsIndustries(section);
  return <SolutionsIndustries key={`solutions-industries-${index}`} {...props} />;
}
