import type { StatItem, FeatureCardItem, StrapiMediaLike, StrapiMediaItem } from "@types";
import type { InfrastructureCard, SectionPointerItem } from "@data/home.data";

// Re-export for backward compatibility
export type { FeatureCardItem as FeatureCard };
export type { StatItem };
export type { InfrastructureCard as PanelsCard };
export type { SectionPointerItem as SectionPointer };
export type { StrapiMediaLike, StrapiMediaItem };

/**
 * 1. Home Hero Props
 */
export interface HomeHeroProps {
  heading?: string;
  description?: string;
  fontColor?: string;
  bgColor?: string;
  scrollText?: string;
}

/**
 * 2. Background Feature (Network Challenges) Props
 */
export interface BackgroundFeatureSectionProps {
  heading: string;
  description: string;
  desktopBgUrl?: string;
  mobileBgUrl?: string;
  ctaLabel?: string;
  ctaLink?: string;
  cards: FeatureCardItem[];
  fontColorHeading?: string;
  fontColorDescription?: string;
  maxWidthText?: string;
}

/**
 * 3. Detailed Card Grid (Infrastructure) Props
 */
export interface DetailedCardGridProps {
  heading: string;
  description: string;
  bgColor?: string;
  cards: InfrastructureCard[];
}

/**
 * 4. Stats With Image Props
 */
export interface StatsWithImageProps {
  heading: string;
  stats: StatItem[];
  mapImageSrc: string;
  headingColor?: string;
}

/**
 * 5. Image Gradient Split (Community Impact) Props
 */
export interface ImageGradientSplitProps {
  heading: string;
  description: string;
  pointers: SectionPointerItem[];
  desktopImgUrl: string;
  mobileImgUrl: string;
  ctaText?: string;
  ctaUrl?: string;
  headingColor?: string;
  descriptionTextColor?: string;
}
