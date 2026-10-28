import type { StrapiSectionItem, ImageItem, LinkItem } from "@types";
import { resolveStrapiImage, extractMediaUrl, GetStrapiMediaUrl } from "@utils";
import {
  ABOUT_HERO_FALLBACK,
  ABOUT_STORY_FALLBACK,
  ABOUT_JOURNEY_FALLBACK,
  ABOUT_STATS_FALLBACK,
  ABOUT_COMMITMENTS_FALLBACK,
  ABOUT_CULTURE_FALLBACK,
  AboutTimelineCard,
  AboutStatPillar,
  CommitmentPillar,
  CulturePillarItem,
} from "@data/about.data";
import type {
  AboutContentWithSideGraphicProps,
  AboutJourneyProps,
  AboutStatsCardsProps,
  AboutCommitmentsProps,
  AboutCultureProps,
} from "@ui-component/about/type";

type RawRecord = Record<string, unknown>;

export interface AboutHeroMappedProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  intro: string;
}

/**
 * 1. About Hero Mapper
 */
export function mapAboutHero(
  raw?: RawRecord | null,
  fallback = ABOUT_HERO_FALLBACK
): AboutHeroMappedProps {
  const heading = (raw?.heroTitle as string) || (raw?.title as string) || fallback.heading;

  const intro = (raw?.heroDescription as string) || fallback.intro;

  const rawMedia = (raw?.heroMedia || raw?.media) as unknown;
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
    id: "about-hero",
    imageSrc,
    imageAlt,
    heading,
    intro,
  };
}

/**
 * 2. About Story (Content With Side Graphic) Mapper
 */
export function mapAboutStory(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_STORY_FALLBACK
): AboutContentWithSideGraphicProps {
  const heading = (raw?.title as string) || (raw?.heading as string) || fallback.heading;
  const rawBody = (raw?.body as string) || (raw?.description as string);

  const isHtmlBody = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const bodyText = rawBody || fallback.paragraphs.join("\n\n");

  const rawMedia = (raw?.media || raw?.image) as unknown;
  const sideImageSrc = rawMedia
    ? resolveStrapiImage(rawMedia, fallback.sideImageSrc)
    : fallback.sideImageSrc;

  const gradient = (raw?.gradient as string) || fallback.gradient;

  return {
    heading,
    bodyText,
    isHtmlBody,
    sideImageSrc,
    gradient,
  };
}

/**
 * 3. About Journey (Timeline) Mapper
 */
export function mapAboutJourney(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_JOURNEY_FALLBACK
): AboutJourneyProps {
  const heading = (raw?.title as string) || fallback.heading;
  const description = (raw?.body as string) || fallback.description;

  const rawCards = (raw?.cards || raw?.TimeCards) as RawRecord[] | undefined;

  let timelineItems: AboutTimelineCard[] = fallback.items;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    timelineItems = rawCards.map((c) => ({
      title: (c.title as string) || "",
      description: (c.description as string) || (c.body as string) || "",
      titleColor: (c.titleColor as string) || undefined,
      badgeText: (c.badge as string) || (c.badgeText as string) || undefined,
    }));
  }

  return { heading, description, timelineItems };
}

/**
 * 4. About Stats Cards (Why Our Infrastructure Matters) Mapper
 */
export function mapAboutStatsCards(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_STATS_FALLBACK
): AboutStatsCardsProps {
  const heading = (raw?.title as string) || fallback.heading;
  const description = (raw?.body as string) || fallback.description;

  const rawCards = (raw?.cards || raw?.stats || raw?.CradColorful) as RawRecord[] | undefined;

  let stats: AboutStatPillar[] = fallback.stats;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    stats = rawCards.map((c) => ({
      title: (c.title as string) || (c.value as string) || "",
      description: (c.description as string) || (c.label as string) || "",
      badge: (c.badge as string) || "",
      bgGradient: (c.bgGradient as string) || undefined,
    }));
  }

  return { heading, description, stats };
}

/**
 * 5. About Commitments Mapper
 */
export function mapAboutCommitments(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_COMMITMENTS_FALLBACK
): AboutCommitmentsProps {
  const heading = (raw?.title as string) || fallback.heading;
  const description = (raw?.body as string) || fallback.description;

  const rawMedia = (raw?.media || raw?.BgImage) as unknown;
  let heroBannerImg: ImageItem = fallback.heroBannerImg;

  if (rawMedia) {
    const extracted = extractMediaUrl(rawMedia);
    if (extracted) {
      heroBannerImg = {
        src: GetStrapiMediaUrl(extracted),
        alt: heading || fallback.heroBannerImg.alt,
      };
    }
  }

  const rawPillars = (raw?.cards || raw?.PillarCard) as RawRecord[] | undefined;

  let pillars: CommitmentPillar[] = fallback.pillars;
  if (Array.isArray(rawPillars) && rawPillars.length > 0) {
    pillars = rawPillars.map((p) => ({
      title: (p.title as string) || (p.PillarText as string) || "",
      description:
        (p.description as string) || (p.PillarDescription as string) || (p.body as string) || "",
      barColor: (p.barColor as string) || undefined,
      headingColor: (p.headingColor as string) || undefined,
      bgColorHover: (p.bgColorHover as string) || undefined,
    }));
  }

  return { heading, description, heroBannerImg, pillars };
}

/**
 * 6. About Culture Mapper
 */
export function mapAboutCulture(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_CULTURE_FALLBACK
): AboutCultureProps {
  const heading = (raw?.title as string) || fallback.heading;
  const description = (raw?.body as string) || fallback.description;

  const rawPillars = (raw?.cards || raw?.Pillarcard) as RawRecord[] | undefined;

  let pillars: CulturePillarItem[] = fallback.pillars;
  if (Array.isArray(rawPillars) && rawPillars.length > 0) {
    pillars = rawPillars.map((p) => ({
      heading: (p.title as string) || (p.heading as string) || "",
      description: (p.description as string) || "",
      headingColor: (p.headingColor as string) || undefined,
      descriptionColor: (p.descriptionColor as string) || undefined,
    }));
  }

  const rawMedia = (raw?.media || raw?.BgImage) as unknown;
  let desktopImgUrl = fallback.mediaUrls[1];
  let mobileImgUrl = fallback.mediaUrls[0];

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    mobileImgUrl = resolveStrapiImage(rawMedia[0], fallback.mediaUrls[0]);
    desktopImgUrl =
      rawMedia.length > 1 ? resolveStrapiImage(rawMedia[1], fallback.mediaUrls[1]) : mobileImgUrl;
  } else if (rawMedia) {
    const single = resolveStrapiImage(rawMedia, fallback.mediaUrls[1]);
    desktopImgUrl = single;
    mobileImgUrl = single;
  }

  const rawCta = (Array.isArray(raw?.cta) ? raw.cta[0] : raw?.cta) as RawRecord | undefined;
  const cta: LinkItem = {
    label: (rawCta?.label as string) || (raw?.ctaLabel as string) || fallback.cta.label,
    url: (rawCta?.url as string) || (raw?.ctaLink as string) || fallback.cta.url,
  };

  return {
    heading,
    description,
    pillars,
    desktopImgUrl,
    mobileImgUrl,
    cta,
  };
}
