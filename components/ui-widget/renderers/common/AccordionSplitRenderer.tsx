import React from "react";
import { AccordionSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import SolutionsIndustriesRenderer from "../solutions/SolutionsIndustriesRenderer";
import CareersCultureRenderer from "../careers/CareersCultureRenderer";

export default function AccordionSplitRenderer({ section, index }: SectionRendererProps) {
  const heading = (
    section.Heading ||
    section.heading ||
    section.title ||
    section.Title ||
    ""
  ).toLowerCase();

  const accordianItems = section.Accordian || section.accordian || section.Accordion || [];

  // Check if this is the Solutions Industries section
  const isIndustries =
    heading.includes("industries") ||
    heading.includes("connectivity") ||
    (Array.isArray(accordianItems) &&
      accordianItems.some((item: { Title?: string; title?: string }) => {
        const t = (item?.Title || item?.title || "").toLowerCase();
        return (
          t.includes("stadium") ||
          t.includes("airport") ||
          t.includes("healthcare") ||
          t.includes("amusement")
        );
      }));

  if (isIndustries) {
    return <SolutionsIndustriesRenderer section={section} index={index} />;
  }

  // Check if this is Careers Culture accordion
  const isCareersCulture =
    heading.includes("why join") ||
    heading.includes("culture") ||
    (Array.isArray(accordianItems) &&
      accordianItems.some((item: { Title?: string; title?: string }) => {
        const t = (item?.Title || item?.title || "").toLowerCase();
        return (
          t.includes("team") || t.includes("career") || t.includes("impact") || t.includes("future")
        );
      }));

  if (isCareersCulture) {
    return <CareersCultureRenderer section={section} index={index} />;
  }

  // Generic AccordionSplit fallback
  return (
    <AccordionSplit
      key={`accordion-split-${index}`}
      Heading={section.Heading || section.heading}
      Description={section.Description || section.description}
      HeadingTextColor={section.HeadingTextColor || section.headingTextColor}
      DescriptionTextColor={section.DescriptionTextColor || section.descriptionTextColor}
      BgGradient={section.BgGradient || section.bgGradient}
      TemplateGridColumns={section.TemplateGridColumns || section.templateGridColumns}
      Accordian={accordianItems}
    />
  );
}
