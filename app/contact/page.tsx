import React from "react";
import type { Metadata } from "next";
import { SubPageHeroBanner } from "@ui-common";
import ContactForm from "@ui-component/contact/ContactForm";
import { fetchAPI, fetchPageWidgets } from "@lib/api";
import { combinePageSections, hasWidgetComponent, getPageMetadata } from "@utils";
import type { StrapiPageData, StrapiWidget, SectionEntry } from "@types";
import {
  CONTACT_TOPIC_OPTIONS,
  CONTACT_HERO_FALLBACK,
  CONTACT_SEO_FALLBACK,
} from "@data/contact.data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact", CONTACT_SEO_FALLBACK);
}

export default async function ContactPage() {
  const [pageData, widgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=contact&populate=*"),
    fetchPageWidgets("contact"),
  ]);

  const contactContent: StrapiPageData | undefined = pageData?.data?.[0];
  const globalWidgets: StrapiWidget[] = widgetData?.data?.[0]?.widgets || [];

  const hasSubPageHeroWidget = hasWidgetComponent(globalWidgets, "sub-page-hero");

  const heroTitle = contactContent?.heroTitle || CONTACT_HERO_FALLBACK.title;
  const heroDescription = contactContent?.heroDescription || CONTACT_HERO_FALLBACK.description;
  const heroBg =
    (contactContent?.background_gradient as string) || CONTACT_HERO_FALLBACK.background_gradient;

  const fallbackSections: SectionEntry[] = [
    {
      pos: 1,
      key: "sub-page-hero",
      skip: hasSubPageHeroWidget,
      el: (
        <SubPageHeroBanner
          key="sub-page-hero"
          id="contact-header"
          title={heroTitle}
          description={heroDescription}
          background_gradient={heroBg}
        />
      ),
    },
    {
      pos: 2,
      key: "contact-form",
      el: <ContactForm key="contact-form" topicOptions={CONTACT_TOPIC_OPTIONS} />,
    },
  ];

  const renderedSections = combinePageSections(fallbackSections, globalWidgets);

  return <>{renderedSections}</>;
}
