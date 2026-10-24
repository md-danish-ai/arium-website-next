import React from "react";
import { ImageSplit } from "@ui-common";
import { SectionRendererProps } from "./helper";

export default function ImageSplitRenderer({ section, index }: SectionRendererProps) {
  return <ImageSplit key={`image-split-${index}`} data={section} />;
}
