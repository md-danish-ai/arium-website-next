import React from "react";
import type { Metadata } from "next";
import HeroBanner from "@ui-common/HeroBanner";
import { CtaWithGraphic } from "@ui-common";
import { SolutionsIllustrationSplit, SolutionsIndustries } from "@ui-component/solutions";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapSolutionsHero,
  mapSolutionsSmallCells,
  mapSolutionsDas,
  mapSolutionsIndustries,
  mapSolutionsCta,
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
  const ctaSection = getSection("A Balanced Approach") || getSection("Approach");
  const ctaProps = mapSolutionsCta(ctaSection);

  const hasHeroWidget =
    hasWidgetComponent(globalWidgets, "hero-banner") ||
    globalWidgets.some((w) => w.PositionNumber === 0 && (w.Sections || []).length > 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-banner",
      skip: hasHeroWidget,
      el: (
        <HeroBanner
          key="hero-banner"
          id="solutions-hero"
          title={heroProps.title}
          description={heroProps.description}
          imageSrc={heroProps.background_image}
          ctaText={heroProps.CTA_text || undefined}
          ctaLink={heroProps.CTA_url || undefined}
          maxWidthTitle={heroProps.max_width_title || undefined}
          maxWidthDescription={heroProps.max_width_description || undefined}
          objectPosition={heroProps.background_image_position || undefined}
        />
      ),
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
          <SolutionsIllustrationSplit {...smallCellsProps} />
          <SolutionsIllustrationSplit {...dasProps} />
        </div>
      ),
    },
    {
      pos: 3,
      key: "accordion-split",
      skip:
        globalWidgets.some((w) => w.PositionNumber === 3) ||
        hasWidgetComponent(globalWidgets, "accordion-split") ||
        hasWidgetComponent(globalWidgets, "industry"),
      el: <SolutionsIndustries key="accordion-split" {...industriesProps} />,
    },
    {
      pos: 99,
      key: "cta-with-graphic",
      skip: hasWidgetComponent(globalWidgets, "cta-with-graphic"),
      el: <CtaWithGraphic key="cta-with-graphic" {...ctaProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
