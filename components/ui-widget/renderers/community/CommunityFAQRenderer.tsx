import React from "react";
import { CommunityFAQ } from "@ui-component/community";
import { mapCommunityFaqs } from "@services/mappers/community.mapper";
import { SectionRendererProps } from "../../helper";

export default function CommunityFAQRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityFaqs(section);
  return <CommunityFAQ key={`community-faq-${index}`} {...props} />;
}
