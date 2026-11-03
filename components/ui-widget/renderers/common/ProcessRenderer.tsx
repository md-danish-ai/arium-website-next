import React from "react";
import { ProcessSection } from "@ui-common";
import { mapRightOfWaysProcess, mapPrivateVenuesProcess } from "@services/mappers";
import { ROW_PROCESS_FALLBACK } from "@data/right-of-ways.data";
import { PV_PROCESS_FALLBACK } from "@data/private-venues.data";
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
      {...(isPrivateVenues
        ? mapPrivateVenuesProcess(section, PV_PROCESS_FALLBACK)
        : mapRightOfWaysProcess(section, ROW_PROCESS_FALLBACK))}
    />
  );
}
