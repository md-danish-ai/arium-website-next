import React from "react";
import SharedHero from "@ui-common/SharedHero";
import SharedContentWithSideGraphic from "@ui-component/about/SharedContentWithSideGraphic";
import SharedJourney from "@ui-component/about/SharedJourney";
import SharedStatsCards from "@ui-component/about/SharedStatsCards";
import SharedCommitments from "@ui-component/about/SharedCommitments";
import SharedCulture from "@ui-component/about/SharedCulture";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import { fetchAPI, GetStrapiMediaUrl } from "@lib/api";

export const dynamic = "force-dynamic";


import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=about&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "About Us | A story rooted in connection",
    description: seo?.metaDescription || "Arium Networks builds the small cell and DAS networks that power your most important connections.",
    openGraph: {
      title: seo?.ogTitle || "About Us | A story rooted in connection",
      description: seo?.ogDescription || "Arium Networks builds the small cell and DAS networks that power your most important connections.",
      type: (seo?.ogType as any) || "website",
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

export default async function AboutPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=about&populate[heroMedia][populate]=*&populate[heroCtas][populate]=*&populate[sections][populate]=*"),
    fetchAPI("/api/pages?filters[slug][$eq]=about&populate[widgets][populate][Sections][populate]=*"),
  ]);
  const aboutContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];
  const storyData = aboutContent?.sections?.find((section: any) => section.key === "Story");
  const journeyData = aboutContent?.sections?.find((section: any) => section.key === "Journey");
  const trustData = aboutContent?.sections?.find((section: any) => section.key === "Why our infrastructure");
  const valuesData = aboutContent?.sections?.find((section: any) => section.key === "Values");
  const cultureData = aboutContent?.sections?.find((section: any) => section.key === "We're Hiring");

  const sectionMap: { pos: number, key: string, el: React.ReactElement }[] = [];

  // 1. Add all dynamic global widgets at their precise positions
  globalWidgets.forEach((widget: any) => {
    sectionMap.push({
      pos: widget.PositionNumber ?? 999,
      key: `widget-${widget.id}`,
      el: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />
    });
  });

  // 2. Add fallbacks for missing positions/widgets
  const hasHeroWidget = globalWidgets.some((w: any) => w.PositionNumber === 0);
  if (!hasHeroWidget) {
    sectionMap.push({
      pos: 0,
      key: 'hero-fallback',
      el: (
        <SharedHero
          key="hero-fallback"
          id="about-hero"
          imageSrc={aboutContent?.heroMedia?.[0]?.url || "/assets/images/hero-about.png"}
          imageAlt={aboutContent?.heroMedia?.[0]?.alternativeText || "Chicago skyline"}
          heading={aboutContent?.heroTitle || "Building a more connected future"}
          intro={aboutContent?.heroDescription || "We're working across the country to build the infrastructure that powers your most important connections."}
        />
      )
    });
  }

  const hasStoryWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('content-with-side-graphic') || s.__component?.includes('contentwithsidegraphic'))
  );
  if (!hasStoryWidget) {
    sectionMap.push({
      pos: 1,
      key: 'story-fallback',
      el: <SharedContentWithSideGraphic key="story-fallback" data={storyData} />
    });
  }

  const hasStorytellerWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) =>
      s.__component?.includes('journey') ||
      s.__component?.includes('timeline') ||
      s.__component?.includes('stats-card') ||
      s.__component?.includes('statscards') ||
      s.__component?.includes('commitments') ||
      s.__component?.includes('commitment')
    )
  );
  if (!hasStorytellerWidget) {
    sectionMap.push({
      pos: 2,
      key: 'flow-fallback',
      el: (
        <div key="flow-fallback" className="about-storyteller-flow -mt-px border-none">
          <div className="flow-bg-gradient flow-bg-1" aria-hidden="true"></div>
          <div className="flow-bg-gradient flow-bg-2" aria-hidden="true"></div>
          <div className="flow-bg-gradient flow-bg-3" aria-hidden="true"></div>
          <SharedJourney data={journeyData} />
          <SharedStatsCards data={trustData} />
          <SharedCommitments data={valuesData} />
        </div>
      )
    });
  }

  const hasCultureWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) =>
      s.__component?.includes('culture') ||
      s.__component?.includes('people-global-section') ||
      s.__component?.includes('value-proposition') ||
      s.__component?.includes('pillar-highlights') ||
      s.__component?.includes('core-values') ||
      s.__component?.includes('feature-showcase')
    )
  );
  if (!hasCultureWidget) {
    sectionMap.push({
      pos: 3,
      key: 'culture-fallback',
      el: <SharedCulture key="culture-fallback" data={cultureData} />
    });
  }

  // 3. Sort by pos and extract elements
  const sections = sectionMap.sort((a, b) => a.pos - b.pos).map(s => s.el);

  return <>{sections}</>;
}

