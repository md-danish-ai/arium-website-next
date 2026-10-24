"use client";

import React from "react";
import { GradientImageSplit } from "@ui-common";
import { ImageGradientSplitProps } from "./type";

export default function ImageGradientSplit({
  heading,
  description,
  pointers,
  desktopImgUrl,
  mobileImgUrl,
  ctaText = "Learn More",
  ctaUrl = "/community",
  headingColor,
  descriptionTextColor,
}: ImageGradientSplitProps) {
  return (
    <GradientImageSplit
      id="community"
      heading={heading}
      description={description}
      desktopImageUrl={desktopImgUrl}
      mobileImageUrl={mobileImgUrl}
      pointers={pointers}
      ctaText={ctaText}
      ctaUrl={ctaUrl}
      headingColor={headingColor}
      descriptionTextColor={descriptionTextColor}
    />
  );
}
