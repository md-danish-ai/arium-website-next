/**
 * Core Strapi API Response & Entity Types
 */

export interface StrapiMediaAttributes {
  url?: string;
  name?: string;
  caption?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  mime?: string;
  size?: number;
  formats?: Record<string, { url?: string; width?: number; height?: number }>;
}

export interface StrapiMediaItem {
  id?: number | string;
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  attributes?: StrapiMediaAttributes;
  data?: {
    id?: number | string;
    attributes?: StrapiMediaAttributes;
    url?: string;
  };
}

export type StrapiMediaLike =
  | StrapiMediaItem
  | StrapiMediaItem[]
  | { data?: StrapiMediaItem | StrapiMediaItem[] }
  | null
  | undefined;

export interface StrapiCTA {
  id?: number | string;
  label?: string;
  url?: string;
  Title?: string;
  Link?: string;
  text?: string;
  href?: string;
}

export interface StrapiWidgetSection {
  __component?: string;
  id?: number | string;
  [key: string]: unknown;
}

export interface StrapiWidget {
  id?: number | string;
  PositionNumber?: number;
  CustomCssClass?: string;
  Sections?: StrapiWidgetSection[];
}

export interface StrapiSectionItem {
  id?: number | string;
  key?: string;
  title?: string;
  Title?: string;
  Heading?: string;
  heading?: string;
  body?: string;
  Body?: string;
  description?: string;
  Description?: string;
  media?: StrapiMediaLike;
  Media?: StrapiMediaLike;
  image?: StrapiMediaLike;
  Image?: StrapiMediaLike;
  cta?: StrapiCTA[];
  CTA?: StrapiCTA[];
  cards?: unknown[];
  cardItem?: unknown[];
  stats?: unknown[];
  [key: string]: unknown;
}

export interface StrapiPageData {
  id?: number | string;
  title?: string;
  slug?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroMedia?: StrapiMediaLike;
  heroCtas?: StrapiCTA[];
  sections?: StrapiSectionItem[];
  widgets?: StrapiWidget[];
  [key: string]: unknown;
}

export interface StrapiApiResponse<T> {
  data?: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
