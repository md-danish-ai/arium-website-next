import React from "react";

interface JourneyTimelineItem {
  title: string;
  description: string;
  badge?: string;
}

interface AboutJourneyProps {
  data?: {
    title?: string;
    body?: string;
    cards?: JourneyTimelineItem[];
  };
}

export default function AboutJourney({ data }: AboutJourneyProps) {
  const defaultItems = [
    { title: "2010-2011", description: "Acquisition of NewPath and NextG establishes early leadership in DAS and small cell infrastructure." },
    { title: "2011-2020", description: "Platform expansion and operational integration across thousands of deployed nodes." },
    { title: "2020-2022", description: "Long-term carrier commitments add 50,000 small cells over five years." },
    { title: "2026", description: "Formation of Arium Networks with 100K+ small cells on-air or under contract.", badge: "LIVE" }
  ];

  const items = (data?.cards && data.cards.length > 0 ? data.cards : null) || defaultItems;
  const accentTextClasses = ["text-[#009E94]", "text-[#7B6AB8]", "text-[#C48E68]", "text-[#009E94]"];

  return (
    <section id="journey" className="section-light bg-white pt-20 pb-16 lg:pt-28 lg:pb-24 relative overflow-hidden z-[2]">
      <div className="container mx-auto px-6 relative z-[2]">
        {/* Header */}
        <div className="section-header text-center mb-16 md:mb-20">
          <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-[0.06em] text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.45] text-midnight uppercase">
            {data?.title || "A small cell leader from the beginning"}
          </h2>
          {data?.body ? (
            <div 
              className="section-description reveal stagger-2 strapi-richtext-body max-w-[780px] mx-auto mt-5 text-midnight/80 text-base leading-relaxed [&>p]:mb-0" 
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-5 text-midnight/80 text-base leading-relaxed">
              We&apos;ve been building small cell and DAS networks since the technology&apos;s inception, giving us a deep expertise that is embedded throughout our organization.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="journey-timeline reveal stagger-3">
          {/* Single continuous line */}
          <div className="journey-tl-line" aria-hidden="true" />
          {/* Milestone items */}
          <div className="journey-tl-items">
            {items.map((item, index) => {
              const textClass = accentTextClasses[index % accentTextClasses.length];
              return (
                <div 
                  key={index} 
                  className="journey-tl-item"
                >
                  <span 
                    className={`journey-tl-year ${textClass}`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="journey-tl-badge">
                        <span className="journey-tl-badge-dot" aria-hidden="true" />
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <p className="journey-tl-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
