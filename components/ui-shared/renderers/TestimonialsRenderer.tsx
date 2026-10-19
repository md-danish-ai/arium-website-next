import React from "react";
import { SharedTestimonials } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function TestimonialsRenderer({ section, index }: SectionRendererProps) {
  const heading = section.Heading || section.heading || "";
  const description = section.Description || section.description || "";
  const cards = (section.cards || []).map((t: any) => ({
    personName: t.personName || "",
    personMessage: t.personMessage || "",
    personDesignation: t.personDesignation || "",
    cardfooterBg: t.cardfooterBg || undefined,
  }));

  return (
    <SharedTestimonials
      key={`testimonials-${index}`}
      heading={heading}
      description={description}
      cards={cards}
    />
  );
}
