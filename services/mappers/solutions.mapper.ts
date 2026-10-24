import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  SOLUTIONS_HERO_FALLBACK,
  SOLUTIONS_SMALL_CELLS_FALLBACK,
  SOLUTIONS_DAS_FALLBACK,
  SOLUTIONS_INDUSTRIES_FALLBACK,
  SOLUTIONS_APPROACH_FALLBACK,
  SolutionStatItem,
  IndustryItem,
} from "@data/solutions.data";
import type {
  SolutionsSmallCellsProps,
  SolutionsDasProps,
  SolutionsIndustriesProps,
} from "../../components/ui-component/solutions/type";

type RawRecord = Record<string, unknown>;

export interface SolutionsHeroMappedProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  intro: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface SolutionsApproachMappedProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

/**
 * 1. Solutions Hero Mapper
 */
export function mapSolutionsHero(
  raw?: RawRecord | null,
  fallback = SOLUTIONS_HERO_FALLBACK
): SolutionsHeroMappedProps {
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

  const rawCtas = (raw?.heroCtas || raw?.ctas || raw?.cta) as RawRecord[] | undefined;
  const ctaText = (rawCtas?.[0]?.label as string) || fallback.ctaText;
  const ctaLink = (rawCtas?.[0]?.url as string) || fallback.ctaLink;

  return {
    id: "solutions-hero",
    imageSrc,
    imageAlt,
    heading,
    intro,
    ctaText,
    ctaLink,
  };
}

/**
 * 2. Solutions Small Cells Mapper
 */
export function mapSolutionsSmallCells(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_SMALL_CELLS_FALLBACK
): SolutionsSmallCellsProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawBody =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const paragraphs = isHtml ? undefined : fallback.paragraphs;

  const rawStats = (raw?.stats || raw?.Stats) as RawRecord[] | undefined;
  let stats: SolutionStatItem[] = fallback.stats;
  if (Array.isArray(rawStats) && rawStats.length > 0) {
    stats = rawStats.map((s) => ({
      value: (s.value || s.Number || s.number || "") as string,
      label: (s.label || s.Label || "") as string,
    }));
  }

  const rawMedia = (raw?.media || raw?.Media || raw?.image) as unknown;
  let illustrationSrc = fallback.illustrationSrc;
  let illustrationAlt = fallback.illustrationAlt;

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    const first = rawMedia[0] as RawRecord;
    illustrationSrc = resolveStrapiImage(first, fallback.illustrationSrc);
    illustrationAlt = (first.alternativeText as string) || fallback.illustrationAlt;
  } else if (rawMedia) {
    illustrationSrc = resolveStrapiImage(rawMedia, fallback.illustrationSrc);
  }

  return {
    title,
    contentHtml,
    paragraphs,
    stats,
    illustrationSrc,
    illustrationAlt,
  };
}

/**
 * 3. Solutions DAS Mapper (Distributed Antenna Systems)
 */
export function mapSolutionsDas(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_DAS_FALLBACK
): SolutionsDasProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawBody =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const paragraphs = isHtml ? undefined : fallback.paragraphs;

  const rawStats = (raw?.stats || raw?.Stats) as RawRecord[] | undefined;
  let stats: SolutionStatItem[] = fallback.stats;
  if (Array.isArray(rawStats) && rawStats.length > 0) {
    stats = rawStats.map((s) => ({
      value: (s.value || s.Number || s.number || "") as string,
      label: (s.label || s.Label || "") as string,
    }));
  }

  const rawMedia = (raw?.media || raw?.Media || raw?.image) as unknown;
  let illustrationSrc = fallback.illustrationSrc;
  let illustrationAlt = fallback.illustrationAlt;

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    const first = rawMedia[0] as RawRecord;
    illustrationSrc = resolveStrapiImage(first, fallback.illustrationSrc);
    illustrationAlt = (first.alternativeText as string) || fallback.illustrationAlt;
  } else if (rawMedia) {
    illustrationSrc = resolveStrapiImage(rawMedia, fallback.illustrationSrc);
  }

  return {
    title,
    contentHtml,
    paragraphs,
    stats,
    illustrationSrc,
    illustrationAlt,
  };
}

/**
 * 4. Solutions Industries Mapper
 */
export function mapSolutionsIndustries(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_INDUSTRIES_FALLBACK
): SolutionsIndustriesProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawBody =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const description = isHtml ? undefined : rawBody || fallback.description;

  const rawCards = (raw?.cards || raw?.Cards || raw?.industries) as RawRecord[] | undefined;

  let industries: IndustryItem[] = fallback.industries;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    industries = rawCards.map((item, index) => {
      const itemTitle = (item.title || item.Title || "") as string;
      const matchedFallback =
        fallback.industries.find((ind) => ind.title.toLowerCase() === itemTitle.toLowerCase()) ||
        fallback.industries[index % fallback.industries.length];

      const rawImg = (item.image || item.Image || item.media) as unknown;
      let bgImage = matchedFallback.bgImage;
      if (Array.isArray(rawImg) && rawImg.length > 0) {
        bgImage = resolveStrapiImage(rawImg[0], matchedFallback.bgImage || "");
      } else if (rawImg) {
        bgImage = resolveStrapiImage(rawImg, matchedFallback.bgImage || "");
      }

      return {
        title: itemTitle || matchedFallback.title,
        description: (item.description ||
          item.Description ||
          matchedFallback.description) as string,
        theme: matchedFallback.theme,
        bgImage,
        iconKey: matchedFallback.iconKey || itemTitle.toLowerCase().trim(),
      };
    });
  }

  return {
    title,
    contentHtml,
    description,
    industries,
  };
}

/**
 * 5. Solutions Approach / GlobeCTA Mapper
 */
export function mapSolutionsApproach(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_APPROACH_FALLBACK
): SolutionsApproachMappedProps {
  const heading =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.heading;

  const description =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string) ||
    fallback.description;

  const rawCtas = (raw?.cta || raw?.CTA || raw?.ctas) as RawRecord[] | undefined;
  const buttonText =
    (rawCtas?.[0]?.label as string) ||
    (raw?.buttonText as string) ||
    (raw?.CtaButton as string) ||
    fallback.buttonText;

  const buttonLink =
    (rawCtas?.[0]?.url as string) ||
    (raw?.buttonLink as string) ||
    (raw?.CtaLink as string) ||
    fallback.buttonLink;

  return {
    heading,
    description,
    buttonText,
    buttonLink,
  };
}
