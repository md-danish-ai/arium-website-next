import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  COMMUNITY_HERO_FALLBACK,
  COMMUNITY_SMALL_CELLS_FALLBACK,
  COMMUNITY_WHY_MATTER_FALLBACK,
  COMMUNITY_HOW_WE_WORK_FALLBACK,
  COMMUNITY_TESTIMONIALS_FALLBACK,
  COMMUNITY_FAQS_FALLBACK,
  CommunityBenefitCard,
  CommunityFaqItem,
} from "@data/community.data";
import type { CommunityHowWeWorkProps, CommunityFAQProps } from "@ui-component/community/type";
import type { IllustrationSplitProps } from "@ui-common";
import type { BenefitCardItem, BenefitsGridProps } from "@ui-common/BenefitsGrid";
import type { SharedTestimonialsProps, SharedTestimonialCard } from "@ui-common/SharedTestimonials";
import type { HeroBannerProps } from "@ui-common/HeroBanner";

type RawRecord = Record<string, unknown>;

export interface CommunityHeroMappedProps extends HeroBannerProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export type CommunityBenefitsMappedProps = BenefitsGridProps;

// Community hero banner mapper
export function mapCommunityHero(
  raw?: RawRecord | null,
  fallback = COMMUNITY_HERO_FALLBACK
): CommunityHeroMappedProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const imageSrc = resolveStrapiImage(raw?.background_image, fallback.imageSrc);
  const imageAlt = (raw?.imageAlt as string) || fallback.imageAlt;
  const ctaText = (raw?.CTA_text as string) || (fallback.CTA_text ?? undefined);
  const ctaLink = (raw?.CTA_url as string) || (fallback.CTA_url ?? undefined);
  const maxWidthTitle = (raw?.max_width_title as string) || fallback.max_width_title;
  const maxWidthDescription =
    (raw?.max_width_description as string) || fallback.max_width_description;
  const objectPosition =
    (raw?.background_image_position as string) || fallback.background_image_position;

  return {
    id: "community-hero",
    imageSrc,
    imageAlt,
    title,
    description,
    ctaText,
    ctaLink,
    maxWidthTitle,
    maxWidthDescription,
    objectPosition,
  };
}

// Community small cells illustration split mapper
export function mapCommunitySmallCells(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_SMALL_CELLS_FALLBACK
): IllustrationSplitProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = ((raw?.title_color as string) || fallback.title_color) ?? undefined;
  const description = (raw?.description as string) || fallback.description;
  const description_color =
    ((raw?.description_color as string) || fallback.description_color) ?? undefined;
  const illustration_image = resolveStrapiImage(
    raw?.illustration_image,
    fallback.illustration_image
  );
  const illustration_image_alignment =
    (raw?.illustration_image_alignment as "Right" | "Left") ||
    fallback.illustration_image_alignment;
  const show_bottom_divider = Boolean(
    raw?.show_bottom_divider !== undefined ? raw.show_bottom_divider : fallback.show_bottom_divider
  );
  const rawStats = raw?.statistics as RawRecord[] | undefined;
  const statistics = Array.isArray(rawStats)
    ? rawStats.map((s) => ({
        stat: (s.stat as string) || "",
        description: (s.description as string) || "",
        stat_color: (s.stat_color as string) || undefined,
      }))
    : fallback.statistics;

  return {
    id: "what-are-small-cells",
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

// Community why it matters benefits grid mapper
export function mapCommunityBenefits(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_WHY_MATTER_FALLBACK
): CommunityBenefitsMappedProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = ((raw?.title_color as string) || fallback.title_color) ?? undefined;
  const rawCards = (raw?.icon_card || raw?.cards) as RawRecord[] | undefined;

  let cards: BenefitCardItem[] = fallback.icon_card.map((c: CommunityBenefitCard) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    image: c.image,
    title_color: (c.title_color as string) || undefined,
    description_color: (c.description_color as string) || undefined,
  }));

  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((c, index) => {
      const fb = fallback.icon_card[index] || fallback.icon_card[0];
      const rawImg = c.image || c.media || c.icon || c.iconSrc;
      return {
        id: (c.id as number) ?? index + 1,
        title: (c.title as string) || fb.title,
        description: (c.description as string) || fb.description,
        image: resolveStrapiImage(rawImg, fb.image),
        title_color: ((c.title_color as string) || fb.title_color) ?? undefined,
        description_color: ((c.description_color as string) || fb.description_color) ?? undefined,
      };
    });
  }

  return {
    title,
    title_color,
    cards,
  };
}

// Community how we work background feature mapper
export function mapCommunityHowWeWork(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_HOW_WE_WORK_FALLBACK
): CommunityHowWeWorkProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = ((raw?.title_color as string) || fallback.title_color) ?? undefined;
  const description = (raw?.description as string) || fallback.description;
  const description_color =
    ((raw?.description_color as string) || fallback.description_color) ?? undefined;
  const CTA_text = ((raw?.CTA_text as string) || fallback.CTA_text) ?? undefined;
  const CTA_url = ((raw?.CTA_url as string) || fallback.CTA_url) ?? undefined;
  const background_image_desktop = resolveStrapiImage(
    raw?.background_image_desktop,
    fallback.background_image_desktop
  );
  const background_image_mobile = raw?.background_image_mobile
    ? resolveStrapiImage(raw.background_image_mobile, fallback.background_image_mobile || "")
    : undefined;

  return {
    id: "how-we-work",
    title,
    title_color,
    description,
    description_color,
    CTA_text,
    CTA_url,
    background_image_desktop,
    background_image_mobile,
  };
}

// Community testimonials mapper
export function mapCommunityTestimonials(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_TESTIMONIALS_FALLBACK
): SharedTestimonialsProps {
  const title = (raw?.title as string) || fallback.title;
  const rawCards = (raw?.cards || raw?.testimonials) as RawRecord[] | undefined;

  let cards: SharedTestimonialCard[] = fallback.cards;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    cards = rawCards.map((c, i) => {
      const fb = fallback.cards[i] || fallback.cards[0];
      return {
        id: (c.id as number | string) ?? i + 1,
        person_name: (c.title as string) || (c.person_name as string) || fb.person_name,
        person_designation:
          (c.badge as string) || (c.person_designation as string) || fb.person_designation,
        person_message:
          (c.description as string) || (c.person_message as string) || fb.person_message,
        card_footer_bg: (c.card_footer_bg as string) || fb.card_footer_bg,
      };
    });
  }

  return {
    title,
    cards,
  };
}

// Community FAQ accordion mapper
export function mapCommunityFaqs(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = COMMUNITY_FAQS_FALLBACK
): CommunityFAQProps {
  const title = (raw?.title as string) || fallback.title;
  const title_color = ((raw?.title_color as string) || fallback.title_color) ?? undefined;
  const rawData = (raw?.faq_data || raw?.cards || raw?.faqs) as RawRecord[] | undefined;

  let faq_data: CommunityFaqItem[] = fallback.faq_data;
  if (Array.isArray(rawData) && rawData.length > 0) {
    faq_data = rawData.map((c, index) => {
      const fb = fallback.faq_data[index] || fallback.faq_data[0];
      return {
        id: (c.id as number) ?? index + 1,
        question: (c.question as string) || fb.question,
        answer: (c.answer as string) || fb.answer,
        question_color: ((c.question_color as string) || fb.question_color) ?? undefined,
        answer_color: ((c.answer_color as string) || fb.answer_color) ?? undefined,
        question_color_hover:
          ((c.question_color_hover as string) || fb.question_color_hover) ?? undefined,
      };
    });
  }

  return {
    title,
    title_color,
    faq_data,
  };
}
