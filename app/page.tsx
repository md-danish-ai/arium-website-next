import React from "react";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import SharedMainHero from "@ui-component/home/SharedMainHero";
import BackgroundFeatureSection from "@ui-component/home/BackgroundFeatureSection";
import SharedDetailedCardGrid from "@ui-component/home/SharedDetailedCardGrid";
import SharedStatsWithImage from "@ui-component/home/SharedStatsWithImage";
import SharedImageGradientSplit from "@ui-component/home/SharedImageGradientSplit";
import SharedCenteredImageCTA from "@ui-component/common/SharedCenteredImageCTA";
import SharedCtaWithGraphic from "@ui-component/common/SharedCtaWithGraphic";
import Particles from "@ui-animations/Particles";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";

export const dynamic = "force-dynamic";


const CAREERS_CTA_DATA = {
  title: "Help us shape the future of connectivity",
  description: "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.",
  buttonText: "Join Us",
  buttonLink: "/careers"
};

const FINAL_CTA_DATA = {
  title: "Where can we take your network?",
  description: "Building a new network? Densifying an existing one? Looking to improve coverage in a high-traffic venue or building? Let's talk about how we can help solve your infrastructure needs.",
  buttonText: "Contact Us",
  buttonLink: "/contact"
};

export default async function Home() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=home&populate[sections][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][media][populate]=*&populate[heroMedia]=true&populate[heroCtas]=true"),
    fetchPageWidgets("home"),
  ]);
  const homeContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];
  const networkChallengesData = homeContent?.sections?.find((section: any) => section.key === "What we do");
  const infraData = homeContent?.sections?.find((section: any) => section.key === "Our Infrastructure");
  const statsData = homeContent?.sections?.find((section: any) => section.key === "Scale and experience");
  const communityData = homeContent?.sections?.find((section: any) => section.key === "Community Impact");
  const careersData = homeContent?.sections?.find((section: any) => section.key === "Join Us");
  const finalCTAData = homeContent?.sections?.find((section: any) => section.key === "Contact Us");

  const careersMedia = careersData?.media ? (Array.isArray(careersData.media) ? careersData.media[0]?.url : careersData.media?.data?.attributes?.url || careersData.media?.url) : null;
  const careersBgImage = careersMedia
    ? (careersMedia.startsWith('http') || careersMedia.startsWith('/') ? careersMedia : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${careersMedia}`)
    : undefined;

  const careersCTAProps = {
    title: careersData?.title || CAREERS_CTA_DATA.title,
    description: careersData?.body || CAREERS_CTA_DATA.description,
    buttonText: careersData?.cta?.[0]?.label || CAREERS_CTA_DATA.buttonText,
    buttonLink: careersData?.cta?.[0]?.url || CAREERS_CTA_DATA.buttonLink,
    backgroundImage: careersBgImage,
  };

  const finalCTAProps = {
    title: finalCTAData?.title || FINAL_CTA_DATA.title,
    description: finalCTAData?.body || FINAL_CTA_DATA.description,
    buttonText: finalCTAData?.cta?.[0]?.label || FINAL_CTA_DATA.buttonText,
    buttonLink: finalCTAData?.cta?.[0]?.url || FINAL_CTA_DATA.buttonLink,
  };

  // Fallback check: Did Strapi give us a widget that contains CTA with Graphic?
  const hasCtaWithGraphicWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('cta-with-graphic'))
  );

  // Fallback check: Did Strapi give us a widget that contains Centered Image CTA?
  const hasCenteredImageCtaWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('centered-image-cta'))
  );

  // Fallback check: Did Strapi give us a widget that contains ImageGradientSplit?
  const hasImageGradientSplitWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('image-gradient-split'))
  );

  // Fallback check: Did Strapi give us a widget that contains StatsWithImage?
  const hasStatsWithImageWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('stats-with-image'))
  );

  // Fallback check: Did Strapi give us a widget that contains DetailedCardGrid?
  const hasDetailedCardGridWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('detailed-card-grid'))
  );

  // Fallback check: Did Strapi give us a widget that contains MainHero?
  const hasMainHeroWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('main-hero'))
  );

  // Fallback check: Did Strapi give us a widget that contains Background Feature Section?
  const hasBackgroundFeatureWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('background-feature-section') || s.__component?.includes('backgroundfeaturesection'))
  );

  type SectionEntry = { pos: number; key: string; el: React.ReactElement };
  const sectionMap: SectionEntry[] = [];

  // Position 0 — Hero
  if (!hasMainHeroWidget) {
    sectionMap.push({
      pos: 0,
      key: 'hero',
      el: (
        <SharedMainHero
          key="hero"
          heading={homeContent?.heroTitle}
          description={homeContent?.heroDescription}
        />
      ),
    });
  }

  // Position 1 — Network Challenges (What we do)
  if (!hasBackgroundFeatureWidget) {
    sectionMap.push({
      pos: 1,
      key: 'challenges',
      el: (
        <BackgroundFeatureSection
          key="challenges-fallback"
          Heading={networkChallengesData?.title}
          Description={networkChallengesData?.body}
          FeatureCards={networkChallengesData?.cardItem || networkChallengesData?.cards}
          BackgroundImage={networkChallengesData?.media}
        />
      ),
    });
  }

  // Position 2 — Infrastructure panels
  if (!hasDetailedCardGridWidget) {
    sectionMap.push({ pos: 2, key: 'infra', el: <SharedDetailedCardGrid key="infra" data={infraData} /> });
  }

  // Position 3 — Stats counter
  if (!hasStatsWithImageWidget) {
    sectionMap.push({
      pos: 3,
      key: 'stats',
      el: (
        <SharedStatsWithImage
          key="stats"
          heading={statsData?.title}
          statscards={statsData?.stats}
          image={statsData?.media}
        />
      ),
    });
  }

  // Position 4 — Community section
  if (!hasImageGradientSplitWidget) {
    sectionMap.push({
      pos: 4,
      key: 'community',
      el: (
        <SharedImageGradientSplit
          key="community"
          heading={communityData?.title}
          description={communityData?.body}
          sectionPointers={communityData?.cards || communityData?.cardItem}
          bgImage={communityData?.media}
          ctaText={communityData?.cta?.[0]?.label}
          ctaUrl={communityData?.cta?.[0]?.url}
        />
      ),
    });
  }

  // Position 5 — Careers CTA
  if (!hasCenteredImageCtaWidget) {
    sectionMap.push({
      pos: 5,
      key: 'careers',
      el: (
        <SharedCenteredImageCTA
          key="careers"
          heading={careersCTAProps.title}
          text={careersCTAProps.description}
          ctaLabel={careersCTAProps.buttonText}
          ctaUrl={careersCTAProps.buttonLink}
          bgImage={careersCTAProps.backgroundImage}
        />
      ),
    });
  }

  // Position 6 — Final CTA
  if (!hasCtaWithGraphicWidget) {
    sectionMap.push({
      pos: 6,
      key: 'finalcta',
      el: (
        <SharedCtaWithGraphic
          key="finalcta"
          heading={finalCTAProps.title}
          description={finalCTAProps.description}
          ctaText={finalCTAProps.buttonText}
          ctaLink={finalCTAProps.buttonLink}
        />
      ),
    });
  }

  // Add CMS widgets using their PositionNumber field
  globalWidgets.forEach((widget: any) => {
    const pos = typeof widget.PositionNumber === 'number' ? widget.PositionNumber : 99;
    sectionMap.push({
      pos,
      key: `widget-${widget.id}`,
      el: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />,
    });
  });

  // Sort by position, then render
  const sections = sectionMap
    .sort((a, b) => a.pos - b.pos)
    .map((entry) => entry.el);

  return (
    <>
      <Particles />
      {sections}
    </>
  );
}
