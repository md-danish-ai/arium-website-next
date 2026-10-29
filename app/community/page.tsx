import React from "react";
import type { Metadata } from "next";
import HeroBanner from "@ui-common/HeroBanner";
import ImageCardGrid from "@ui-common/ImageCardGrid";
import {
  CommunitySmallCells,
  CommunityHowWeWork,
  CommunityTestimonials,
  CommunityFAQ,
} from "@ui-component/community";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapCommunityHero,
  mapCommunitySmallCells,
  mapCommunityBenefits,
  mapCommunityHowWeWork,
  mapCommunityTestimonials,
  mapCommunityFaqs,
} from "@services/mappers/community.mapper";
import { COMMUNITY_SEO_FALLBACK } from "@data/community.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("community", COMMUNITY_SEO_FALLBACK);
}

export default async function YourCommunityPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=community&populate[sections][populate]=*"),
    fetchPageWidgets("community"),
  ]);

  const communityContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    communityContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapCommunityHero(communityContent);
  const smallCellProps = mapCommunitySmallCells(getSection("Small cell"));
  const benefitsProps = mapCommunityBenefits(getSection("Small cells matter"));
  const howWeWorkProps = mapCommunityHowWeWork(getSection("How we work"));
  const testimonialsProps = mapCommunityTestimonials(getSection("Communities support"));
  const faqProps = mapCommunityFaqs(getSection("FAQ"));

  const hasHeroWidget =
    hasWidgetComponent(globalWidgets, "hero-banner") ||
    globalWidgets.some((w) => w.PositionNumber === 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-banner",
      skip: hasHeroWidget,
      el: <HeroBanner key="hero-banner" {...heroProps} />,
    },
    {
      pos: 1,
      key: "illustration-split",
      skip: hasWidgetComponent(globalWidgets, "illustration-split"),
      el: <CommunitySmallCells key="illustration-split" {...smallCellProps} />,
    },
    {
      pos: 2,
      key: "image-card-grid",
      skip: hasWidgetComponent(globalWidgets, "image-card-grid"),
      el: <ImageCardGrid key="image-card-grid" {...benefitsProps} />,
    },
    {
      pos: 3,
      key: "background-feature-section",
      skip: hasWidgetComponent(globalWidgets, "background-feature-section"),
      el: <CommunityHowWeWork key="background-feature-section" {...howWeWorkProps} />,
    },
    {
      pos: 4,
      key: "gloabl-testimonails",
      skip: hasWidgetComponent(globalWidgets, "gloabl-testimonails"),
      el: (
        <div key="gloabl-testimonails">
          <CommunityTestimonials {...testimonialsProps} />
        </div>
      ),
    },
    {
      pos: 5,
      key: "faq",
      skip: hasWidgetComponent(globalWidgets, "faq"),
      el: <CommunityFAQ key="faq" {...faqProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
