import type {
  CareersPillar,
  CareersEmployeeTestimonial,
  CareersJobAreaItem,
  CareersBenefitItem,
} from "@data/careers.data";
import type { AccordionItem } from "@ui-common/AccordionSplit";

export type { CareersPillar, CareersEmployeeTestimonial, CareersJobAreaItem, CareersBenefitItem };

export interface CareersCultureAccordionProps {
  title: string;
  title_color?: string | null;
  description?: string;
  description_color?: string | null;
  background_color?: string | null;
  template_grid_columns?: string | null;
  accordian_cards?: AccordionItem[];
  // Backwards compatibility for legacy wrappers
  contentHtml?: string;
  paragraphs?: string[];
  pillars?: CareersPillar[];
}

export interface CareersTestimonialsProps {
  title: string;
  cards: CareersEmployeeTestimonial[];
}

export interface CareersJobAreasProps {
  title: string;
  description?: string;
  CTA_text?: string;
  CTA_url?: string;
  image?: string;
  imageAlt?: string;
  items: CareersJobAreaItem[];
  // Backwards compatibility for legacy callers
  contentHtml?: string;
  jobAreas?: CareersJobAreaItem[];
  cta?: { label: string; url: string; isExternal?: boolean };
  imageSrc?: string;
}

export type CareersBenefitsProps = import("@ui-common/BenefitsGrid").BenefitsGridProps;

export interface CareersEEOProps {
  bottom_message?: string;
  statementText?: string;
  contentHtml?: string;
}
