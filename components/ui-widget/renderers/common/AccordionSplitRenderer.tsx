import React from "react";
import { AccordionSplit } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import SolutionsIndustriesRenderer from "../solutions/SolutionsIndustriesRenderer";

export default function AccordionSplitRenderer({
  section,
  section: {
    title,
    title_color,
    description,
    description_color,
    background_color,
    template_grid_columns,
    accordian_cards = [],
  },
  index,
}: SectionRendererProps) {
  if (title?.toLowerCase().includes("industries")) {
    return <SolutionsIndustriesRenderer section={section} index={index} />;
  }

  return (
    <AccordionSplit
      key={`accordion-split-${index}`}
      title={title}
      title_color={title_color}
      description={description}
      description_color={description_color}
      background_color={background_color}
      template_grid_columns={template_grid_columns}
      accordian_cards={accordian_cards}
    />
  );
}
