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
} from "../../components/ui-component/about/type";

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
  const heading =
    (raw?.heading as string) ||
    (raw?.Heading as string) ||
    (raw?.title as string) ||
    (raw?.Title as string) ||
    fallback.heading;

  const rawBody =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string);

  const isHtmlBody = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const bodyText = rawBody || fallback.paragraphs.join("\n\n");

  const rawMedia = (raw?.media ||
    raw?.Media ||
    raw?.image ||
    raw?.Image ||
    raw?.Image_right) as unknown;
  const sideImageSrc = rawMedia
    ? resolveStrapiImage(rawMedia, fallback.sideImageSrc)
    : fallback.sideImageSrc;

  const gradient =
    (raw?.Gradient as string) ||
    (raw?.gradient as string) ||
    (raw?.BgGradient as string) ||
    fallback.gradient;

  return {
    heading,
    bodyText,
    isHtmlBody,
    sideImageSrc,
    gradient,
    headingColor: (raw?.HeadingColor as string) || (raw?.headingColor as string),
    descriptionColor: (raw?.DescriptionColor as string) || (raw?.descriptionColor as string),
  };
}

/**
 * 3. About Journey (Timeline) Mapper
 */
export function mapAboutJourney(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_JOURNEY_FALLBACK
): AboutJourneyProps {
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    (raw?.Title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    (raw?.Body as string) ||
    fallback.description;

  const rawCards = (raw?.TimeCards || raw?.timeCards || raw?.cards || raw?.cardItem) as
    RawRecord[] | undefined;

  let timelineItems: AboutTimelineCard[] = fallback.items;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    timelineItems = rawCards.map((c) => ({
      title: (c.Title || c.title || "") as string,
      description: (c.Content || c.description || c.body || c.content || "") as string,
      titleColor: (c.TitleColor || c.titleColor) as string | undefined,
      badgeText: (c.BadgeText || c.badge || c.badgeText) as string | undefined,
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
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    (raw?.Title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    (raw?.Body as string) ||
    fallback.description;

  const rawCards = (raw?.CradColorful || raw?.cradColorful || raw?.stats || raw?.cards) as
    RawRecord[] | undefined;

  let stats: AboutStatPillar[] = fallback.stats;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    stats = rawCards.map((c) => ({
      title: (c.Title || c.value || c.title || "") as string,
      description: (c.Description || c.label || c.description || "") as string,
      badge: (c.Badge || c.badge || "") as string,
      bgGradient: (c.BgGradient || c.bgGradient) as string | undefined,
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
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    (raw?.Title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    (raw?.Body as string) ||
    fallback.description;

  const rawMedia = (raw?.BgImage ||
    raw?.bgImage ||
    raw?.media ||
    raw?.Media ||
    raw?.image) as unknown;
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

  const rawPillars = (raw?.PillarCard || raw?.pillarCard || raw?.cards) as RawRecord[] | undefined;

  let pillars: CommitmentPillar[] = fallback.pillars;
  if (Array.isArray(rawPillars) && rawPillars.length > 0) {
    pillars = rawPillars.map((p) => ({
      title: (p.PillarText || p.title || p.heading || "") as string,
      description: (p.PillarDescription || p.description || p.body || "") as string,
      barColor: (p.BarColor || p.barColor) as string | undefined,
      headingColor: p.PillarHeadingColor as string | undefined,
      bgColorHover: p.PillarBgColorHover as string | undefined,
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
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    (raw?.Title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    (raw?.Body as string) ||
    "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.";

  const rawPillars = (raw?.Pillarcard || raw?.pillarcard || raw?.Cards || raw?.cards) as
    RawRecord[] | undefined;

  let pillars: CulturePillarItem[] = fallback.pillars;
  if (Array.isArray(rawPillars) && rawPillars.length > 0) {
    pillars = rawPillars.map((p) => ({
      heading: (p.Heading || p.title || "") as string,
      description: (p.Description || p.description || "") as string,
      headingColor: p.HeadingColor as string | undefined,
      descriptionColor: p.DescriptionColor as string | undefined,
    }));
  }

  const rawMedia = (raw?.BgImage ||
    raw?.bgImage ||
    raw?.media ||
    raw?.Media ||
    raw?.image) as unknown;
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

  const rawCta = (raw?.cta || raw?.CTA) as RawRecord[] | undefined;
  const cta: LinkItem = {
    label:
      (raw?.CtaButton as string) ||
      (raw?.ctaButton as string) ||
      (rawCta?.[0]?.label as string) ||
      fallback.cta.label,
    url:
      (raw?.CTALink as string) ||
      (raw?.ctaLink as string) ||
      (rawCta?.[0]?.url as string) ||
      fallback.cta.url,
  };

  return {
    heading,
    description,
    pillars,
    desktopImgUrl,
    mobileImgUrl,
    cta,
    headingColor: (raw?.HeadingColor as string) || (raw?.headingColor as string),
    descriptionColor: (raw?.DescriptionColor as string) || (raw?.descriptionColor as string),
  };
}
