import React from "react";
import { GradientImageSplit } from "@ui-common";
import { AboutCultureProps } from "./type";

export default function AboutCulture({
  heading,
  description,
  pillars,
  desktopImgUrl,
  mobileImgUrl,
  cta,
  headingColor,
  descriptionColor,
}: AboutCultureProps) {
  const pointers = pillars.map((p) => ({
    heading: p.heading,
    description: p.description,
    headingColor: p.headingColor,
    descriptionColor: p.descriptionColor,
  }));

  return (
    <GradientImageSplit
      id="culture"
      heading={heading}
      description={description}
      desktopImageUrl={desktopImgUrl}
      mobileImageUrl={mobileImgUrl}
      pointers={pointers}
      ctaText={cta.label}
      ctaUrl={cta.url}
      headingColor={headingColor}
      descriptionTextColor={descriptionColor}
    />
  );
}
