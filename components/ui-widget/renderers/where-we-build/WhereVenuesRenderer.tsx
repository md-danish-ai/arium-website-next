import React from "react";
import { WhereVenues } from "@ui-component/where-we-build";
import { mapWhereVenues } from "@services/mappers/where-we-build.mapper";
import { SectionRendererProps } from "../../helper";

export default function WhereVenuesRenderer({ section, index }: SectionRendererProps) {
  const props = mapWhereVenues(section);
  return <WhereVenues key={`where-venues-${index}`} {...props} />;
}
