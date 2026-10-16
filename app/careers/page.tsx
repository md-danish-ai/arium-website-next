import React from "react";

export const dynamic = "force-dynamic";


import SharedHero from "../../components/sections/shared/SharedHero";
import { fetchAPI, fetchPageWidgets } from "../../lib/api";
import CareersCultureAccordion from "../../components/sections/careers/CareersCultureAccordion";
import CareersTestimonials from "../../components/sections/careers/CareersTestimonials";
import CareersJobAreas from "../../components/sections/careers/CareersJobAreas";
import CareersBenefits from "../../components/sections/careers/CareersBenefits";
import CareersEEO from "../../components/sections/careers/CareersEEO";
import PageAnimations from "../../components/animations/PageAnimations";
import GlobalWidgetRenderer from "../../components/shared/GlobalWidgetRenderer";


import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=careers&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Careers | Arium Networks",
    description: seo?.metaDescription || "Explore job opportunities with Arium Networks and help us build the next era of wireless connectivity. Discover more about our company, culture, and benefits.",
    openGraph: {
      title: seo?.ogTitle || "Careers | Arium Networks",
      description: seo?.ogDescription || "Explore job opportunities with Arium Networks and help us build the next era of wireless connectivity. Discover more about our company, culture, and benefits.",
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

export default async function CareersPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=careers&populate[heroMedia][populate]=*&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard"),
    fetchPageWidgets("careers"),
  ]);
  const careersContent = pageData?.data?.[0];
  const globalWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];

  // Fallback check: Did Strapi give us a widget that contains an Accordion?
  const hasAccordionWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('accordion'))
  );

  // Fallback check: Did Strapi give us a widget that contains Benefits?
  const hasBenefitsWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('benefits'))
  );

  // Fallback check: Did Strapi give us a widget that contains Highlight List?
  const hasHighlightListWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('highlight-list'))
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
          id="team-hero"
          imageSrc={careersContent?.heroMedia?.[0]?.url || "/assets/images/hero-careers.png"}
          imageAlt={careersContent?.heroMedia?.[0]?.alternativeText || "Arium Networks team working together"}
          heading={careersContent?.heroTitle || "Join our team"}
          intro={careersContent?.heroDescription || "Advance your career and help shape the future of connectivity."}
          ctaText={careersContent?.heroCtas?.label || "Explore opportunities"}
          ctaLink={careersContent?.heroCtas?.url || "https://jobs.dayforcehcm.com/arium/CANDIDATEPORTAL"}
          isExternalLink={true}
        />
      )
    });
  }

  if (!hasAccordionWidget) {
    sectionMap.push({
      pos: 1,
      key: 'culture',
      el: <CareersCultureAccordion key="culture" data={careersContent} />
    });
  }

  const hasTestimonialsWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component?.includes('testimonial') || s.__component?.includes('testimonail'))
  );
  if (!hasTestimonialsWidget) {
    sectionMap.push({
      pos: 2,
      key: 'testimonials-fallback',
      el: (
        <div key="testimonials-fallback" className="row-storyteller-flow">
          <CareersTestimonials data={careersContent?.sections?.find((section: any) => section.key === "Arium Networks Team")} />
        </div>
      )
    });
  }

  if (!hasHighlightListWidget) {
    sectionMap.push({
      pos: 3,
      key: 'jobareas',
      el: <div key="jobareas" className="row-storyteller-flow"><CareersJobAreas data={careersContent?.sections?.find((section: any) => section.key === "Job Areas")} /></div>
    });
  }

  if (!hasBenefitsWidget) {
    sectionMap.push({
      pos: 4,
      key: 'benefits',
      el: <div key="benefits" className="row-storyteller-flow"><CareersBenefits data={careersContent?.sections?.find((section: any) => section.key === "Benefits")} /></div>
    });
    sectionMap.push({
      pos: 5,
      key: 'eeo',
      el: <CareersEEO key="eeo" data={careersContent?.sections?.find((section: any) => section.key === "Message")} />
    });
  }

  // 3. Sort by pos and extract elements
  const sections = sectionMap.sort((a, b) => a.pos - b.pos).map(s => s.el);

  return (
    <main id="main-content">
      <PageAnimations />
      {sections}
    </main>
  );
}
