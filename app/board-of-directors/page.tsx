import React from "react";
import BoardHero from "@ui-component/board/BoardHero";
import BoardMembers from "@ui-component/board/BoardMembers";
import GlobeCTA from "@ui-common/GlobeCTA";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import { fetchAPI } from "@lib/api";

export const dynamic = "force-dynamic";


import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=board-of-directors&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Board of Directors | Arium Networks",
    description: seo?.metaDescription || "Meet the Arium Networks Board of Directors — experienced leaders guiding strategy across telecommunications, infrastructure, and investment.",
    openGraph: {
      title: seo?.ogTitle || "Board of Directors | Arium Networks",
      description: seo?.ogDescription || "Meet the Arium Networks Board of Directors — experienced leaders guiding strategy across telecommunications, infrastructure, and investment.",
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

export default async function BoardOfDirectorsPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=board-of-directors&populate[heroCtas]=*&populate[sections][populate][cards][populate][InnerCard][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][cta]=*"),
    fetchAPI("/api/pages?filters[slug][$eq]=board-of-directors&populate[widgets][populate][Sections][populate]=*&populate[widgets][populate][Sections][on][shared.people-global-section][populate][Peoplecard][populate]=*&populate[widgets][populate][Sections][on][shared.global-cta][populate]=*&populate[widgets][populate][Sections][on][shared.inner-page-hero][populate]=*"),
  ]);
  const boardContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];

  const ctaSection = boardContent?.sections?.find((section: any) => section.key === "Leadership Meet");
  const cta = ctaSection?.cta?.[0];

  const hasInnerHeroWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component === 'shared.inner-page-hero')
  );

  const sections: React.ReactElement[] = [];
  if (!hasInnerHeroWidget) {
    sections.push(
      <BoardHero key="hero" heading={boardContent?.heroTitle} intro={boardContent?.heroDescription} />
    );
  }

  // Fallback check: Did Strapi give us a widget that contains people grid?
  const hasPeopleWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('people-global-section') || s.__component?.includes('people'))
  );
  if (!hasPeopleWidget) {
    const boardSection = boardContent?.sections?.find((section: any) => 
      section.key === "Board of Directors" || section.key === "Board Members" || section.key === "Board"
    );
    sections.push(
      <BoardMembers key="board-members" data={boardSection} />
    );
  }

  [...globalWidgets].reverse().forEach((widget: any) => {
    const pos = widget.PositionNumber ?? sections.length;
    sections.splice(pos, 0, <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />);
  });

  // Fallback check: Did Strapi give us a widget that contains a CTA?
  const hasCtaWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('cta'))
  );

  // If no CTA widget exists, inject the fallback CTA at the very bottom!
  if (!hasCtaWidget) {
    sections.push(
      <GlobeCTA
        key="cta-fallback"
        title={ctaSection?.title || "Learn more about the leadership team driving Arium Networks' mission forward."}
        buttonText={cta?.label || "Meet Our Leadership"}
        buttonLink={cta?.url || "/leadership"}
      />
    );
  }

  return <>{sections}</>;
}
