import React from "react";
import { AboutCulture } from "@ui-component";
import { SectionRendererProps } from "./helper";
import { mapAboutCulture } from "@services/mappers/about.mapper";

export default function CultureRenderer({ section, index }: SectionRendererProps) {
  const props = mapAboutCulture(section);
  return <AboutCulture key={`culture-${index}`} {...props} />;
}
