import React from "react";
import { HeroBanner } from "@ui-common";
import { SectionRendererProps, GetStrapiMediaUrl } from "../../helper";

export default function HeroBannerRenderer({ section, index }: SectionRendererProps) {
  const {
    title,
    description,
    media,
    CTA_text,
    CTA_url,
    max_width_title,
    max_width_description,
    object_position,
  } = section;

  const mediaObj = Array.isArray(media) ? media[0] : media;
  const mediaUrl =
    typeof mediaObj === "string"
      ? GetStrapiMediaUrl(mediaObj)
      : mediaObj?.url
        ? GetStrapiMediaUrl(mediaObj.url)
        : undefined;
  const isVideo = mediaObj?.mime?.startsWith("video/");

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
      objectPosition={object_position}
      ctaColor="secondary"
      ctaVariant="outlined"
    />
  );
}
