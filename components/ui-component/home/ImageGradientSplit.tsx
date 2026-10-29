"use client";

import React from "react";
import { GradientImageSplit } from "@ui-common";
import { ImageGradientSplitProps } from "./type";

export default function ImageGradientSplit({
  title,
  title_color,
  description,
  description_color,
  CTA_text,
  CTA_url,
  background_image_desktop,
  background_image_mobile,
  section_pointers = [],
}: ImageGradientSplitProps) {
  return (
    <GradientImageSplit
      id="community"
      title={title}
      title_color={title_color}
      description={description}
      description_color={description_color}
      CTA_text={CTA_text}
      CTA_url={CTA_url}
      background_image_desktop={background_image_desktop}
      background_image_mobile={background_image_mobile}
      section_pointers={section_pointers}
    />
  );
}
