import type { LinkItem, FAQItem } from "@types";
import type { CommunityTestimonialItem, CommunityBenefitCard } from "@data/community.data";

export type { LinkItem, FAQItem, CommunityTestimonialItem, CommunityBenefitCard };

export interface CommunitySmallCellsProps {
  title: string;
  contentHtml?: string;
  paragraphs?: string[];
  illustrationSrc: string;
  illustrationAlt?: string;
}

export interface CommunityHowWeWorkProps {
  title: string;
  contentHtml?: string;
  paragraphs?: string[];
  bgImageUrl?: string;
  cta?: LinkItem;
}

export interface CommunityTestimonialsProps {
  title: string;
  testimonials: CommunityTestimonialItem[];
}

export interface CommunityFAQProps {
  title: string;
  faqs: FAQItem[];
}
