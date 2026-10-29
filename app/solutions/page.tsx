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
import FlowBackground from "@ui-animations/FlowBackground";
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

  const hasHeroWidget =
    hasWidgetComponent(globalWidgets, "hero-banner") ||
    globalWidgets.some((w) => w.PositionNumber === 0 && (w.Sections || []).length > 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-banner",
      skip: hasHeroWidget,
      el: <HeroBanner key="hero-banner" {...heroProps} />,
    },
    {
      pos: 1,
      key: "illustration-split",
      skip: hasWidgetComponent(globalWidgets, "illustration-split"),
      el: (
        <div
          key="illustration-split"
          className="bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#f5f0ff_40%,#ebe2ff_75%,#dfd4ff_100%)] relative overflow-hidden -mt-px border-none"
        >
          <FlowBackground />
          <SolutionsSmallCells {...smallCellsProps} />
          <SolutionsDas {...dasProps} />
        </div>
      ),
    },
    {
      pos: 3,
      key: "industry",
      skip:
        globalWidgets.some((w) => w.PositionNumber === 3) ||
        hasWidgetComponent(globalWidgets, "industry"),
      el: <SolutionsIndustries key="industry" {...industriesProps} />,
    },
    {
      pos: 99,
      key: "global-cta",
      skip: hasWidgetComponent(globalWidgets, "global-cta"),
      el: <GlobeCTA key="global-cta" {...approachProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
