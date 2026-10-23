import React from "react";
import HeroBanner from "@ui-common/HeroBanner";
import SolutionsSmallCells from "@ui-component/solutions/SolutionsSmallCells";
import SolutionsDas from "@ui-component/solutions/SolutionsDas";
import SolutionsIndustries, {
  type IndustryCard,
} from "@ui-component/solutions/SolutionsIndustries";
import GlobeCTA from "@ui-common/GlobeCTA";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import { fetchAPI, fetchPageWidgets, GetStrapiMediaUrl } from "@lib/api";

export const dynamic = "force-dynamic";

import type { Metadata } from "next";

interface StrapiMedia {
  url: string;
  alternativeText?: string;
  mime?: string;
}

interface StrapiCta {
  label: string;
  url: string;
}

interface StrapiSection {
  key?: string;
  title?: string;
  body?: string;
  stats?: Array<{ value: string; label: string }>;
  cta?: StrapiCta[];
  media?: StrapiMedia[];
  cards?: IndustryCard[];
}

interface StrapiPageData {
  heroTitle?: string;
  heroDescription?: string;
  heroMedia?: StrapiMedia[];
  heroCtas?: StrapiCta[];
  sections?: StrapiSection[];
  SeoFields?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogSiteName?: string;
    preventIndexing?: boolean;
    ogImage?: { url: string };
  };
}

interface StrapiWidgetSection {
  __component?: string;
  [key: string]: unknown;
}

interface StrapiWidget {
  id: number | string;
  PositionNumber?: number;
  Sections?: StrapiWidgetSection[];
  CustomCssClass?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=solutions&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Our Solutions | Arium Networks",
    description:
      seo?.metaDescription ||
      "Learn how our small cell and DAS networks are increasing capacity and enhancing connectivity in high-demand areas.",
    openGraph: {
      title: seo?.ogTitle || "Our Solutions | Arium Networks",
      description:
        seo?.ogDescription ||
        "Learn how our small cell and DAS networks are increasing capacity and enhancing connectivity in high-demand areas.",
      type: (seo?.ogType as "website") || "website",
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

export default async function SolutionsPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=solutions&populate[heroMedia][populate]=*&populate[heroCtas][populate]=*&populate[sections][populate][media][populate]=*&populate[sections][populate][stats][populate]=*&populate[sections][populate][cta][populate]=*&populate[sections][populate][cards][populate][image][populate]=*"
    ),
    fetchPageWidgets("solutions"),
  ]);
  const solutionsContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];
  const smallCellsData = solutionsContent?.sections?.find(
    (section) => section.key === "Small Cells"
  );
  const dasData = solutionsContent?.sections?.find(
    (section) => section.key === "Distributed Antenna Systems"
  );
  const industriesData = solutionsContent?.sections?.find(
    (section) => section.key === "Industries"
  );
  const approachData = solutionsContent?.sections?.find(
    (section) => section.key === "Our Approach"
  );

  const sectionMap: { pos: number; key: string; el: React.ReactElement }[] = [];

  // 1. Add all dynamic global widgets at their precise positions
  globalWidgets.forEach((widget) => {
    sectionMap.push({
      pos: widget.PositionNumber ?? 999,
      key: `widget-${widget.id}`,
      el: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />,
    });
  });

  // 2. Add fallbacks for missing positions/widgets
  const hasHeroWidget = globalWidgets.some(
    (w) => w.PositionNumber === 0 && (w.Sections || []).length > 0
  );
  if (!hasHeroWidget) {
    sectionMap.push({
      pos: 0,
      key: "hero-fallback",
      el: (
        <HeroBanner
          key="hero-fallback"
          id="solutions-hero"
          imageSrc={solutionsContent?.heroMedia?.[0]?.url || "/assets/images/hero-solutions.png"}
          imageAlt={
            solutionsContent?.heroMedia?.[0]?.alternativeText ||
            "People gathered in an outdoor plaza"
          }
          heading={
            solutionsContent?.heroTitle || "Infrastructure for tomorrow's wireless data demands"
          }
          intro={
            solutionsContent?.heroDescription ||
            "As new technologies emerge, we're building and scaling wireless networks that will support evolving demand—today and what comes next."
          }
          ctaText={solutionsContent?.heroCtas?.[0]?.label || "Contact Us"}
          ctaLink={solutionsContent?.heroCtas?.[0]?.url || "/contact"}
        />
      ),
    });
  }

  const hasIllustrationWidgets = globalWidgets.some((w) =>
    w.Sections?.some(
      (s) =>
        s.__component?.includes("illustration-split") || s.__component?.includes("media-text-split")
    )
  );
  if (!hasIllustrationWidgets) {
    sectionMap.push({
      pos: 1,
      key: "small-cells-fallback",
      el: <SolutionsSmallCells key="small-cells" data={smallCellsData} />,
    });
    sectionMap.push({
      pos: 2,
      key: "das-fallback",
      el: <SolutionsDas key="das" data={dasData} />,
    });
  }

  const hasIndustriesWidget = globalWidgets.some((w) => w.PositionNumber === 3);
  if (!hasIndustriesWidget) {
    sectionMap.push({
      pos: 3,
      key: "industries-fallback",
      el: <SolutionsIndustries key="industries" data={industriesData} />,
    });
  }

  const hasCtaWidget = globalWidgets.some((w) =>
    w.Sections?.some((s) => s.__component?.includes("cta"))
  );
  if (!hasCtaWidget) {
    sectionMap.push({
      pos: 99,
      key: "cta-fallback",
      el: (
        <GlobeCTA
          key="cta-fallback"
          heading={approachData?.title || "A Balanced Approach"}
          description={
            approachData?.body ||
            "We work closely with you to find the solution that meets your connectivity needs, while considering your priorities like the surrounding physical aesthetics."
          }
          buttonText={approachData?.cta?.[0]?.label || "Learn more"}
          buttonLink={approachData?.cta?.[0]?.url || "/where-we-build"}
        />
      ),
    });
  }

  // 3. Sort by pos and extract elements
  const sections = sectionMap.sort((a, b) => a.pos - b.pos).map((s) => s.el);

  return <>{sections}</>;
}
