import React from "react";
import type { Metadata } from "next";
import { SubPageHeroBanner, PeopleGlobalSection, GlobeCTA } from "@ui-common";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import { mapSubPageHero, mapPeopleMembers, mapPeopleCta } from "@services/mappers/people.mapper";
import {
  BOARD_HERO_FALLBACK,
  BOARD_MEMBERS_FALLBACK,
  BOARD_CTA_FALLBACK,
  BOARD_SEO_FALLBACK,
} from "@data/board-of-directors.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("board-of-directors", BOARD_SEO_FALLBACK);
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

  const heroProps = mapSubPageHero(boardContent, BOARD_HERO_FALLBACK);

  const directorsSection = getSection("Directors");
  const members = mapPeopleMembers(directorsSection, BOARD_MEMBERS_FALLBACK);

  const ctaSection = getSection("Leadership Meet");
  const ctaProps = mapPeopleCta(ctaSection, BOARD_CTA_FALLBACK);

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
      key: "people-global-section",
      skip: hasWidgetComponent(globalWidgets, "people-global-section"),
      el: <PeopleGlobalSection key="people-global-section" members={members} />,
    },
    {
      pos: 99,
      key: "global-cta",
      skip: hasWidgetComponent(globalWidgets, "global-cta"),
      el: <GlobeCTA key="global-cta" {...ctaProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
