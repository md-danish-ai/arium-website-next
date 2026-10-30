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
  PV_HERO_FALLBACK,
  PV_PROCESS_FALLBACK,
  PV_TESTIMONIALS_FALLBACK,
  PV_CTA_FALLBACK,
  PV_SEO_FALLBACK,
} from "@data/where-subpages.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("private-venues", PV_SEO_FALLBACK);
}

export default async function PrivateVenuesPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=private-venues&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard&populate[sections][populate][cta]=*"
    ),
    fetchPageWidgets("private-venues"),
  ]);

  const privateVenuesContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    privateVenuesContent?.sections?.find(
      (section) => section.key?.toLowerCase() === key.toLowerCase()
    );

  const heroProps = mapSubpageHero(privateVenuesContent, PV_HERO_FALLBACK);

  const processSection = getSection("Service delivery process");
  const processProps = mapSubpageProcess(processSection, PV_PROCESS_FALLBACK);

  const testimonialsSection = getSection("Venue operators");
  const testimonialsProps = mapSubpageTestimonials(testimonialsSection, PV_TESTIMONIALS_FALLBACK);

  const contactSection = getSection("Contact Us");
  const ctaProps = mapSubpageCta(contactSection, PV_CTA_FALLBACK);

  const hasSubPageHeroWidget = hasWidgetComponent(globalWidgets, "sub-page-hero");

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "sub-page-hero",
      skip: hasSubPageHeroWidget,
      el: <SubPageHeroBanner key="sub-page-hero" {...heroProps} />,
    },
    {
      pos: 1,
      key: "process",
      skip: hasWidgetComponent(globalWidgets, "process"),
      el: <ProcessSection key="process" {...processProps} />,
    },
    {
      pos: 2,
      key: "gloabl-testimonails",
      skip: hasWidgetComponent(globalWidgets, "gloabl-testimonails"),
      el: (
        <div key="gloabl-testimonails">
          <SharedTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 99,
      key: "global-cta",
      skip: hasWidgetComponent(globalWidgets, "global-cta"),
      el: <SubPageCTA key="global-cta" {...ctaProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
