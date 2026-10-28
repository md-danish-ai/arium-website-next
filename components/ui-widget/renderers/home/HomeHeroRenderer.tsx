import React from "react";
import { HomeHero } from "@ui-component";
import { SectionRendererProps } from "../../helper";
import { mapHomeHero } from "@services/mappers/home.mapper";

export default function HomeHeroRenderer({ section, index }: SectionRendererProps) {
  const props = mapHomeHero(section);
  return (
    <HomeHero
      key={`main-hero-${index}`}
      heading={props.heading}
      description={props.description}
      fontColor={props.fontColor}
      bgColor={props.bgColor}
      scrollText={props.scrollText}
    />
  );
}
