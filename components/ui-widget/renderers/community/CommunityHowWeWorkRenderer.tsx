import React from "react";
import { CommunityHowWeWork } from "@ui-component/community";
import { mapCommunityHowWeWork } from "@services/mappers/community.mapper";
import { SectionRendererProps } from "../../helper";

export default function CommunityHowWeWorkRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityHowWeWork(section);
  return <CommunityHowWeWork key={`community-howwework-${index}`} {...props} />;
}
