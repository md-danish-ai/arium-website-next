import React from "react";
import { fetchAPI, fetchPageWidgets, GetStrapiMediaUrl } from "@lib/api";

export const dynamic = "force-dynamic";


import SharedHero from "@ui-common/SharedHero";
import CommunitySmallCells from "@ui-component/community/CommunitySmallCells";
import SharedImageCardGrid from "@ui-common/SharedImageCardGrid";
import CommunityHowWeWork from "@ui-component/community/CommunityHowWeWork";
import CommunityTestimonials from "@ui-component/community/CommunityTestimonials";
import CommunityFAQ from "@ui-component/community/CommunityFAQ";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=community&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Your Community | Arium Networks",
    description: seo?.metaDescription || "Arium Networks builds wireless small cell infrastructure in communities across the country, keeping you connected to what matters.",
    openGraph: {
      title: seo?.ogTitle || "Your Community | Arium Networks",
      description: seo?.ogDescription || "Arium Networks builds wireless small cell infrastructure in communities across the country, keeping you connected to what matters.",
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


export default async function YourCommunityPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=community&populate[sections][populate]=*"),
    fetchPageWidgets("community"),
  ]);
  const communityContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];
  const smallCellData = communityContent?.sections?.find((section: any) => section.key === "Small cell");
  const whySmallCellData = communityContent?.sections?.find((section: any) => section.key === "Small cells matter");
  const howWeWorkData = communityContent?.sections?.find((section: any) => section.key === "How we work");
  const testimonialsData = communityContent?.sections?.find((section: any) => section.key === "Communities support");
  const faqData = communityContent?.sections?.find((section: any) => section.key === "FAQ");

  const hasIllustrationWidgets = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('illustration-split') || s.__component?.includes('media-text-split'))
  );

  const hasImageCardGridWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('image-card-grid') || s.__component?.includes('imagecardgrid') || s.__component?.includes('image-card') || s.__component?.includes('cards'))
  );

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
          id="community-hero"
          imageSrc="/assets/images/hero-community.png"
          imageAlt="Community members enjoying a park"
          heading={communityContent?.heroTitle || "Building the connections your community depends on"}
          intro={communityContent?.heroDescription || "We work in communities like yours to ensure you stay on the cutting edge."}
        />
      )
    });
  }

  if (!hasIllustrationWidgets) {
    sectionMap.push({
      pos: 1,
      key: 'smallcell-fallback',
      el: <CommunitySmallCells key="smallcell-fallback" data={smallCellData} />
    });
  }

  if (!hasImageCardGridWidget) {
    sectionMap.push({
      pos: 2,
      key: 'imagecardgrid-fallback',
      el: <SharedImageCardGrid key="imagecardgrid-fallback" data={whySmallCellData} />
    });
  }

  const hasBackgroundFeatureWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('background-feature-section') || s.__component?.includes('backgroundfeaturesection'))
  );
  if (!hasBackgroundFeatureWidget) {
    sectionMap.push({
      pos: 3,
      key: 'howwework-fallback',
      el: <CommunityHowWeWork key="howwework-fallback" data={{ ...howWeWorkData, cta: howWeWorkData?.ctas?.[0] }} />
    });
  }

  const hasTestimonialsWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('testimonial') || s.__component?.includes('testimonail'))
  );
  if (!hasTestimonialsWidget) {
    sectionMap.push({
      pos: 4,
      key: 'testimonials-fallback',
      el: (
        <div key="testimonials-fallback" className="row-storyteller-flow">
          <CommunityTestimonials data={testimonialsData} />
        </div>
      )
    });
  }

  const hasFaqWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('faq'))
  );
  if (!hasFaqWidget) {
    sectionMap.push({
      pos: 5,
      key: 'faq-fallback',
      el: <CommunityFAQ key="faq-fallback" data={faqData} />
    });
  }

  // 3. Sort by pos and extract elements
  const sections = sectionMap.sort((a, b) => a.pos - b.pos).map(s => s.el);

  return <>{sections}</>;
}
