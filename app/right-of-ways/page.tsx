import RightOfWayHero from "../../components/sections/where-we-build/RightOfWayHero";
import SharedProcess from "../../components/sections/shared/SharedProcess";
import RightOfWayTestimonials from "../../components/sections/where-we-build/RightOfWayTestimonials";
import GlobeCTA from "../../components/sections/shared/GlobeCTA";
import PageAnimations from "../../components/animations/PageAnimations";
import GlobalWidgetRenderer from "../../components/shared/GlobalWidgetRenderer";
import React from "react";

export const dynamic = "force-dynamic";


import type { Metadata } from "next";
import { fetchAPI } from "../../lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=right-of-ways&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Right of Way | Arium Networks",
    description: seo?.metaDescription || "As technology advances, Arium Networks is building the small cells that keep communities connected to what matters.",
    openGraph: {
      title: seo?.ogTitle || "Right of Way | Arium Networks",
      description: seo?.ogDescription || "As technology advances, Arium Networks is building the small cells that keep communities connected to what matters.",
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



const ROW_PROCESS_DATA = {
  title: "Our structured process for building small cells",
  description: "Every community is different, but we have a proven process for navigating complexities and designing infrastructure to meet your wireless connectivity needs.",
  pillars: [
    {
      id: "assessment",
      title: "Assessment",
      iconSvg: <svg className="tab-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
      themeColor: "#FBCBB5",
      steps: ["Evaluate Needs", "Identify Sites", "Assess Regulations", "Minimizing Disruption"],
      timelineItems: [
        { label: "Evaluate Needs", desc: "Wireless providers identify areas of need for residents, business owners, and first responders." },
        { label: "Identify Sites", desc: "We evaluate existing sites we can use and work with wireless providers to strategically select the best locations to install new small cells." },
        { label: "Assess Regulations", desc: "We conduct a thorough assessment of local codes, regulations, and expected impact on the community." },
        { label: "Minimizing Disruption", desc: "We have CLEC status in most states, which means we can often install on existing assets in the public right of way, like utility poles and streetlights." }
      ]
    },
    {
      id: "planning",
      title: "Planning",
      iconSvg: <svg className="tab-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>,
      themeColor: "#FBCBB5",
      steps: ["Work Together", "Follow Regulations", "Submit Applications", "Stakeholder Engagement"],
      timelineItems: [
        { label: "Work Together", desc: "We collaborate with your public works and utilities departments to finalize small cell site locations and designs." },
        { label: "Follow Regulations", desc: "We have experience navigating state, local, and federal processes and regulations and will take care to ensure they are properly followed." },
        { label: "Submit Applications", desc: "We work with you to submit information, permits, and applications to align with municipal guidelines and state and federally mandated timeframes." },
        { label: "Stakeholder Engagement", desc: "We coordinate with government officials and stakeholders to provide information about deployments, staying aligned with local processes and requirements." }
      ]
    },
    {
      id: "construction",
      title: "Construction",
      iconSvg: <svg className="tab-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>,
      themeColor: "#FBCBB5",
      steps: ["Secure Permits", "Work with Vendors", "Follow Codes", "Complete Installation"],
      timelineItems: [
        { label: "Secure Permits", desc: "We apply for additional permits, including traffic control permits, and we support the local utility in applying for any necessary authorizations." },
        { label: "Work with Vendors", desc: "When possible, we prioritize working with local vendors in the community for materials and installation." },
        { label: "Follow Codes", desc: "We ensure all work follows local, state, and federal codes, including building, public works, electrical, and FCC guidelines." },
        { label: "Complete Installation", desc: "We work with the right officials to oversee construction, secure certificates of completion and occupancy, and plan future installations." }
      ]
    }
  ]
};

const ROW_TESTIMONIALS_DATA = {
  title: "What community leaders are saying",
  testimonials: [
    {
      quote: "Arium Networks has been a great partner. They understand how important it is to be collaborative and get the right inputs, so that we have a great design.",
      authorName: "Kurt Woehr",
      authorRole: "Director of RAN Engineering, AT&T",
      glassColor: "0, 232, 217"
    },
    {
      quote: "Arium Networks has the skills and the techniques to work hand-in-hand with the city and implement a project of this scale.",
      authorName: "Joe Slowik",
      authorRole: "Director of Operations, Verizon",
      glassColor: "255, 218, 200"
    }
  ]
};



export default async function RightOfWayPage() {
  const [pageData, widgetData, processWidgetData] = await Promise.all([
    fetchAPI("/api/pages?filters[slug][$eq]=right-of-ways&populate[heroCtas]=*&populate[sections][populate][cards][populate]=InnerCard"),
    fetchAPI("/api/pages?filters[slug][$eq]=right-of-ways&populate[widgets][populate][Sections][populate]=*"),
    fetchAPI("/api/pages?filters[slug][$eq]=right-of-ways&populate[widgets][populate][Sections][on][shared.process][populate][ProcessStep][populate][ProcessCard][populate]=*&populate[widgets][populate][Sections][on][shared.process][populate][ProcessStep][populate][StepNameIconimg][populate]=*"),
  ]);
  const rightOfWayContent = pageData?.data?.[0];
  // Merge ProcessCard data into the widget Sections from the deep fetch
  const rawWidgets: any[] = (widgetData?.data?.[0]?.widgets) || [];
  const deepWidgets: any[] = (processWidgetData?.data?.[0]?.widgets) || [];
  const globalWidgets = rawWidgets.map((widget: any) => {
    const deepWidget = deepWidgets.find((dw: any) => dw.id === widget.id);
    if (!deepWidget) return widget;
    return {
      ...widget,
      Sections: widget.Sections?.map((section: any) => {
        if (section.__component !== 'shared.process') return section;
        const deepSection = deepWidget.Sections?.find((ds: any) => ds.id === section.id && ds.__component === 'shared.process');
        return deepSection ? { ...section, ...deepSection } : section;
      })
    };
  });

  const processData = rightOfWayContent?.sections?.find((section: any) => section.key === "Structured process");
  const contactData = rightOfWayContent?.sections?.find((section: any) => section.key === "Contact Us");

  const mappedProcessData = {
    title: processData?.title || ROW_PROCESS_DATA.title,
    description: processData?.body || ROW_PROCESS_DATA.description,
    pillars: processData?.cards && processData.cards.length > 0 ? processData.cards.map((card: any, idx: number) => ({
      id: card.title?.toLowerCase() || `pillar-${idx}`,
      title: card.title,
      iconSvg: card.icon ? <div dangerouslySetInnerHTML={{ __html: card.icon }} /> : ROW_PROCESS_DATA.pillars[idx]?.iconSvg,
      themeColor: ROW_PROCESS_DATA.pillars[idx]?.themeColor || "#FBCBB5",
      steps: card.InnerCard?.map((inner: any) => inner.heading) || [],
      timelineItems: card.InnerCard?.map((inner: any) => ({
        label: inner.heading,
        desc: inner.description
      })) || []
    })) : ROW_PROCESS_DATA.pillars
  };

  const hasInnerHeroWidget = globalWidgets.some((w: any) =>
    w.Sections?.some((s: any) => s.__component === 'shared.inner-page-hero')
  );

  const sectionObjects: { pos: number; element: React.ReactElement }[] = [];

  // 1. Add widgets
  globalWidgets.forEach((widget: any) => {
    const pos = widget.PositionNumber ?? 999;
    sectionObjects.push({
      pos,
      element: <GlobalWidgetRenderer key={`widget-${widget.id}`} widget={widget} />
    });
  });

  // 2. Add fallbacks for missing widgets
  if (!hasInnerHeroWidget) {
    sectionObjects.push({ pos: 1, element: <RightOfWayHero key="hero" data={rightOfWayContent} /> });
  }

  // Fallback check: Did Strapi give us a widget that contains a Process?
  const hasProcessWidget = globalWidgets.some((w: any) => 
    w.Sections?.some((s: any) => s.__component === 'shared.process')
  );

  // Fallback check: Did Strapi give us a widget that contains Testimonials?
  const hasTestimonialsWidget = globalWidgets.some((w: any) => 
    w.Sections?.some((s: any) => s.__component?.includes('testimonial') || s.__component?.includes('testimonail'))
  );

  // Fallback check: Did Strapi give us a widget that contains a CTA?
  const hasCtaWidget = globalWidgets.some((w: any) => 
    w.Sections?.some((s: any) => s.__component?.includes('cta'))
  );

  if (!hasProcessWidget) {
    sectionObjects.push({ pos: 2, element: <SharedProcess key="process-fallback" {...mappedProcessData} /> });
  }

  if (!hasTestimonialsWidget) {
    sectionObjects.push({ pos: 3, element: (
      <div key="testimonials-fallback" className="row-storyteller-flow">
        <RightOfWayTestimonials data={rightOfWayContent?.sections?.find((section: any) => section.key === "Feedback")} />
      </div>
    )});
  }

  if (!hasCtaWidget) {
    sectionObjects.push({ pos: 4, element: (
      <GlobeCTA
        key="cta-fallback"
        title={contactData?.title || "To see how we can support your infrastructure needs, reach out to our dedicated municipal team."}
        buttonText={contactData?.cta?.label || "Contact Us"}
        buttonLink={contactData?.cta?.url || "/contact"}
      />
    )});
  }

  // 3. Sort by position
  sectionObjects.sort((a, b) => a.pos - b.pos);
  const sections = sectionObjects.map(obj => obj.element);

  return (
    <main id="main-content">
      <PageAnimations />
      {sections}
    </main>
  );
}
