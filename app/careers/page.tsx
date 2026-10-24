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
import { GetStrapiMediaUrl, combinePageSections, hasWidgetComponent } from "@utils";
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
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=careers&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || CAREERS_SEO_FALLBACK.title,
    description: seo?.metaDescription || CAREERS_SEO_FALLBACK.description,
    openGraph: {
      title: seo?.ogTitle || CAREERS_SEO_FALLBACK.title,
      description: seo?.ogDescription || CAREERS_SEO_FALLBACK.description,
      type: (seo?.ogType as "website") || "website",
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

  const hasHeroWidget = globalWidgets.some((w) => w.PositionNumber === 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: hasHeroWidget,
      el: <HeroBanner key="hero-fallback" {...heroProps} />,
    },
    {
      pos: 1,
      key: "culture-fallback",
      skip: hasWidgetComponent(globalWidgets, ["accordion"]),
      el: <CareersCultureAccordion key="culture-fallback" {...cultureProps} />,
    },
    {
      pos: 2,
      key: "testimonials-fallback",
      skip: hasWidgetComponent(globalWidgets, ["testimonial", "testimonail"]),
      el: (
        <div key="testimonials-fallback" className="row-storyteller-flow">
          <CareersTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 3,
      key: "jobareas-fallback",
      skip: hasWidgetComponent(globalWidgets, ["highlight-list"]),
      el: (
        <div key="jobareas-fallback" className="row-storyteller-flow">
          <CareersJobAreas {...jobAreasProps} />
        </div>
      ),
    },
    {
      pos: 4,
      key: "benefits-fallback",
      skip: hasWidgetComponent(globalWidgets, ["benefits"]),
      el: (
        <div key="benefits-fallback" className="bg-[#ededee]" style={{ background: "#ededee" }}>
          <CareersBenefits {...benefitsProps} />
        </div>
      ),
    },
    {
      pos: 5,
      key: "eeo-fallback",
      skip: hasWidgetComponent(globalWidgets, ["benefits"]),
      el: <CareersEEO key="eeo-fallback" {...eeoProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
