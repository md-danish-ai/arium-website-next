import type { Metadata } from "next";
import { fetchAPI, GetStrapiMediaUrl } from "@lib/api";

export interface SeoFallback {
  title: string;
  description: string;
  ogType?: "website" | "article";
}

export interface StrapiSeoImage {
  id?: number | string;
  url?: string;
  alternativeText?: string;
  [key: string]: unknown;
}

export interface StrapiSeoFields {
  id?: number | string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogSiteName?: string;
  preventIndexing?: boolean;
  ogImage?: StrapiSeoImage;
  [key: string]: unknown;
}

// Convert Strapi SEO payload to Next.js Metadata
export function mapSeoToMetadata(
  seo?: StrapiSeoFields | null,
  fallback: SeoFallback = { title: "Arium Networks", description: "" }
): Metadata {
  const title = seo?.metaTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const ogTitle = seo?.ogTitle || seo?.metaTitle || fallback.title;
  const ogDescription = seo?.ogDescription || seo?.metaDescription || fallback.description;
  const ogType = (seo?.ogType as "website" | "article") || fallback.ogType || "website";
  const siteName = seo?.ogSiteName || "Arium Networks";
  const ogImageUrl = seo?.ogImage?.url ? GetStrapiMediaUrl(seo.ogImage.url) : undefined;
  const isIndexable = !seo?.preventIndexing;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      siteName,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl }],
      }),
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
    },
  };
}

export async function getPageMetadata(slug: string, fallback: SeoFallback): Promise<Metadata> {
  const pageData = await fetchAPI(
    `/api/pages?filters[slug][$eq]=${slug}&populate[SeoFields][populate]=*`
  );
  const seo = pageData?.data?.[0]?.SeoFields;
  return mapSeoToMetadata(seo, fallback);
}

export async function getDynamicPageMetadata(
  slug: string,
  fallback: SeoFallback
): Promise<Metadata> {
  const pageData = await fetchAPI(
    `/api/pages?filters[$or][0][slug][$eq]=${slug}&filters[$or][1][slug][$eq]=/${slug}&populate[SeoFields][populate]=*`
  );
  const seo = pageData?.data?.[0]?.SeoFields;
  return mapSeoToMetadata(seo, fallback);
}
