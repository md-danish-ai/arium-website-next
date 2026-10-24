import React from "react";
import type { Metadata } from "next";
import RightOfWayHero from "@ui-component/where-we-build/RightOfWayHero";
import RightOfWayTestimonials from "@ui-component/where-we-build/RightOfWayTestimonials";
import { ProcessSection, GlobeCTA } from "@ui-common";
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

  const processSection = getSection("Structured process") || getSection("Process");
  const processProps = mapSubpageProcess(processSection, ROW_PROCESS_FALLBACK);

  const feedbackSection = getSection("Feedback") || getSection("Testimonials");
  const testimonialsProps = mapSubpageTestimonials(feedbackSection, ROW_TESTIMONIALS_FALLBACK);

  const contactSection = getSection("Contact Us") || getSection("CTA");
  const ctaProps = mapSubpageCta(contactSection, ROW_CTA_FALLBACK);

  const hasInnerHeroWidget = globalWidgets.some((w) =>
    w.Sections?.some((s) => s.__component === "shared.inner-page-hero")
  );

  const fallbackSections: SectionEntry[] = [
    {
      pos: 1,
      key: "hero-fallback",
      skip: hasInnerHeroWidget,
      el: <RightOfWayHero key="hero-fallback" {...heroProps} />,
    },
    {
      pos: 2,
      key: "process-fallback",
      skip: hasWidgetComponent(globalWidgets, ["process"]),
      el: <ProcessSection key="process-fallback" {...processProps} />,
    },
    {
      pos: 3,
      key: "testimonials-fallback",
      skip: hasWidgetComponent(globalWidgets, ["testimonial", "testimonail"]),
      el: (
        <div key="testimonials-fallback" className="row-storyteller-flow">
          <RightOfWayTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 4,
      key: "cta-fallback",
      skip: hasWidgetComponent(globalWidgets, ["cta", "calltoaction", "call-to-action"]),
      el: (
        <GlobeCTA
          key="cta-fallback"
          title={ctaProps.title}
          buttonText={ctaProps.buttonText}
          buttonLink={ctaProps.buttonLink}
        />
      ),
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
