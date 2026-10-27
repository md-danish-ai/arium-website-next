import React from "react";
import { CareersTestimonials } from "@ui-component/careers";
import { mapCareersTestimonials } from "@services/mappers/careers.mapper";
import { SectionRendererProps } from "../../helper";

export default function CareersTestimonialsRenderer({ section, index }: SectionRendererProps) {
  const props = mapCareersTestimonials(section);
  return (
    <div key={`careers-testimonials-${index}`}>
      <CareersTestimonials {...props} />
    </div>
  );
}
