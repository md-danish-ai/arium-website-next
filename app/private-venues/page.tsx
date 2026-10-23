import PrivateVenuesHero from "@ui-component/where-we-build/PrivateVenuesHero";
import SharedProcess from "@ui-common/SharedProcess";
import PrivateVenuesTestimonials from "@ui-component/where-we-build/PrivateVenuesTestimonials";
import GlobeCTA from "@ui-common/GlobeCTA";
import GlobalWidgetRenderer from "@ui-shared/GlobalWidgetRenderer";
import React from "react";

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
    "/api/pages?filters[slug][$eq]=private-venues&populate[SeoFields][populate]=*"
  );
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Private Venues | Arium Networks",
    description:
      seo?.metaDescription ||
      "Our small cell and DAS in-building solutions enable the wireless coverage and capacity private venues need to support the demands of tenants and guests.",
    openGraph: {
      title: seo?.ogTitle || "Private Venues | Arium Networks",
      description:
        seo?.ogDescription ||
        "Our small cell and DAS in-building solutions enable the wireless coverage and capacity private venues need to support the demands of tenants and guests.",
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

const PV_PROCESS_DATA = {
  title: "Our proven service delivery process",
  description:
    "Whether you operate a large stadium, commercial building, theme park, campus, or other private venue, we can work with you to design a distributed antenna system (DAS) or small cell network (SCN) that meets your unique connectivity needs.",
  pillars: [
    {
      id: "design",
      title: "Design",
      iconSvg: (
        <svg
          className="tab-icon w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      themeColor: "#00e8d9",
      steps: ["Select Partners", "Plan Integration", "Finalize RF Design"],
      timelineItems: [
        {
          label: "Select Partners",
          desc: "We have local relationships with wireless service providers, vendors, and municipal officials, allowing us to select the architecture, engineering, and construction partners that are best suited to the unique needs of your venue.",
        },
        {
          label: "Plan Integration",
          desc: "We coordinate with your design teams to carefully integrate the DAS or SCN into the architecture of your space, following all venue safety, training, and construction requirements.",
        },
        {
          label: "Finalize RF Design",
          desc: "Our radio frequency (RF) engineering team develops the network design in partnership with the original equipment manufacturers (OEMs) and wireless service providers.",
        },
      ],
    },
    {
      id: "construction",
      title: "Construction",
      iconSvg: (
        <svg
          className="tab-icon w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      themeColor: "#FFDAC8",
      steps: ["Work With Contractors", "Manage Project"],
      timelineItems: [
        {
          label: "Work With Contractors",
          desc: "We select qualified contractors with DAS experience related to your specific type of venue and coordinate closely with your own general contractor and sub-contractors.",
        },
        {
          label: "Manage Project",
          desc: "We oversee the construction progress, perform ongoing design reviews, and address challenges to ensure a seamless project experience.",
        },
      ],
    },
    {
      id: "optimization",
      title: "Optimization",
      iconSvg: (
        <svg
          className="tab-icon w-9 h-9 lg:w-10 lg:h-10"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      themeColor: "#D2C7FF",
      steps: ["Testing", "Fine Tuning"],
      timelineItems: [
        {
          label: "Testing",
          desc: "We partner with experienced testing firms, with oversight from our RF engineering team, to test the completed DAS or SCN.",
        },
        {
          label: "Fine Tuning",
          desc: "We adjust and optimize the network as needed and plan for any future updates.",
        },
      ],
    },
  ],
};

export default async function PrivateVenuesPage() {
  const [pageData, widgetData, processWidgetData] = await Promise.all([
    fetchAPI(
      "/api/pages?filters[slug][$eq]=private-venues&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=private-venues&populate[widgets][populate][Sections][populate]=*"
    ),
    fetchAPI(
      "/api/pages?filters[slug][$eq]=private-venues&populate[widgets][populate][Sections][on][shared.process][populate][ProcessStep][populate][ProcessCard][populate]=*&populate[widgets][populate][Sections][on][shared.process][populate][ProcessStep][populate][StepNameIconimg][populate]=*"
    ),
  ]);
  const privateVenuesContent: StrapiPageData | undefined = pageData?.data?.[0];
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

  const processData = privateVenuesContent?.sections?.find(
    (section: StrapiSection) => section.key === "Service delivery process"
  );
  const contactData = privateVenuesContent?.sections?.find(
    (section: StrapiSection) => section.key === "Contact Us"
  );

  const mappedProcessData = {
    title: processData?.title || PV_PROCESS_DATA.title,
    description: processData?.body || PV_PROCESS_DATA.description,
    pillars:
      processData?.cards && processData.cards.length > 0
        ? processData.cards.map((card: StrapiProcessCard, idx: number) => ({
            id: card.title?.toLowerCase() || `pillar-${idx}`,
            title: card.title || "",
            iconSvg: card.icon ? (
              <div dangerouslySetInnerHTML={{ __html: card.icon }} />
            ) : (
              PV_PROCESS_DATA.pillars[idx]?.iconSvg
            ),
            themeColor: PV_PROCESS_DATA.pillars[idx]?.themeColor || "#00e8d9",
            steps: card.InnerCard?.map((inner: StrapiInnerCard) => inner.heading || "") || [],
            timelineItems:
              card.InnerCard?.map((inner: StrapiInnerCard) => ({
                label: inner.heading || "",
                desc: inner.description || "",
              })) || [],
          }))
        : PV_PROCESS_DATA.pillars,
  };

  const hasInnerHeroWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiWidgetSection) => s.__component === "shared.inner-page-hero")
  );

  const sections: React.ReactElement[] = [];
  if (!hasInnerHeroWidget) {
    sections.push(<PrivateVenuesHero key="hero" data={privateVenuesContent} />);
  }

  [...globalWidgets].reverse().forEach((widget: StrapiWidget) => {
    const pos = widget.PositionNumber ?? sections.length;
    sections.splice(pos, 0, <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />);
  });

  // Fallback check: Did Strapi give us a widget that contains a CTA?
  const hasCtaWidget = globalWidgets.some((w: StrapiWidget) =>
    w.Sections?.some((s: StrapiWidgetSection) => s.__component?.includes("cta"))
  );

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

  // If no Process widget exists, inject the fallback Process
  if (!hasProcessWidget) {
    sections.splice(1, 0, <SharedProcess key="process-fallback" {...mappedProcessData} />);
  }

  // If no Testimonials widget exists, inject the fallback Testimonials
  if (!hasTestimonialsWidget) {
    sections.splice(
      hasProcessWidget ? 1 : 2,
      0,
      <div key="testimonials-fallback" className="row-storyteller-flow">
        <PrivateVenuesTestimonials
          data={privateVenuesContent?.sections?.find(
            (section: StrapiSection) => section.key === "Venue operators"
          )}
        />
      </div>
    );
  }

  // If no CTA widget exists, inject the fallback CTA at the very bottom!
  if (!hasCtaWidget) {
    sections.push(
      <GlobeCTA
        key="cta-fallback"
        title={
          contactData?.title ||
          "To see how we can support your connectivity needs, reach out to our dedicated venues team."
        }
        buttonText={contactData?.cta?.label || "Contact Us"}
        buttonLink={contactData?.cta?.url || "/contact"}
      />
    );
  }

  return <>{sections}</>;
}
