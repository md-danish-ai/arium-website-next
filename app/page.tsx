import React from "react";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import HomeHero from "@ui-component/home/HomeHero";
import BackgroundFeatureSection from "@ui-component/home/BackgroundFeatureSection";
import DetailedCardGrid from "@ui-component/home/DetailedCardGrid";
import StatsWithImage from "@ui-component/home/StatsWithImage";
import ImageGradientSplit from "@ui-component/home/ImageGradientSplit";
import CenteredImageCTA from "@ui-common/CenteredImageCTA";
import CtaWithGraphic from "@ui-common/CtaWithGraphic";
import Particles from "@ui-animations/Particles";
import type { Metadata } from "next";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry, StrapiSectionItem } from "@types";
import {
  mapHomeHero,
  mapBackgroundFeature,
  mapInfrastructure,
  mapStatsWithImage,
  mapCommunityImpact,
  mapCareersCta,
  mapContactCta,
} from "@services/mappers/home.mapper";
import { HOME_SEO_FALLBACK } from "@data/home.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", HOME_SEO_FALLBACK);
}

export default async function Home() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=home&populate[sections][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][media][populate]=*&populate[heroMedia]=true&populate[heroCtas]=true"
    ),
    fetchPageWidgets("home"),
  ]);

  const homeContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSectionItem | undefined =>
    homeContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const heroProps = mapHomeHero(homeContent);
  const networkChallengesProps = mapBackgroundFeature(getSection("What we do"));
  const infraProps = mapInfrastructure(getSection("Our Infrastructure"));
  const statsProps = mapStatsWithImage(getSection("Scale and experience"));
  const communityProps = mapCommunityImpact(getSection("Community Impact"));
  const careersProps = mapCareersCta(getSection("Join Us"));
  const contactProps = mapContactCta(getSection("Contact Us"));

  const hasWidget = (name: string) => hasWidgetComponent(globalWidgets, name);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero",
      skip: hasWidget("main-hero"),
      el: <HomeHero key="hero" {...heroProps} />,
    },
    {
      pos: 1,
      key: "challenges",
      skip: hasWidget("background-feature") || hasWidget("backgroundfeature"),
      el: <BackgroundFeatureSection key="challenges-fallback" {...networkChallengesProps} />,
    },
    {
      pos: 2,
      key: "infra",
      skip: hasWidget("detailed-card-grid"),
      el: <DetailedCardGrid key="infra" {...infraProps} />,
    },
    {
      pos: 3,
      key: "stats",
      skip: hasWidget("stats-with-image"),
      el: <StatsWithImage key="stats" {...statsProps} />,
    },
    {
      pos: 4,
      key: "community",
      skip: hasWidget("image-gradient-split"),
      el: <ImageGradientSplit key="community" {...communityProps} />,
    },
    {
      pos: 5,
      key: "careers",
      skip: hasWidget("centered-image-cta"),
      el: (
        <CenteredImageCTA
          key="careers"
          heading={careersProps.heading}
          text={careersProps.text}
          ctaLabel={careersProps.ctaLabel}
          ctaUrl={careersProps.ctaUrl}
          bgImage={careersProps.bgImage}
        />
      ),
    },
    {
      pos: 6,
      key: "finalcta",
      skip: hasWidget("cta-with-graphic"),
      el: (
        <CtaWithGraphic
          key="finalcta"
          heading={contactProps.heading}
          description={contactProps.description}
          ctaText={contactProps.ctaText}
          ctaLink={contactProps.ctaLink}
        />
      ),
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return (
    <>
      <Particles />
      {renderedSections}
    </>
  );
}
