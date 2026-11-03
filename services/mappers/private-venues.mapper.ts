import type { StrapiPageData, StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import type { PillarData, ProcessSectionProps } from "@ui-common/ProcessSection";
import type {
  PrivateVenuesHeroData,
  PrivateVenuesTestimonialsData,
  PrivateVenuesProcessData,
  PrivateVenuesCtaData,
  PrivateVenuesTestimonialCard,
} from "@data/private-venues.data";
import {
  PV_HERO_FALLBACK,
  PV_PROCESS_FALLBACK,
  PV_TESTIMONIALS_FALLBACK,
  PV_CTA_FALLBACK,
} from "@data/private-venues.data";

type RawRecord = Record<string, unknown>;

// Private Venues Hero Mapper
export function mapPrivateVenuesHero(
  raw?: StrapiPageData | RawRecord | null,
  fallback: PrivateVenuesHeroData = PV_HERO_FALLBACK
): PrivateVenuesHeroData {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const background_gradient = (raw?.background_gradient as string) || fallback.background_gradient;
  const content_max_width = (raw?.content_max_width as string) || fallback.content_max_width;

  return {
    title,
    description,
    CTA_text,
    CTA_url,
    background_gradient,
    content_max_width,
  };
}

// Private Venues Process Mapper
export function mapPrivateVenuesProcess(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: PrivateVenuesProcessData = PV_PROCESS_FALLBACK
): ProcessSectionProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const maxWidthTitle = fallback.maxWidthTitle;
  const background_color =
    (raw?.background_color as string) ||
    (raw?.background_gradient as string) ||
    fallback.background_color ||
    null;

  const rawStages = raw?.process_stage as RawRecord[] | undefined;

  if (!Array.isArray(rawStages) || rawStages.length === 0) {
    const defaultPillars: PillarData[] = fallback.pillars.map((p) => {
      const stageBg = p.background_color || p.themeColor || "#D2C7FF";
      return {
        id: p.id,
        title: p.title,
        themeColor: stageBg,
        background_color: stageBg,
        steps: p.steps,
        timelineItems: p.timelineItems.map((item) => ({
          ...item,
          backgroundColor: item.backgroundColor || stageBg,
        })),
        icon_svg: p.icon_svg || null,
      };
    });

    return {
      title,
      description,
      background_color,
      pillars: defaultPillars,
      maxWidthTitle,
    };
  }

  const pillars: PillarData[] = rawStages.map((stage, idx) => {
    const stageTitle =
      (stage.stage_name as string) || fallback.pillars[idx]?.title || `Stage ${idx + 1}`;
    const stageId = stageTitle.toLowerCase().replace(/\s+/g, "-");

    const matchedPillar =
      fallback.pillars.find(
        (p) =>
          p.id.toLowerCase() === stageId.toLowerCase() ||
          p.title.toLowerCase() === stageTitle.toLowerCase()
      ) || fallback.pillars[idx];

    const stageBg =
      (stage.background_color as string) ||
      (stage.theme_color as string) ||
      (stage.themeColor as string) ||
      (stage.color as string) ||
      matchedPillar?.background_color ||
      matchedPillar?.themeColor ||
      fallback.pillars[idx]?.background_color ||
      fallback.pillars[idx]?.themeColor ||
      "#D2C7FF";

    const steps = matchedPillar?.steps || [];
    const timelineItems = (matchedPillar?.timelineItems || []).map((item) => ({
      ...item,
      backgroundColor: item.backgroundColor || stageBg,
    }));

    return {
      id: stageId,
      title: stageTitle,
      themeColor: stageBg,
      background_color: stageBg,
      steps,
      timelineItems,
      icon_svg: (stage.stage_icon_svg as string) || null,
    };
  });

  return {
    title,
    description,
    background_color,
    pillars,
    maxWidthTitle,
  };
}

// Private Venues Testimonials Mapper
export function mapPrivateVenuesTestimonials(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: PrivateVenuesTestimonialsData = PV_TESTIMONIALS_FALLBACK
): { title: string; cards: PrivateVenuesTestimonialCard[] } {
  const title = (raw?.title as string) || fallback.title;

  const rawCards = raw?.cards as RawRecord[] | undefined;

  if (!Array.isArray(rawCards) || rawCards.length === 0) {
    return {
      title,
      cards: fallback.cards,
    };
  }

  const cards: PrivateVenuesTestimonialCard[] = rawCards.map((card, idx) => ({
    id: (card.id as number | string) || idx + 1,
    person_name:
      (card.title as string) ||
      (card.person_name as string) ||
      fallback.cards[idx]?.person_name ||
      "",
    person_message:
      (card.description as string) ||
      (card.person_message as string) ||
      fallback.cards[idx]?.person_message ||
      "",
    person_designation:
      (card.badge as string) ||
      (card.person_designation as string) ||
      fallback.cards[idx]?.person_designation ||
      "",
    card_footer_bg:
      (card.card_footer_bg as string | null | undefined) ||
      fallback.cards[idx]?.card_footer_bg ||
      (idx % 2 === 0 ? "#bcf6f2" : "#d2c7ff"),
  }));

  return {
    title,
    cards,
  };
}

// Private Venues CTA Mapper
export function mapPrivateVenuesCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: PrivateVenuesCtaData = PV_CTA_FALLBACK
): PrivateVenuesCtaData {
  const prompt_to_cta = (raw?.prompt_to_cta as string) || fallback.prompt_to_cta;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const background_gradient = (raw?.background_gradient as string) || fallback.background_gradient;
  const globe_illustration = resolveStrapiImage(
    raw?.globe_illustration as unknown,
    fallback.globe_illustration || "/images/svg-images/connection-globe.svg"
  );

  return {
    prompt_to_cta,
    CTA_text,
    CTA_url,
    background_gradient,
    globe_illustration,
  };
}
