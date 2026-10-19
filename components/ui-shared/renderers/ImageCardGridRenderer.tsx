import React from "react";
import { SharedImageCardGrid } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function ImageCardGridRenderer({ section, index }: SectionRendererProps) {
  const cards = (section.cardgrid || section.cards || []).map((card: any) => ({
    title: card.title,
    description: card.description,
    image: card.image,
    TitleColor: card.TitleColor || card.titleColor,
    DescriptionColor: card.DescriptionColor || card.descriptionColor,
  }));

  const data = {
    title: section.Heading || section.heading || section.title,
    cards: cards.length > 0 ? cards : undefined,
    HeadingColor: section.HeadingColor,
  };

  return <SharedImageCardGrid key={`image-card-grid-${index}`} data={data} />;
}
