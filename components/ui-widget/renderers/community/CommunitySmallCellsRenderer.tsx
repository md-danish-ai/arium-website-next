import React from "react";
import { CommunitySmallCells } from "@ui-component/community";
import { mapCommunitySmallCells } from "@services/mappers/community.mapper";
import { SectionRendererProps } from "../../helper";

export default function CommunitySmallCellsRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunitySmallCells(section);
  return <CommunitySmallCells key={`community-smallcells-${index}`} {...props} />;
}
