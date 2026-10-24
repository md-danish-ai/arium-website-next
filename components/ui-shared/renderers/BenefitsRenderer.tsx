import React from "react";
import { BenefitsSection } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function BenefitsRenderer({ section, index }: SectionRendererProps) {
  return (
    <BenefitsSection
      key={`benefits-${index}`}
      heading={section.Heading || section.heading || section.title}
      description={section.Description || section.description || section.body}
      cards={section.BenefitsCard || section.benefitsCard || section.cards || section.Cards}
      footerText={
        section.BottomMessage || section.bottomMessage || section.FooterText || section.footerText
      }
    />
  );
}
