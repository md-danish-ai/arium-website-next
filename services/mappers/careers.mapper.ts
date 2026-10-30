import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  CAREERS_HERO_FALLBACK,
  CAREERS_CULTURE_FALLBACK,
  CAREERS_TESTIMONIALS_FALLBACK,
  CAREERS_JOB_AREAS_FALLBACK,
  CAREERS_BENEFITS_FALLBACK,
  CAREERS_EEO_FALLBACK,
} from "@data/careers.data";
import type {
  CareersCultureAccordionProps,
  CareersJobAreasProps,
  CareersEEOProps,
} from "@ui-component/careers/type";
import type { BenefitsGridProps, BenefitCardItem } from "@ui-common/BenefitsGrid";
import type { HeroBannerProps } from "@ui-common/HeroBanner";
import type { SharedTestimonialsProps } from "@ui-common/SharedTestimonials";

type RawRecord = Record<string, unknown>;

export interface CareersHeroMappedProps extends HeroBannerProps {
  id: string;
}

/**
 * 1. Careers Hero Mapper (Pure 1-to-1 with shared.test-banner)
 * Canonical keys: title, description, tag, CTA_text, CTA_url, background_image, background_image_position, max_width_title, max_width_description
 */
export function mapCareersHero(
  raw?: RawRecord | null,
  fallback = CAREERS_HERO_FALLBACK
): CareersHeroMappedProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const imageSrc = resolveStrapiImage(raw?.background_image, fallback.background_image);
  const ctaText = ((raw?.CTA_text as string) || fallback.CTA_text) ?? undefined;
  const ctaLink = ((raw?.CTA_url as string) || fallback.CTA_url) ?? undefined;
  const maxWidthTitle = (raw?.max_width_title as string) || (fallback.max_width_title ?? undefined);
  const maxWidthDescription =
    (raw?.max_width_description as string) || (fallback.max_width_description ?? undefined);
  const objectPosition =
    (raw?.background_image_position as string) || fallback.background_image_position;

  return {
    id: "team-hero",
    title,
    description,
    imageSrc,
    imageAlt: fallback.imageAlt,
    ctaText,
    ctaLink,
    maxWidthTitle,
    maxWidthDescription,
    objectPosition,
    ctaColor: "secondary",
    ctaVariant: "filled",
  };
}

/**
 * 2. Careers Culture Accordion Mapper (Pure 1-to-1 with shared.accordion-split)
 * Canonical keys: title, title_color, description, description_color, background_color, template_grid_columns, accordian_cards
 */
export function mapCareersCulture(
  raw?: RawRecord | null,
  fallback = CAREERS_CULTURE_FALLBACK
): CareersCultureAccordionProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = ((raw?.title_color as string) || fallback.title_color) ?? undefined;
  const description = (raw?.description as string) || fallback.description;
  const description_color =
    ((raw?.description_color as string) || fallback.description_color) ?? undefined;
  const background_color =
    ((raw?.background_color as string) || fallback.background_color) ?? undefined;
  const template_grid_columns =
    ((raw?.template_grid_columns as string) || fallback.template_grid_columns) ?? undefined;

  const rawCards = (raw?.accordian_cards || raw?.cards) as RawRecord[] | undefined;

  const accordian_cards =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, index) => {
          const fb = fallback.accordian_cards[index] || fallback.accordian_cards[0];
          return {
            id: (c.id as number) ?? index + 1,
            title: (c.title as string) || fb.title,
            description: (c.description as string) || fb.description,
            title_color: ((c.title_color as string) || fb.title_color) ?? undefined,
            title_color_hover:
              ((c.title_color_hover as string) || fb.title_color_hover) ?? undefined,
            description_color:
              ((c.description_color as string) || fb.description_color) ?? undefined,
            background_color: ((c.background_color as string) || fb.background_color) ?? undefined,
            svg_code: ((c.svg_code as string) || fb.svg_code) ?? null,
          };
        })
      : fallback.accordian_cards;

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
 * 3. Careers Testimonials Mapper (Pure 1-to-1 with shared.gloabl-testimonails)
 * Canonical keys: title, cards (id, person_name, person_designation, person_message, card_footer_bg)
 */
export function mapCareersTestimonials(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_TESTIMONIALS_FALLBACK
): SharedTestimonialsProps {
  const title = (raw?.title as string) || fallback.title;
  const rawCards = (raw?.cards || raw?.testimonials) as RawRecord[] | undefined;

  const cards =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, idx) => ({
          id: (c.id as number) ?? idx + 1,
          person_name: (c.person_name as string) || fallback.cards[idx]?.person_name || "",
          person_designation:
            (c.person_designation as string) || fallback.cards[idx]?.person_designation || "",
          person_message: (c.person_message as string) || fallback.cards[idx]?.person_message || "",
          card_footer_bg:
            (c.card_footer_bg as string | null) || fallback.cards[idx]?.card_footer_bg || "#bcf6f2",
        }))
      : fallback.cards;

  return {
    title,
    cards,
  };
}

/**
 * 4. Careers Job Areas Mapper (Pure 1-to-1 with shared.highlight-list)
 * Canonical keys: title, description, CTA_text, CTA_url, image, list_items
 */
export function mapCareersJobAreas(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_JOB_AREAS_FALLBACK
): CareersJobAreasProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const CTA_text = ((raw?.CTA_text as string) || fallback.CTA_text) ?? undefined;
  const CTA_url = ((raw?.CTA_url as string) || fallback.CTA_url) ?? undefined;
  const image = resolveStrapiImage(raw?.image, fallback.image);

  const rawItems = (raw?.list_items || raw?.items) as RawRecord[] | undefined;

  const items =
    Array.isArray(rawItems) && rawItems.length > 0
      ? rawItems.map((item, idx) => ({
          id: (item.id as number) ?? idx + 1,
          title:
            (item.item as string) || (item.title as string) || fallback.items[idx]?.title || "",
        }))
      : fallback.items;

  return {
    title,
    description,
    CTA_text,
    CTA_url,
    image,
    imageAlt: fallback.imageAlt,
    items,
  };
}

/**
 * 5. Careers Benefits Mapper (Pure 1-to-1 with shared.benefits)
 * Canonical keys: title, description, benefits_card (id, title, description, title_color, icon)
 */
export function mapCareersBenefits(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_BENEFITS_FALLBACK
): BenefitsGridProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const rawCards = (raw?.benefits_card || raw?.cards) as RawRecord[] | undefined;

  const cards: BenefitCardItem[] =
    Array.isArray(rawCards) && rawCards.length > 0
      ? rawCards.map((c, index) => {
          const fb = fallback.benefits_card[index] || fallback.benefits_card[0];
          const rawImg = c.icon || c.image;
          return {
            id: (c.id as number) ?? index + 1,
            title: (c.title as string) || fb.title,
            description: (c.description as string) || fb.description,
            image: resolveStrapiImage(rawImg, fb.icon),
            title_color: ((c.title_color as string) || fb.title_color) ?? "#009886",
          };
        })
      : fallback.benefits_card.map((fb, index) => ({
          id: fb.id ?? index + 1,
          title: fb.title,
          description: fb.description,
          image: fb.icon,
          title_color: fb.title_color ?? "#009886",
        }));

  return {
    id: "benefits",
    title,
    description,
    cards,
  };
}

/**
 * 6. Careers EEO Statement Mapper (Pure 1-to-1 with shared.benefits)
 * Canonical key: bottom_message
 */
export function mapCareersEEO(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_EEO_FALLBACK
): CareersEEOProps {
  const bottom_message = (raw?.bottom_message as string) || fallback.bottom_message;

  return {
    bottom_message,
    statementText: bottom_message,
  };
}
