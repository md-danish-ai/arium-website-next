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
  data?: {
    title?: string;
    body?: string;
    cards?: any[];
  };
}

export default function SharedJourney({
  Heading,
  Description,
  TimeCards,
  data,
}: SharedJourneyProps) {
  const defaultItems: SharedJourneyTimelineItem[] = [
    {
      Title: "2010-2011",
      Content:
        "Acquisition of NewPath and NextG establishes early leadership in DAS and small cell infrastructure.",
    },
    {
      Title: "2011-2020",
      Content: "Platform expansion and operational integration across thousands of deployed nodes.",
    },
    {
      Title: "2020-2022",
      Content: "Long-term carrier commitments add 50,000 small cells over five years.",
    },
    {
      Title: "2026",
      Content: "Formation of Arium Networks with 100K+ small cells on-air or under contract.",
      BadgeText: "LIVE",
    },
  ];

  const rawCards =
    (TimeCards && TimeCards.length > 0 ? TimeCards : null) ||
    (data?.cards && data.cards.length > 0 ? data.cards : null) ||
    defaultItems;
  const items = rawCards.map((c: any) => ({
    Title: c.Title || c.title || "",
    Content: c.Content || c.description || c.body || "",
    TitleColor: c.TitleColor || c.titleColor,
    BadgeText: c.BadgeText || c.badge || c.badgeText,
  }));
  const accentTextClasses = [
    "text-[#009E94]",
    "text-[#7B6AB8]",
    "text-[#C48E68]",
    "text-[#009E94]",
  ];
  const headingStr = Heading || data?.title || "A small cell leader from the beginning";
  const descStr = Description || data?.body;

  return (
    <section
      id="shared-journey"
      className="section-light bg-white pt-20 pb-16 lg:pt-28 lg:pb-24 relative overflow-hidden z-[2]"
    >
      <div className="container mx-auto px-6 relative z-[2]">
        {/* Header */}
        <div className="section-header text-center mb-16 md:mb-20">
          <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-[0.06em] text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.45] text-midnight uppercase">
            {headingStr}
          </h2>
          {descStr ? (
            descStr.includes("<") && descStr.includes(">") ? (
              <div
                className="section-description reveal stagger-2 strapi-richtext-body max-w-[780px] mx-auto mt-5 text-midnight/80 text-base leading-relaxed [&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: descStr }}
              />
            ) : (
              <p className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-5 text-midnight/80 text-base leading-relaxed">
                {descStr}
              </p>
            )
          ) : (
            <p className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-5 text-midnight/80 text-base leading-relaxed">
              We&apos;ve been building small cell and DAS networks since the technology&apos;s
              inception, giving us a deep expertise that is embedded throughout our organization.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="shared-journey-timeline reveal stagger-3">
          {/* Continuous horizontal line on desktop */}
          <div className="shared-journey-tl-line" aria-hidden="true" />
          {/* Milestone items */}
          <div className="shared-journey-tl-items">
            {items.map((item, index) => {
              const textClass = accentTextClasses[index % accentTextClasses.length];
              const itemTitle = item.Title || (item as any).title || "";
              const itemDesc =
                item.Content ||
                (item as any).content ||
                (item as any).description ||
                (item as any).body ||
                "";
              const itemBadge = item.BadgeText || (item as any).badge || (item as any).badgeText;

              return (
                <div key={index} className="shared-journey-tl-item">
                  <span className={`shared-journey-tl-year ${textClass}`}>
                    <span>{itemTitle}</span>
                    {itemBadge && (
                      <span className="shared-journey-tl-badge">
                        <span className="shared-journey-tl-badge-dot" aria-hidden="true" />
                        {itemBadge}
                      </span>
                    )}
                  </span>
                  <p className="shared-journey-tl-desc">{itemDesc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
