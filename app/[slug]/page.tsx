import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeroBanner } from "@ui-common";
import { fetchAPI, fetchPageWidgets, GetStrapiMediaUrl } from "@lib/api";
import { combinePageSections, resolveStrapiImage } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry } from "@types";

export const dynamic = "force-dynamic";

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
      type: (seo?.ogType as "website") || "website",
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

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [pageData, widgetData] = await Promise.all([
    fetchAPI(
      `/api/pages?filters[$or][0][slug][$eq]=${slug}&filters[$or][1][slug][$eq]=/${slug}&populate[heroMedia][populate]=*&populate[SeoFields][populate]=*`
    ),
    fetchPageWidgets(`${slug}`),
  ]);

  if (!pageData?.data?.[0]) {
    notFound();
  }

  const pageContent: StrapiPageData = pageData.data[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const hasHeroWidget = globalWidgets.some(
    (w) => w.PositionNumber === 0 || w.Sections?.some((s) => s.__component?.includes("hero"))
  );

  const heroImgUrl = resolveStrapiImage(pageContent?.heroMedia, "/assets/images/challenges-bg.png");

  const fallbackSections: SectionEntry[] = [
    {
      pos: 0,
      key: "hero-fallback",
      skip: hasHeroWidget,
      el: (
        <HeroBanner
          key="hero-fallback"
          id={`${slug}-hero`}
          imageSrc={heroImgUrl}
          imageAlt={pageContent?.heroTitle || slug}
          heading={pageContent?.heroTitle || ""}
          intro={pageContent?.heroDescription || ""}
        />
      ),
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
