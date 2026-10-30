import type { TimelineCardItem, StatCardItem, CommitmentCardItem } from "@data/about.data";
import type { ImageGradientSplitProps } from "@ui-common";

export type { TimelineCardItem, StatCardItem, CommitmentCardItem };

/**
 * 1. Hero Banner Props (widget.hero-banner - Position 0)
 */
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

/**
 * 2. AboutContentWithSideGraphic Props (widget.content-with-side-graphic - Position 1)
 */
export interface AboutContentWithSideGraphicProps {
  title: string;
  title_color?: string;
  description: string;
  description_color?: string;
  background_color?: string;
  image?: string;
}

/**
 * 3. AboutJourney Props (widget.timeline - Position 2, SubSection 0)
 */
export interface AboutJourneyProps {
  title: string;
  description?: string;
  timeline_cards: TimelineCardItem[];
}

/**
 * 4. AboutStatsCards Props (widget.stats-cards - Position 2, SubSection 1)
 */
export interface AboutStatsCardsProps {
  title: string;
  description?: string;
  cards: StatCardItem[];
}

/**
 * 5. AboutCommitments Props (widget.commitments - Position 2, SubSection 2)
 */
export interface AboutCommitmentsProps {
  title: string;
  description?: string;
  background_overlay?: string;
  commitment_statement?: string;
  background_image?: string;
  commitment_cards: CommitmentCardItem[];
}

/**
 * 6. AboutCulture Props (widget.image-gradient-split - Position 3)
 */
export type AboutCultureProps = ImageGradientSplitProps;
