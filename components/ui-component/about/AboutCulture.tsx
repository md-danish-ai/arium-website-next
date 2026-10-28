import React from "react";
import { GradientImageSplit } from "@ui-common";
import { AboutCultureProps } from "./type";

export default function AboutCulture({
  title,
  title_color,
  description,
  description_color,
  CTA_text,
  CTA_url,
  background_color,
  background_image_desktop,
  background_image_mobile,
  PillarCards = [],
}: AboutCultureProps) {
  return (
    <GradientImageSplit
      id="culture"
      title={title}
      title_color={title_color}
      description={description}
      description_color={description_color}
      CTA_text={CTA_text}
      CTA_url={CTA_url}
      background_image_desktop={background_image_desktop}
      background_image_mobile={background_image_mobile}
      SectionPointers={PillarCards}
      style={background_color ? { background: background_color } : undefined}
    />
  );
}
