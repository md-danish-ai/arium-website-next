import React from "react";
import LeadershipHero from "../../components/sections/leadership/LeadershipHero";
import GlobeCTA from "../../components/sections/shared/GlobeCTA";
import PageAnimations from "../../components/animations/PageAnimations";
import GlobalWidgetRenderer from "../../components/shared/GlobalWidgetRenderer";
import { fetchAPI } from "../../lib/api";

export const dynamic = "force-dynamic";


import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=leadership&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Leadership | Arium Networks",
    description: seo?.metaDescription || "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
    openGraph: {
      title: seo?.ogTitle || "Leadership | Arium Networks",
      description: seo?.ogDescription || "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
      type: (seo?.ogType as any) || "website",
      siteName: seo?.ogSiteName || "Arium Networks",
      ...(seo?.ogImage?.url && {
        images: [
          {
            url: seo.ogImage.url.startsWith("http")
              ? seo.ogImage.url
              : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${seo.ogImage.url}`,
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

export default async function LeadershipPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=leadership&populate[heroCtas]=*&populate[sections][populate][cards][populate][InnerCard][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][cta]=*"),
    fetchAPI("/api/pages?filters[slug][$eq]=leadership&populate[widgets][populate][Sections][populate]=*&populate[widgets][populate][Sections][on][shared.people-global-section][populate][Peoplecard][populate]=*&populate[widgets][populate][Sections][on][shared.global-cta][populate]=*&populate[widgets][populate][Sections][on][shared.inner-page-hero][populate]=*"),
  ]);
  const leadershipContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];

  const ctaSection = leadershipContent?.sections?.find((section: any) => section.key === "Explore Careers");
  const cta = ctaSection?.cta?.[0];


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
  const hasInnerHeroWidget = globalWidgets.some((w: any) => 
    w.Sections?.some((s: any) => s.__component === 'shared.inner-page-hero')
  );
  if (!hasInnerHeroWidget) {
    sectionMap.push({
      pos: 0,
      key: 'hero-fallback',
      el: <LeadershipHero key="hero" heading={leadershipContent?.heroTitle} intro={leadershipContent?.heroDescription} />
    });
  }

  const hasCtaWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('cta') || s.__component?.includes('calltoaction') || s.__component?.includes('call-to-action'))
  );
  if (!hasCtaWidget) {
    sectionMap.push({
      pos: 99,
      key: 'cta-fallback',
      el: (
        <GlobeCTA
          key="cta-fallback"
          title={ctaSection?.title || "Interested in joining a team of industry leaders building the future of connectivity?"}
          buttonText={cta?.label || "Explore Careers"}
          buttonLink={cta?.url || "/careers"}
        />
      )
    });
  }

  // 3. Sort by pos and extract elements
  const sections = sectionMap.sort((a, b) => a.pos - b.pos).map(s => s.el);

  return (
    <main id="main-content" className="leadership-page">
      <PageAnimations />
      {sections}
    </main>
  );
}
