import React from "react";
import { AboutStatsCards } from "@ui-component";
import { SectionRendererProps } from "../../helper";
import { mapAboutStatsCards } from "@services/mappers/about.mapper";

export default function AboutStatsCardsRenderer({ section, index }: SectionRendererProps) {
  const props = mapAboutStatsCards(section);
  return <AboutStatsCards key={`stats-cards-${index}`} {...props} />;
}
