import React from "react";
import { SharedStatsCards } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function StatsCardsRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedStatsCards
      key={`stats-cards-${index}`}
      Heading={section.Heading || section.heading || section.title}
      Description={section.Description || section.description || section.body || section.Body}
      CradColorful={section.CradColorful || section.cradColorful || section.cards}
    />
  );
}
