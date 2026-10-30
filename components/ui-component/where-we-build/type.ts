import type { StrapiMediaItem } from "@types";
import type { SubpageTestimonialCard } from "@data/where-subpages.data";

export interface WhereImageSplitProps {
  title: string;
  title_color?: string | null;
  description: string;
  description_color?: string | null;
  image: string | StrapiMediaItem;
  image_alignment?: "Left" | "Right" | string;
  background_color?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
}

export interface WhereSubpageHeroProps {
  tag?: string | null;
  title: string;
  description: string;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  content_max_width?: string | null;
}

export interface WhereSubpageTestimonialsProps {
  title: string;
  cards: SubpageTestimonialCard[];
}
