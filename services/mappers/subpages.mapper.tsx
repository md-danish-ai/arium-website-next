import React from "react";
import type { StrapiPageData, StrapiSectionItem } from "@types";
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
  SubpageTestimonialItem,
} from "@data/where-subpages.data";

type RawRecord = Record<string, unknown>;

const DEFAULT_PROCESS_ICONS: Record<string, React.ReactNode> = {
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
  const tag =
    (pageData?.heroTag as string) ||
    (pageData?.tag as string) ||
    (pageData?.Tag as string) ||
    fallback.tag;

  const title =
    (pageData?.heroTitle as string) ||
    (pageData?.title as string) ||
    (pageData?.Title as string) ||
    (pageData?.Heading as string) ||
    fallback.title;

  const description =
    (pageData?.heroDescription as string) ||
    (pageData?.description as string) ||
    (pageData?.Description as string) ||
    fallback.description;

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
 * 2. Subpage Process Section Mapper (Right of Way structured process fallback)
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
    (section?.Heading as string) ||
    (section?.heading as string) ||
    fallback.title;

  const description =
    (section?.body as string) ||
    (section?.description as string) ||
    (section?.Description as string) ||
    fallback.description;

  const rawCards = (section?.cards || section?.Cards) as RawRecord[] | undefined;
  if (!Array.isArray(rawCards) || rawCards.length === 0) {
    const defaultPillars: PillarData[] = fallback.pillars.map((p) => ({
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
    };
  }

  const pillars: PillarData[] = rawCards.map((card, idx) => {
    const fallbackPillar = fallback.pillars[idx];
    const pillarTitle = (card.title || card.Name || fallbackPillar?.title || "") as string;
    const innerCards = (card.InnerCard || card.innerCard || card.cards || []) as RawRecord[];
    const pillarId =
      pillarTitle.toLowerCase().replace(/\s+/g, "-") || fallbackPillar?.id || `pillar-${idx}`;

    const steps =
      innerCards.length > 0
        ? innerCards.map((inner) => (inner.heading || inner.title || "") as string)
        : fallbackPillar?.steps || [];

    const timelineItems =
      innerCards.length > 0
        ? innerCards.map((inner) => ({
            label: (inner.heading || inner.title || "") as string,
            desc: (inner.description || inner.desc || "") as string,
          }))
        : fallbackPillar?.timelineItems || [];

    let iconSvg: React.ReactNode = DEFAULT_PROCESS_ICONS[pillarId.toLowerCase()] ||
      DEFAULT_PROCESS_ICONS[fallbackPillar?.id.toLowerCase() || ""] || (
        <AssessmentIconSvg
          className="w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          strokeWidth="2.2"
        />
      );

    if (card.icon && typeof card.icon === "string") {
      iconSvg = (
        <div
          className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full"
          dangerouslySetInnerHTML={{ __html: card.icon }}
        />
      );
    }

    return {
      id: pillarId,
      title: pillarTitle,
      themeColor: fallbackPillar?.themeColor || "#FBCBB5",
      steps,
      timelineItems,
      iconSvg,
    };
  });

  return {
    title,
    description,
    pillars,
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
  const title =
    (section?.title as string) ||
    (section?.Heading as string) ||
    (section?.heading as string) ||
    fallback.title;

  const rawCards = (section?.cards || section?.Cards || section?.testimonials) as
    RawRecord[] | undefined;

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
      card.message ||
      fallback.testimonials[idx]?.quote ||
      "") as string;

    const author = (card.title ||
      card.author ||
      card.personName ||
      card.name ||
      fallback.testimonials[idx]?.author ||
      "") as string;

    const role = (card.badge ||
      card.role ||
      card.personDesignation ||
      card.designation ||
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
  const title =
    (section?.title as string) ||
    (section?.Heading as string) ||
    (section?.heading as string) ||
    fallback.title;

  const rawCtas = (section?.cta || section?.CTA || section?.ctas) as
    RawRecord | RawRecord[] | undefined;

  let buttonText = fallback.buttonText;
  let buttonLink = fallback.buttonLink;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    if (rawCtas[0].label) buttonText = rawCtas[0].label as string;
    if (rawCtas[0].url) buttonLink = rawCtas[0].url as string;
  } else if (rawCtas && typeof rawCtas === "object" && !Array.isArray(rawCtas)) {
    if (rawCtas.label) buttonText = rawCtas.label as string;
    if (rawCtas.url) buttonLink = rawCtas.url as string;
  }

  return {
    title,
    buttonText,
    buttonLink,
  };
}
