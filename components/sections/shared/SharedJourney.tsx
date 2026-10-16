import React from "react";

interface SharedJourneyTimelineItem {
  Title: string;
  Content: string;
  TitleColor?: string;
  BadgeText?: string;
}

interface SharedJourneyProps {
  Heading?: string;
  Description?: string;
  TimeCards?: SharedJourneyTimelineItem[];
}

export default function SharedJourney({ Heading, Description, TimeCards }: SharedJourneyProps) {
  const defaultItems: SharedJourneyTimelineItem[] = [
    { Title: "2010-2011", Content: "Acquisition of NewPath and NextG establishes early leadership in DAS and small cell infrastructure." },
    { Title: "2011-2020", Content: "Platform expansion and operational integration across thousands of deployed nodes." },
    { Title: "2020-2022", Content: "Long-term carrier commitments add 50,000 small cells over five years." },
    { Title: "2026", Content: "Formation of Arium Networks with 100K+ small cells on-air or under contract.", BadgeText: "LIVE" }
  ];

  const items = (TimeCards && TimeCards.length > 0 ? TimeCards : null) || defaultItems;
  const accents = ["#009E94", "#7B6AB8", "#C48E68"];
  const headingStr = Heading || "A small cell leader from the beginning";
  const descStr = Description;

  return (
    <section id="shared-journey" className="section-light" style={{ background: "transparent", padding: "120px 0 60px", position: "relative", overflow: "hidden", zIndex: 2 }}>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: "80px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {headingStr}
          </h2>
          {descStr ? (
            descStr.includes("<") && descStr.includes(">") ? (
              <div 
                className="section-description reveal stagger-2 strapi-richtext-body" 
                style={{ maxWidth: "780px", margin: "20px auto 0" }}
                dangerouslySetInnerHTML={{ __html: descStr }}
              />
            ) : (
              <p className="section-description reveal stagger-2" style={{ maxWidth: "780px", margin: "20px auto 0" }}>
                {descStr}
              </p>
            )
          ) : (
            <p className="section-description reveal stagger-2" style={{ maxWidth: "780px", margin: "20px auto 0" }}>
              We&apos;ve been building small cell and DAS networks since the technology&apos;s inception, giving us a deep expertise that is embedded throughout our organization.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="shared-journey-timeline reveal stagger-3">
          {/* Single continuous line */}
          <div className="shared-journey-tl-line" aria-hidden="true"></div>
          {/* Milestone items */}
          <div className="shared-journey-tl-items">
            {items.map((item, index) => {
              const accentColor = item.TitleColor || accents[index % accents.length];
              return (
                <div key={index} className="shared-journey-tl-item" style={{ "--accent": accentColor } as React.CSSProperties}>
                  <span className="shared-journey-tl-year">
                    {item.Title}
                    {item.BadgeText && (
                      <span style={{ fontSize: "0.55rem", background: "rgba(0,232,217,0.12)", padding: "2px 8px", borderRadius: "10px", marginLeft: "4px", verticalAlign: "middle" }}>
                        &#9679; {item.BadgeText}
                      </span>
                    )}
                  </span>
                  <p className="shared-journey-tl-desc">{item.Content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
