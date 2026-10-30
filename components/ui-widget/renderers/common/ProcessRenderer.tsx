import React from "react";
import { ProcessSection } from "@ui-common";
import { mapSubpageProcess } from "@services/mappers/subpages.mapper";
import { ROW_PROCESS_FALLBACK, PV_PROCESS_FALLBACK } from "@data/where-subpages.data";
import type { SectionRendererProps } from "../../helper";

export default function ProcessRenderer({
  section,
  index,
}: SectionRendererProps<{
  title?: string;
  background_color?: string | null;
  process_stage?: Array<{ stage_name?: string; background_color?: string }>;
}>) {
  const isPrivateVenues =
    section?.title?.toLowerCase().includes("venue") ||
    section?.title?.toLowerCase().includes("service delivery") ||
    section?.process_stage?.some((s) => s.stage_name?.toLowerCase() === "design");

  return (
    <ProcessSection
      key={`process-${index}`}
      {...mapSubpageProcess(section, isPrivateVenues ? PV_PROCESS_FALLBACK : ROW_PROCESS_FALLBACK)}
    />
  );
}
