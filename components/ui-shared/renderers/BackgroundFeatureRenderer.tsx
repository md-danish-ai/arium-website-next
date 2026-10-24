import React from "react";
import { BackgroundFeatureSection } from "@ui-component";
import { SectionRendererProps } from "./helper";
import { mapBackgroundFeature } from "@services/mappers/home.mapper";

export default function BackgroundFeatureRenderer({ section, index }: SectionRendererProps) {
  const props = mapBackgroundFeature(section);
  return (
    <BackgroundFeatureSection
      key={`bg-feature-${index}`}
      heading={props.heading}
      description={props.description}
      desktopBgUrl={props.desktopBgUrl}
      mobileBgUrl={props.mobileBgUrl}
      ctaLabel={props.ctaLabel}
      ctaLink={props.ctaLink}
      cards={props.cards}
      fontColorHeading={props.fontColorHeading}
      fontColorDescription={props.fontColorDescription}
      maxWidthText={props.maxWidthText}
    />
  );
}
