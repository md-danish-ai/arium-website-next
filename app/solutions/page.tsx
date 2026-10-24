import React from "react";
import type { Metadata } from "next";
import HeroBanner from "@ui-common/HeroBanner";
import GlobeCTA from "@ui-common/GlobeCTA";
import { SolutionsSmallCells, SolutionsDas, SolutionsIndustries } from "@ui-component/solutions";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapSolutionsHero,
  mapSolutionsSmallCells,
  mapSolutionsDas,
  mapSolutionsIndustries,
  mapSolutionsApproach,
} from "@services/mappers/solutions.mapper";
import { SOLUTIONS_SEO_FALLBACK } from "@data/solutions.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("solutions", SOLUTIONS_SEO_FALLBACK);
}

export default async function SolutionsPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=solutions&populate[heroMedia][populate]=*&populate[heroCtas][populate]=*&populate[sections][populate][media][populate]=*&populate[sections][populate][stats][populate]=*&populate[sections][populate][cta][populate]=*&populate[sections][populate][cards][populate][image][populate]=*"
    ),
    fetchPageWidgets("solutions"),
  ]);

  const solutionsContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    solutionsContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapSolutionsHero(solutionsContent);
  const smallCellsProps = mapSolutionsSmallCells(getSection("Small Cells"));
  const dasProps = mapSolutionsDas(getSection("Distributed Antenna Systems"));
  const industriesProps = mapSolutionsIndustries(getSection("Industries"));
  const approachProps = mapSolutionsApproach(getSection("Our Approach"));

  const hasHeroWidget = globalWidgets.some(
    (w) => w.PositionNumber === 0 && (w.Sections || []).length > 0
  );

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: hasHeroWidget,
      el: <HeroBanner key="hero-fallback" {...heroProps} />,
    },
    {
      pos: 1,
      key: "small-cells-fallback",
      skip: hasWidgetComponent(globalWidgets, ["illustration-split", "media-text-split"]),
      el: <SolutionsSmallCells key="small-cells-fallback" {...smallCellsProps} />,
    },
    {
      pos: 2,
      key: "das-fallback",
      skip: hasWidgetComponent(globalWidgets, ["illustration-split", "media-text-split"]),
      el: <SolutionsDas key="das-fallback" {...dasProps} />,
    },
    {
      pos: 3,
      key: "industries-fallback",
      skip:
        globalWidgets.some((w) => w.PositionNumber === 3) ||
        hasWidgetComponent(globalWidgets, ["industry", "industries"]),
      el: <SolutionsIndustries key="industries-fallback" {...industriesProps} />,
    },
    {
      pos: 99,
      key: "cta-fallback",
      skip: hasWidgetComponent(globalWidgets, ["cta"]),
      el: <GlobeCTA key="cta-fallback" {...approachProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
