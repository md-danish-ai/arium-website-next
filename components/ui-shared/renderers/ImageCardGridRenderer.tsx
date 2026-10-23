import React from "react";
import { ImageCardGrid } from "@ui-common";
import { SectionRendererProps } from "./helper";

interface MediaItem {
  url: string;
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
    image: card.image,
    TitleColor: card.TitleColor || card.titleColor,
    DescriptionColor: card.DescriptionColor || card.descriptionColor,
  }));

  const data = {
    title: section.Heading || section.heading || section.title,
    cards: cards.length > 0 ? cards : undefined,
    HeadingColor: section.HeadingColor,
  };

  return <ImageCardGrid key={`image-card-grid-${index}`} data={data} />;
}
