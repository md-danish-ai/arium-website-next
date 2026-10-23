import React from "react";
import { AccordionSplit } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function AccordionSplitRenderer({ section, index }: SectionRendererProps) {
  return (
    <AccordionSplit
      key={`accordion-split-${index}`}
      Heading={section.Heading || section.heading}
      Description={section.Description || section.description}
      HeadingTextColor={section.HeadingTextColor || section.headingTextColor}
      DescriptionTextColor={section.DescriptionTextColor || section.descriptionTextColor}
      BgGradient={section.BgGradient || section.bgGradient}
      TemplateGridColumns={section.TemplateGridColumns || section.templateGridColumns}
      Accordian={section.Accordian || section.accordian || section.Accordion}
    />
  );
}
