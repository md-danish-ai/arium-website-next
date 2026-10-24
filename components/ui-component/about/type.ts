import type {
  ImageItem,
  LinkItem,
  StrapiMediaLike,
  StrapiMediaItem,
  StrapiPageData,
  StrapiWidget,
  SectionEntry,
} from "@types";
import type {
  AboutTimelineCard,
  AboutStatPillar,
  CommitmentPillar,
  CulturePillarItem,
} from "@data/about.data";

// Re-exports for backward compatibility
export type { StrapiMediaLike, StrapiMediaItem };
export type { AboutTimelineCard, AboutStatPillar, CommitmentPillar, CulturePillarItem };
export type AboutPageContent = StrapiPageData;
export type AboutWidget = StrapiWidget;
export type AboutSectionEntry = SectionEntry;

export interface AboutSeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogSiteName?: string;
  ogImage?: {
    url?: string;
  };
  preventIndexing?: boolean;
}

export interface AboutSection {
  key?: string;
  title?: string;
  body?: string;
  media?: StrapiMediaLike;
  cards?: Record<string, unknown>[];
  cardItem?: Record<string, unknown>[];
  stats?: Record<string, unknown>[];
  cta?: { label?: string; url?: string }[];
  __component?: string;
  [key: string]: unknown;
}

/**
 * 1. AboutContentWithSideGraphic Props
 */
export interface AboutContentWithSideGraphicProps {
  heading: string;
  bodyText: string;
  isHtmlBody?: boolean;
  sideImageSrc?: string;
  gradient?: string;
  headingColor?: string;
  descriptionColor?: string;
}

/**
 * 2. AboutJourney Props
 */
export interface AboutJourneyProps {
  heading: string;
  description?: string;
  timelineItems: AboutTimelineCard[];
}

/**
 * 3. AboutStatsCards Props
 */
export interface AboutStatsCardsProps {
  heading: string;
  description?: string;
  stats: AboutStatPillar[];
}

/**
 * 4. AboutCommitments Props
 */
export interface AboutCommitmentsProps {
  heading: string;
  description?: string;
  heroBannerImg: ImageItem;
  pillars: CommitmentPillar[];
}

/**
 * 5. AboutCulture Props
 */
export interface AboutCultureProps {
  heading: string;
  description?: string;
  pillars: CulturePillarItem[];
  desktopImgUrl: string;
  mobileImgUrl: string;
  cta: LinkItem;
  headingColor?: string;
  descriptionColor?: string;
}
