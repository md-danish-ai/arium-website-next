import React from "react";
import { CareersJobAreas } from "@ui-component/careers";
import { mapCareersJobAreas } from "@services/mappers/careers.mapper";
import { SectionRendererProps } from "../../helper";

export default function CareersJobAreasRenderer({ section, index }: SectionRendererProps) {
  const props = mapCareersJobAreas(section);
  return (
    <div key={`careers-jobareas-${index}`}>
      <CareersJobAreas {...props} />
    </div>
  );
}
