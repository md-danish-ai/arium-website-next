"use client";

import React from "react";
import { AccordionSplit } from "@ui-common";
import type { CareersCultureAccordionProps } from "./type";

export default function CareersCultureAccordion({
  title,
  contentHtml,
  paragraphs = [],
  pillars = [],
}: CareersCultureAccordionProps) {
  const description =
    contentHtml ||
    paragraphs.map((p) => `<p class="mb-4 last:mb-0 leading-relaxed">${p}</p>`).join("");

  const accordian_cards = pillars.map((pillar) => ({
    title: pillar.title,
    description: pillar.description,
    svg_code: pillar.icon || null,
  }));

  return (
    <AccordionSplit title={title} description={description} accordian_cards={accordian_cards} />
  );
}
