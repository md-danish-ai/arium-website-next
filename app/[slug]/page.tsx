import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAPI, fetchPageWidgets, GetStrapiMediaUrl } from "@lib/api";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import SharedHero from "@ui-common/SharedHero";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────
// SEO Metadata — resolved dynamically from Strapi
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await fetchAPI(
    `/api/pages?filters[$or][0][slug][$eq]=${slug}&filters[$or][1][slug][$eq]=/${slug}&populate[SeoFields][populate]=*`
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Arium Networks",
    description: seo?.metaDescription || "Arium Networks wireless infrastructure.",
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "Arium Networks",
      description: seo?.ogDescription || seo?.metaDescription || "",
      type: (seo?.ogType as any) || "website",
      siteName: seo?.ogSiteName || "Arium Networks",
      ...(seo?.ogImage?.url && {
        images: [{ url: GetStrapiMediaUrl(seo.ogImage.url) }],
      }),
    },
    robots: {
      index: !seo?.preventIndexing,
      follow: !seo?.preventIndexing,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Dynamic Page Component
// ─────────────────────────────────────────────────────────────
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      `/api/pages?filters[$or][0][slug][$eq]=${slug}&filters[$or][1][slug][$eq]=/${slug}&populate[heroMedia][populate]=*&populate[SeoFields][populate]=*`
    ),
    fetchPageWidgets(`${slug}`),
  ]);

  console.log("DEBUG STRAPI FETCH FOR SLUG:", slug, "RESULT:", JSON.stringify(pageData, null, 2));

  // If Strapi returns nothing for this slug → 404
  if (!pageData?.data?.[0]) {
    notFound();
  }

  const pageContent = pageData.data[0];
  const globalWidgets: any[] = widgetData?.data?.[0]?.widgets || [];

  // ── Sort widgets into position map ──────────────────────────
  const sectionsMap: Record<number, React.ReactElement[]> = {};
  globalWidgets.forEach((widget: any, index: number) => {
    const pos = widget.PositionNumber ?? index;
    if (!sectionsMap[pos]) sectionsMap[pos] = [];
    sectionsMap[pos].push(<GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />);
  });

  const sections: React.ReactElement[] = [];
  Object.keys(sectionsMap)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((key) => sections.push(...sectionsMap[Number(key)]));

  // ── Hero fallback ────────────────────────────────────────────
  const hasHeroWidget = globalWidgets.some((w: any) => w.PositionNumber === 0);

  if (!hasHeroWidget) {
    const heroMedia = pageContent?.heroMedia?.[0];
    const heroImgUrl = heroMedia?.url
      ? GetStrapiMediaUrl(heroMedia.url)
      : "/assets/images/challenges-bg.png";

    sections.unshift(
      <SharedHero
        key="hero-fallback"
        id={`${slug}-hero`}
        imageSrc={heroImgUrl}
        imageAlt={heroMedia?.alternativeText || pageContent?.heroTitle || slug}
        heading={pageContent?.heroTitle || ""}
        intro={pageContent?.heroDescription || ""}
      />
    );
  }

  return <>{sections}</>;
}
