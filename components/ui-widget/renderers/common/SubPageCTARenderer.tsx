import React from "react";
import { SubPageCTA } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { resolveStrapiImage } from "@utils";

export default function SubPageCTARenderer({ section, index }: SectionRendererProps) {
  const globe_illustration = resolveStrapiImage(
    section.globe_illustration,
    "/images/svg-images/connection-globe.svg"
  );

  return (
    <SubPageCTA
      key={`sub-page-cta-${index}`}
      prompt_to_cta={section.prompt_to_cta as string}
      CTA_text={section.CTA_text as string}
      CTA_url={section.CTA_url as string}
      background_gradient={section.background_gradient as string}
      globe_illustration={globe_illustration}
    />
  );
}
