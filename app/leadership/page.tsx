import React from "react";
import { InnerPageHero, PeopleGlobalSection, GlobeCTA, PeopleCard } from "@ui-common";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import { fetchAPI, GetStrapiMediaUrl } from "@lib/api";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface StrapiSectionItem {
  __component?: string;
  [key: string]: unknown;
}

interface StrapiWidget {
  id: number | string;
  PositionNumber?: number;
  Sections?: StrapiSectionItem[];
  [key: string]: unknown;
}

interface PageSection {
  key?: string;
  title?: string;
  cards?: PeopleCard[];
  cta?: Array<{ label?: string; url?: string }>;
  [key: string]: unknown;
}

interface LeadershipPageContent {
  heroTitle?: string;
  heroDescription?: string;
  sections?: PageSection[];
  SeoFields?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: "website" | "article" | "book" | "profile";
    ogSiteName?: string;
    preventIndexing?: boolean;
    ogImage?: { url?: string };
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=leadership&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields as LeadershipPageContent["SeoFields"];

  return {
    title: seo?.metaTitle || "Leadership | Arium Networks",
    description:
      seo?.metaDescription ||
      "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
    openGraph: {
      title: seo?.ogTitle || "Leadership | Arium Networks",
      description:
        seo?.ogDescription ||
        "Meet the seasoned industry leaders driving Arium Networks' strategic growth and operational excellence across telecommunications infrastructure.",
      type: seo?.ogType || "website",
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

export default async function LeadershipPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=leadership&populate[heroCtas]=*&populate[sections][populate][cards][populate][InnerCard][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][cta]=*"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=leadership&populate[widgets][populate][Sections][populate]=*&populate[widgets][populate][Sections][on][shared.people-global-section][populate][Peoplecard][populate]=*&populate[widgets][populate][Sections][on][shared.global-cta][populate]=*&populate[widgets][populate][Sections][on][shared.inner-page-hero][populate]=*"
    ),
  ]);
  const leadershipContent = pageData?.data?.[0] as LeadershipPageContent | undefined;
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const ctaSection = leadershipContent?.sections?.find(
    (section: PageSection) => section.key === "Explore Careers"
  );
  const cta = ctaSection?.cta?.[0];

  const sectionMap: { pos: number; key: string; el: React.ReactElement }[] = [];

  // 1. Add all dynamic global widgets at their precise positions
  globalWidgets.forEach((widget: StrapiWidget) => {
    sectionMap.push({
      pos: widget.PositionNumber ?? 999,
      key: `widget-${widget.id}`,
      el: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />,
    });
  });

  // 2. Add fallbacks for missing positions/widgets
  const hasInnerHeroWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiSectionItem) => s.__component === "shared.inner-page-hero")
  );
  if (!hasInnerHeroWidget) {
    sectionMap.push({
      pos: 0,
      key: "hero-fallback",
      el: (
        <InnerPageHero
          key="hero"
          heroTitle={leadershipContent?.heroTitle || "Our Leadership"}
          heroDescription={
            leadershipContent?.heroDescription ||
            "Seasoned industry leaders driving strategic growth and operational excellence."
          }
        />
      ),
    });
  }

  const hasPeopleWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some(
      (s: StrapiSectionItem) =>
        s.__component?.includes("people-global-section") || s.__component?.includes("people")
    )
  );
  if (!hasPeopleWidget) {
    const teamSection = leadershipContent?.sections?.find(
      (section: PageSection) =>
        section.key === "Leadership Team" ||
        section.key === "Executive Team" ||
        section.key === "Leadership"
    );
    sectionMap.push({
      pos: 1,
      key: "team-fallback",
      el: <PeopleGlobalSection key="team" data={teamSection} />,
    });
  }

  const hasCtaWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some(
      (s: StrapiSectionItem) =>
        s.__component?.includes("cta") ||
        s.__component?.includes("calltoaction") ||
        s.__component?.includes("call-to-action")
    )
  );
  if (!hasCtaWidget) {
    sectionMap.push({
      pos: 99,
      key: "cta-fallback",
      el: (
        <GlobeCTA
          key="cta-fallback"
          title={
            ctaSection?.title ||
            "Interested in joining a team of industry leaders building the future of connectivity?"
          }
          buttonText={cta?.label || "Explore Careers"}
          buttonLink={cta?.url || "/careers"}
        />
      ),
    });
  }

  // 3. Sort by pos and extract elements
  const sections = sectionMap.sort((a, b) => a.pos - b.pos).map((s) => s.el);

  return <>{sections}</>;
}
