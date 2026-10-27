import React from "react";
import { CommunityTestimonials } from "@ui-component/community";
import { mapCommunityTestimonials } from "@services/mappers/community.mapper";
import { SectionRendererProps } from "../../helper";

export default function CommunityTestimonialsRenderer({ section, index }: SectionRendererProps) {
  const props = mapCommunityTestimonials(section);
  return (
    <div key={`community-testimonials-${index}`}>
      <CommunityTestimonials {...props} />
    </div>
  );
}
