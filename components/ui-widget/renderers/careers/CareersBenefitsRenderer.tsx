import React from "react";
import { CareersBenefits, CareersEEO } from "@ui-component/careers";
import { mapCareersBenefits, mapCareersEEO } from "@services/mappers/careers.mapper";
import { SectionRendererProps } from "../../helper";

export default function CareersBenefitsRenderer({ section, index }: SectionRendererProps) {
  const benefitsProps = mapCareersBenefits(section);
  const eeoProps = mapCareersEEO(section);

  return (
    <React.Fragment key={`careers-benefits-${index}`}>
      <CareersBenefits {...benefitsProps} />
      {(eeoProps.statementText || eeoProps.contentHtml) && <CareersEEO {...eeoProps} />}
    </React.Fragment>
  );
}
