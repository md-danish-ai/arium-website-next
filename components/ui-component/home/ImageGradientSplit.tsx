"use client";

import React from "react";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { GradientImageSplit } from "@ui-common";
import { ImageGradientSplitProps, SectionPointer } from "./type";

interface MediaItemLike {
  url?: string;
  width?: number;
  attributes?: {
    url?: string;
    width?: number;
  };
}

const DEFAULT_HEADING = "Keeping communities safe and connected";
const DEFAULT_DESCRIPTION =
  "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes.";

const DEFAULT_POINTERS: SectionPointer[] = [
  {
    Heading: "Reliability",
    Description:
      "Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps, and data they depend on.",
  },
  {
    Heading: "Opportunity",
    Description:
      "Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.",
  },
  {
    Heading: "Safety",
    Description:
      "In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters, and other first responders can access the essential data they need to do their jobs effectively.",
  },
];

const DEFAULT_DESKTOP_IMG = "/assets/images/arena_wide.jpg";
const DEFAULT_MOBILE_IMG = "/assets/images/arena-wide-mobile.jpg";

export default function ImageGradientSplit({
  heading,
  description,
  sectionPointers,
  ctaText,
  ctaUrl,
  bgImage,
  HeadingColor,
  DescriptionTextColor,
}: ImageGradientSplitProps) {
  let desktopUrl = "";
  let mobileUrl = "";

  const extractUrl = (item: MediaItemLike | null | undefined) =>
    item?.attributes?.url || item?.url || "";
  const getWidth = (item: MediaItemLike | null | undefined) =>
    item?.attributes?.width || item?.width || 0;

  let images: MediaItemLike[] = [];
  if (Array.isArray(bgImage)) {
    images = bgImage as MediaItemLike[];
  } else if (
    bgImage &&
    typeof bgImage === "object" &&
    "data" in bgImage &&
    Array.isArray((bgImage as { data?: unknown }).data)
  ) {
    images = (bgImage as { data: MediaItemLike[] }).data;
  }

  if (images.length >= 2) {
    const sorted = [...images].sort((a, b) => getWidth(b) - getWidth(a));
    if (getWidth(sorted[0]) === getWidth(sorted[1])) {
      const isFirstMobile =
        extractUrl(images[0]).toLowerCase().includes("mobile") ||
        extractUrl(images[0]).includes("1080x");
      if (isFirstMobile) {
        desktopUrl = extractUrl(images[1]);
        mobileUrl = extractUrl(images[0]);
      } else {
        desktopUrl = extractUrl(images[0]);
        mobileUrl = extractUrl(images[1]);
      }
    } else {
      desktopUrl = extractUrl(sorted[0]);
      mobileUrl = extractUrl(sorted[1]);
    }
  } else if (images.length === 1) {
    desktopUrl = extractUrl(images[0]);
    mobileUrl = desktopUrl;
  } else if (bgImage && typeof bgImage === "object") {
    const singleObj = bgImage as {
      url?: string;
      data?: { attributes?: { url?: string } };
    };
    desktopUrl = singleObj.data?.attributes?.url || singleObj.url || "";
    mobileUrl = desktopUrl;
  }

  const finalDesktopUrl = GetStrapiMediaUrl(desktopUrl) || DEFAULT_DESKTOP_IMG;
  const finalMobileUrl = GetStrapiMediaUrl(mobileUrl) || DEFAULT_MOBILE_IMG;

  const rawPointers =
    sectionPointers && sectionPointers.length > 0 ? sectionPointers : DEFAULT_POINTERS;

  const pointers = rawPointers.map((item: SectionPointer) => ({
    heading: item.Heading || item.title || "",
    description: item.Description || item.description || "",
    headingColor: item.FontHeading,
    descriptionColor: item.FontDescription,
  }));

  return (
    <GradientImageSplit
      id="community"
      heading={heading || DEFAULT_HEADING}
      description={description || DEFAULT_DESCRIPTION}
      desktopImageUrl={finalDesktopUrl}
      mobileImageUrl={finalMobileUrl}
      pointers={pointers}
      ctaText={ctaText || "Learn More"}
      ctaUrl={ctaUrl || "/community"}
      headingColor={HeadingColor}
      descriptionTextColor={DescriptionTextColor}
    />
  );
}
