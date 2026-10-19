import React from "react";
import { PeopleGlobalSection } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function PeopleGlobalRenderer({ section, index }: SectionRendererProps) {
  return (
    <PeopleGlobalSection
      key={`people-${index}`}
      cards={section.Peoplecard || section.peoplecard || []}
    />
  );
}
