import React from "react";
import type { Metadata } from "next";
import ContactHero from "@ui-component/contact/ContactHero";
import ContactForm from "@ui-component/contact/ContactForm";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { GetStrapiMediaUrl, combinePageSections } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry } from "@types";
import {
  CONTACT_TOPIC_OPTIONS,
  CONTACT_HERO_FALLBACK,
  CONTACT_SEO_FALLBACK,
} from "@data/contact.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=contact&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || CONTACT_SEO_FALLBACK.title,
    description: seo?.metaDescription || CONTACT_SEO_FALLBACK.description,
    openGraph: {
      title: seo?.ogTitle || CONTACT_SEO_FALLBACK.title,
      description: seo?.ogDescription || CONTACT_SEO_FALLBACK.description,
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

export default async function ContactPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=contact&populate=*"),
    fetchPageWidgets("contact"),
  ]);

  const contactContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const hasInnerHeroWidget = globalWidgets.some((w) =>
    w.Sections?.some((s) => s.__component === "shared.inner-page-hero")
  );

  const fallbackSections: SectionEntry[] = [
    {
      pos: 1,
      key: "hero-fallback",
      skip: hasInnerHeroWidget,
      el: (
        <ContactHero
          key="hero-fallback"
          heading={contactContent?.heroTitle || CONTACT_HERO_FALLBACK.heading}
          intro={contactContent?.heroDescription || CONTACT_HERO_FALLBACK.intro}
        />
      ),
    },
    {
      pos: 2,
      key: "form-fallback",
      el: <ContactForm key="form-fallback" topicOptions={CONTACT_TOPIC_OPTIONS} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
