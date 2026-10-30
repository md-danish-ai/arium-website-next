import type { CommunityBenefitCard, CommunityFaqItem } from "@data/community.data";
import type { SharedTestimonialsProps, SharedTestimonialCard } from "@ui-common";

export type {
  CommunityBenefitCard,
  CommunityFaqItem,
  SharedTestimonialsProps,
  SharedTestimonialCard,
};

export interface CommunitySmallCellsProps {
  id?: string;
  title: string;
  title_color?: string;
  description: string;
  description_color?: string;
  illustration_image?: string;
  illustration_image_alignment?: "Right" | "Left" | "Media Right" | "Media Left";
  show_bottom_divider?: boolean;
  statistics?: Array<{ stat: string; description: string; stat_color?: string }>;
}

export interface CommunityHowWeWorkProps {
  id?: string;
  title: string;
  title_color?: string;
  description: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  FeatureCards?: Array<{ id: number; title: string; description: string }> | null;
}

export interface CommunityFAQProps {
  title: string;
  title_color?: string;
  faq_data: CommunityFaqItem[];
}
