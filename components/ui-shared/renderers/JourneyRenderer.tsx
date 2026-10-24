import React from "react";
import { AboutJourney } from "@ui-component";
import { SectionRendererProps } from "./helper";
import { mapAboutJourney } from "@services/mappers/about.mapper";

export default function JourneyRenderer({ section, index }: SectionRendererProps) {
  const props = mapAboutJourney(section);
  return <AboutJourney key={`journey-${index}`} {...props} />;
}
