import React from "react";
import { GlobalFAQ } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function FAQRenderer({ section, index }: SectionRendererProps) {
  return (
    <GlobalFAQ
      key={`faq-${index}`}
      Heading={section.Heading || section.heading || section.title}
      HeadingColor={section.HeadingColor}
      Description={section.Description || section.description || section.body}
      FaqData={section.FaqData || section.faqData || section.cards || []}
    />
  );
}
