import type { SolutionStatItem, IndustryAccordionCard } from "@data/solutions.data";

export type { SolutionStatItem, IndustryAccordionCard };

export interface SolutionsIllustrationSplitProps {
  title: string;
  title_color?: string | null;
  description: string;
  description_color?: string | null;
  illustration_image: string;
  illustration_image_alignment?: "Left" | "Right";
  show_bottom_divider?: boolean;
  statistics?: SolutionStatItem[];
  className?: string;
}

export interface SolutionsIndustriesProps {
  title: string;
  title_color?: string | null;
  description: string;
  description_color?: string | null;
  background_color?: string | null;
  template_grid_columns?: string | null;
  accordian_cards?: IndustryAccordionCard[];
}
