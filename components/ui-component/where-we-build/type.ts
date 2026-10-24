import type { ImageItem, LinkItem } from "@types";

export interface WhereFeatureProps {
  title: string;
  description: string;
  cta: LinkItem;
  images: ImageItem[];
  isHtmlDescription?: boolean;
}

export type WhereCommunitiesProps = WhereFeatureProps;
export type WhereVenuesProps = WhereFeatureProps;
