import React from "react";
import ContactHero from "@ui-component/contact/ContactHero";
import ContactForm from "@ui-component/contact/ContactForm";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import { fetchAPI, GetStrapiMediaUrl } from "@lib/api";

export const dynamic = "force-dynamic";


import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=contact&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Contact Us | Arium Networks",
    description: seo?.metaDescription || "Build with clarity—connect with confidence",
    openGraph: {
      title: seo?.ogTitle || "Contact Us | Arium Networks",
      description: seo?.ogDescription || "Build with clarity—connect with confidence",
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

export default async function Contact() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=contact&populate=*"),
    fetchAPI("/api/pages?filters[slug][$eq]=contact&populate[widgets][populate][Sections][populate]=*&populate[widgets][populate][Sections][on][shared.inner-page-hero][populate]=*"),
  ]);
  const contactContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];

  const hasInnerHeroWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component === 'shared.inner-page-hero')
  );

  const sectionObjects: { pos: number; element: React.ReactElement }[] = [];

  globalWidgets.forEach((widget: any) => {
    const pos = widget.PositionNumber ?? 999;
    sectionObjects.push({
      pos,
      element: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />
    });
  });

  if (!hasInnerHeroWidget) {
    sectionObjects.push({
      pos: 1,
      element: <ContactHero key="hero" heading={contactContent?.heroTitle} intro={contactContent?.heroDescription} />
    });
  }

  // Ensure contact form always renders
  sectionObjects.push({ pos: 2, element: <ContactForm key="form" /> });

  sectionObjects.sort((a, b) => a.pos - b.pos);
  const sections = sectionObjects.map(obj => obj.element);

  return <>{sections}</>;
}
