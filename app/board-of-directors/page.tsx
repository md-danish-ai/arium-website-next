import React from "react";
import { SharedInnerPageHero, PeopleGlobalSection, GlobeCTA, PeopleCard } from "@ui-common";
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

interface BoardPageContent {
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
    "/api/pages?filters[slug][$eq]=board-of-directors&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields as BoardPageContent["SeoFields"];

  return {
    title: seo?.metaTitle || "Board of Directors | Arium Networks",
    description:
      seo?.metaDescription ||
      "Meet the Arium Networks Board of Directors — experienced leaders guiding strategy across telecommunications, infrastructure, and investment.",
    openGraph: {
      title: seo?.ogTitle || "Board of Directors | Arium Networks",
      description:
        seo?.ogDescription ||
        "Meet the Arium Networks Board of Directors — experienced leaders guiding strategy across telecommunications, infrastructure, and investment.",
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

export default async function BoardOfDirectorsPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=board-of-directors&populate[heroCtas]=*&populate[sections][populate][cards][populate][InnerCard][populate]=*&populate[sections][populate][cards][populate][image][populate]=*&populate[sections][populate][cta]=*"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=board-of-directors&populate[widgets][populate][Sections][populate]=*&populate[widgets][populate][Sections][on][shared.people-global-section][populate][Peoplecard][populate]=*&populate[widgets][populate][Sections][on][shared.global-cta][populate]=*&populate[widgets][populate][Sections][on][shared.inner-page-hero][populate]=*"
    ),
  ]);
  const boardContent = pageData?.data?.[0] as BoardPageContent | undefined;
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const ctaSection = boardContent?.sections?.find(
    (section: PageSection) => section.key === "Leadership Meet"
  );
  const cta = ctaSection?.cta?.[0];

  const hasInnerHeroWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiSectionItem) => s.__component === "shared.inner-page-hero")
  );

  const sections: React.ReactElement[] = [];
  if (!hasInnerHeroWidget) {
    sections.push(
      <SharedInnerPageHero
        key="hero"
        heroTitle={boardContent?.heroTitle || "Board of Directors"}
        heroDescription={
          boardContent?.heroDescription ||
          "Experienced leaders guiding strategy across telecommunications, infrastructure, and investment."
        }
      />
    );
  }

  // Fallback check: Did Strapi give us a widget that contains people grid?
  const hasPeopleWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some(
      (s: StrapiSectionItem) =>
        s.__component?.includes("people-global-section") || s.__component?.includes("people")
    )
  );
  if (!hasPeopleWidget) {
    const boardSection = boardContent?.sections?.find(
      (section: PageSection) =>
        section.key === "Board of Directors" ||
        section.key === "Board Members" ||
        section.key === "Board"
    );
    sections.push(<PeopleGlobalSection key="board-members" data={boardSection} />);
  }

  [...globalWidgets].reverse().forEach((widget: StrapiWidget) => {
    const pos = widget.PositionNumber ?? sections.length;
    sections.splice(pos, 0, <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />);
  });

  // Fallback check: Did Strapi give us a widget that contains a CTA?
  const hasCtaWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiSectionItem) => s.__component?.includes("cta"))
  );

  // If no CTA widget exists, inject the fallback CTA at the very bottom!
  if (!hasCtaWidget) {
    sections.push(
      <GlobeCTA
        key="cta-fallback"
        title={
          ctaSection?.title ||
          "Learn more about the leadership team driving Arium Networks' mission forward."
        }
        buttonText={cta?.label || "Meet Our Leadership"}
        buttonLink={cta?.url || "/leadership"}
      />
    );
  }

  return <>{sections}</>;
}
