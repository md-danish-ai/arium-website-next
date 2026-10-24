import type { SolutionStatItem, IndustryItem } from "@data/solutions.data";

export type { SolutionStatItem, IndustryItem };

export interface SolutionsSmallCellsProps {
  title: string;
  contentHtml?: string;
  paragraphs?: string[];
  stats?: SolutionStatItem[];
  illustrationSrc: string;
  illustrationAlt?: string;
}

export interface SolutionsDasProps {
  title: string;
  contentHtml?: string;
  paragraphs?: string[];
  stats?: SolutionStatItem[];
  illustrationSrc: string;
  illustrationAlt?: string;
}

export interface SolutionsIndustriesProps {
  title: string;
  contentHtml?: string;
  description?: string;
  industries: IndustryItem[];
}
