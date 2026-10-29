import React from "react";
import type { Metadata } from "next";
import ContactHero from "@ui-component/contact/ContactHero";
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

  const hasInnerHeroWidget = hasWidgetComponent(globalWidgets, "inner-page-hero");

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
