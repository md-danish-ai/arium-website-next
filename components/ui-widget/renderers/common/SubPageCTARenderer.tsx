import React from "react";
import { SubPageCTA } from "@ui-common";
import { SectionRendererProps } from "../../helper";
import { resolveStrapiImage } from "@utils";

export default function SubPageCTARenderer({
  section: { prompt_to_cta, CTA_text, CTA_url, background_gradient, globe_illustration },
  index,
}: SectionRendererProps) {
  const resolvedGlobe = resolveStrapiImage(
    globe_illustration,
    "/images/svg-images/connection-globe.svg"
  );

  return (
    <SubPageCTA
      key={`sub-page-cta-${index}`}
      prompt_to_cta={prompt_to_cta as string}
      CTA_text={CTA_text as string}
      CTA_url={CTA_url as string}
      background_gradient={background_gradient as string}
      globe_illustration={resolvedGlobe}
    />
  );
}
