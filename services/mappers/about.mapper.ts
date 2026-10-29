import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  ABOUT_HERO_FALLBACK,
  ABOUT_STORY_FALLBACK,
  ABOUT_JOURNEY_FALLBACK,
  ABOUT_STATS_FALLBACK,
  ABOUT_COMMITMENTS_FALLBACK,
  ABOUT_CULTURE_FALLBACK,
  TimelineCardItem,
  StatCardItem,
  CommitmentCardItem,
} from "@data/about.data";
import type {
  AboutHeroProps,
  AboutContentWithSideGraphicProps,
  AboutJourneyProps,
  AboutStatsCardsProps,
  AboutCommitmentsProps,
} from "@ui-component/about/type";
import type { ImageGradientSplitProps, SectionPointerItem } from "@ui-common";

type RawRecord = Record<string, unknown>;

/**
 * 1. About Hero Mapper (widget.hero-banner - Position 0)
 * Canonical keys: title, description, background_image, background_image_position, CTA_text, CTA_url, max_width_title, max_width_description, tag
 */
export function mapAboutHero(
  raw?: RawRecord | null,
  fallback = ABOUT_HERO_FALLBACK
): AboutHeroProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_image = raw?.background_image
    ? resolveStrapiImage(raw.background_image, fallback.background_image)
    : fallback.background_image;
  const background_image_position =
    (raw?.background_image_position as string) || fallback.background_image_position;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const max_width_title = (raw?.max_width_title as string) || fallback.max_width_title;
  const max_width_description =
    (raw?.max_width_description as string) || fallback.max_width_description;
  const tag = (raw?.tag as string) || fallback.tag;

  return {
    title,
    description,
    background_image,
    background_image_position,
    CTA_text,
    CTA_url,
    max_width_title,
    max_width_description,
    tag,
  };
}

/**
 * 2. About Story (Content With Side Graphic) Mapper (widget.content-with-side-graphic - Position 1)
 * Canonical keys: title, title_color, description, description_color, background_color, image
 */
export function mapAboutStory(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_STORY_FALLBACK
): AboutContentWithSideGraphicProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const background_color = (raw?.background_color as string) || fallback.background_color;
  const image = raw?.globe_illustration
    ? resolveStrapiImage(raw.globe_illustration, fallback.image)
    : fallback.image;

  return {
    title,
    title_color,
    description,
    description_color,
    background_color,
    image,
  };
}

/**
 * 3. About Journey (Timeline) Mapper (widget.timeline - Position 2, SubSection 0)
 * Canonical keys: title, description, timeline_cards
 */
export function mapAboutJourney(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_JOURNEY_FALLBACK
): AboutJourneyProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;

  const rawCards = raw?.timeline_cards as RawRecord[] | undefined;
  const timeline_cards: TimelineCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.timeline_cards[i % fallback.timeline_cards.length];
          return {
            id: (c.id as string | number) ?? i,
            year_range: (c.year_range as string) || fb?.year_range,
            year_range_color: (c.year_range_color as string) || fb?.year_range_color,
            badge_text: (c.badge_text as string) || fb?.badge_text,
            description: (c.description as string) || fb?.description,
          };
        })
      : fallback.timeline_cards;

  return {
    title,
    description,
    timeline_cards,
  };
}

/**
 * 4. About Stats Cards (Why Our Infrastructure Matters) Mapper (widget.stats-cards - Position 2, SubSection 1)
 * Canonical keys: title, description, cards
 */
export function mapAboutStatsCards(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_STATS_FALLBACK
): AboutStatsCardsProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;

  const rawCards = raw?.cards as RawRecord[] | undefined;
  const cards: StatCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.cards[i % fallback.cards.length];
          return {
            id: (c.id as string | number) ?? i,
            stats: (c.stats as string) || fb?.stats,
            description: (c.description as string) || fb?.description,
            badge: (c.badge as string) || fb?.badge,
            background_color: (c.background_color as string) || fb?.background_color,
          };
        })
      : fallback.cards;

  return {
    title,
    description,
    cards,
  };
}

/**
 * 5. About Commitments Mapper (widget.commitments - Position 2, SubSection 2)
 * Canonical keys: title, description, background_overlay, commitment_statement, background_image, commitment_cards
 */
export function mapAboutCommitments(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_COMMITMENTS_FALLBACK
): AboutCommitmentsProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_overlay = (raw?.background_overaly as string) || fallback.background_overlay;
  const commitment_statement =
    (raw?.commitment_statement as string) || fallback.commitment_statement;

  const background_image = raw?.background_image
    ? resolveStrapiImage(raw.background_image, fallback.background_image)
    : fallback.background_image;

  const rawCards = raw?.commitment_cards as RawRecord[] | undefined;
  const commitment_cards: CommitmentCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.commitment_cards[i % fallback.commitment_cards.length];
          return {
            id: (c.id as string | number) ?? i,
            title: (c.title as string) || fb?.title,
            description: (c.description as string) || fb?.description,
            top_line_color: (c.top_line_color as string) || fb?.top_line_color,
          };
        })
      : fallback.commitment_cards;

  return {
    title,
    description,
    background_overlay,
    commitment_statement,
    background_image,
    commitment_cards,
  };
}

/**
 * 6. About Culture / Pillars Mapper (widget.image-gradient-split - Position 3)
 * Canonical keys: title, title_color, description, description_color, CTA_text, CTA_url,
 * background_image_desktop, background_image_mobile, section_pointers
 */
export function mapAboutCulture(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_CULTURE_FALLBACK
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

  const rawCards = raw?.section_pointers as RawRecord[] | undefined;
  const section_pointers: SectionPointerItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((p, i) => {
          const fb = fallback.section_pointers[i % fallback.section_pointers.length];
          return {
            id: (p.id as string | number) ?? i,
            title: (p.title as string) || fb?.title || "",
            description: (p.description as string) || fb?.description || "",
            title_color: (p.title_color as string) || fb?.title_color,
            description_color: (p.description_color as string) || fb?.description_color,
          };
        })
      : fallback.section_pointers;

  return {
    id: "culture",
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
