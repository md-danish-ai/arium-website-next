import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  SOLUTIONS_HERO_FALLBACK,
  SOLUTIONS_SMALL_CELLS_FALLBACK,
  SOLUTIONS_DAS_FALLBACK,
  SOLUTIONS_INDUSTRIES_FALLBACK,
  SOLUTIONS_CTA_FALLBACK,
  SolutionStatItem,
  IndustryAccordionCard,
} from "@data/solutions.data";
import type {
  SolutionsIllustrationSplitProps,
  SolutionsIndustriesProps,
} from "@ui-component/solutions/type";
import type { CtaWithGraphicProps } from "@ui-common/CtaWithGraphic";

type RawRecord = Record<string, unknown>;

export interface SolutionsHeroProps {
  title: string;
  description: string;
  background_image: string;
  background_image_position?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
  max_width_title?: string | null;
  max_width_description?: string | null;
  tag?: string | null;
}

/**
 * 1. Solutions Hero Mapper
 * Canonical keys: title, description, background_image, background_image_position, CTA_text, CTA_url, max_width_title, max_width_description, tag
 */
export function mapSolutionsHero(
  raw?: RawRecord | null,
  fallback = SOLUTIONS_HERO_FALLBACK
): SolutionsHeroProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const background_image = resolveStrapiImage(
    raw?.background_image || raw?.media,
    fallback.background_image
  );
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
 * Helper to normalize statistics array from Strapi or Fallback
 */
function normalizeStatistics(rawStats: unknown, fallback: SolutionStatItem[]): SolutionStatItem[] {
  if (!Array.isArray(rawStats) || rawStats.length === 0) return fallback;
  return rawStats.map((s) => ({
    stat: (s.stat || s.value || s.number || s.Number || "") as string,
    description: (s.description || s.label || s.Label || "") as string,
    stat_color: (s.stat_color || s.statColor || undefined) as string | undefined,
  }));
}

/**
 * 2. Small Cells Mapper -> <SolutionsSmallCells />
 */
export function mapSolutionsSmallCells(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_SMALL_CELLS_FALLBACK
): SolutionsIllustrationSplitProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || (raw?.body as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const illustration_image = resolveStrapiImage(
    raw?.illustration_image || raw?.image || raw?.media,
    fallback.illustration_image
  );
  const illustration_image_alignment =
    (raw?.illustration_image_alignment as "Left" | "Right") ||
    fallback.illustration_image_alignment;
  const show_bottom_divider =
    raw?.show_bottom_divider !== undefined
      ? Boolean(raw.show_bottom_divider)
      : fallback.show_bottom_divider;

  const statistics = normalizeStatistics(raw?.statistics || raw?.stats, fallback.statistics);

  return {
    title,
    title_color,
    description,
    description_color,
    illustration_image,
    illustration_image_alignment,
    show_bottom_divider,
    statistics,
  };
}

/**
 * 3. DAS Mapper -> <SolutionsIllustrationSplit />
 */
export function mapSolutionsDas(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_DAS_FALLBACK
): SolutionsIllustrationSplitProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || (raw?.body as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const illustration_image = resolveStrapiImage(
    raw?.illustration_image || raw?.image || raw?.media,
    fallback.illustration_image
  );
  const illustration_image_alignment =
    (raw?.illustration_image_alignment as "Left" | "Right") ||
    fallback.illustration_image_alignment;
  const show_bottom_divider =
    raw?.show_bottom_divider !== undefined
      ? Boolean(raw.show_bottom_divider)
      : fallback.show_bottom_divider;

  const statistics = normalizeStatistics(raw?.statistics || raw?.stats, fallback.statistics);

  return {
    title,
    title_color,
    description,
    description_color,
    illustration_image,
    illustration_image_alignment,
    show_bottom_divider,
    statistics,
  };
}

/**
 * 4. Industries Accordion Mapper -> <SolutionsIndustries />
 */
export function mapSolutionsIndustries(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_INDUSTRIES_FALLBACK
): SolutionsIndustriesProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const background_color = (raw?.background_color as string) || fallback.background_color;
  const template_grid_columns =
    (raw?.template_grid_columns as string) || fallback.template_grid_columns;

  const rawCards = (raw?.accordian_cards || raw?.cards || raw?.industries) as
    RawRecord[] | undefined;
  let accordian_cards: IndustryAccordionCard[] = fallback.accordian_cards;

  if (Array.isArray(rawCards) && rawCards.length > 0) {
    accordian_cards = rawCards.map((item, index) => {
      const itemTitle = (item.title || "") as string;
      const matchedFallback =
        fallback.accordian_cards.find((c) => c.title.toLowerCase() === itemTitle.toLowerCase()) ||
        fallback.accordian_cards[index % fallback.accordian_cards.length];

      return {
        title: itemTitle || matchedFallback.title,
        description: (item.description || matchedFallback.description) as string,
        svg_code: (item.svg_code as string) || matchedFallback.svg_code,
        title_color: (item.title_color as string) || matchedFallback.title_color,
        title_color_hover: (item.title_color_hover as string) || matchedFallback.title_color_hover,
        description_color: (item.description_color as string) || matchedFallback.description_color,
        background_color: (item.background_color as string) || matchedFallback.background_color,
      };
    });
  }

  return {
    title,
    title_color,
    description,
    description_color,
    background_color,
    template_grid_columns,
    accordian_cards,
  };
}

/**
 * 5. Solutions CTA Mapper -> <CtaWithGraphic />
 */
export function mapSolutionsCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = SOLUTIONS_CTA_FALLBACK
): CtaWithGraphicProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = (raw?.title_color as string) || fallback.title_color;
  const description = (raw?.description as string) || fallback.description;
  const description_color = (raw?.description_color as string) || fallback.description_color;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const background_color = (raw?.background_color as string) || fallback.background_color;
  const globe_illustration_desktop = resolveStrapiImage(
    raw?.globe_illustration_desktop,
    fallback.globe_illustration_desktop
  );
  const globe_illustration_mobile = resolveStrapiImage(
    raw?.globe_illustration_mobile,
    fallback.globe_illustration_mobile
  );

  return {
    title,
    title_color: title_color || undefined,
    description,
    description_color: description_color || undefined,
    CTA_text,
    CTA_url,
    background_color,
    globe_illustration_desktop,
    globe_illustration_mobile,
  };
}
