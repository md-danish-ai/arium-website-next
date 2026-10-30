import React from "react";
import { CtaWithGraphic } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { mapContactCta } from "@services/mappers/home.mapper";

export default function CtaWithGraphicRenderer({ section, index }: SectionRendererProps) {
  const props = mapContactCta(section);
  return <CtaWithGraphic key={`cta-with-graphic-${index}`} {...props} />;
}
