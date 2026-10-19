import React from "react";
import { SharedHero } from "@ui-common";
import { SectionRendererProps, GetStrapiMediaUrl } from "./helper";

export default function HeroBannerRenderer({ section, index }: SectionRendererProps) {
  const heading = section.heroTitle || section.bannerText || section.heading;
  const intro = section.heroDescription || section.intro;
  const mediaObj = section.heroMedia?.[0] || section.media || section.bannerImage;
  const mediaUrl = GetStrapiMediaUrl(mediaObj?.url);
  const isVideo = mediaObj?.mime?.startsWith("video/");
  const objectPosition =
    section.objectPosition || section.ObjectPosition || section.object_position;

  return (
    <SharedHero
      key={`hero-${index}`}
      id={`widget-hero-${index}`}
      heading={heading}
      intro={intro}
      imageSrc={!isVideo ? mediaUrl : undefined}
      videoSrc={isVideo ? mediaUrl : undefined}
      imageAlt={mediaObj?.alternativeText || heading || "Hero image"}
      ctaText={section.heroCtasLabel || section.ctaText}
      ctaLink={section.heroCtasUrl || section.ctaLink}
      isExternalLink={false}
      maxWidthTitle={section.MaxWidthTitle}
      maxWidthDescription={section.MaxWidthDescription}
      objectPosition={objectPosition}
    />
  );
}
