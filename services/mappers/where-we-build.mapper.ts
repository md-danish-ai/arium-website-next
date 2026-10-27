import type { StrapiSectionItem, ImageItem, LinkItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  WHERE_HERO_FALLBACK,
  COMMUNITIES_FALLBACK,
  VENUES_FALLBACK,
  WhereFeatureSectionData,
} from "@data/where-we-build.data";
import type { WhereFeatureProps } from "../../components/ui-component/where-we-build/type";

type RawRecord = Record<string, unknown>;

export interface WhereHeroMappedProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  intro: string;
}

/**
 * 1. Where We Build Hero Mapper
 */
export function mapWhereHero(
  raw?: RawRecord | null,
  fallback = WHERE_HERO_FALLBACK
): WhereHeroMappedProps {
  const heading =
    (raw?.heroTitle as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    fallback.heading;

  const intro =
    (raw?.heroDescription as string) ||
    (raw?.Description as string) ||
    (raw?.description as string) ||
    fallback.intro;

  const rawMedia = (raw?.heroMedia || raw?.media || raw?.Media) as unknown;
  let imageSrc = fallback.imageSrc;
  let imageAlt = fallback.imageAlt;

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    const first = rawMedia[0] as RawRecord;
    imageSrc = resolveStrapiImage(first, fallback.imageSrc);
    imageAlt = (first.alternativeText as string) || fallback.imageAlt;
  } else if (rawMedia) {
    imageSrc = resolveStrapiImage(rawMedia, fallback.imageSrc);
  }

  return {
    id: "where-hero",
    imageSrc,
    imageAlt,
    heading,
    intro,
  };
}

/**
 * 2. Generic Where We Build Feature Section Mapper (Communities / Venues)
 */
export function mapWhereFeatureSection(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: WhereFeatureSectionData = COMMUNITIES_FALLBACK
): WhereFeatureProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const hasBody = Boolean(raw?.body || raw?.Body);
  const description =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string) ||
    fallback.description;

  const rawCta = raw?.cta as RawRecord | undefined;
  const cta: LinkItem = {
    label:
      (rawCta?.label as string) ||
      (rawCta?.text as string) ||
      (raw?.CTAText as string) ||
      (raw?.ctaText as string) ||
      (raw?.ctaLabel as string) ||
      fallback.cta.label,
    url:
      (rawCta?.url as string) ||
      (rawCta?.href as string) ||
      (raw?.CTAUrl as string) ||
      (raw?.ctaUrl as string) ||
      fallback.cta.url,
  };

  const rawMedia = (raw?.media || raw?.Media || raw?.image || raw?.Image) as unknown;
  let images: ImageItem[] = fallback.images;

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    images = rawMedia.map((m: RawRecord, idx: number) => ({
      src: resolveStrapiImage(m) || fallback.images[idx]?.src || "",
      alt: (m.alternativeText as string) || fallback.images[idx]?.alt || title,
    }));
  } else if (rawMedia) {
    const singleUrl = resolveStrapiImage(rawMedia);
    if (singleUrl) {
      images = [{ src: singleUrl, alt: title }];
    }
  }

  const bgGradient = (raw?.BgGradient as string) || (raw?.bgGradient as string);

  return {
    title,
    description,
    cta,
    images,
    isHtmlDescription: hasBody && description.includes("<") && description.includes(">"),
    bgGradient,
  };
}

/**
 * 3. Specific Communities Section Mapper
 */
export function mapWhereCommunities(raw?: StrapiSectionItem | RawRecord | null) {
  return mapWhereFeatureSection(raw, COMMUNITIES_FALLBACK);
}

/**
 * 4. Specific Venues Section Mapper
 */
export function mapWhereVenues(raw?: StrapiSectionItem | RawRecord | null) {
  return mapWhereFeatureSection(raw, VENUES_FALLBACK);
}
