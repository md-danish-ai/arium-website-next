import React from "react";
import { BenefitsGrid } from "@ui-common";
import { CareersEEO } from "@ui-component/careers";
import { mapCommunityBenefits } from "@services/mappers/community.mapper";
import { mapCareersBenefits, mapCareersEEO } from "@services/mappers/careers.mapper";
import { SectionRendererProps } from "../../helper";

export default function BenefitsGridRenderer({
  section,
  index,
}: SectionRendererProps<{ title?: string; __component?: string }>) {
  const comp = (section?.__component || "").toLowerCase();
  const title = (section?.title || "").toLowerCase();

  const isCommunity =
    comp.includes("image-card-grid") || title.includes("small cell") || title.includes("matter");

  if (isCommunity) {
    const props = mapCommunityBenefits(section);
    return <BenefitsGrid key={`benefits-grid-${index}`} {...props} />;
  }

  const benefitsProps = mapCareersBenefits(section);
  const eeoProps = mapCareersEEO(section);

  return (
    <React.Fragment key={`benefits-grid-${index}`}>
      <BenefitsGrid {...benefitsProps} />
      {(eeoProps.statementText || eeoProps.contentHtml) && <CareersEEO {...eeoProps} />}
    </React.Fragment>
  );
}
