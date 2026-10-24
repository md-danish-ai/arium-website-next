import type { StrapiSectionItem, LinkItem, FAQItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  COMMUNITY_HERO_FALLBACK,
  COMMUNITY_SMALL_CELLS_FALLBACK,
  COMMUNITY_WHY_MATTER_FALLBACK,
  COMMUNITY_HOW_WE_WORK_FALLBACK,
  COMMUNITY_TESTIMONIALS_FALLBACK,
  COMMUNITY_FAQS_FALLBACK,
  CommunityTestimonialItem,
  CommunityBenefitCard,
} from "@data/community.data";
import type {
  CommunitySmallCellsProps,
  CommunityHowWeWorkProps,
  CommunityTestimonialsProps,
  CommunityFAQProps,
} from "../../components/ui-component/community/type";
import type { BenefitCardItem } from "../../components/ui-common/ImageCardGrid";

type RawRecord = Record<string, unknown>;

export interface CommunityHeroMappedProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  intro: string;
}

export interface CommunityBenefitsMappedProps {
  title: string;
  headingColor?: string;
  cards: BenefitCardItem[];
}

/**
 * 1. Community Hero Mapper
 */
export function mapCommunityHero(
  raw?: RawRecord | null,
  fallback = COMMUNITY_HERO_FALLBACK
): CommunityHeroMappedProps {
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
    id: "community-hero",
    imageSrc,
    imageAlt,
    heading,
    intro,
  };
}

/**
 * 2. Community Small Cells Mapper ("What is a small cell?")
 */
export function mapCommunitySmallCells(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_SMALL_CELLS_FALLBACK
): CommunitySmallCellsProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawBody =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const paragraphs = isHtml ? undefined : fallback.paragraphs;

  const rawMedia = (raw?.media || raw?.Media || raw?.image) as unknown;
  let illustrationSrc = fallback.illustrationSrc;
  let illustrationAlt = fallback.illustrationAlt;

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    const first = rawMedia[0] as RawRecord;
    illustrationSrc = resolveStrapiImage(first, fallback.illustrationSrc);
    illustrationAlt = (first.alternativeText as string) || fallback.illustrationAlt;
  } else if (rawMedia) {
    illustrationSrc = resolveStrapiImage(rawMedia, fallback.illustrationSrc);
  }

  return {
    title,
    contentHtml,
    paragraphs,
    illustrationSrc,
    illustrationAlt,
  };
}

/**
 * 3. Community Benefits Mapper ("Why small cells matter")
 */
export function mapCommunityBenefits(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_WHY_MATTER_FALLBACK
): CommunityBenefitsMappedProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const headingColor = (raw?.HeadingColor as string) || (raw?.headingColor as string) || undefined;

  const rawCards = (raw?.cards || raw?.cardgrid || raw?.Cards) as RawRecord[] | undefined;

  let cards: BenefitCardItem[] = fallback.cards.map((c: CommunityBenefitCard) => ({
    title: c.title,
    description: c.description,
    image: c.image,
  }));

  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((c, index) => {
      const fallbackCard = fallback.cards[index] || fallback.cards[0];
      return {
        title: (c.title || c.Title || c.heading || "") as string,
        description: (c.description || c.Description || c.body || "") as string,
        image: resolveStrapiImage(c.image, fallbackCard?.image || "/assets/images/placeholder.png"),
        titleColor: (c.TitleColor || c.titleColor) as string | undefined,
        descriptionColor: (c.DescriptionColor || c.descriptionColor) as string | undefined,
      };
    });
  }

  return {
    title,
    headingColor,
    cards,
  };
}

/**
 * 4. Community How We Work Mapper
 */
export function mapCommunityHowWeWork(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_HOW_WE_WORK_FALLBACK
): CommunityHowWeWorkProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawBody =
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const paragraphs = isHtml ? undefined : fallback.paragraphs;

  const rawMedia = (raw?.media || raw?.Media || raw?.image) as unknown;
  const bgImageUrl = rawMedia
    ? resolveStrapiImage(rawMedia, fallback.bgImageUrl)
    : fallback.bgImageUrl;

  const rawCtas = (raw?.ctas || raw?.cta) as RawRecord[] | RawRecord | undefined;
  let cta: LinkItem = fallback.cta;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    cta = {
      label: (rawCtas[0].label as string) || fallback.cta.label,
      url: (rawCtas[0].url as string) || fallback.cta.url,
    };
  } else if (rawCtas && typeof rawCtas === "object" && !Array.isArray(rawCtas)) {
    cta = {
      label: (rawCtas.label as string) || fallback.cta.label,
      url: (rawCtas.url as string) || fallback.cta.url,
    };
  }

  return {
    title,
    contentHtml,
    paragraphs,
    bgImageUrl,
    cta,
  };
}

/**
 * 5. Community Testimonials Mapper
 */
export function mapCommunityTestimonials(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_TESTIMONIALS_FALLBACK
): CommunityTestimonialsProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawCards = (raw?.cards || raw?.Cards || raw?.testimonials) as RawRecord[] | undefined;

  let testimonials: CommunityTestimonialItem[] = fallback.testimonials;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    testimonials = rawCards.map((c) => ({
      title: (c.title || c.Title || c.personName || "") as string,
      badge: (c.badge || c.Badge || c.personDesignation || "") as string,
      description: (c.description || c.Description || c.personMessage || "") as string,
    }));
  }

  return {
    title,
    testimonials,
  };
}

/**
 * 6. Community FAQ Mapper
 */
export function mapCommunityFaqs(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_FAQS_FALLBACK
): CommunityFAQProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawCards = (raw?.cards || raw?.Cards || raw?.faqs || raw?.FaqData) as
    RawRecord[] | undefined;

  let faqs: FAQItem[] = fallback.faqs;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    faqs = rawCards.map((c, index) => ({
      id: (c.id as number) || index + 1,
      question: (c.title || c.Title || c.question || "") as string,
      answer: (c.description || c.Description || c.answer || "") as string,
    }));
  }

  return {
    title,
    faqs,
  };
}
