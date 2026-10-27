import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage, extractMediaUrl } from "@utils";
import {
  CAREERS_HERO_FALLBACK,
  CAREERS_CULTURE_FALLBACK,
  CAREERS_TESTIMONIALS_FALLBACK,
  CAREERS_JOB_AREAS_FALLBACK,
  CAREERS_BENEFITS_FALLBACK,
  CAREERS_EEO_FALLBACK,
  CareersPillar,
  CareersEmployeeTestimonial,
  CareersJobAreaItem,
  CareersBenefitItem,
} from "@data/careers.data";
import type {
  CareersCultureAccordionProps,
  CareersTestimonialsProps,
  CareersJobAreasProps,
  CareersBenefitsProps,
  CareersEEOProps,
} from "../../components/ui-component/careers/type";

type RawRecord = Record<string, unknown>;

export interface CareersHeroMappedProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  intro: string;
  ctaText?: string;
  ctaLink?: string;
  isExternalLink?: boolean;
  ctaColor?: "primary" | "secondary";
  ctaVariant?: "filled" | "outlined";
}

/**
 * 1. Careers Hero Mapper
 */
export function mapCareersHero(
  raw?: RawRecord | null,
  fallback = CAREERS_HERO_FALLBACK
): CareersHeroMappedProps {
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

  const rawCtas = raw?.heroCtas as RawRecord | RawRecord[] | undefined;
  let ctaText = fallback.ctaText;
  let ctaLink = fallback.ctaLink;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    ctaText = (rawCtas[0].label as string) || fallback.ctaText;
    ctaLink = (rawCtas[0].url as string) || fallback.ctaLink;
  } else if (rawCtas && !Array.isArray(rawCtas) && typeof rawCtas === "object") {
    ctaText = (rawCtas.label as string) || fallback.ctaText;
    ctaLink = (rawCtas.url as string) || fallback.ctaLink;
  }

  return {
    id: "team-hero",
    imageSrc,
    imageAlt,
    heading,
    intro,
    ctaText,
    ctaLink,
    isExternalLink: fallback.isExternalLink,
    ctaColor: fallback.ctaColor,
    ctaVariant: fallback.ctaVariant,
  };
}

/**
 * 2. Careers Culture Accordion Mapper
 */
export function mapCareersCulture(
  careersContent?: RawRecord | null,
  whyJoinSection?: StrapiSectionItem | RawRecord | null,
  pillarsSection?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_CULTURE_FALLBACK
): CareersCultureAccordionProps {
  const title =
    (whyJoinSection?.title as string) ||
    (whyJoinSection?.Heading as string) ||
    (whyJoinSection?.heading as string) ||
    (careersContent?.title as string) ||
    fallback.title;

  const rawBody =
    (whyJoinSection?.body as string) ||
    (whyJoinSection?.Body as string) ||
    (whyJoinSection?.description as string) ||
    (whyJoinSection?.Description as string) ||
    (careersContent?.body as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const paragraphs = isHtml ? undefined : fallback.paragraphs;

  const rawPillars = (pillarsSection?.cards || pillarsSection?.Cards || careersContent?.cards) as
    RawRecord[] | undefined;

  let pillars: CareersPillar[] = fallback.pillars;
  if (Array.isArray(rawPillars) && rawPillars.length > 0) {
    pillars = rawPillars.map((p) => ({
      title: (p.title || p.Title || p.heading || "") as string,
      description: (p.description || p.Description || p.body || "") as string,
      icon: (p.icon || p.Icon || "") as string | undefined,
    }));
  }

  return {
    title,
    contentHtml,
    paragraphs,
    pillars,
  };
}

/**
 * 3. Careers Testimonials Mapper
 */
export function mapCareersTestimonials(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_TESTIMONIALS_FALLBACK
): CareersTestimonialsProps {
  const title =
    (raw?.title as string) ||
    (raw?.Title as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    fallback.title;

  const rawCards = (raw?.cards || raw?.Cards || raw?.testimonials) as RawRecord[] | undefined;

  let testimonials: CareersEmployeeTestimonial[] = fallback.testimonials;
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
 * 4. Careers Job Areas Mapper
 */
export function mapCareersJobAreas(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_JOB_AREAS_FALLBACK
): CareersJobAreasProps {
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
  const description = isHtml ? undefined : rawBody || fallback.description;

  const rawCards = (raw?.cards || raw?.Cards || raw?.jobAreas) as RawRecord[] | undefined;

  let jobAreas: CareersJobAreaItem[] = fallback.jobAreas;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    jobAreas = rawCards.map((c) => ({
      title: (c.title || c.Title || "") as string,
    }));
  }

  const rawMedia = (raw?.media || raw?.Media || raw?.image) as unknown;
  const imageSrc = rawMedia ? resolveStrapiImage(rawMedia, fallback.imageSrc) : fallback.imageSrc;

  return {
    title,
    contentHtml,
    description,
    jobAreas,
    cta: fallback.cta,
    imageSrc,
    imageAlt: fallback.imageAlt,
  };
}

/**
 * 5. Careers Benefits Mapper
 */
export function mapCareersBenefits(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_BENEFITS_FALLBACK
): CareersBenefitsProps {
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
  const description = isHtml ? undefined : rawBody || fallback.description;

  const rawCards = (raw?.cards ||
    raw?.Cards ||
    raw?.benefits ||
    raw?.BenefitsCard ||
    raw?.benefitsCard) as RawRecord[] | undefined;

  let benefits: CareersBenefitItem[] = fallback.benefits;
  if (Array.isArray(rawCards) && rawCards.length > 0) {
    benefits = rawCards.map((c, index) => {
      const fallbackBenefit = fallback.benefits[index % fallback.benefits.length];
      const customImg = extractMediaUrl(c.image || c.Image || c.media);

      return {
        title: (c.title || c.Title || fallbackBenefit.title) as string,
        description: (c.description || c.Description || fallbackBenefit.description) as string,
        titleColor: (c.TitleColor || c.titleColor || fallbackBenefit.titleColor) as
          string | undefined,
        iconSrc: customImg
          ? resolveStrapiImage(customImg, fallbackBenefit.iconSrc)
          : fallbackBenefit.iconSrc,
      };
    });
  }

  return {
    title,
    contentHtml,
    description,
    benefits,
  };
}

/**
 * 6. Careers EEO Statement Mapper
 */
export function mapCareersEEO(
  raw?: StrapiSectionItem | RawRecord | null,
  fallback = CAREERS_EEO_FALLBACK
): CareersEEOProps {
  const rawBody =
    (raw?.BottomMessage as string) ||
    (raw?.bottomMessage as string) ||
    (raw?.FooterText as string) ||
    (raw?.footerText as string) ||
    (raw?.body as string) ||
    (raw?.Body as string) ||
    (raw?.description as string) ||
    (raw?.Description as string) ||
    (raw?.statementText as string);

  const isHtml = Boolean(rawBody && rawBody.includes("<") && rawBody.includes(">"));
  const contentHtml = isHtml ? rawBody : undefined;
  const statementText = isHtml ? undefined : rawBody || fallback.statementText;

  return {
    contentHtml,
    statementText,
  };
}
