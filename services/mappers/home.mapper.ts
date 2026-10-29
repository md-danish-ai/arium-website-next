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
  CareersCtaProps,
  ContactCtaProps,
} from "@ui-component/home/type";
import type { ImageGradientSplitProps } from "@ui-common";

type RawRecord = Record<string, unknown>;

/**
 * 1. Home Hero Mapper (widget.main-hero - Position 0)
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
 * 2. Background Feature (Network Challenges) Mapper (widget.background-feature-section - Position 1)
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
 * 3. Our Infrastructure (Detailed Card Grid) Mapper (widget.detailed-card-grid - Position 2)
 * Canonical keys: title, description, background_color, panel_cards
 */
export function mapInfrastructure(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = INFRASTRUCTURE_FALLBACK
): DetailedCardGridProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_color = (raw?.background_color as string) || fallback.background_color;

  const rawCards = raw?.panel_cards as RawRecord[] | undefined;
  const panel_cards: InfrastructureCard[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((item, idx) => {
          const fb = fallback.panel_cards[idx % fallback.panel_cards.length];
          const cardTitle = (item.title as string) || fb?.title || "";
          const cardDesc = (item.description as string) || fb?.description || "";
          const CTA_text = (item.CTA_text as string) || fb?.CTA_text;
          const CTA_url = (item.CTA_url as string) || fb?.CTA_url;
          const text_color = (item.text_color as string) || fb?.text_color;
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
            text_color,
            svg_code,
            image,
            svgType,
          };
        })
      : fallback.panel_cards;

  return {
    title,
    description,
    background_color,
    panel_cards,
  };
}

/**
 * 4. Scale and Experience (Stats With Image) Mapper (widget.stats-with-image - Position 3)
 * Canonical keys: title, title_color, stat_illustration, stats_card
 */
export function mapStatsWithImage(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = STATS_FALLBACK
): StatsWithImageProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;

  const stat_illustration = raw?.stat_illustration
    ? resolveStrapiImage(raw.stat_illustration, fallback.stat_illustration)
    : fallback.stat_illustration;

  const rawStats = raw?.stats_card as RawRecord[] | undefined;
  const stats_card: StatItem[] =
    Array.isArray(rawStats) && rawStats.length > 0
      ? rawStats.map((s, idx) => {
          const fb = fallback.stats_card[idx % fallback.stats_card.length];
          return {
            id: (s.id as string | number) ?? idx,
            stat: (s.stat as string) || fb?.stat || "",
            stat_color: (s.stat_color as string) || fb?.stat_color,
            description: (s.description as string) || fb?.description || "",
            description_color: (s.description_color as string) || fb?.description_color,
            background_color: (s.background_color as string) || fb?.background_color,
          };
        })
      : fallback.stats_card;

  return {
    title,
    title_color,
    stat_illustration,
    stats_card,
  };
}

/**
 * 5. Community Impact (Image Gradient Split) Mapper (widget.image-gradient-split - Position 4)
 * Canonical keys: title, title_color, description, description_color, CTA_text, CTA_url,
 * background_image_desktop, background_image_mobile, section_pointers
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

  const rawPointers = raw?.section_pointers as RawRecord[] | undefined;
  const section_pointers: SectionPointerItem[] =
    Array.isArray(rawPointers) && rawPointers.length > 0
      ? rawPointers.map((p, i) => {
          const fb = fallback.section_pointers[i % fallback.section_pointers.length];
          return {
            id: (p.id as string | number) ?? i,
            title: (p.title as string) || fb?.title || "",
            title_color: (p.title_color as string) || fb?.title_color,
            description: (p.description as string) || fb?.description || "",
            description_color: (p.description_color as string) || fb?.description_color,
          };
        })
      : fallback.section_pointers;

  return {
    title,
    title_color,
    description,
    description_color,
    CTA_text,
    CTA_url,
    background_image_desktop,
    background_image_mobile,
    section_pointers,
  };
}

/**
 * 6. Careers Image CTA Mapper (widget.centered-image-cta - Position 5)
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
 * 7. Final Contact CTA Mapper (widget.cta-with-graphic - Position 6)
 * Canonical keys: title, title_color, description, description_color, CTA_text, CTA_url,
 * globe_illustration_desktop, globe_illustration_mobile, background_color
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

  const globe_illustration_desktop = raw?.globe_illustration_desktop
    ? resolveStrapiImage(raw.globe_illustration_desktop, fallback.globe_illustration_desktop)
    : fallback.globe_illustration_desktop;

  const globe_illustration_mobile = raw?.globe_illustration_mobile
    ? resolveStrapiImage(raw.globe_illustration_mobile, fallback.globe_illustration_mobile)
    : fallback.globe_illustration_mobile;

  const background_color = (raw?.background_color as string) || fallback.background_color;

  return {
    title,
    title_color,
    description,
    description_color,
    CTA_text,
    CTA_url,
    globe_illustration_desktop,
    globe_illustration_mobile,
    background_color,
  };
}
