import type { FeatureCardItem, StatItem, StrapiMediaLike, StrapiMediaItem } from "@types";
import type { InfrastructureCard, SectionPointerItem } from "@data/home.data";

export type {
  FeatureCardItem,
  InfrastructureCard,
  SectionPointerItem,
  StatItem,
  StrapiMediaLike,
  StrapiMediaItem,
};

/**
 * 1. Home Hero Props (shared.main-hero)
 */
export interface HomeHeroProps {
  title?: string;
  description?: string;
  font_color?: string;
  background_color?: string;
  scroll_text?: string;
}

/**
 * 2. Background Feature Props (shared.background-feature-section)
 */
export interface BackgroundFeatureSectionProps {
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  CTA_text?: string;
  CTA_url?: string;
  feature_cards?: FeatureCardItem[];
  maxWidthText?: string;
}

/**
 * 3. Detailed Card Grid Props (shared.detailed-card-grid)
 */
export interface DetailedCardGridProps {
  title?: string;
  description?: string;
  background_color?: string;
  panel_cards?: InfrastructureCard[];
}

/**
 * 4. Stats With Image Props (shared.stats-with-image)
 */
export interface StatsWithImageProps {
  title?: string;
  title_color?: string;
  stat_illustration?: string;
  stats_card?: StatItem[];
}

export type { ImageGradientSplitProps } from "@ui-common";

/**
 * 6. Careers CTA Props (shared.centered-image-cta)
 */
export interface CareersCtaProps {
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  background_image?: string | null;
  CTA_text?: string;
  CTA_url?: string;
}

/**
 * 7. Final Contact CTA Props (shared.cta-with-graphic)
 */
export interface ContactCtaProps {
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  globe_illustration_desktop?: string | null;
  globe_illustration_mobile?: string | null;
  background_color?: string;
}
