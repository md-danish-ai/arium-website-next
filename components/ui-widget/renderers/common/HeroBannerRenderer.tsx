import React from "react";
import { HeroBanner } from "@ui-common";
import { SectionRendererProps, GetStrapiMediaUrl } from "../../helper";

export default function HeroBannerRenderer({ section, index }: SectionRendererProps) {
  const heading = section.hero_title || section.HeroTitle || section.Heading || section.heading;
  const intro =
    section.hero_description ||
    section.HeroDescription ||
    section.Description ||
    section.description;
  const mediaObj = section.hero_media?.[0] || section.HeroMedia?.[0] || section.Media?.[0];
  const mediaUrl = mediaObj?.url ? GetStrapiMediaUrl(mediaObj.url) : undefined;
  const isVideo = mediaObj?.mime?.startsWith("video/");
  const objectPosition = section.object_position || section.ObjectPosition;

  return (
    <HeroBanner
      key={`hero-${index}`}
      id={`widget-hero-${index}`}
      heading={heading}
      intro={intro}
      imageSrc={!isVideo ? mediaUrl : undefined}
      videoSrc={isVideo ? mediaUrl : undefined}
      imageAlt={mediaObj?.alternativeText || heading || "Hero image"}
      ctaText={section.hero_CTA_label || section.HeroCtaLabel || section.ctaText}
      ctaLink={section.hero_CTA_url || section.HeroCtaUrl || section.ctaLink}
      isExternalLink={false}
      maxWidthTitle={section.max_width_title}
      maxWidthDescription={section.max_width_description}
      objectPosition={objectPosition}
      ctaColor="secondary"
      ctaVariant="outlined"
    />
  );
}
