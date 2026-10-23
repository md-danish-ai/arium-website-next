import React from "react";
import { AboutCommitments } from "@ui-component";
import { SectionRendererProps } from "./helper";

export default function CommitmentsRenderer({ section, index }: SectionRendererProps) {
  return (
    <AboutCommitments
      key={`commitments-${index}`}
      Heading={section.Heading || section.heading || section.title}
      Description={section.Description || section.description || section.body}
      BgImage={section.BgImage || section.bgImage || section.image || section.media}
      BgOverlay={section.BgOverlay || section.bgOverlay}
      PillarsDescription={section.PillarsDescription || section.pillarsDescription}
      PillarCard={section.PillarCard || section.pillarCard || section.cards}
    />
  );
}
