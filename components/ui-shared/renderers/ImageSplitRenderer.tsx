import React from "react";
import { SharedImageSplit } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function ImageSplitRenderer({ section, index }: SectionRendererProps) {
  return (
    <SharedImageSplit
      key={`image-split-${index}`}
      data={section}
    />
  );
}
