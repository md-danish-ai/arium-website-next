import React from "react";
import { ImageCardGrid } from "@ui-common";
import { extractMediaUrl } from "@utils/media";
import { SectionRendererProps } from "./helper";

interface MediaItem {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface ImageGridCardItem {
  title?: string;
  description?: string;
  image?: MediaItem | string;
  TitleColor?: string;
  titleColor?: string;
  DescriptionColor?: string;
  descriptionColor?: string;
}

interface ImageCardGridSectionData {
  Heading?: string;
  heading?: string;
  title?: string;
  HeadingColor?: string;
  cardgrid?: ImageGridCardItem[];
  cards?: ImageGridCardItem[];
}

export default function ImageCardGridRenderer({
  section,
  index,
}: SectionRendererProps<ImageCardGridSectionData>) {
  const cards = (section.cardgrid || section.cards || []).map((card) => ({
    title: card.title || "",
    description: card.description || "",
    image: extractMediaUrl(card.image) || "/assets/images/placeholder.png",
    titleColor: card.TitleColor || card.titleColor,
    descriptionColor: card.DescriptionColor || card.descriptionColor,
  }));

  const title = section.Heading || section.heading || section.title || "Why small cells matter";
  const headingColor = section.HeadingColor;

  return (
    <ImageCardGrid
      key={`image-card-grid-${index}`}
      title={title}
      headingColor={headingColor}
      cards={cards}
    />
  );
}
