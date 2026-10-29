import React from "react";
import type { Metadata } from "next";
import HeroBanner from "@ui-common/HeroBanner";
import {
  CareersCultureAccordion,
  CareersTestimonials,
  CareersJobAreas,
  CareersBenefits,
  CareersEEO,
} from "@ui-component/careers";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapCareersHero,
  mapCareersCulture,
  mapCareersTestimonials,
  mapCareersJobAreas,
  mapCareersBenefits,
  mapCareersEEO,
} from "@services/mappers/careers.mapper";
import { CAREERS_SEO_FALLBACK } from "@data/careers.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("careers", CAREERS_SEO_FALLBACK);
}

export default async function CareersPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=careers&populate[heroMedia][populate]=*&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard"
    ),
    fetchPageWidgets("careers"),
  ]);

  const careersContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    careersContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapCareersHero(careersContent);
  const cultureProps = mapCareersCulture(
    careersContent,
    getSection("Why Join"),
    getSection("Pillars")
  );
  const testimonialsProps = mapCareersTestimonials(getSection("Arium Networks Team"));
  const jobAreasProps = mapCareersJobAreas(getSection("Job Areas"));
  const benefitsProps = mapCareersBenefits(getSection("Benefits"));
  const eeoProps = mapCareersEEO(getSection("Message"));

  const hasHeroWidget =
    hasWidgetComponent(globalWidgets, "hero-banner") ||
    globalWidgets.some((w) => w.PositionNumber === 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-banner",
      skip: hasHeroWidget,
      el: <HeroBanner key="hero-banner" {...heroProps} ctaColor="secondary" ctaVariant="filled" />,
    },
    {
      pos: 1,
      key: "accordion-split",
      skip: hasWidgetComponent(globalWidgets, "accordion-split"),
      el: <CareersCultureAccordion key="accordion-split" {...cultureProps} />,
    },
    {
      pos: 2,
      key: "gloabl-testimonails",
      skip: hasWidgetComponent(globalWidgets, "gloabl-testimonails"),
      el: (
        <div key="gloabl-testimonails">
          <CareersTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 3,
      key: "highlight-list",
      skip: hasWidgetComponent(globalWidgets, "highlight-list"),
      el: (
        <div key="highlight-list">
          <CareersJobAreas {...jobAreasProps} />
        </div>
      ),
    },
    {
      pos: 4,
      key: "benefits",
      skip: hasWidgetComponent(globalWidgets, "benefits"),
      el: <CareersBenefits key="benefits" {...benefitsProps} />,
    },
    {
      pos: 5,
      key: "eeo",
      skip: hasWidgetComponent(globalWidgets, "benefits"),
      el: <CareersEEO key="eeo" {...eeoProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
