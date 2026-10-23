import React from "react";
import { TestimonialsSection } from "@ui-common";
import { SectionRendererProps } from "./helper";

interface TestimonialCardItem {
  personName?: string;
  personMessage?: string;
  personDesignation?: string;
  cardfooterBg?: string;
}

interface TestimonialsSectionData {
  Heading?: string;
  heading?: string;
  Description?: string;
  description?: string;
  cards?: TestimonialCardItem[];
}

export default function TestimonialsRenderer({
  section,
  index,
}: SectionRendererProps<TestimonialsSectionData>) {
  const heading = section.Heading || section.heading || "";
  const description = section.Description || section.description || "";
  const cards = (section.cards || []).map((t) => ({
    personName: t.personName || "",
    personMessage: t.personMessage || "",
    personDesignation: t.personDesignation || "",
    cardfooterBg: t.cardfooterBg || undefined,
  }));

  return (
    <TestimonialsSection
      key={`testimonials-${index}`}
      heading={heading}
      description={description}
      cards={cards}
    />
  );
}
