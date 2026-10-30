import type { LinkItem, FAQItem } from "@types";
import type { CommunityBenefitCard } from "@data/community.data";
import type { SharedTestimonialsProps, SharedTestimonialCard } from "@ui-common";

export type {
  LinkItem,
  FAQItem,
  CommunityBenefitCard,
  SharedTestimonialsProps,
  SharedTestimonialCard,
};

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

export interface CommunityFAQProps {
  title: string;
  faqs: FAQItem[];
}
