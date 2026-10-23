import React from "react";
import { AboutJourney } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function JourneyRenderer({ section, index }: SectionRendererProps) {
  return (
    <AboutJourney
      key={`journey-${index}`}
      Heading={section.Heading || section.heading || section.title}
      Description={section.Description || section.description || section.body || section.Body}
      TimeCards={section.TimeCards || section.timeCards || section.Cards}
    />
  );
}
