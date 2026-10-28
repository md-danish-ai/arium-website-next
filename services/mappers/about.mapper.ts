import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  ABOUT_HERO_FALLBACK,
  ABOUT_STORY_FALLBACK,
  ABOUT_JOURNEY_FALLBACK,
  ABOUT_STATS_FALLBACK,
  ABOUT_COMMITMENTS_FALLBACK,
  ABOUT_CULTURE_FALLBACK,
  TimeLineCard,
  StatCardItem,
  CommitmentCardItem,
  PillarCardItem,
} from "@data/about.data";
import type {
  AboutHeroProps,
  AboutContentWithSideGraphicProps,
  AboutJourneyProps,
  AboutStatsCardsProps,
  AboutCommitmentsProps,
  AboutCultureProps,
} from "@ui-component/about/type";

type RawRecord = Record<string, unknown>;

/**
 * 1. About Hero Mapper (shared.test-banner - Position 0)
 * Canonical keys: title, description, media, CTA_text, CTA_url, max_width_title, max_width_description, object_position, tag
 */
export function mapAboutHero(
  raw?: RawRecord | null,
  fallback = ABOUT_HERO_FALLBACK
): AboutHeroProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const media = raw?.media ? resolveStrapiImage(raw.media, fallback.media) : fallback.media;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const max_width_title = (raw?.max_width_title as string) || fallback.max_width_title;
  const max_width_description =
    (raw?.max_width_description as string) || fallback.max_width_description;
  const object_position = (raw?.object_position as string) || fallback.object_position;
  const tag = (raw?.tag as string) || fallback.tag;

  return {
    title,
    description,
    media,
    CTA_text,
    CTA_url,
    max_width_title,
    max_width_description,
    object_position,
    tag,
  };
}

/**
 * 2. About Story (Content With Side Graphic) Mapper (shared.content-with-side-graphic - Position 1)
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
  const image = raw?.image ? resolveStrapiImage(raw.image, fallback.image) : fallback.image;

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
 * 3. About Journey (Timeline) Mapper (shared.timeline - Position 2, SubSection 0)
 * Canonical keys: title, description, TimeLineCards
 */
export function mapAboutJourney(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_JOURNEY_FALLBACK
): AboutJourneyProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;

  const rawCards = raw?.TimeLineCards as RawRecord[] | undefined;
  const TimeLineCards: TimeLineCard[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.TimeLineCards[i % fallback.TimeLineCards.length];
          return {
            id: (c.id as string | number) ?? i,
            title: (c.title as string) || fb?.title,
            title_color: (c.title_color as string) || fb?.title_color,
            badge_text: (c.badge_text as string) || fb?.badge_text,
            description: (c.description as string) || fb?.description,
          };
        })
      : fallback.TimeLineCards;

  return {
    title,
    description,
    TimeLineCards,
  };
}

/**
 * 4. About Stats Cards (Why Our Infrastructure Matters) Mapper (shared.stats-cards - Position 2, SubSection 1)
 * Canonical keys: title, description, Cards
 */
export function mapAboutStatsCards(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_STATS_FALLBACK
): AboutStatsCardsProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;

  const rawCards = raw?.Cards as RawRecord[] | undefined;
  const Cards: StatCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.Cards[i % fallback.Cards.length];
          return {
            id: (c.id as string | number) ?? i,
            title: (c.title as string) || fb?.title,
            description: (c.description as string) || fb?.description,
            badge: (c.badge as string) || fb?.badge,
            background_color: (c.background_color as string) || fb?.background_color,
          };
        })
      : fallback.Cards;

  return {
    title,
    description,
    Cards,
  };
}

/**
 * 5. About Commitments Mapper (shared.commitments - Position 2, SubSection 2)
 * Canonical keys: title, description, background_overlay, pillars_description, background_image, CommitmentCards
 */
export function mapAboutCommitments(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_COMMITMENTS_FALLBACK
): AboutCommitmentsProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_overlay =
    (raw?.background_overlay as string) ||
    (raw?.background_overaly as string) ||
    fallback.background_overlay;
  const pillars_description = (raw?.pillars_description as string) || fallback.pillars_description;

  const background_image = raw?.background_image
    ? resolveStrapiImage(raw.background_image, fallback.background_image)
    : fallback.background_image;

  const rawCards = raw?.CommitmentCards as RawRecord[] | undefined;
  const CommitmentCards: CommitmentCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, i) => {
          const fb = fallback.CommitmentCards[i % fallback.CommitmentCards.length];
          return {
            id: (c.id as string | number) ?? i,
            title: (c.title as string) || fb?.title,
            description: (c.description as string) || fb?.description,
            bar_color: (c.bar_color as string) || fb?.bar_color,
          };
        })
      : fallback.CommitmentCards;

  return {
    title,
    description,
    background_overlay,
    pillars_description,
    background_image,
    CommitmentCards,
  };
}

/**
 * 6. About Culture / Pillars Mapper (shared.pillar-highlights - Position 3)
 * Canonical keys: title, title_color, description, description_color, CTA_text, CTA_url,
 * background_color, background_image_desktop, background_image_mobile, PillarCards
 */
export function mapAboutCulture(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = ABOUT_CULTURE_FALLBACK
): AboutCultureProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const background_color = (raw?.background_color as string) || fallback.background_color;

  const background_image_desktop = raw?.background_image_desktop
    ? resolveStrapiImage(raw.background_image_desktop, fallback.background_image_desktop)
    : fallback.background_image_desktop;

  const background_image_mobile = raw?.background_image_mobile
    ? resolveStrapiImage(raw.background_image_mobile, fallback.background_image_mobile)
    : fallback.background_image_mobile;

  const rawCards = raw?.PillarCards as RawRecord[] | undefined;
  const PillarCards: PillarCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((p, i) => {
          const fb = fallback.PillarCards[i % fallback.PillarCards.length];
          return {
            id: (p.id as string | number) ?? i,
            title: (p.title as string) || fb?.title,
            description: (p.description as string) || fb?.description,
            title_color: (p.title_color as string) || fb?.title_color,
            description_color: (p.description_color as string) || fb?.description_color,
          };
        })
      : fallback.PillarCards;

  return {
    title,
    title_color,
    description,
    description_color,
    CTA_text,
    CTA_url,
    background_color,
    background_image_desktop,
    background_image_mobile,
    PillarCards,
  };
}
