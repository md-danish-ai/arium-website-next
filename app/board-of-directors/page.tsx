import React from "react";
import type { Metadata } from "next";
import { InnerPageHero, PeopleGlobalSection, GlobeCTA } from "@ui-common";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { GetStrapiMediaUrl, combinePageSections, hasWidgetComponent } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import { mapInnerHero, mapPeopleMembers, mapPeopleCta } from "@services/mappers/people.mapper";
import {
  BOARD_HERO_FALLBACK,
  BOARD_MEMBERS_FALLBACK,
  BOARD_CTA_FALLBACK,
  BOARD_SEO_FALLBACK,
} from "@data/board-of-directors.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=board-of-directors&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || BOARD_SEO_FALLBACK.title,
    description: seo?.metaDescription || BOARD_SEO_FALLBACK.description,
    openGraph: {
      title: seo?.ogTitle || BOARD_SEO_FALLBACK.title,
      description: seo?.ogDescription || BOARD_SEO_FALLBACK.description,
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

export default async function BoardOfDirectorsPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=board-of-directors&populate[heroCtas]=*&populate[sections][populate][cards][populate][InnerCard][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][cta]=*"
    ),
    fetchPageWidgets("board-of-directors"),
  ]);

  const boardContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    boardContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapInnerHero(boardContent, BOARD_HERO_FALLBACK);

  const directorsSection =
    getSection("Directors") ||
    getSection("Board of Directors") ||
    getSection("Board Members") ||
    getSection("Board");
  const members = mapPeopleMembers(directorsSection, BOARD_MEMBERS_FALLBACK);

  const ctaSection = getSection("Leadership Meet") || getSection("CTA") || getSection("Leadership");
  const ctaProps = mapPeopleCta(ctaSection, BOARD_CTA_FALLBACK);

  const hasInnerHeroWidget = globalWidgets.some((w) =>
    w.Sections?.some((s) => s.__component === "shared.inner-page-hero")
  );

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: hasInnerHeroWidget,
      el: <InnerPageHero key="hero-fallback" {...heroProps} />,
    },
    {
      pos: 1,
      key: "team-fallback",
      skip: hasWidgetComponent(globalWidgets, ["people-global-section", "people"]),
      el: <PeopleGlobalSection key="team-fallback" members={members} />,
    },
    {
      pos: 99,
      key: "cta-fallback",
      skip: hasWidgetComponent(globalWidgets, ["cta", "calltoaction", "call-to-action"]),
      el: <GlobeCTA key="cta-fallback" {...ctaProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
