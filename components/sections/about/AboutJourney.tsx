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
  const accents = ["#009E94", "#7B6AB8", "#C48E68"];

  return (
    <section id="journey" className="section-light" style={{ background: "transparent", padding: "120px 0 60px", position: "relative", overflow: "hidden", zIndex: 2 }}>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: "80px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "A small cell leader from the beginning"}
          </h2>
          {data?.body ? (
            <div 
              className="section-description reveal stagger-2 strapi-richtext-body" 
              style={{ maxWidth: "780px", margin: "16px auto 0", marginTop: "20px" }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="section-description reveal stagger-2" style={{ maxWidth: "780px", margin: "16px auto 0", marginTop: "20px" }}>
              We&apos;ve been building small cell and DAS networks since the technology&apos;s inception, giving us a deep expertise that is embedded throughout our organization.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="journey-timeline reveal stagger-3">
          {/* Single continuous line */}
          <div className="journey-tl-line" aria-hidden="true"></div>
          {/* Milestone items */}
          <div className="journey-tl-items">
            {items.map((item, index) => {
              const accentColor = accents[index % accents.length];
              return (
                <div key={index} className="journey-tl-item" style={{ "--accent": accentColor } as React.CSSProperties}>
                  <span className="journey-tl-year">
                    {item.title}
                    {item.badge && (
                      <span style={{ fontSize: "0.55rem", background: "rgba(0,232,217,0.12)", padding: "2px 8px", borderRadius: "10px", marginLeft: "4px", verticalAlign: "middle" }}>
                        &#9679; {item.badge}
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
