import type { CommunityBenefitCard, CommunityFaqItem } from "@data/community.data";
import type { SharedTestimonialsProps, SharedTestimonialCard } from "@ui-common";

export type {
  CommunityBenefitCard,
  CommunityFaqItem,
  SharedTestimonialsProps,
  SharedTestimonialCard,
};

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
  feature_cards?: Array<{ id: number; title: string; description: string }> | null;
}

export interface CommunityFAQProps {
  title: string;
  title_color?: string;
  faq_data: CommunityFaqItem[];
}
