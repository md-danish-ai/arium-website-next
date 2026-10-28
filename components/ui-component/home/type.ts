import type { StatItem, FeatureCardItem, StrapiMediaLike, StrapiMediaItem } from "@types";
import type { InfrastructureCard, SectionPointerItem } from "@data/home.data";

export type { FeatureCardItem as FeatureCard };
export type { StatItem };
export type { InfrastructureCard as PanelsCard };
export type { SectionPointerItem as SectionPointer };
export type { StrapiMediaLike, StrapiMediaItem };

/**
 * 1. Home Hero Props (Widget 1 - shared.main-hero)
 */
export interface HomeHeroProps {
  title?: string;
  description?: string;
  font_color?: string;
  background_color?: string;
  scroll_text?: string;
}

/**
 * 2. Background Feature Props (Widget 2 - shared.background-feature-section)
 */
export interface BackgroundFeatureSectionProps {
  title?: string;
  description?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  title_color?: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  FeatureCards?: FeatureCardItem[];
  maxWidthText?: string;
}

/**
 * 3. Detailed Card Grid Props (Widget 3 - shared.detailed-card-grid)
 */
export interface DetailedCardGridProps {
  title?: string;
  description?: string;
  background_color?: string;
  PanelCards?: InfrastructureCard[];
}

/**
 * 4. Stats With Image Props (Widget 4 - shared.stats-with-image)
 */
export interface StatsWithImageProps {
  title?: string;
  title_color?: string;
  image?: string;
  StatsCard?: StatItem[];
}

/**
 * 5. Image Gradient Split Props (Widget 5 - shared.image-gradient-split)
 */
export interface ImageGradientSplitProps {
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  SectionPointers?: SectionPointerItem[];
}

/**
 * 6. Careers CTA Props (Widget 6 - shared.centered-image-cta)
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
 * 7. Final Contact CTA Props (Widget 7 - shared.cta-with-graphic)
 */
export interface ContactCtaProps {
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  image_desktop?: string | null;
  image_mobile?: string | null;
  background_color?: string;
}
