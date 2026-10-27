import React from "react";
import { ProcessSection } from "@ui-common";
import { mapSubpageProcess } from "@services/mappers/subpages.mapper";
import type { SectionRendererProps } from "../../helper";

export default function ProcessRenderer({
  section,
  index,
}: SectionRendererProps<Record<string, unknown>>) {
  const props = mapSubpageProcess(section);

  return <ProcessSection key={`process-${index}`} {...props} />;
}
