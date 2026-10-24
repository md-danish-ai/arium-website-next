import React from "react";
import type { Metadata } from "next";
import PrivateVenuesHero from "@ui-component/where-we-build/PrivateVenuesHero";
import PrivateVenuesTestimonials from "@ui-component/where-we-build/PrivateVenuesTestimonials";
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

  const processSection =
    getSection("Service delivery process") ||
    getSection("Structured process") ||
    getSection("Process");
  const processProps = mapSubpageProcess(processSection, PV_PROCESS_FALLBACK);

  const testimonialsSection =
    getSection("Venue operators") || getSection("Feedback") || getSection("Testimonials");
  const testimonialsProps = mapSubpageTestimonials(testimonialsSection, PV_TESTIMONIALS_FALLBACK);

  const contactSection = getSection("Contact Us") || getSection("CTA");
  const ctaProps = mapSubpageCta(contactSection, PV_CTA_FALLBACK);

  const hasInnerHeroWidget = globalWidgets.some((w) =>
    w.Sections?.some((s) => s.__component === "shared.inner-page-hero")
  );

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: hasInnerHeroWidget,
      el: <PrivateVenuesHero key="hero-fallback" {...heroProps} />,
    },
    {
      pos: 1,
      key: "process-fallback",
      skip: hasWidgetComponent(globalWidgets, ["process"]),
      el: <ProcessSection key="process-fallback" {...processProps} />,
    },
    {
      pos: 2,
      key: "testimonials-fallback",
      skip: hasWidgetComponent(globalWidgets, ["testimonial", "testimonail"]),
      el: (
        <div key="testimonials-fallback" className="row-storyteller-flow">
          <PrivateVenuesTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 99,
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
