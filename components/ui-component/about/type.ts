import type {
  TimeLineCard,
  StatCardItem,
  CommitmentCardItem,
  PillarCardItem,
} from "@data/about.data";

export type { TimeLineCard, StatCardItem, CommitmentCardItem, PillarCardItem };

/**
 * 1. Hero Banner Props (shared.test-banner - Position 0)
 */
export interface AboutHeroProps {
  title?: string;
  description?: string;
  media?: string;
  CTA_text?: string | null;
  CTA_url?: string | null;
  max_width_title?: string | null;
  max_width_description?: string | null;
  object_position?: string | null;
  tag?: string | null;
}

/**
 * 2. AboutContentWithSideGraphic Props (shared.content-with-side-graphic - Position 1)
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
 * 3. AboutJourney Props (shared.timeline - Position 2, SubSection 0)
 */
export interface AboutJourneyProps {
  title: string;
  description?: string;
  TimeLineCards: TimeLineCard[];
}

/**
 * 4. AboutStatsCards Props (shared.stats-cards - Position 2, SubSection 1)
 */
export interface AboutStatsCardsProps {
  title: string;
  description?: string;
  Cards: StatCardItem[];
}

/**
 * 5. AboutCommitments Props (shared.commitments - Position 2, SubSection 2)
 */
export interface AboutCommitmentsProps {
  title: string;
  description?: string;
  background_overlay?: string;
  pillars_description?: string;
  background_image?: string;
  CommitmentCards: CommitmentCardItem[];
}

/**
 * 6. AboutCulture Props (shared.pillar-highlights - Position 3)
 */
export interface AboutCultureProps {
  title: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  CTA_text?: string;
  CTA_url?: string;
  background_color?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  PillarCards: PillarCardItem[];
}
