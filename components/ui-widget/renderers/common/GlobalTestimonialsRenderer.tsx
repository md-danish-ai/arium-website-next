import React from "react";
import { SharedTestimonials } from "@ui-common";
import { mapSubpageTestimonials } from "@services/mappers/subpages.mapper";
import { mapCareersTestimonials } from "@services/mappers/careers.mapper";
import { mapCommunityTestimonials } from "@services/mappers/community.mapper";
import { PV_TESTIMONIALS_FALLBACK, ROW_TESTIMONIALS_FALLBACK } from "@data/where-subpages.data";
import { SectionRendererProps } from "../../helper";

export default function GlobalTestimonialsRenderer({
  section,
  index,
}: SectionRendererProps<{ title?: string; __component?: string; cards?: unknown[] }>) {
  const rawCards = (section as Record<string, unknown>)?.cards;
  if (Array.isArray(rawCards) && rawCards.length === 0) {
    return null;
  }

  const comp = section?.__component || "";
  const title = (section?.title || "").toLowerCase();

  const isRow = title.includes("community leaders") || title.includes("across the country");
  const isCommunity =
    comp === "widget.community-testimonials" || (title.includes("community") && !isRow);

  const props = isCommunity
    ? mapCommunityTestimonials(section)
    : title.includes("venue")
      ? mapSubpageTestimonials(section, PV_TESTIMONIALS_FALLBACK)
      : isRow
        ? mapSubpageTestimonials(section, ROW_TESTIMONIALS_FALLBACK)
        : mapCareersTestimonials(section);

  return <SharedTestimonials key={`global-testimonials-${index}`} {...props} />;
}
