import type { TimelineCardItem, StatCardItem, CommitmentCardItem } from "@data/about.data";
import type { ImageGradientSplitProps } from "@ui-common";

export type { TimelineCardItem, StatCardItem, CommitmentCardItem };

// Hero banner props
export interface AboutHeroProps {
  title?: string;
  description?: string;
  background_image?: string;
  background_image_position?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
  max_width_title?: string | null;
  max_width_description?: string | null;
  tag?: string | null;
}

// Content with side graphic props
export interface AboutContentWithSideGraphicProps {
  title: string;
  title_color?: string;
  description: string;
  description_color?: string;
  background_color?: string;
  image?: string;
}

// Journey timeline props
export interface AboutJourneyProps {
  title: string;
  description?: string;
  timeline_cards: TimelineCardItem[];
}

// Stats cards props
export interface AboutStatsCardsProps {
  title: string;
  description?: string;
  cards: StatCardItem[];
}

// Commitments props
export interface AboutCommitmentsProps {
  title: string;
  description?: string;
  background_overlay?: string;
  commitment_statement?: string;
  background_image?: string;
  commitment_cards: CommitmentCardItem[];
}

// Culture split props
export type AboutCultureProps = ImageGradientSplitProps;
