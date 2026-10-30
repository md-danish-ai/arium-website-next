import type { StrapiMediaItem } from "@types";

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
