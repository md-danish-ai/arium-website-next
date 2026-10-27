import React from "react";
import { WhereCommunities, WhereVenues } from "@ui-component/where-we-build";
import { mapWhereCommunities, mapWhereVenues } from "@services/mappers/where-we-build.mapper";
import { SectionRendererProps } from "../../helper";

export default function ImageSplitRenderer({ section, index }: SectionRendererProps) {
  const heading = (
    section.Heading ||
    section.heading ||
    section.title ||
    section.Title ||
    ""
  ).toLowerCase();

  const alignment = (
    section.ImageAlignment ||
    section.imageAlignment ||
    section.mediaAlignment ||
    section.MediaAlignment ||
    ""
  ).toLowerCase();

  const bgGradient = (section.BgGradient || section.bgGradient || "").toLowerCase();

  // If alignment is Left, or heading mentions venues/buildings, or gradient is blue/teal:
  // Render Buildings and Venues (Image on LEFT, Text on RIGHT, Teal/Blue background)
  const isVenues =
    alignment === "left" ||
    alignment === "media left" ||
    heading.includes("venue") ||
    heading.includes("building") ||
    bgGradient.includes("bcf6f2") ||
    bgGradient.includes("e4faf8") ||
    bgGradient.includes("teal");

  if (isVenues) {
    const props = mapWhereVenues(section);
    return <WhereVenues key={`where-venues-${index}`} {...props} />;
  }

  // Otherwise, render Communities (Image on RIGHT, Text on LEFT, Peach/Orange background)
  const props = mapWhereCommunities(section);
  return <WhereCommunities key={`where-communities-${index}`} {...props} />;
}
