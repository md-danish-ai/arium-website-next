import React from "react";
import type { Metadata } from "next";
import { fetchAPI } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import HeroBanner from "@ui-common/HeroBanner";
import WhereCommunities from "@ui-component/where-we-build/WhereCommunities";
import WhereVenues from "@ui-component/where-we-build/WhereVenues";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapWhereHero,
  mapWhereCommunities,
  mapWhereVenues,
} from "@services/mappers/where-we-build.mapper";
import { WHERE_WE_BUILD_SEO_FALLBACK } from "@data/where-we-build.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("where-we-build", WHERE_WE_BUILD_SEO_FALLBACK);
}

export default async function WhereWeBuildPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=where-we-build&populate[heroMedia][populate]=*&populate[sections][populate]=*"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=where-we-build&populate[widgets][populate][Sections][populate]=*"
    ),
  ]);

  const whereContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    whereContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapWhereHero(whereContent);
  const communitiesProps = mapWhereCommunities(getSection("Communities"));
  const venuesProps = mapWhereVenues(getSection("Buildings and Venues"));

  const hasImageSplitWidgets = hasWidgetComponent(globalWidgets, "image-split");

  const hasHeroWidget = globalWidgets.some((w) => w.PositionNumber === 0);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero",
      skip: hasHeroWidget,
      el: <HeroBanner key="hero-fallback" {...heroProps} />,
    },
    {
      pos: 1,
      key: "communities",
      skip: hasImageSplitWidgets,
      el: <WhereCommunities key="communities" {...communitiesProps} />,
    },
    {
      pos: 2,
      key: "venues",
      skip: hasImageSplitWidgets,
      el: <WhereVenues key="venues" {...venuesProps} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
