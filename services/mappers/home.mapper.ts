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
} from "@ui-component/home/type";

type RawRecord = Record<string, unknown>;

/**
 * 1. Home Hero Mapper
 */
export function mapHomeHero(raw?: RawRecord | null, fallback = HOME_HERO_FALLBACK): HomeHeroProps {
  const heading =
    (raw?.heroTitle as string) ||
    (raw?.title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.heading;

  const description =
    (raw?.heroDescription as string) ||
    (raw?.description as string) ||
    (raw?.Description as string) ||
    (raw?.body as string) ||
    fallback.description;

  const fontColor =
    (raw?.fontColor as string) ||
    (raw?.font_color as string) ||
    (raw?.FontColor as string) ||
    undefined;

  const bgColor =
    (raw?.bgColor as string) ||
    (raw?.background_color as string) ||
    (raw?.BgColor as string) ||
    undefined;

  const scrollText =
    (raw?.scrollText as string) ||
    (raw?.scroll_text as string) ||
    (raw?.ScrollText as string) ||
    fallback.scrollText;

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
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    fallback.description;

  // Resolve background images (desktop & mobile)
  const bgRaw = raw?.BackgroundImage || raw?.media;
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
  const rawCards = (raw?.FeatureCards || raw?.cards) as RawRecord[] | undefined;

  let cards: FeatureCardItem[] = fallback.cards;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((c, i) => ({
      id: (c.id as string | number) ?? i,
      heading:
        (c.Heading as string) ||
        (c.heading as string) ||
        (c.title as string) ||
        fallback.cards[i % fallback.cards.length]?.heading ||
        "",
      description:
        (c.Description as string) ||
        (c.description as string) ||
        (c.body as string) ||
        fallback.cards[i % fallback.cards.length]?.description ||
        "",
      headingColor: (c.HeadingColor as string) || (c.headingColor as string) || undefined,
      textColor: (c.TextColor as string) || (c.textColor as string) || undefined,
    }));
  }

  const rawCta = (Array.isArray(raw?.cta) ? raw.cta[0] : raw?.cta) as RawRecord | undefined;
  const ctaLabel =
    (raw?.CTALabel as string) ||
    (raw?.ctaLabel as string) ||
    (rawCta?.label as string) ||
    undefined;

  const ctaLink =
    (raw?.CTALink as string) || (raw?.ctaLink as string) || (rawCta?.url as string) || undefined;

  const fontColorHeading =
    (raw?.FontColorHeading as string) || (raw?.fontColorHeading as string) || undefined;

  const fontColorDescription =
    (raw?.FontColorDescription as string) || (raw?.fontColorDescription as string) || undefined;

  const maxWidthText = (raw?.MaxWidthText as string) || undefined;

  return {
    heading,
    description,
    desktopBgUrl,
    mobileBgUrl,
    ctaLabel,
    ctaLink,
    cards,
    fontColorHeading,
    fontColorDescription,
    maxWidthText,
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
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    fallback.description;

  const bgColor = (raw?.BgColor as string) || (raw?.bgColor as string) || undefined;

  const rawCards = (raw?.PanelsCards || raw?.cards) as RawRecord[] | undefined;

  let cards: InfrastructureCard[] = fallback.cards;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((item, idx) => {
      const fallbackCard = fallback.cards[idx % fallback.cards.length];
      const title = (item.Title as string) || (item.title as string) || fallbackCard?.title || "";
      const desc =
        (item.Description as string) ||
        (item.description as string) ||
        fallbackCard?.description ||
        "";
      const ctaText =
        (item.CtaText as string) ||
        (item.ctaText as string) ||
        (item.linkText as string) ||
        fallbackCard?.ctaText ||
        "Explore more";
      const ctaLink =
        (item.CtaLink as string) ||
        (item.ctaLink as string) ||
        (item.link as string) ||
        fallbackCard?.ctaLink ||
        "/our-solutions";

      const svgCode =
        (item.IllustatioSvgCode as string) ||
        (item.svgCode as string) ||
        (item.icon as string) ||
        fallbackCard?.svgCode ||
        undefined;

      const imgMedia = item.image || item.media;
      const imageUrl = imgMedia ? resolveStrapiImage(imgMedia) : fallbackCard?.imageUrl;

      // Assign svgType for known items
      let svgType = fallbackCard?.svgType;
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
    (raw?.title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.heading;

  const rawStats = (raw?.StatsCard || raw?.stats || raw?.Statscard) as RawRecord[] | undefined;

  const DEFAULT_COLORS = ["#898cf3", "#bcf6f2", "#ffffff", "#ffffca", "#ffdac8"];

  let stats: StatItem[] = fallback.stats;
  if (Array.isArray(rawStats) && rawStats.length > 0) {
    stats = rawStats.map((s, idx) => ({
      number:
        (s.number as string) ||
        (s.value as string) ||
        fallback.stats[idx % fallback.stats.length]?.number ||
        "",
      description:
        (s.description as string) ||
        (s.label as string) ||
        fallback.stats[idx % fallback.stats.length]?.description ||
        "",
      bgColor:
        (s.background_color as string) ||
        (s.bgColor as string) ||
        DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      numberColor: (s.number_color as string) || (s.numberColor as string) || undefined,
      descriptionColor:
        (s.description_color as string) || (s.descriptionColor as string) || undefined,
    }));
  }

  const mapMedia = raw?.image || raw?.media;
  const mapImageSrc = mapMedia
    ? resolveStrapiImage(mapMedia, fallback.mapImage)
    : fallback.mapImage;

  const headingColor =
    (raw?.heading_color as string) ||
    (raw?.headingColor as string) ||
    (raw?.HeadingColor as string) ||
    undefined;

  return {
    heading,
    stats,
    mapImageSrc,
    headingColor,
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
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    fallback.description;

  const rawPointers = (raw?.sectionPointers || raw?.cards) as RawRecord[] | undefined;

  let pointers: SectionPointerItem[] = fallback.pointers;
  if (Array.isArray(rawPointers) && rawPointers.length > 0) {
    pointers = rawPointers.map((p, i) => ({
      id: (p.id as string | number) ?? i,
      heading:
        (p.Heading as string) ||
        (p.heading as string) ||
        (p.title as string) ||
        fallback.pointers[i % fallback.pointers.length]?.heading ||
        "",
      description:
        (p.Description as string) ||
        (p.description as string) ||
        (p.body as string) ||
        fallback.pointers[i % fallback.pointers.length]?.description ||
        "",
    }));
  }

  // Resolve background images
  const bgRaw = raw?.BgImage || raw?.media;
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

  const rawCta = (Array.isArray(raw?.cta) ? raw.cta[0] : raw?.cta) as RawRecord | undefined;
  const ctaText =
    (raw?.CtaText as string) ||
    (raw?.ctaText as string) ||
    (rawCta?.label as string) ||
    fallback.ctaText;

  const ctaUrl =
    (raw?.CtaUrl as string) ||
    (raw?.ctaUrl as string) ||
    (rawCta?.url as string) ||
    fallback.ctaUrl;

  const headingColor = (raw?.HeadingColor as string) || (raw?.headingColor as string) || undefined;

  const descriptionTextColor =
    (raw?.DescriptionTextColor as string) || (raw?.descriptionTextColor as string) || undefined;

  return {
    heading,
    description,
    pointers,
    desktopImgUrl,
    mobileImgUrl,
    ctaText,
    ctaUrl,
    headingColor,
    descriptionTextColor,
  };
}

/**
 * 6. Careers CTA Mapper
 */
export function mapCareersCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_FALLBACK
) {
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    fallback.heading;

  const text =
    (raw?.Text as string) ||
    (raw?.text as string) ||
    (raw?.body as string) ||
    (raw?.description as string) ||
    fallback.text;

  const rawCta = (Array.isArray(raw?.cta) ? raw.cta[0] : raw?.cta) as RawRecord | undefined;
  const ctaLabel =
    (raw?.ctaLabel as string) ||
    (raw?.CTALabel as string) ||
    (rawCta?.label as string) ||
    fallback.ctaLabel;

  const ctaUrl =
    (raw?.ctaUrl as string) ||
    (raw?.CTAUrl as string) ||
    (rawCta?.url as string) ||
    fallback.ctaUrl;

  const mediaSource = raw?.BgImage || raw?.media;
  const mediaUrl = extractMediaUrl(mediaSource);
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
  const heading =
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    fallback.heading;

  const description =
    (raw?.Description as string) ||
    (raw?.description as string) ||
    (raw?.body as string) ||
    fallback.description;

  const rawCta = (Array.isArray(raw?.cta) ? raw.cta[0] : raw?.cta) as RawRecord | undefined;
  const ctaText =
    (raw?.CtaText as string) ||
    (raw?.ctaText as string) ||
    (rawCta?.label as string) ||
    fallback.ctaText;

  const ctaLink =
    (raw?.CtaLink as string) ||
    (raw?.ctaLink as string) ||
    (rawCta?.url as string) ||
    fallback.ctaLink;

  return { heading, description, ctaText, ctaLink };
}
