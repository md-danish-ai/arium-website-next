import type { StrapiSectionItem, StrapiMediaItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  WHERE_HERO_FALLBACK,
  COMMUNITIES_FALLBACK,
  VENUES_FALLBACK,
  WhereImageSplitData,
} from "@data/where-we-build.data";
import type { WhereImageSplitProps } from "@ui-component/where-we-build/type";
import type { HeroBannerProps } from "@ui-common/HeroBanner";

type RawRecord = Record<string, unknown>;

/**
 * 1. Where We Build Hero Mapper (Pure 1-to-1 with HeroBannerProps)
 * Canonical keys: title, description, background_image, background_image_position, CTA_text, CTA_url, max_width_title, max_width_description, tag
 */
export function mapWhereHero(
  raw?: RawRecord | null,
  fallback = WHERE_HERO_FALLBACK
): HeroBannerProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_image = resolveStrapiImage(
    raw?.background_image as unknown,
    fallback.background_image
  );
  const background_image_position =
    (raw?.background_image_position as string) || fallback.background_image_position;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const max_width_title = (raw?.max_width_title as string) || fallback.max_width_title;
  const max_width_description =
    (raw?.max_width_description as string) || fallback.max_width_description;

  return {
    id: "where-hero",
    title,
    description,
    imageSrc: background_image,
    imageAlt: typeof title === "string" ? title : "Where We Build Hero",
    ctaText: CTA_text,
    ctaLink: CTA_url,
    objectPosition: background_image_position,
    maxWidthTitle: max_width_title,
    maxWidthDescription: max_width_description,
    ctaColor: "secondary",
    ctaVariant: "outlined",
  };
}

/**
 * 2. Where We Build Image Split Mapper (Pure 1-to-1: Dynamic Strapi || Fallback)
 * Canonical keys: title, title_color, description, description_color, image, image_alignment, background_color, CTA_text, CTA_url
 */
export function mapWhereImageSplit(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: WhereImageSplitData = COMMUNITIES_FALLBACK
): WhereImageSplitProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const image = (raw?.image as StrapiMediaItem | string) || fallback.image;
  const image_alignment = (raw?.image_alignment as "Left" | "Right") || fallback.image_alignment;
  const background_color = (raw?.background_color as string) || fallback.background_color;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;

  return {
    title,
    title_color,
    description,
    description_color,
    image,
    image_alignment,
    background_color,
    CTA_text,
    CTA_url,
  };
}

/**
 * 3. Communities Section Mapper
 */
export function mapWhereCommunities(raw?: StrapiSectionItem | RawRecord | null) {
  return mapWhereImageSplit(raw, COMMUNITIES_FALLBACK);
}

/**
 * 4. Venues Section Mapper
 */
export function mapWhereVenues(raw?: StrapiSectionItem | RawRecord | null) {
  return mapWhereImageSplit(raw, VENUES_FALLBACK);
}
