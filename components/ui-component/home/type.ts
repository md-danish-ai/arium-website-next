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

// Home hero props
export interface HomeHeroProps {
  title?: string;
  description?: string;
  font_color?: string;
  background_color?: string;
  scroll_text?: string;
}

// Background feature props
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

// Detailed card grid props
export interface DetailedCardGridProps {
  title?: string;
  description?: string;
  background_color?: string;
  panel_cards?: InfrastructureCard[];
}

// Stats with image props
export interface StatsWithImageProps {
  title?: string;
  title_color?: string;
  stat_illustration?: string;
  stats_card?: StatItem[];
}

export type { ImageGradientSplitProps } from "@ui-common";

// Careers CTA props
export interface CareersCtaProps {
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  background_image?: string | null;
  CTA_text?: string;
  CTA_url?: string;
}

// Contact CTA props
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
