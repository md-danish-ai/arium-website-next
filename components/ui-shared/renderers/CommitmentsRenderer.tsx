import React from "react";
import { AboutCommitments } from "@ui-component";
import { SectionRendererProps } from "./helper";
import { mapAboutCommitments } from "@services/mappers/about.mapper";

export default function CommitmentsRenderer({ section, index }: SectionRendererProps) {
  const props = mapAboutCommitments(section);
  return <AboutCommitments key={`commitments-${index}`} {...props} />;
}
