import type { LinkItem } from "@types";
import type {
  CareersPillar,
  CareersEmployeeTestimonial,
  CareersJobAreaItem,
  CareersBenefitItem,
} from "@data/careers.data";

export type {
  LinkItem,
  CareersPillar,
  CareersEmployeeTestimonial,
  CareersJobAreaItem,
  CareersBenefitItem,
};

export interface CareersCultureAccordionProps {
  title: string;
  contentHtml?: string;
  paragraphs?: string[];
  pillars: CareersPillar[];
}

export interface CareersTestimonialsProps {
  title: string;
  testimonials: CareersEmployeeTestimonial[];
}

export interface CareersJobAreasProps {
  title: string;
  contentHtml?: string;
  description?: string;
  jobAreas: CareersJobAreaItem[];
  cta?: LinkItem;
  imageSrc?: string;
  imageAlt?: string;
}

export interface CareersBenefitsProps {
  title: string;
  contentHtml?: string;
  description?: string;
  benefits: CareersBenefitItem[];
}

export interface CareersEEOProps {
  contentHtml?: string;
  statementText?: string;
}
