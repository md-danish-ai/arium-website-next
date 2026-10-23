import React from "react";
import { fetchAPI, fetchPageWidgets, GetStrapiMediaUrl } from "@lib/api";
import HomeHero from "@ui-component/home/HomeHero";
import BackgroundFeatureSection from "@ui-component/home/BackgroundFeatureSection";
import DetailedCardGrid from "@ui-component/home/DetailedCardGrid";
import StatsWithImage from "@ui-component/home/StatsWithImage";
import ImageGradientSplit from "@ui-component/home/ImageGradientSplit";
import CenteredImageCTA from "@ui-common/CenteredImageCTA";
import CtaWithGraphic from "@ui-common/CtaWithGraphic";
import Particles from "@ui-animations/Particles";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";

export const dynamic = "force-dynamic";

interface StrapiMediaItem {
  url?: string;
  width?: number;
  height?: number;
  attributes?: {
    url?: string;
    width?: number;
    height?: number;
  };
  data?: {
    attributes?: {
      url?: string;
    };
    url?: string;
  };
}

interface StrapiCTA {
  label?: string;
  url?: string;
}

interface StrapiCard {
  title?: string;
  description?: string;
  Title?: string;
  Description?: string;
  Heading?: string;
  image?: StrapiMediaItem;
}

interface StrapiStatItem {
  Number?: string;
  Description?: string;
  BgColor?: string;
  number?: string;
  description?: string;
  bgColor?: string;
}

interface StrapiSection {
  key?: string;
  title?: string;
  body?: string;
  cards?: StrapiCard[];
  cardItem?: StrapiCard[];
  stats?: StrapiStatItem[];
  media?: StrapiMediaItem | StrapiMediaItem[];
  cta?: StrapiCTA[];
  __component?: string;
}

interface StrapiWidgetSection {
  __component?: string;
  [key: string]: unknown;
}

interface StrapiWidget {
  id?: number | string;
  PositionNumber?: number;
  CustomCssClass?: string;
  Sections?: StrapiWidgetSection[];
}

interface StrapiHomePage {
  heroTitle?: string;
  heroDescription?: string;
  sections?: StrapiSection[];
  heroMedia?: StrapiMediaItem;
}

interface SectionEntry {
  pos: number;
  key: string;
  skip?: boolean;
  el: React.ReactElement;
}

function extractMediaUrl(media?: StrapiMediaItem | StrapiMediaItem[] | null): string | undefined {
  if (!media) return undefined;
  if (Array.isArray(media)) {
    return media[0]?.attributes?.url || media[0]?.url;
  }
  return media.data?.attributes?.url || media.attributes?.url || media.url;
}

function hasWidgetComponent(widgets: StrapiWidget[], componentName: string): boolean {
  return widgets.some((w) =>
    w.Sections?.some((s) => s.__component?.toLowerCase().includes(componentName.toLowerCase()))
  );
}

export default async function Home() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=home&populate[sections][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][media][populate]=*&populate[heroMedia]=true&populate[heroCtas]=true"
    ),
    fetchPageWidgets("home"),
  ]);

  const homeContent: StrapiHomePage | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const getSection = (key: string): StrapiSection | undefined =>
    homeContent?.sections?.find((section) => section.key?.toLowerCase() === key.toLowerCase());

  const networkChallengesData = getSection("What we do");
  const infraData = getSection("Our Infrastructure");
  const statsData = getSection("Scale and experience");
  const communityData = getSection("Community Impact");
  const careersData = getSection("Join Us");
  const finalCTAData = getSection("Contact Us");

  const careersMediaUrl = extractMediaUrl(careersData?.media);
  const careersBgImage = careersMediaUrl ? GetStrapiMediaUrl(careersMediaUrl) : undefined;

  const hasWidget = (name: string) => hasWidgetComponent(globalWidgets, name);

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero",
      skip: hasWidget("main-hero"),
      el: (
        <HomeHero
          key="hero"
          heading={homeContent?.heroTitle}
          description={homeContent?.heroDescription}
        />
      ),
    },
    {
      pos: 1,
      key: "challenges",
      skip: hasWidget("background-feature") || hasWidget("backgroundfeature"),
      el: (
        <BackgroundFeatureSection
          key="challenges-fallback"
          Heading={networkChallengesData?.title}
          Description={networkChallengesData?.body}
          FeatureCards={networkChallengesData?.cardItem || networkChallengesData?.cards}
          BackgroundImage={networkChallengesData?.media}
        />
      ),
    },
    {
      pos: 2,
      key: "infra",
      skip: hasWidget("detailed-card-grid"),
      el: <DetailedCardGrid key="infra" data={infraData} />,
    },
    {
      pos: 3,
      key: "stats",
      skip: hasWidget("stats-with-image"),
      el: (
        <StatsWithImage
          key="stats"
          heading={statsData?.title}
          statscards={statsData?.stats}
          image={statsData?.media}
        />
      ),
    },
    {
      pos: 4,
      key: "community",
      skip: hasWidget("image-gradient-split"),
      el: (
        <ImageGradientSplit
          key="community"
          heading={communityData?.title}
          description={communityData?.body}
          sectionPointers={communityData?.cards || communityData?.cardItem}
          bgImage={communityData?.media}
          ctaText={communityData?.cta?.[0]?.label}
          ctaUrl={communityData?.cta?.[0]?.url}
        />
      ),
    },
    {
      pos: 5,
      key: "careers",
      skip: hasWidget("centered-image-cta"),
      el: (
        <CenteredImageCTA
          key="careers"
          heading={careersData?.title || "Help us shape the future of connectivity"}
          text={
            careersData?.body ||
            "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology."
          }
          ctaLabel={careersData?.cta?.[0]?.label || "Join Us"}
          ctaUrl={careersData?.cta?.[0]?.url || "/careers"}
          bgImage={careersBgImage}
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
          heading={finalCTAData?.title || "Where can we take your network?"}
          description={
            finalCTAData?.body ||
            "Building a new network? Densifying an existing one? Looking to improve coverage in a high-traffic venue or building? Let's talk about how we can help solve your infrastructure needs."
          }
          ctaText={finalCTAData?.cta?.[0]?.label || "Contact Us"}
          ctaLink={finalCTAData?.cta?.[0]?.url || "/contact"}
        />
      ),
    },
  ];

  const widgetSections: SectionEntry[] = globalWidgets.map((widget, idx) => ({
    pos: typeof widget.PositionNumber === "number" ? widget.PositionNumber : 99,
    key: `widget-${widget.id ?? idx}`,
    el: <GlobalWidgetRenderer key={`widget-${widget.id ?? idx}`} widget={widget} />,
  }));

  const renderedSections = [...fallbackSections.filter((s) => !s.skip), ...widgetSections]
    .sort((a, b) => a.pos - b.pos)
    .map((entry) => entry.el);

  return (
    <>
      <Particles />
      {renderedSections}
    </>
  );
}
