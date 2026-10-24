import type { StrapiSectionItem, FeatureCardItem, StatItem } from "@types";
import { resolveStrapiImage, extractMediaUrl, GetStrapiMediaUrl } from "@utils";
import {
  HOME_HERO_FALLBACK,
  NETWORK_CHALLENGES_FALLBACK,
  INFRASTRUCTURE_FALLBACK,
  STATS_FALLBACK,
  COMMUNITY_IMPACT_FALLBACK,
  CAREERS_FALLBACK,
  CONTACT_FALLBACK,
  InfrastructureCard,
  SectionPointerItem,
} from "@data/home.data";
import type {
  HomeHeroProps,
  BackgroundFeatureSectionProps,
  DetailedCardGridProps,
  StatsWithImageProps,
  ImageGradientSplitProps,
} from "../../components/ui-component/home/type";

type RawRecord = Record<string, unknown>;

/**
 * 1. Home Hero Mapper
 */
export function mapHomeHero(raw?: RawRecord | null, fallback = HOME_HERO_FALLBACK): HomeHeroProps {
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.heroTitle as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.heroDescription as string) ||
    fallback.description;

  const fontColor = (raw?.FontColor as string) || (raw?.fontColor as string);
  const bgColor = (raw?.BgColor as string) || (raw?.bgColor as string);
  const scrollText =
    (raw?.ScrollText as string) || (raw?.scrollText as string) || fallback.scrollText;

  return { heading, description, fontColor, bgColor, scrollText };
}

/**
 * 2. Background Feature (Network Challenges) Mapper
 */
export function mapBackgroundFeature(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = NETWORK_CHALLENGES_FALLBACK
): BackgroundFeatureSectionProps {
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.Title as string) ||
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.Body as string) ||
    (raw?.body as string) ||
    fallback.description;

  // Resolve background images (desktop & mobile)
  const bgRaw = raw?.BackgroundImage || raw?.backgroundImage || raw?.media || raw?.Media;
  let desktopBgUrl = fallback.desktopBg;
  let mobileBgUrl = fallback.mobileBg;

  if (Array.isArray(bgRaw) && bgRaw.length > 0) {
    desktopBgUrl = resolveStrapiImage(bgRaw[0], fallback.desktopBg);
    mobileBgUrl = bgRaw.length > 1 ? resolveStrapiImage(bgRaw[1], desktopBgUrl) : desktopBgUrl;
  } else if (bgRaw) {
    const resolved = resolveStrapiImage(bgRaw, fallback.desktopBg);
    desktopBgUrl = resolved;
    mobileBgUrl = resolved;
  }

  // Normalize feature cards
  const rawCards = (raw?.FeatureCards || raw?.featureCards || raw?.cardItem || raw?.cards) as
    RawRecord[] | undefined;

  let cards: FeatureCardItem[] = fallback.cards;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((c, i) => ({
      id: (c.id as string | number) ?? i,
      heading: (c.Heading as string) || (c.heading as string) || (c.title as string) || "",
      description:
        (c.Description as string) || (c.description as string) || (c.body as string) || "",
      headingColor: (c.HeadingColor as string) || (c.headingColor as string),
      textColor: (c.TextColor as string) || (c.textColor as string),
    }));
  }

  const ctaLabel =
    (raw?.CTALabel as string) ||
    (raw?.ctaLabel as string) ||
    ((raw?.cta as RawRecord[])?.[0]?.label as string);
  const ctaLink =
    (raw?.CTALink as string) ||
    (raw?.ctaLink as string) ||
    ((raw?.cta as RawRecord[])?.[0]?.url as string);

  return {
    heading,
    description,
    desktopBgUrl,
    mobileBgUrl,
    ctaLabel,
    ctaLink,
    cards,
    fontColorHeading: (raw?.FontColorHeading as string) || (raw?.fontColorHeading as string),
    fontColorDescription:
      (raw?.FontColorDescription as string) || (raw?.fontColorDescription as string),
    maxWidthText:
      (raw?.MaxWidthText as string) || (raw?.maxWidthText as string) || (raw?.maxWidth as string),
  };
}

/**
 * 3. Infrastructure (Detailed Card Grid) Mapper
 */
export function mapInfrastructure(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = INFRASTRUCTURE_FALLBACK
): DetailedCardGridProps {
  const heading =
    (raw?.Headings as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    fallback.description;

  const bgColor = (raw?.BgColor as string) || (raw?.bgColor as string);

  const rawCards = (raw?.PanelsCards || raw?.panelsCards || raw?.cards || raw?.cardItem) as
    RawRecord[] | undefined;

  let cards: InfrastructureCard[] = fallback.cards;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((item) => {
      const title = (item.Title as string) || (item.title as string) || "";
      const desc = (item.Description as string) || (item.description as string) || "";
      const ctaText =
        (item.CtaText as string) ||
        (item.ctaText as string) ||
        (item.linkText as string) ||
        (item.CTA as string) ||
        "Explore more";
      const ctaLink =
        (item.CtaLink as string) ||
        (item.ctaLink as string) ||
        (item.link as string) ||
        "/our-solutions";

      const svgCode =
        (item.IllustatioSvgCode as string) ||
        (item.illustatioSvgCode as string) ||
        (item.SvgCode as string) ||
        (item.svgCode as string) ||
        (item.icon as string) ||
        undefined;

      const imgMedia = item.image || item.Image;
      const imageUrl = imgMedia ? resolveStrapiImage(imgMedia) : undefined;

      // Assign svgType for known fallback items
      let svgType: "small-cells" | "das" | undefined;
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes("small cell")) svgType = "small-cells";
      else if (lowerTitle.includes("das") || lowerTitle.includes("antenna")) svgType = "das";

      return {
        title,
        description: desc,
        ctaText,
        ctaLink,
        svgType,
        svgCode,
        imageUrl,
      };
    });
  }

  return { heading, description, bgColor, cards };
}

/**
 * 4. Stats With Image Mapper
 */
export function mapStatsWithImage(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = STATS_FALLBACK
): StatsWithImageProps {
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    (raw?.Title as string) ||
    fallback.heading;

  const rawStats = (raw?.Statscard || raw?.statscards || raw?.stats) as RawRecord[] | undefined;

  const DEFAULT_COLORS = ["#898cf3", "#bcf6f2", "#ffffff", "#ffffca", "#ffdac8"];

  let stats: StatItem[] = fallback.stats;
  if (Array.isArray(rawStats) && rawStats.length > 0) {
    stats = rawStats.map((s, idx) => ({
      number: (s.Number as string) || (s.number as string) || (s.value as string) || "",
      description:
        (s.Description as string) || (s.description as string) || (s.label as string) || "",
      bgColor:
        (s.BgColor as string) ||
        (s.bgColor as string) ||
        DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      numberColor: (s.NumberColor as string) || (s.numberColor as string),
      descriptionColor: (s.DescriptionColor as string) || (s.descriptionColor as string),
    }));
  }

  const mapMedia = raw?.Image || raw?.image || raw?.Media || raw?.media;
  const mapImageSrc = mapMedia
    ? resolveStrapiImage(mapMedia, fallback.mapImage)
    : fallback.mapImage;

  return {
    heading,
    stats,
    mapImageSrc,
    headingColor: (raw?.HeadingColor as string) || (raw?.headingColor as string),
  };
}

/**
 * 5. Community Impact (Image Gradient Split) Mapper
 */
export function mapCommunityImpact(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_IMPACT_FALLBACK
): ImageGradientSplitProps {
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.Title as string) ||
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.Body as string) ||
    (raw?.body as string) ||
    fallback.description;

  const rawPointers = (raw?.sectionPointers ||
    raw?.SectionPointers ||
    raw?.cards ||
    raw?.cardItem) as RawRecord[] | undefined;

  let pointers: SectionPointerItem[] = fallback.pointers;
  if (Array.isArray(rawPointers) && rawPointers.length > 0) {
    pointers = rawPointers.map((p, i) => ({
      id: (p.id as string | number) ?? i,
      heading: (p.Heading as string) || (p.heading as string) || (p.title as string) || "",
      description:
        (p.Description as string) || (p.description as string) || (p.body as string) || "",
    }));
  }

  // Resolve background images
  const bgRaw = raw?.BgImage || raw?.bgImage || raw?.media || raw?.Media || raw?.Image;
  let desktopImgUrl = fallback.desktopImg;
  let mobileImgUrl = fallback.mobileImg;

  if (Array.isArray(bgRaw) && bgRaw.length > 0) {
    desktopImgUrl = resolveStrapiImage(bgRaw[0], fallback.desktopImg);
    mobileImgUrl = bgRaw.length > 1 ? resolveStrapiImage(bgRaw[1], desktopImgUrl) : desktopImgUrl;
  } else if (bgRaw) {
    const resolved = resolveStrapiImage(bgRaw, fallback.desktopImg);
    desktopImgUrl = resolved;
    mobileImgUrl = resolved;
  }

  const ctaText =
    (raw?.CtaText as string) ||
    (raw?.ctaText as string) ||
    (raw?.ctaLabel as string) ||
    ((raw?.cta as RawRecord[])?.[0]?.label as string) ||
    fallback.ctaText;

  const ctaUrl =
    (raw?.CtaUrl as string) ||
    (raw?.ctaUrl as string) ||
    (raw?.ctaLink as string) ||
    ((raw?.cta as RawRecord[])?.[0]?.url as string) ||
    fallback.ctaUrl;

  return {
    heading,
    description,
    pointers,
    desktopImgUrl,
    mobileImgUrl,
    ctaText,
    ctaUrl,
    headingColor: (raw?.HeadingColor as string) || (raw?.headingColor as string),
    descriptionTextColor:
      (raw?.DescriptionTextColor as string) || (raw?.descriptionTextColor as string),
  };
}

/**
 * 6. Careers CTA Mapper
 */
export function mapCareersCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_FALLBACK
) {
  const heading = (raw?.title as string) || (raw?.Title as string) || fallback.heading;
  const text = (raw?.body as string) || (raw?.Body as string) || fallback.text;
  const ctaLabel = ((raw?.cta as RawRecord[])?.[0]?.label as string) || fallback.ctaLabel;
  const ctaUrl = ((raw?.cta as RawRecord[])?.[0]?.url as string) || fallback.ctaUrl;

  const mediaUrl = extractMediaUrl(raw?.media || raw?.Media);
  const bgImage = mediaUrl ? GetStrapiMediaUrl(mediaUrl) : fallback.bgImage;

  return { heading, text, ctaLabel, ctaUrl, bgImage };
}

/**
 * 7. Contact Final CTA Mapper
 */
export function mapContactCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CONTACT_FALLBACK
) {
  const heading = (raw?.title as string) || (raw?.Title as string) || fallback.heading;
  const description = (raw?.body as string) || (raw?.Body as string) || fallback.description;
  const ctaText = ((raw?.cta as RawRecord[])?.[0]?.label as string) || fallback.ctaText;
  const ctaLink = ((raw?.cta as RawRecord[])?.[0]?.url as string) || fallback.ctaLink;

  return { heading, description, ctaText, ctaLink };
}
