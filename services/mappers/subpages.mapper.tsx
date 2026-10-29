import React from "react";
import Image from "next/image";
import type { StrapiPageData, StrapiSectionItem } from "@types";
import { GetStrapiMediaUrl } from "@lib/api";
import {
  AssessmentIconSvg,
  PlanningIconSvg,
  ConstructionIconSvg,
  DesignIconSvg,
  OptimizationIconSvg,
} from "@ui-svg";
import type { PillarData, ProcessSectionProps, TimelineItem } from "@ui-common/ProcessSection";
import type {
  SubpageHeroData,
  SubpageTestimonialsData,
  ProcessSectionData,
  ProcessPillarItem,
  SubpageCtaData,
  SubpageTestimonialItem,
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
  step: RawRecord,
  pillarId: string,
  pillarTitle: string,
  fallbackPillar?: ProcessPillarItem
): React.ReactNode {
  // 1. Media Image (step_name_icon_img)
  const iconImg =
    step.step_name_icon_img ||
    step.StepNameIconimg ||
    step.StepNameIconImg ||
    step.icon_img ||
    step.iconImg;

  let imgUrl = "";
  if (iconImg) {
    if (typeof iconImg === "string") {
      imgUrl = iconImg;
    } else if (typeof iconImg === "object" && iconImg !== null) {
      const imgObj = iconImg as RawRecord;
      imgUrl =
        (imgObj.url as string) ||
        (((imgObj.data as RawRecord)?.attributes as RawRecord)?.url as string) ||
        "";
    }
  }

  if (imgUrl) {
    const mediaUrl = GetStrapiMediaUrl(imgUrl);
    const isSvg = mediaUrl.toLowerCase().endsWith(".svg");
    return (
      <Image
        src={mediaUrl}
        alt={pillarTitle || "Process icon"}
        width={48}
        height={48}
        unoptimized={isSvg}
        className="w-full h-full object-contain"
      />
    );
  }

  // 2. Inline HTML / SVG string (step_name_icon or card.icon)
  const iconHtml = step.step_name_icon || step.StepNameIcon || step.icon || step.iconSvg;

  if (iconHtml && typeof iconHtml === "string") {
    return (
      <div
        className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full"
        dangerouslySetInnerHTML={{ __html: iconHtml }}
      />
    );
  }

  // 3. Fallback to default SVG icons matching normalized pillar id or title
  const searchKey = `${pillarId} ${pillarTitle}`.toLowerCase();
  for (const [key, iconNode] of Object.entries(DEFAULT_PROCESS_ICONS)) {
    if (searchKey.includes(key)) {
      return iconNode;
    }
  }

  // 4. Fallback to fallbackPillar ID match
  if (fallbackPillar?.id) {
    const fbKey = fallbackPillar.id.toLowerCase();
    for (const [key, iconNode] of Object.entries(DEFAULT_PROCESS_ICONS)) {
      if (fbKey.includes(key)) {
        return iconNode;
      }
    }
  }

  // 5. Default generic assessment icon
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
 * 1. Subpage Hero Mapper (Right of Way, Private Venues)
 */
export function mapSubpageHero(
  pageData?: StrapiPageData | RawRecord | null,
  fallback: SubpageHeroData = {
    tag: "Subpage",
    title: "Subpage Title",
    description: "Subpage Description",
  }
): SubpageHeroData {
  const tag = (pageData?.heroTag as string) || fallback.tag;
  const title = (pageData?.heroTitle as string) || (pageData?.title as string) || fallback.title;
  const description = (pageData?.heroDescription as string) || fallback.description;

  const rawCtas = pageData?.heroCtas as RawRecord | RawRecord[] | undefined;
  let ctaLabel = fallback.ctaLabel;
  let ctaUrl = fallback.ctaUrl;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    if (rawCtas[0].label) ctaLabel = rawCtas[0].label as string;
    if (rawCtas[0].url) ctaUrl = rawCtas[0].url as string;
  } else if (rawCtas && typeof rawCtas === "object" && !Array.isArray(rawCtas)) {
    if (rawCtas.label) ctaLabel = rawCtas.label as string;
    if (rawCtas.url) ctaUrl = rawCtas.url as string;
  }

  return {
    tag,
    title,
    description,
    ctaLabel,
    ctaUrl,
    breadcrumbParent: fallback.breadcrumbParent,
    breadcrumbParentUrl: fallback.breadcrumbParentUrl,
  };
}

/**
 * 2. Subpage Process Section Mapper (Right of Way, Private Venues, and widget.process widgets)
 */
export function mapSubpageProcess(
  section?: StrapiSectionItem | RawRecord | null,
  fallback: ProcessSectionData = {
    title: "Our Process",
    description: "",
    pillars: [],
  }
): ProcessSectionProps {
  const title =
    (section?.title as string) ||
    (section?.process_section_title as string) ||
    fallback.title ||
    "Our Process";

  const description =
    (section?.body as string) ||
    (section?.description as string) ||
    (section?.process_section_description as string) ||
    fallback.description ||
    "";

  const maxWidthTitle = fallback.maxWidthTitle;

  const rawSteps = (section?.cards || section?.ProcessStep || section?.process_step) as
    RawRecord[] | undefined;

  if (!Array.isArray(rawSteps) || rawSteps.length === 0) {
    const defaultPillars: PillarData[] = (fallback.pillars || []).map((p) => ({
      id: p.id,
      title: p.title,
      themeColor: p.themeColor,
      steps: p.steps,
      timelineItems: p.timelineItems,
      iconSvg: DEFAULT_PROCESS_ICONS[p.id.toLowerCase()] || (
        <AssessmentIconSvg
          className="w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          strokeWidth="2.2"
        />
      ),
    }));

    return {
      title,
      description,
      pillars: defaultPillars,
      maxWidthTitle,
    };
  }

  const pillars: PillarData[] = rawSteps.map((step, idx) => {
    const fallbackPillar = fallback.pillars?.[idx];
    const pillarTitle = (step.title ||
      step.step_name ||
      step.Name ||
      fallbackPillar?.title ||
      `Step ${idx + 1}`) as string;

    const rawCards = (step.InnerCard || step.ProcessCard || step.cards) as RawRecord[] | undefined;

    const innerCards = Array.isArray(rawCards) ? rawCards : [];

    const pillarId =
      (typeof step.id === "string" ? step.id : null) ||
      pillarTitle.toLowerCase().replace(/\s+/g, "-") ||
      fallbackPillar?.id ||
      `pillar-${idx}`;

    const steps =
      innerCards.length > 0
        ? innerCards.map((c) => (c.heading || c.title || c.name || "") as string)
        : fallbackPillar?.steps || [];

    const timelineItems: TimelineItem[] =
      innerCards.length > 0
        ? innerCards.map((c) => ({
            label: (c.heading || c.title || c.name || "") as string,
            desc: (c.description || c.body || c.desc || "") as string,
            backgroundColor: (c.backgroundColor || c.background_color) as string | undefined,
          }))
        : fallbackPillar?.timelineItems || [];

    const themeColor = (step.themeColor ||
      step.theme_color ||
      timelineItems[0]?.backgroundColor ||
      fallbackPillar?.themeColor ||
      "#FBCBB5") as string;

    const iconSvg = resolveProcessIcon(step, pillarId, pillarTitle, fallbackPillar);

    return {
      id: pillarId,
      title: pillarTitle,
      themeColor,
      steps,
      timelineItems,
      iconSvg,
    };
  });

  return {
    title,
    description,
    pillars,
    maxWidthTitle,
  };
}

/**
 * 3. Subpage Testimonials Mapper
 */
export function mapSubpageTestimonials(
  section?: StrapiSectionItem | RawRecord | null,
  fallback: SubpageTestimonialsData = {
    title: "What leaders are saying",
    testimonials: [],
  }
): SubpageTestimonialsData {
  const title = (section?.title as string) || fallback.title;

  const rawCards = (section?.cards || section?.testimonials) as RawRecord[] | undefined;

  if (!Array.isArray(rawCards) || rawCards.length === 0) {
    return {
      title,
      testimonials: fallback.testimonials,
    };
  }

  const testimonials: SubpageTestimonialItem[] = rawCards.map((card, idx) => {
    const quote = (card.description ||
      card.quote ||
      card.personMessage ||
      fallback.testimonials[idx]?.quote ||
      "") as string;

    const author = (card.title ||
      card.author ||
      card.personName ||
      fallback.testimonials[idx]?.author ||
      "") as string;

    const role = (card.badge ||
      card.role ||
      card.personDesignation ||
      fallback.testimonials[idx]?.role ||
      "") as string;

    return {
      quote,
      author,
      role,
    };
  });

  return {
    title,
    testimonials,
  };
}

/**
 * 4. Subpage CTA Mapper
 */
export function mapSubpageCta(
  section?: StrapiSectionItem | RawRecord | null,
  fallback: SubpageCtaData = {
    title: "To see how we can support your infrastructure needs, reach out to our dedicated team.",
    buttonText: "Contact Us",
    buttonLink: "/contact",
  }
): SubpageCtaData {
  const title = (section?.title as string) || fallback.title;

  const rawCtas = (Array.isArray(section?.cta) ? section.cta : [section?.cta].filter(Boolean)) as
    RawRecord[] | undefined;

  let buttonText = fallback.buttonText;
  let buttonLink = fallback.buttonLink;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    if (rawCtas[0].label) buttonText = rawCtas[0].label as string;
    if (rawCtas[0].url) buttonLink = rawCtas[0].url as string;
  }

  return {
    title,
    buttonText,
    buttonLink,
  };
}
