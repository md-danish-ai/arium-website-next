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
        <div className="shared-journey-timeline reveal stagger-3 relative w-full max-w-[1200px] xl:max-w-[1420px] mx-auto pl-9 pr-4 md:px-0 mt-5 md:mt-0">
          {/* Continuous horizontal line on desktop, vertical on mobile, hidden on tablet */}
          <div
            className="shared-journey-tl-line absolute z-[1] block md:hidden min-[1080px]:block left-[12px] top-2 bottom-2 w-[2px] h-auto right-auto bg-gradient-to-b from-[#009e94] via-[#7b6ab8] to-[#009e94] min-[1080px]:top-[72px] min-[1080px]:left-0 min-[1080px]:right-0 min-[1080px]:w-auto min-[1080px]:h-[2px] min-[1080px]:bg-gradient-to-r min-[1080px]:from-[rgba(0,158,148,0.6)] min-[1080px]:via-[rgba(123,106,184,0.6)] min-[1080px]:to-[rgba(0,158,148,0.6)]"
            aria-hidden="true"
          />
          {/* Milestone items */}
          <div className="shared-journey-tl-items flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 min-[1080px]:grid-cols-4 min-[1080px]:gap-4 xl:gap-0 relative z-[2]">
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
                <div
                  key={index}
                  className="shared-journey-tl-item relative flex flex-col items-start text-left p-0 border-none bg-transparent shadow-none max-w-[320px] md:max-w-none md:bg-white/60 md:border md:border-[#162047]/[0.08] md:rounded-2xl md:p-6 min-[1080px]:bg-transparent min-[1080px]:border-transparent min-[1080px]:p-5 xl:p-5 min-[1080px]:rounded-2xl min-[1080px]:transition-all min-[1080px]:duration-300"
                >
                  {/* Mobile bullet dot along the vertical timeline */}
                  <span
                    className="md:hidden absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-[#009e94] border-2 border-white shadow-[0_0_0_3px_rgba(22,32,71,0.04)] z-[3]"
                    aria-hidden="true"
                  />
                  <span
                    className={`shared-journey-tl-year ${textClass} pb-1.5 md:pb-0 min-[1080px]:pb-5 font-heading font-extrabold text-[1.15rem] md:text-[1.15rem] min-[1080px]:text-[1.3rem] uppercase tracking-[0.06em]`}
                  >
                    <span>{itemTitle}</span>
                    {itemBadge && (
                      <span className="shared-journey-tl-badge">
                        <span className="shared-journey-tl-badge-dot" aria-hidden="true" />
                        {itemBadge}
                      </span>
                    )}
                  </span>
                  <p className="shared-journey-tl-desc pt-0 md:pt-3 text-[0.85rem] md:text-[0.85rem] min-[1080px]:text-[0.9rem] leading-[1.6] md:leading-[1.7] text-midnight/75 md:text-midnight/85">
                    {itemDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
