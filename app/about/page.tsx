import React from "react";
import type { Metadata } from "next";
import HeroBanner from "@ui-common/HeroBanner";
import {
  AboutContentWithSideGraphic,
  AboutJourney,
  AboutStatsCards,
  AboutCommitments,
  AboutCulture,
} from "@ui-component/about";
import FlowBackground from "@ui-animations/FlowBackground";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapAboutHero,
  mapAboutStory,
  mapAboutJourney,
  mapAboutStatsCards,
  mapAboutCommitments,
  mapAboutCulture,
} from "@services/mappers/about.mapper";
import { ABOUT_SEO_FALLBACK } from "@data/about.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about", ABOUT_SEO_FALLBACK);
}

export default async function AboutPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=about&populate[heroMedia][populate]=*&populate[heroCtas][populate]=*&populate[sections][populate]=*"
    ),
    fetchPageWidgets("about"),
  ]);

  const aboutContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    aboutContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapAboutHero(aboutContent);
  const storyProps = mapAboutStory(getSection("Story"));
  const journeyProps = mapAboutJourney(getSection("Journey"));
  const trustProps = mapAboutStatsCards(getSection("Why our infrastructure"));
  const valuesProps = mapAboutCommitments(getSection("Values"));
  const cultureProps = mapAboutCulture(getSection("We're Hiring"));

  const hasHeroWidget = globalWidgets.some((w) => w.PositionNumber === 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: hasHeroWidget,
      el: (
        <HeroBanner
          key="hero-fallback"
          id="about-hero"
          title={heroProps.title}
          description={heroProps.description}
          imageSrc={heroProps.media}
          ctaText={heroProps.CTA_text || undefined}
          ctaLink={heroProps.CTA_url || undefined}
          maxWidthTitle={heroProps.max_width_title || undefined}
          maxWidthDescription={heroProps.max_width_description || undefined}
          objectPosition={heroProps.object_position || undefined}
        />
      ),
    },
    {
      pos: 1,
      key: "story-fallback",
      skip: hasWidgetComponent(globalWidgets, [
        "content-with-side-graphic",
        "contentwithsidegraphic",
      ]),
      el: <AboutContentWithSideGraphic key="story-fallback" {...storyProps} />,
    },
    {
      pos: 2,
      key: "flow-fallback",
      skip: hasWidgetComponent(globalWidgets, [
        "journey",
        "timeline",
        "stats-card",
        "statscards",
        "commitments",
        "commitment",
      ]),
      el: (
        <div key="flow-fallback" className="relative overflow-hidden -mt-px border-none">
          <FlowBackground />
          <AboutJourney {...journeyProps} />
          <AboutStatsCards {...trustProps} />
          <AboutCommitments {...valuesProps} />
        </div>
      ),
    },
    {
      pos: 3,
      key: "culture-fallback",
      skip: hasWidgetComponent(globalWidgets, [
        "culture",
        "people-global-section",
        "value-proposition",
        "pillar-highlights",
        "core-values",
        "feature-showcase",
      ]),
      el: <AboutCulture key="culture-fallback" {...cultureProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
