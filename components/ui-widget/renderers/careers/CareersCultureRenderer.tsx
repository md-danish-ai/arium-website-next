import React from "react";
import { CareersCultureAccordion } from "@ui-component/careers";
import { mapCareersCulture } from "@services/mappers/careers.mapper";
import { SectionRendererProps } from "../../helper";

export default function CareersCultureRenderer({ section, index }: SectionRendererProps) {
  const props = mapCareersCulture(section);
  return <CareersCultureAccordion key={`careers-culture-${index}`} {...props} />;
}
