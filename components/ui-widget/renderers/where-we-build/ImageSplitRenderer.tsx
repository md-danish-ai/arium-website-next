import React from "react";
import { WhereCommunities, WhereVenues } from "@ui-component/where-we-build";
import { SectionRendererProps } from "../../helper";

export default function ImageSplitRenderer({
  section: {
    title,
    title_color,
    description,
    description_color,
    image,
    image_alignment,
    background_color,
    CTA_text,
    CTA_url,
  },
  index,
}: SectionRendererProps) {
  const isVenues =
    image_alignment === "Left" ||
    (typeof title === "string" &&
      (title.toLowerCase().includes("venue") || title.toLowerCase().includes("building")));

  const props = {
    title,
    title_color,
    description,
    description_color,
    image,
    image_alignment: image_alignment || (isVenues ? "Left" : "Right"),
    background_color,
    CTA_text,
    CTA_url,
  };

  if (isVenues) {
    return <WhereVenues key={`where-venues-${index}`} {...props} />;
  }

  return <WhereCommunities key={`where-communities-${index}`} {...props} />;
}
