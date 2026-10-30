import React from "react";
import type { Metadata } from "next";
import { SubPageHeroBanner, SharedTestimonials, ProcessSection, SubPageCTA } from "@ui-common";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapSubpageHero,
  mapSubpageProcess,
  mapSubpageTestimonials,
  mapSubpageCta,
} from "@services/mappers/subpages.mapper";
import {
  ROW_HERO_FALLBACK,
  ROW_PROCESS_FALLBACK,
  ROW_TESTIMONIALS_FALLBACK,
  ROW_CTA_FALLBACK,
  ROW_SEO_FALLBACK,
} from "@data/where-subpages.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("right-of-ways", ROW_SEO_FALLBACK);
}

export default async function RightOfWayPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=right-of-ways&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard&populate[sections][populate][cta]=*"
    ),
    fetchPageWidgets("right-of-ways"),
  ]);

  const rightOfWayContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    rightOfWayContent?.sections?.find(
      (section) => section.key?.toLowerCase() === key.toLowerCase()
    );

  const heroProps = mapSubpageHero(rightOfWayContent, ROW_HERO_FALLBACK);

  const processSection = getSection("Structured process");
  const processProps = mapSubpageProcess(processSection, ROW_PROCESS_FALLBACK);

  const feedbackSection = getSection("Feedback");
  const testimonialsProps = mapSubpageTestimonials(feedbackSection, ROW_TESTIMONIALS_FALLBACK);

  const contactSection = getSection("Contact Us");
  const ctaProps = mapSubpageCta(contactSection, ROW_CTA_FALLBACK);

  const hasSubPageHeroWidget = hasWidgetComponent(globalWidgets, "sub-page-hero");

  const fallbackSections: SectionEntry[] = [
    {
      pos: 1,
      key: "sub-page-hero",
      skip: hasSubPageHeroWidget,
      el: <SubPageHeroBanner key="sub-page-hero" {...heroProps} />,
    },
    {
      pos: 2,
      key: "process",
      skip: hasWidgetComponent(globalWidgets, "process"),
      el: <ProcessSection key="process" {...processProps} />,
    },
    {
      pos: 3,
      key: "gloabl-testimonails",
      skip: hasWidgetComponent(globalWidgets, "gloabl-testimonails"),
      el: (
        <div key="gloabl-testimonails">
          <SharedTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 4,
      key: "global-cta",
      skip: hasWidgetComponent(globalWidgets, "global-cta"),
      el: <SubPageCTA key="global-cta" {...ctaProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
