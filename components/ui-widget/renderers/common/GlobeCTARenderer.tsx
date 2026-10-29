import React from "react";
import { GlobeCTA } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { resolveStrapiImage } from "@utils";

export default function GlobeCTARenderer({ section, index }: SectionRendererProps) {
  const globe_illustration = resolveStrapiImage(
    section.globe_illustration,
    "/images/svg-images/connection-globe.svg"
  );

  return (
    <GlobeCTA
      key={`globe-cta-${index}`}
      prompt_to_cta={section.prompt_to_cta as string}
      CTA_text={section.CTA_text as string}
      CTA_url={section.CTA_url as string}
      background_gradient={section.background_gradient as string}
      globe_illustration={globe_illustration}
    />
  );
}
