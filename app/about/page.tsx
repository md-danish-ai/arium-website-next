import React from "react";
import type { Metadata } from "next";
import HeroBanner from "@ui-common/HeroBanner";
import {
  AboutContentWithSideGraphic,
  AboutJourney,
  AboutStatsCards,
  AboutCommitments,
  AboutCulture,
  AboutPageContent,
  AboutSection,
  AboutWidget,
  AboutSectionEntry,
  AboutSeoFields,
} from "@ui-component/about";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import FlowBackground from "@ui-animations/FlowBackground";
import { fetchAPI, fetchPageWidgets, GetStrapiMediaUrl } from "@lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=about&populate[SeoFields][populate]=*"
  );
  const seo: AboutSeoFields | undefined = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "About Us | A story rooted in connection",
    description:
      seo?.metaDescription ||
      "Arium Networks builds the small cell and DAS networks that power your most important connections.",
    openGraph: {
      title: seo?.ogTitle || "About Us | A story rooted in connection",
      description:
        seo?.ogDescription ||
        "Arium Networks builds the small cell and DAS networks that power your most important connections.",
      type: seo?.ogType === "article" ? "article" : "website",
      siteName: seo?.ogSiteName || "Arium Networks",
      ...(seo?.ogImage?.url && {
        images: [
          {
            url: GetStrapiMediaUrl(seo.ogImage.url),
          },
        ],
      }),
    },
    robots: {
      index: !seo?.preventIndexing,
      follow: !seo?.preventIndexing,
    },
  };
}

function hasWidgetComponent(widgets: AboutWidget[], componentNames: string[]): boolean {
  return widgets.some((w) =>
    w.Sections?.some((s) => {
      const comp = s.__component?.toLowerCase() || "";
      return componentNames.some((name) => comp.includes(name.toLowerCase()));
    })
  );
}

export default async function AboutPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=about&populate[heroMedia][populate]=*&populate[heroCtas][populate]=*&populate[sections][populate]=*"
    ),
    fetchPageWidgets("about"),
  ]);

  const aboutContent: AboutPageContent | undefined = pageData?.data?.[0];
  const globalWidgets: AboutWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): AboutSection | undefined =>
    aboutContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const storyData = getSection("Story");
  const journeyData = getSection("Journey");
  const trustData = getSection("Why our infrastructure");
  const valuesData = getSection("Values");
  const cultureData = getSection("We're Hiring");

  const heroMediaUrl = aboutContent?.heroMedia?.[0]?.url;
  const heroImageSrc = heroMediaUrl
    ? GetStrapiMediaUrl(heroMediaUrl)
    : "/assets/images/hero-about.png";

  const fallbackSections: AboutSectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: globalWidgets.some((w) => w.PositionNumber === 0),
      el: (
        <HeroBanner
          key="hero-fallback"
          id="about-hero"
          imageSrc={heroImageSrc}
          imageAlt={aboutContent?.heroMedia?.[0]?.alternativeText || "Chicago skyline"}
          heading={aboutContent?.heroTitle || "Building a more connected future"}
          intro={
            aboutContent?.heroDescription ||
            "We're working across the country to build the infrastructure that powers your most important connections."
          }
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
      el: <AboutContentWithSideGraphic key="story-fallback" data={storyData} />,
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
        <div
          key="flow-fallback"
          className="about-storyteller-flow relative overflow-hidden -mt-px border-none"
        >
          <FlowBackground />
          <AboutJourney data={journeyData} />
          <AboutStatsCards data={trustData} />
          <AboutCommitments data={valuesData} />
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
      el: <AboutCulture key="culture-fallback" data={cultureData} />,
    },
  ];

  const widgetSections: AboutSectionEntry[] = globalWidgets.map((widget, idx) => ({
    pos: typeof widget.PositionNumber === "number" ? widget.PositionNumber : 99,
    key: `widget-${widget.id ?? idx}`,
    el: <GlobalWidgetRenderer key={`widget-${widget.id ?? idx}`} widget={widget} />,
  }));

  const renderedSections = [...fallbackSections.filter((s) => !s.skip), ...widgetSections]
    .sort((a, b) => a.pos - b.pos)
    .map((entry) => entry.el);

  return <>{renderedSections}</>;
}
