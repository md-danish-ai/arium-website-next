import type { ReactElement } from "react";

/**
 * Universal Clean UI Content Models (Pure Presentational Props)
 */

export interface ImageItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkItem {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface StatItem {
  id?: string | number;
  number: string;
  description: string;
  background_color?: string;
  number_color?: string;
  description_color?: string;
}

export interface TestimonialItem {
  id?: string | number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
}

export interface AccordionItem {
  id?: string | number;
  title: string;
  content: string;
  isOpenDefault?: boolean;
}

export interface FAQItem {
  id?: string | number;
  question: string;
  answer: string;
}

export interface TimelineItem {
  id?: string | number;
  year?: string;
  title: string;
  description: string;
}

export interface FeatureCardItem {
  id?: string | number;
  title: string;
  description: string;
  title_color?: string;
  text_color?: string;
  description_color?: string;
}

export interface SectionEntry {
  pos: number;
  key: string;
  skip?: boolean;
  el: ReactElement;
}
