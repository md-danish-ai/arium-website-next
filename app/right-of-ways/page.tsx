import RightOfWayHero from "@ui-component/where-we-build/RightOfWayHero";
import SharedProcess from "@ui-common/SharedProcess";
import RightOfWayTestimonials from "@ui-component/where-we-build/RightOfWayTestimonials";
import GlobeCTA from "@ui-common/GlobeCTA";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import React from "react";
import { AssessmentIconSvg, PlanningIconSvg, ConstructionIconSvg } from "@ui-svg";

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { fetchAPI, GetStrapiMediaUrl } from "@lib/api";

interface StrapiMedia {
  url: string;
  alternativeText?: string;
  mime?: string;
}

interface StrapiCta {
  label: string;
  url: string;
}

interface StrapiInnerCard {
  heading?: string;
  description?: string;
}

interface StrapiProcessCard {
  title?: string;
  icon?: string;
  InnerCard?: StrapiInnerCard[];
}

interface StrapiSectionCard {
  title?: string;
  description?: string;
  badge?: string;
  [key: string]: unknown;
}

interface StrapiSection {
  key?: string;
  title?: string;
  body?: string;
  cards?: (StrapiProcessCard & StrapiSectionCard)[];
  cta?: StrapiCta;
  [key: string]: unknown;
}

interface StrapiWidgetSection {
  id?: number | string;
  __component?: string;
  [key: string]: unknown;
}

interface StrapiWidget {
  id: number | string;
  PositionNumber?: number;
  Sections?: StrapiWidgetSection[];
  [key: string]: unknown;
}

interface StrapiPageData {
  id?: number | string;
  heroTag?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroCtas?: StrapiCta;
  sections?: StrapiSection[];
  SeoFields?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogSiteName?: string;
    preventIndexing?: boolean;
    ogImage?: StrapiMedia;
  };
  [key: string]: unknown;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI(
    "/api/pages?filters[slug][$eq]=right-of-ways&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Right of Way | Arium Networks",
    description:
      seo?.metaDescription ||
      "As technology advances, Arium Networks is building the small cells that keep communities connected to what matters.",
    openGraph: {
      title: seo?.ogTitle || "Right of Way | Arium Networks",
      description:
        seo?.ogDescription ||
        "As technology advances, Arium Networks is building the small cells that keep communities connected to what matters.",
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

const ROW_PROCESS_DATA = {
  title: "Our structured process for building small cells",
  description:
    "Every community is different, but we have a proven process for navigating complexities and designing infrastructure to meet your wireless connectivity needs.",
  pillars: [
    {
      id: "assessment",
      title: "Assessment",
      iconSvg: (
        <AssessmentIconSvg
          className="tab-icon w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          strokeWidth="2.2"
        />
      ),
      themeColor: "#FBCBB5",
      steps: ["Evaluate Needs", "Identify Sites", "Assess Regulations", "Minimizing Disruption"],
      timelineItems: [
        {
          label: "Evaluate Needs",
          desc: "Wireless providers identify areas of need for residents, business owners, and first responders.",
        },
        {
          label: "Identify Sites",
          desc: "We evaluate existing sites we can use and work with wireless providers to strategically select the best locations to install new small cells.",
        },
        {
          label: "Assess Regulations",
          desc: "We conduct a thorough assessment of local codes, regulations, and expected impact on the community.",
        },
        {
          label: "Minimizing Disruption",
          desc: "We have CLEC status in most states, which means we can often install on existing assets in the public right of way, like utility poles and streetlights.",
        },
      ],
    },
    {
      id: "planning",
      title: "Planning",
      iconSvg: (
        <PlanningIconSvg
          className="tab-icon w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          strokeWidth="2.2"
        />
      ),
      themeColor: "#FBCBB5",
      steps: [
        "Work Together",
        "Follow Regulations",
        "Submit Applications",
        "Stakeholder Engagement",
      ],
      timelineItems: [
        {
          label: "Work Together",
          desc: "We collaborate with your public works and utilities departments to finalize small cell site locations and designs.",
        },
        {
          label: "Follow Regulations",
          desc: "We have experience navigating state, local, and federal processes and regulations and will take care to ensure they are properly followed.",
        },
        {
          label: "Submit Applications",
          desc: "We work with you to submit information, permits, and applications to align with municipal guidelines and state and federally mandated timeframes.",
        },
        {
          label: "Stakeholder Engagement",
          desc: "We coordinate with government officials and stakeholders to provide information about deployments, staying aligned with local processes and requirements.",
        },
      ],
    },
    {
      id: "construction",
      title: "Construction",
      iconSvg: (
        <ConstructionIconSvg
          className="tab-icon w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          strokeWidth="2.2"
        />
      ),
      themeColor: "#FBCBB5",
      steps: ["Secure Permits", "Work with Vendors", "Follow Codes", "Complete Installation"],
      timelineItems: [
        {
          label: "Secure Permits",
          desc: "We apply for additional permits, including traffic control permits, and we support the local utility in applying for any necessary authorizations.",
        },
        {
          label: "Work with Vendors",
          desc: "When possible, we prioritize working with local vendors in the community for materials and installation.",
        },
        {
          label: "Follow Codes",
          desc: "We ensure all work follows local, state, and federal codes, including building, public works, electrical, and FCC guidelines.",
        },
        {
          label: "Complete Installation",
          desc: "We work with the right officials to oversee construction, secure certificates of completion and occupancy, and plan future installations.",
        },
      ],
    },
  ],
};

export default async function RightOfWayPage() {
  const [pageData, widgetData, processWidgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=right-of-ways&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=right-of-ways&populate[widgets][populate][Sections][populate]=*"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=right-of-ways&populate[widgets][populate][Sections][on][shared.process][populate][ProcessStep][populate][ProcessCard][populate]=*&populate[widgets][populate][Sections][on][shared.process][populate][ProcessStep][populate][StepNameIconimg][populate]=*"
    ),
  ]);
  const rightOfWayContent: StrapiPageData | undefined = pageData?.data?.[0];
  // Merge ProcessCard data into the widget Sections from the deep fetch
  const rawWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];
  const deepWidgets: StrapiWidget[] = processWidgetData?.data?.[0]?.widgets || [];
  const globalWidgets: StrapiWidget[] = rawWidgets.map((widget: StrapiWidget) => {
    const deepWidget = deepWidgets.find((dw: StrapiWidget) => dw.id === widget.id);
    if (!deepWidget) return widget;
    return {
      ...widget,
      Sections: widget.Sections?.map((section: StrapiWidgetSection) => {
        if (section.__component !== "shared.process") return section;
        const deepSection = deepWidget.Sections?.find(
          (ds: StrapiWidgetSection) => ds.id === section.id && ds.__component === "shared.process"
        );
        return deepSection ? { ...section, ...deepSection } : section;
      }),
    };
  });

  const processData = rightOfWayContent?.sections?.find(
    (section: StrapiSection) => section.key === "Structured process"
  );
  const contactData = rightOfWayContent?.sections?.find(
    (section: StrapiSection) => section.key === "Contact Us"
  );

  const mappedProcessData = {
    title: processData?.title || ROW_PROCESS_DATA.title,
    description: processData?.body || ROW_PROCESS_DATA.description,
    pillars:
      processData?.cards && processData.cards.length > 0
        ? processData.cards.map((card: StrapiProcessCard, idx: number) => ({
            id: card.title?.toLowerCase() || `pillar-${idx}`,
            title: card.title || "",
            iconSvg: card.icon ? (
              <div
                className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full"
                dangerouslySetInnerHTML={{ __html: card.icon }}
              />
            ) : (
              ROW_PROCESS_DATA.pillars[idx]?.iconSvg
            ),
            themeColor: ROW_PROCESS_DATA.pillars[idx]?.themeColor || "#FBCBB5",
            steps: card.InnerCard?.map((inner: StrapiInnerCard) => inner.heading || "") || [],
            timelineItems:
              card.InnerCard?.map((inner: StrapiInnerCard) => ({
                label: inner.heading || "",
                desc: inner.description || "",
              })) || [],
          }))
        : ROW_PROCESS_DATA.pillars,
  };

  const hasInnerHeroWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiWidgetSection) => s.__component === "shared.inner-page-hero")
  );

  const sectionObjects: { pos: number; element: React.ReactElement }[] = [];

  // 1. Add widgets
  globalWidgets.forEach((widget: StrapiWidget) => {
    const pos = widget.PositionNumber ?? 999;
    sectionObjects.push({
      pos,
      element: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />,
    });
  });

  // 2. Add fallbacks for missing widgets
  if (!hasInnerHeroWidget) {
    sectionObjects.push({
      pos: 1,
      element: <RightOfWayHero key="hero" data={rightOfWayContent} />,
    });
  }

  // Fallback check: Did Strapi give us a widget that contains a Process?
  const hasProcessWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiWidgetSection) => s.__component === "shared.process")
  );

  // Fallback check: Did Strapi give us a widget that contains Testimonials?
  const hasTestimonialsWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some(
      (s: StrapiWidgetSection) =>
        s.__component?.includes("testimonial") || s.__component?.includes("testimonail")
    )
  );

  // Fallback check: Did Strapi give us a widget that contains a CTA?
  const hasCtaWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiWidgetSection) => s.__component?.includes("cta"))
  );

  if (!hasProcessWidget) {
    sectionObjects.push({
      pos: 2,
      element: <SharedProcess key="process-fallback" {...mappedProcessData} />,
    });
  }

  if (!hasTestimonialsWidget) {
    sectionObjects.push({
      pos: 3,
      element: (
        <div key="testimonials-fallback" className="row-storyteller-flow">
          <RightOfWayTestimonials
            data={rightOfWayContent?.sections?.find(
              (section: StrapiSection) => section.key === "Feedback"
            )}
          />
        </div>
      ),
    });
  }

  if (!hasCtaWidget) {
    sectionObjects.push({
      pos: 4,
      element: (
        <GlobeCTA
          key="cta-fallback"
          title={
            contactData?.title ||
            "To see how we can support your infrastructure needs, reach out to our dedicated municipal team."
          }
          buttonText={contactData?.cta?.label || "Contact Us"}
          buttonLink={contactData?.cta?.url || "/contact"}
        />
      ),
    });
  }

  // 3. Sort by position
  sectionObjects.sort((a, b) => a.pos - b.pos);
  const sections = sectionObjects.map((obj) => obj.element);

  return <>{sections}</>;
}
