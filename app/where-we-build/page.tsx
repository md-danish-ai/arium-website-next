import React from "react";
import SharedHero from "../../components/sections/shared/SharedHero";
import WhereCommunities from "../../components/sections/where-we-build/WhereCommunities";
import WhereVenues from "../../components/sections/where-we-build/WhereVenues";
import PageAnimations from "../../components/animations/PageAnimations";
import GlobalWidgetRenderer from "../../components/shared/GlobalWidgetRenderer";

export const dynamic = "force-dynamic";


import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=where-we-build&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Where We Build | Arium Networks",
    description: seo?.metaDescription || "Discover how our small cell and DAS networks enable the wireless coverage and capacity needed in the public right of way and in buildings and venues.",
    openGraph: {
      title: seo?.ogTitle || "Where We Build | Arium Networks",
      description: seo?.ogDescription || "Discover how our small cell and DAS networks enable the wireless coverage and capacity needed in the public right of way and in buildings and venues.",
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

import { fetchAPI } from "../../lib/api";

export default async function WhereWeBuildPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=where-we-build&populate[heroMedia][populate]=*&populate[sections][populate]=*"),
    fetchAPI("/api/pages?filters[slug][$eq]=where-we-build&populate[widgets][populate][Sections][populate]=*"),
  ]);
  const whereContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];

  const sectionsMap: Record<number, React.ReactElement[]> = {};
  globalWidgets.forEach((widget: any, index: number) => {
    const pos = widget.PositionNumber ?? index;
    if (!sectionsMap[pos]) sectionsMap[pos] = [];
    sectionsMap[pos].push(<GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />);
  });

  const sections: React.ReactElement[] = [];
  Object.keys(sectionsMap)
    .sort((a, b) => Number(a) - Number(b))
    .forEach(key => {
      sections.push(...sectionsMap[Number(key)]);
    });

  const hasImageSplitWidgets = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('image-split') || s.__component?.includes('imagesplit'))
  );

  // Fallback check: Did Strapi give us a widget for Position 0?
  const hasHeroWidget = globalWidgets.some((w: any) => w.PositionNumber === 0);
  
  // If no hero widget exists (e.g., Strapi is down), inject the fallback at Position 0!
  if (!hasHeroWidget) {
    sections.unshift(
      <SharedHero
        key="hero-fallback"
        id="where-hero"
        imageSrc={whereContent?.heroMedia?.[0]?.url || "/assets/images/challenges-bg.png"}
        imageAlt={whereContent?.heroMedia?.[0]?.alternativeText || "Connected community background"}
        heading={whereContent?.heroTitle || "Building the wireless networks we rely on"}
        intro={whereContent?.heroDescription || "We build wireless infrastructure in two main places: out in communities and inside buildings and venues. Each environment has unique needs, so we design each network to fit the space and people that use them."}
      />
    );
  }

  // If no Image Split widgets exist, inject the fallback Communities and Venues right after the Hero
  if (!hasImageSplitWidgets) {
    sections.splice(1, 0, <WhereCommunities key="communities" data={whereContent?.sections?.find((section: any) => section.key === "Communities")} />);
    sections.splice(2, 0, <WhereVenues key="venues" data={whereContent?.sections?.find((section: any) => section.key === "Buildings and Venues")} />);
  }

  return (
    <main id="main-content">
      <PageAnimations />
      {sections}
    </main>
  );
}
