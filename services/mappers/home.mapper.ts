import type { StrapiSectionItem, FeatureCardItem, StatItem } from "@types";
import { resolveStrapiImage } from "@utils";
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
  CareersCtaProps,
  ContactCtaProps,
} from "@ui-component/home/type";

type RawRecord = Record<string, unknown>;

/**
 * 1. Home Hero Mapper (shared.main-hero - Position 0)
 * Canonical keys: title, description, font_color, background_color, scroll_text
 */
export function mapHomeHero(raw?: RawRecord | null, fallback = HOME_HERO_FALLBACK): HomeHeroProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const font_color = (raw?.font_color as string) || fallback.font_color;
  const background_color = (raw?.background_color as string) || fallback.background_color;
  const scroll_text = (raw?.scroll_text as string) || fallback.scroll_text;

  return {
    title,
    description,
    font_color,
    background_color,
    scroll_text,
  };
}

/**
 * 2. Background Feature (Network Challenges) Mapper (shared.background-feature-section - Position 1)
 * Canonical keys: title, title_color, description, description_color, background_image_desktop,
 * background_image_mobile, CTA_text, CTA_url, FeatureCards
 */
export function mapBackgroundFeature(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = NETWORK_CHALLENGES_FALLBACK
): BackgroundFeatureSectionProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;

  const background_image_desktop = raw?.background_image_desktop
    ? resolveStrapiImage(raw.background_image_desktop, fallback.background_image_desktop)
    : fallback.background_image_desktop;

  const background_image_mobile = raw?.background_image_mobile
    ? resolveStrapiImage(raw.background_image_mobile, fallback.background_image_mobile)
    : fallback.background_image_mobile;

  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;

  const rawCards = raw?.FeatureCards as RawRecord[] | undefined;
  const FeatureCards: FeatureCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.FeatureCards[i % fallback.FeatureCards.length];
          return {
            id: (c.id as string | number) ?? i,
            title: (c.title as string) || fb?.title || "",
            title_color: (c.title_color as string) || fb?.title_color,
            description: (c.description as string) || fb?.description || "",
            description_color: (c.description_color as string) || fb?.description_color,
            text_color: (c.text_color as string) || fb?.text_color,
          };
        })
      : fallback.FeatureCards;

  return {
    title,
    title_color,
    description,
    description_color,
    background_image_desktop,
    background_image_mobile,
    CTA_text,
    CTA_url,
    FeatureCards,
  };
}

/**
 * 3. Our Infrastructure (Detailed Card Grid) Mapper (shared.detailed-card-grid - Position 2)
 * Canonical keys: title, description, background_color, PanelCards
 * Note: PanelCards contains an OR option between interactive svg_code / svgType and image
 */
export function mapInfrastructure(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = INFRASTRUCTURE_FALLBACK
): DetailedCardGridProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_color = (raw?.background_color as string) || fallback.background_color;

  const rawCards = raw?.PanelCards as RawRecord[] | undefined;
  const PanelCards: InfrastructureCard[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((item, idx) => {
          const fb = fallback.PanelCards[idx % fallback.PanelCards.length];
          const cardTitle = (item.title as string) || fb?.title || "";
          const cardDesc = (item.description as string) || fb?.description || "";
          const CTA_text = (item.CTA_text as string) || fb?.CTA_text;
          const CTA_url = (item.CTA_url as string) || fb?.CTA_url;
          const content_color = (item.content_color as string) || fb?.content_color;
          const svg_code = (item.svg_code as string) || fb?.svg_code;
          const image = item.image ? resolveStrapiImage(item.image) : fb?.image;

          let svgType = fb?.svgType;
          const lowerTitle = cardTitle.toLowerCase();
          if (lowerTitle.includes("small cell")) svgType = "small-cells";
          else if (lowerTitle.includes("das") || lowerTitle.includes("antenna")) svgType = "das";

          return {
            id: (item.id as string | number) ?? idx,
            title: cardTitle,
            description: cardDesc,
            CTA_text,
            CTA_url,
            content_color,
            svg_code,
            image,
            svgType,
          };
        })
      : fallback.PanelCards;

  return {
    title,
    description,
    background_color,
    PanelCards,
  };
}

/**
 * 4. Scale and Experience (Stats With Image) Mapper (shared.stats-with-image - Position 3)
 * Canonical keys: title, title_color, image, StatsCard
 */
export function mapStatsWithImage(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = STATS_FALLBACK
): StatsWithImageProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;

  const image = raw?.image ? resolveStrapiImage(raw.image, fallback.image) : fallback.image;

  const rawStats = raw?.StatsCard as RawRecord[] | undefined;
  const StatsCard: StatItem[] =
    Array.isArray(rawStats) && rawStats.length > 0
      ? rawStats.map((s, idx) => {
          const fb = fallback.StatsCard[idx % fallback.StatsCard.length];
          return {
            id: (s.id as string | number) ?? idx,
            number: (s.number as string) || fb?.number || "",
            number_color: (s.number_color as string) || fb?.number_color,
            description: (s.description as string) || fb?.description || "",
            description_color: (s.description_color as string) || fb?.description_color,
            background_color: (s.background_color as string) || fb?.background_color,
          };
        })
      : fallback.StatsCard;

  return {
    title,
    title_color,
    image,
    StatsCard,
  };
}

/**
 * 5. Community Impact (Image Gradient Split) Mapper (shared.image-gradient-split - Position 4)
 * Canonical keys: title, title_color, description, description_color, CTA_text, CTA_url,
 * background_image_desktop, background_image_mobile, SectionPointers
 */
export function mapCommunityImpact(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_IMPACT_FALLBACK
): ImageGradientSplitProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;

  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;

  const background_image_desktop = raw?.background_image_desktop
    ? resolveStrapiImage(raw.background_image_desktop, fallback.background_image_desktop)
    : fallback.background_image_desktop;

  const background_image_mobile = raw?.background_image_mobile
    ? resolveStrapiImage(raw.background_image_mobile, fallback.background_image_mobile)
    : fallback.background_image_mobile;

  const rawPointers = raw?.SectionPointers as RawRecord[] | undefined;
  const SectionPointers: SectionPointerItem[] =
    Array.isArray(rawPointers) && rawPointers.length > 0
      ? rawPointers.map((p, i) => {
          const fb = fallback.SectionPointers[i % fallback.SectionPointers.length];
          return {
            id: (p.id as string | number) ?? i,
            title: (p.title as string) || fb?.title || "",
            title_color: (p.title_color as string) || fb?.title_color,
            description: (p.description as string) || fb?.description || "",
            description_color: (p.description_color as string) || fb?.description_color,
          };
        })
      : fallback.SectionPointers;

  return {
    title,
    title_color,
    description,
    description_color,
    CTA_text,
    CTA_url,
    background_image_desktop,
    background_image_mobile,
    SectionPointers,
  };
}

/**
 * 6. Careers Image CTA Mapper (shared.centered-image-cta - Position 5)
 * Canonical keys: title, title_color, description, description_color, background_image, CTA_text, CTA_url
 */
export function mapCareersCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_FALLBACK
): CareersCtaProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;

  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;

  const background_image = raw?.background_image
    ? resolveStrapiImage(raw.background_image, fallback.background_image)
    : fallback.background_image;

  return {
    title,
    title_color,
    description,
    description_color,
    background_image,
    CTA_text,
    CTA_url,
  };
}

/**
 * 7. Final Contact CTA Mapper (shared.cta-with-graphic - Position 6)
 * Canonical keys: title, title_color, description, description_color, CTA_text, CTA_url,
 * image_desktop, image_mobile, background_color
 */
export function mapContactCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CONTACT_FALLBACK
): ContactCtaProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;

  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;

  const image_desktop = raw?.image_desktop
    ? resolveStrapiImage(raw.image_desktop, fallback.image_desktop)
    : fallback.image_desktop;

  const image_mobile = raw?.image_mobile
    ? resolveStrapiImage(raw.image_mobile, fallback.image_mobile)
    : fallback.image_mobile;

  const background_color = (raw?.background_color as string) || fallback.background_color;

  return {
    title,
    title_color,
    description,
    description_color,
    CTA_text,
    CTA_url,
    image_desktop,
    image_mobile,
    background_color,
  };
}
