import React from "react";
import type { Metadata } from "next";
import { HeroBanner, ImageGradientSplit } from "@ui-common";
import {
  AboutContentWithSideGraphic,
  AboutJourney,
  AboutStatsCards,
  AboutCommitments,
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

  const hasHeroWidget =
    hasWidgetComponent(globalWidgets, "hero-banner") ||
    globalWidgets.some((w) => w.PositionNumber === 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-banner",
      skip: hasHeroWidget,
      el: (
        <HeroBanner
          key="hero-banner"
          id="about-hero"
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
      key: "content-with-side-graphic",
      skip: hasWidgetComponent(globalWidgets, "content-with-side-graphic"),
      el: <AboutContentWithSideGraphic key="content-with-side-graphic" {...storyProps} />,
    },
    {
      pos: 2,
      key: "storyteller-flow",
      skip: hasWidgetComponent(globalWidgets, ["timeline", "stats-cards", "commitments"]),
      el: (
        <div key="storyteller-flow" className="relative overflow-hidden -mt-px border-none">
          <FlowBackground />
          <AboutJourney {...journeyProps} />
          <AboutStatsCards {...trustProps} />
          <AboutCommitments {...valuesProps} />
        </div>
      ),
    },
    {
      pos: 3,
      key: "image-gradient-split",
      skip: hasWidgetComponent(globalWidgets, "image-gradient-split"),
      el: <ImageGradientSplit key="image-gradient-split" {...cultureProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
