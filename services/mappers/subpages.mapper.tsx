import React from "react";
import type { StrapiPageData, StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import {
  AssessmentIconSvg,
  PlanningIconSvg,
  ConstructionIconSvg,
  DesignIconSvg,
  OptimizationIconSvg,
} from "@ui-svg";
import type { PillarData, ProcessSectionProps } from "@ui-common/ProcessSection";
import type {
  SubpageHeroData,
  SubpageTestimonialsData,
  ProcessSectionData,
  SubpageCtaData,
  SubpageTestimonialCard,
} from "@data/where-subpages.data";
import {
  ROW_HERO_FALLBACK,
  ROW_PROCESS_FALLBACK,
  ROW_TESTIMONIALS_FALLBACK,
  ROW_CTA_FALLBACK,
} from "@data/where-subpages.data";

type RawRecord = Record<string, unknown>;

export const DEFAULT_PROCESS_ICONS: Record<string, React.ReactNode> = {
  assessment: (
    <AssessmentIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  ),
  planning: (
    <PlanningIconSvg className="w-9 h-9 lg:w-10 lg:h-10" width="36" height="36" strokeWidth="2.2" />
  ),
  construction: (
    <ConstructionIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  ),
  design: (
    <DesignIconSvg className="w-9 h-9 lg:w-10 lg:h-10" width="36" height="36" strokeWidth="2.2" />
  ),
  optimization: (
    <OptimizationIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  ),
};

export function resolveProcessIcon(
  stage: RawRecord,
  stageId: string,
  stageTitle: string
): React.ReactNode {
  // 1. Inline SVG from live Strapi stage_icon_svg
  const svgContent = stage.stage_icon_svg as string | null | undefined;
  if (svgContent && typeof svgContent === "string" && svgContent.trim().length > 0) {
    return (
      <div
        className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  }

  // 2. Predefined SVG icons matched by stage title or id
  const searchKey = `${stageId} ${stageTitle}`.toLowerCase();
  for (const [key, iconNode] of Object.entries(DEFAULT_PROCESS_ICONS)) {
    if (searchKey.includes(key)) {
      return iconNode;
    }
  }

  // 3. Fallback generic icon
  return (
    <AssessmentIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  );
}

/**
 * 1. Subpage Hero Mapper (Pure 1-to-1 with shared.inner-page-hero)
 * Canonical keys: title, description, tag, CTA_text, CTA_url, background_gradient, content_max_width
 */
export function mapSubpageHero(
  raw?: StrapiPageData | RawRecord | null,
  fallback: SubpageHeroData = ROW_HERO_FALLBACK
): SubpageHeroData {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const tag = (raw?.tag as string) || fallback.tag;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const background_gradient = (raw?.background_gradient as string) || fallback.background_gradient;
  const content_max_width = (raw?.content_max_width as string) || fallback.content_max_width;

  return {
    tag,
    title,
    description,
    CTA_text,
    CTA_url,
    background_gradient,
    content_max_width,
  };
}

/**
 * 2. Subpage Process Section Mapper (Pure 1-to-1 with shared.process)
 * Canonical keys: title, description, process_stage (stage_name, stage_icon_svg)
 */
export function mapSubpageProcess(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: ProcessSectionData = ROW_PROCESS_FALLBACK
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
      const stageBg = p.background_color || p.themeColor || "#FBCBB5";
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
        iconSvg: DEFAULT_PROCESS_ICONS[p.id.toLowerCase()] || (
          <AssessmentIconSvg
            className="w-9 h-9 lg:w-10 lg:h-10"
            width="36"
            height="36"
            strokeWidth="2.2"
          />
        ),
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
      "#FBCBB5";

    const steps = matchedPillar?.steps || [];
    const timelineItems = (matchedPillar?.timelineItems || []).map((item) => ({
      ...item,
      backgroundColor: item.backgroundColor || stageBg,
    }));
    const iconSvg = resolveProcessIcon(stage, stageId, stageTitle);

    return {
      id: stageId,
      title: stageTitle,
      themeColor: stageBg,
      background_color: stageBg,
      steps,
      timelineItems,
      iconSvg,
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

/**
 * 3. Subpage Testimonials Mapper (Pure 1-to-1 with shared.gloabl-testimonails)
 * Canonical keys: title, cards (id, person_name, person_message, person_designation, card_footer_bg)
 */
export function mapSubpageTestimonials(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: SubpageTestimonialsData = ROW_TESTIMONIALS_FALLBACK
): SubpageTestimonialsData {
  const title = (raw?.title as string) || fallback.title;

  const rawCards = raw?.cards as RawRecord[] | undefined;

  if (!Array.isArray(rawCards) || rawCards.length === 0) {
    return {
      title,
      cards: fallback.cards,
    };
  }

  const cards: SubpageTestimonialCard[] = rawCards.map((card, idx) => ({
    id: (card.id as number | string) || idx + 1,
    person_name: (card.person_name as string) || fallback.cards[idx]?.person_name || "",
    person_message: (card.person_message as string) || fallback.cards[idx]?.person_message || "",
    person_designation:
      (card.person_designation as string) || fallback.cards[idx]?.person_designation || "",
    card_footer_bg:
      (card.card_footer_bg as string | null | undefined) ||
      fallback.cards[idx]?.card_footer_bg ||
      (idx % 2 === 0 ? "#bcf6f2" : "#ffdac8"),
  }));

  return {
    title,
    cards,
  };
}

/**
 * 4. Subpage CTA Mapper (Pure 1-to-1 with shared.global-cta)
 * Canonical keys: prompt_to_cta, CTA_text, CTA_url, background_gradient, globe_illustration
 */
export function mapSubpageCta(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback: SubpageCtaData = ROW_CTA_FALLBACK
): SubpageCtaData {
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
