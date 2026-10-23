import React from "react";
import type { StrapiMediaLike, StrapiMediaItem } from "../home/type";

export type { StrapiMediaLike, StrapiMediaItem };

// AboutContentWithSideGraphic Types
export interface AboutContentWithSideGraphicProps {
  Heading?: string;
  heading?: string;
  Description?: string;
  description?: string;
  Image?: StrapiMediaLike;
  image?: StrapiMediaLike;
  media?: StrapiMediaLike;
  Media?: StrapiMediaLike;
  Gradient?: string;
  gradient?: string;
  HeadingColor?: string;
  headingColor?: string;
  DescriptionColor?: string;
  descriptionColor?: string;
  data?: {
    title?: string;
    Title?: string;
    heading?: string;
    Heading?: string;
    body?: string;
    Body?: string;
    description?: string;
    Description?: string;
    media?: StrapiMediaLike;
    Media?: StrapiMediaLike;
    image?: StrapiMediaLike;
    Image?: StrapiMediaLike;
    gradient?: string;
    Gradient?: string;
    headingColor?: string;
    HeadingColor?: string;
    descriptionColor?: string;
    DescriptionColor?: string;
  };
}

// AboutJourney Types
export interface AboutJourneyTimelineItem {
  Title?: string;
  title?: string;
  Content?: string;
  content?: string;
  description?: string;
  body?: string;
  TitleColor?: string;
  titleColor?: string;
  BadgeText?: string;
  badge?: string;
  badgeText?: string;
}

export interface AboutJourneyProps {
  Heading?: string;
  Description?: string;
  TimeCards?: AboutJourneyTimelineItem[];
  data?: {
    title?: string;
    body?: string;
    cards?: AboutJourneyTimelineItem[];
    cardItem?: AboutJourneyTimelineItem[];
  };
}

// AboutStatsCards Types
export interface StatsCardItem {
  Title?: string;
  title?: string;
  value?: string;
  Description?: string;
  description?: string;
  label?: string;
  Badge?: string;
  badge?: string;
  BgGradient?: string;
  bgGradient?: string;
  NumberColor?: string;
  DescriptionColor?: string;
}

export interface AboutStatsCardsProps {
  Heading?: string;
  Description?: string;
  CradColorful?: StatsCardItem[];
  data?: {
    title?: string;
    body?: string;
    stats?: (StatsCardItem | Record<string, unknown>)[];
    cards?: (StatsCardItem | Record<string, unknown>)[];
  };
}

// AboutCommitments Types
export interface PillarCard {
  PillarText?: string;
  title?: string;
  heading?: string;
  PillarDescription?: string;
  description?: string;
  body?: string;
  BarColor?: string;
  barColor?: string;
  PillarHeadingColor?: string;
  PillarBgColorHover?: string;
}

export interface AboutCommitmentsProps {
  Heading?: string;
  Description?: string;
  BgImage?: StrapiMediaLike;
  BgOverlay?: string;
  PillarsDescription?: string;
  PillarCard?: PillarCard[];
  data?: {
    title?: string;
    body?: string;
    cards?: (PillarCard | Record<string, unknown>)[];
    media?: StrapiMediaLike;
  };
}

// AboutCulture Types
export interface CulturePillar {
  Heading?: string;
  title?: string;
  Description?: string;
  description?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export interface CultureCTA {
  label?: string;
  url?: string;
}

export interface AboutCultureProps {
  Heading?: string;
  Description?: string;
  Pillarcard?: CulturePillar[];
  CtaButton?: string;
  CTALink?: string;
  BgImage?: StrapiMediaLike;
  BgGradient?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
  data?: {
    title?: string;
    body?: string;
    cards?: (CulturePillar | Record<string, unknown>)[];
    cta?: CultureCTA[];
    media?: StrapiMediaLike;
  };
}

// About Page Data & Widget Types
export interface AboutSeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogSiteName?: string;
  ogImage?: {
    url?: string;
  };
  preventIndexing?: boolean;
}

export interface AboutSection {
  key?: string;
  title?: string;
  body?: string;
  media?: StrapiMediaLike;
  cards?: Record<string, unknown>[];
  cardItem?: Record<string, unknown>[];
  stats?: Record<string, unknown>[];
  cta?: CultureCTA[];
  __component?: string;
  [key: string]: unknown;
}

export interface AboutPageContent {
  id?: number;
  heroTitle?: string;
  heroDescription?: string;
  heroMedia?: StrapiMediaItem[];
  heroCtas?: CultureCTA[];
  sections?: AboutSection[];
  SeoFields?: AboutSeoFields;
}

export interface AboutWidgetSection {
  __component?: string;
  [key: string]: unknown;
}

export interface AboutWidget {
  id?: number | string;
  PositionNumber?: number;
  CustomCssClass?: string;
  Sections?: AboutWidgetSection[];
}

export interface AboutSectionEntry {
  pos: number;
  key: string;
  skip?: boolean;
  el: React.ReactElement;
}
