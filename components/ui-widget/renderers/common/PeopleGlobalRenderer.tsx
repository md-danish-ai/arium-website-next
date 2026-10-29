import React from "react";
import { PeopleGlobalSection } from "@ui-common";
import { mapPeopleMembers } from "@services/mappers/people.mapper";
import { LEADERSHIP_MEMBERS_FALLBACK } from "@data/leadership.data";
import { SectionRendererProps } from "../../helper";

export default function PeopleGlobalRenderer({ section, index }: SectionRendererProps) {
  const members = mapPeopleMembers(section, LEADERSHIP_MEMBERS_FALLBACK);
  const background_gradient = (section?.background_gradient as string) || undefined;
  return (
    <PeopleGlobalSection
      key={`people-${index}`}
      members={members}
      background_gradient={background_gradient}
    />
  );
}
