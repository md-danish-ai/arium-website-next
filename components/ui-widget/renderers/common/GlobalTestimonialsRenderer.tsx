import React from "react";
import { SharedTestimonials } from "@ui-common";
import { mapSubpageTestimonials } from "@services/mappers/subpages.mapper";
import { mapCareersTestimonials } from "@services/mappers/careers.mapper";
import { PV_TESTIMONIALS_FALLBACK, ROW_TESTIMONIALS_FALLBACK } from "@data/where-subpages.data";
import { SectionRendererProps } from "../../helper";

export default function GlobalTestimonialsRenderer({
  section,
  index,
}: SectionRendererProps<{ title?: string }>) {
  const title = (section?.title || "").toLowerCase();

  const props = title.includes("venue")
    ? mapSubpageTestimonials(section, PV_TESTIMONIALS_FALLBACK)
    : title.includes("community")
      ? mapSubpageTestimonials(section, ROW_TESTIMONIALS_FALLBACK)
      : mapCareersTestimonials(section);

  return <SharedTestimonials key={`global-testimonials-${index}`} {...props} />;
}
