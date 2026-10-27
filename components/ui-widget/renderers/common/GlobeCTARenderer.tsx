import React from "react";
import { GlobeCTA } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { SOLUTIONS_APPROACH_FALLBACK } from "@data/solutions.data";

export default function GlobeCTARenderer({ section, index }: SectionRendererProps) {
  const title =
    section.Title ||
    section.title ||
    section.heading ||
    section.Heading ||
    SOLUTIONS_APPROACH_FALLBACK.heading;

  const rawDescription = section.Description || section.description || section.Body || section.body;

  const description =
    rawDescription ||
    (typeof title === "string" && title.toLowerCase().includes("balanced approach")
      ? SOLUTIONS_APPROACH_FALLBACK.description
      : undefined);

  const buttonText =
    section.ButtonText ||
    section.buttonText ||
    section.ctaText ||
    section.ctaLabel ||
    section.buttonLabel ||
    section.CtaButton ||
    SOLUTIONS_APPROACH_FALLBACK.buttonText;

  const buttonLink =
    section.ButtonLink ||
    section.buttonLink ||
    section.ctaLink ||
    section.ctaUrl ||
    section.buttonUrl ||
    section.CtaLink ||
    SOLUTIONS_APPROACH_FALLBACK.buttonLink;

  return (
    <GlobeCTA
      key={`globe-cta-${index}`}
      title={title}
      description={description}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
}
