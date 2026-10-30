"use client";

import React from "react";
import { AccordionSplit } from "@ui-common";
import type { CareersCultureAccordionProps } from "./type";

export default function CareersCultureAccordion({
  title,
  title_color,
  description,
  description_color,
  background_color,
  template_grid_columns,
  accordian_cards,
  contentHtml,
  paragraphs,
  pillars,
}: CareersCultureAccordionProps) {
  const finalDescription =
    description ||
    contentHtml ||
    (paragraphs
      ? paragraphs.map((p) => `<p class="mb-4 last:mb-0 leading-relaxed">${p}</p>`).join("")
      : "");

  const finalCards =
    accordian_cards ||
    (pillars
      ? pillars.map((pillar) => ({
          title: pillar.title,
          description: pillar.description,
          svg_code: pillar.svg_code || pillar.icon || null,
        }))
      : []);

  return (
    <AccordionSplit
      title={title}
      title_color={title_color}
      description={finalDescription}
      description_color={description_color}
      background_color={background_color}
      template_grid_columns={template_grid_columns}
      accordian_cards={finalCards}
    />
  );
}
