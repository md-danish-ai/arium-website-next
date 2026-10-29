import React from "react";
import { HeroBanner } from "@ui-common";
import { resolveStrapiImage } from "@utils";
import { SectionRendererProps } from "../../helper";

export default function HeroBannerRenderer({ section, index }: SectionRendererProps) {
  const {
    title,
    description,
    media,
    background_image,
    CTA_text,
    CTA_url,
    max_width_title,
    max_width_description,
    object_position,
    background_image_position,
  } = section;

  const rawMedia = background_image || media;
  const mediaObj = Array.isArray(rawMedia) ? rawMedia[0] : rawMedia;
  const mediaUrl = resolveStrapiImage(rawMedia, "/images/heroes/about.png");
  const isVideo = mediaObj?.mime?.startsWith("video/") || false;
  const finalObjectPosition = background_image_position || object_position || "center top";

  return (
    <HeroBanner
      key={`hero-${index}`}
      id={`widget-hero-${index}`}
      title={title}
      description={description}
      imageSrc={!isVideo ? mediaUrl : undefined}
      videoSrc={isVideo ? mediaUrl : undefined}
      imageAlt={mediaObj?.alternativeText || (typeof title === "string" ? title : "Hero image")}
      ctaText={CTA_text}
      ctaLink={CTA_url}
      isExternalLink={false}
      maxWidthTitle={max_width_title}
      maxWidthDescription={max_width_description}
      objectPosition={finalObjectPosition}
      ctaColor="secondary"
      ctaVariant="outlined"
    />
  );
}
