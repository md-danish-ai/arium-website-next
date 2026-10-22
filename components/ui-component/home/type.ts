// Common Strapi Media types
export interface StrapiMediaAttributes {
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
}

export interface StrapiMediaItem {
  id?: number;
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  attributes?: StrapiMediaAttributes;
}

export type StrapiMediaData = StrapiMediaItem | StrapiMediaItem[];

export interface StrapiMediaResponse {
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  data?: StrapiMediaData;
  [key: string]: unknown;
}

export type StrapiMediaLike = StrapiMediaResponse | StrapiMediaItem | StrapiMediaItem[];

// Home Hero Types
export interface HomeHeroProps {
  heading?: string;
  description?: string;
  fontColor?: string;
  bgColor?: string;
  scrollText?: string;
}

// Background Feature Section Types
export interface FeatureCard {
  id?: number;
  Heading?: string;
  title?: string;
  Description?: string;
  description?: string;
  TextColor?: string;
  HeadingColor?: string;
}

export interface BackgroundFeatureSectionProps {
  Heading?: string;
  Description?: string;
  BackgroundImage?: StrapiMediaLike;
  CTALabel?: string;
  CTALink?: string;
  FeatureCards?: FeatureCard[];
  FontColorHeading?: string;
  FontColorDescription?: string;
  MaxWidthText?: string;
}

// Detailed Card Grid Types
export interface PanelsCard {
  Title?: string;
  title?: string;
  Description?: string;
  description?: string;
  CtaText?: string;
  ctaText?: string;
  CTA?: string;
  linkText?: string;
  CtaLink?: string;
  ctaLink?: string;
  link?: string;
  ContentColor?: string;
  contentColor?: string;
  IllustatioSvgCode?: string;
  illustatioSvgCode?: string;
  SvgCode?: string;
  svgCode?: string;
  icon?: string;
  image?: StrapiMediaLike;
  Image?: StrapiMediaLike;
}

export interface DetailedCardGridProps {
  heading?: string;
  Headings?: string;
  Heading?: string;
  description?: string;
  Description?: string;
  bgColor?: string;
  BgColor?: string;
  panelsCards?: PanelsCard[];
  PanelsCards?: PanelsCard[];
  cards?: PanelsCard[];
  cardItem?: PanelsCard[];
  data?: {
    title?: string;
    body?: string;
    cardItem?: PanelsCard[];
    cards?: PanelsCard[];
    PanelsCards?: PanelsCard[];
  };
}

// Stats With Image Types
export interface StatItem {
  Number?: string;
  value?: string;
  Description?: string;
  label?: string;
  BgColor?: string;
  NumberColor?: string;
  DescriptionColor?: string;
}

export interface StatsWithImageProps {
  heading?: string;
  statscards?: StatItem[];
  image?: StrapiMediaLike;
  HeadingColor?: string;
}

// Image Gradient Split Types
export interface SectionPointer {
  id?: number;
  Heading?: string;
  title?: string;
  Description?: string;
  description?: string;
  FontHeading?: string;
  FontDescription?: string;
}

export interface ImageGradientSplitProps {
  heading?: string;
  description?: string;
  sectionPointers?: SectionPointer[];
  ctaText?: string;
  ctaUrl?: string;
  bgImage?: StrapiMediaLike;
  HeadingColor?: string;
  DescriptionTextColor?: string;
}
