import React from "react";
import { Typography } from "@ui-element";
import { SharedJourneyProps, SharedJourneyTimelineItem } from "./type";

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

  const items: SharedJourneyTimelineItem[] = rawCards.map((c) => {
    const item = c as Record<string, unknown>;
    return {
      Title: (item.Title || item.title || "") as string,
      Content: (item.Content || item.description || item.body || item.content || "") as string,
      TitleColor: (item.TitleColor || item.titleColor) as string | undefined,
      BadgeText: (item.BadgeText || item.badge || item.badgeText) as string | undefined,
    };
  });

  const accentStyles = [
    {
      text: "!text-[#009E94]",
      hoverText: "group-hover:!text-[#00e8d9]",
      dotBg: "bg-[#009E94]",
    },
    {
      text: "!text-[#7B6AB8]",
      hoverText: "group-hover:!text-[#c0b3ff]",
      dotBg: "bg-[#7B6AB8]",
    },
    {
      text: "!text-[#C48E68]",
      hoverText: "group-hover:!text-[#ffdac8]",
      dotBg: "bg-[#C48E68]",
    },
    {
      text: "!text-[#009E94]",
      hoverText: "group-hover:!text-[#00e8d9]",
      dotBg: "bg-[#009E94]",
    },
  ];

  const headingStr = Heading || data?.title || "A small cell leader from the beginning";
  const descStr = Description || data?.body;

  return (
    <section
      id="shared-journey"
      className="bg-white py-16 md:py-20 lg:py-28 relative overflow-hidden z-[2]"
    >
      <div className="container mx-auto px-6 relative z-[2]">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            weight="light"
            className="section-title reveal stagger-1 text-midnight m-0 mb-0"
          >
            {headingStr}
          </Typography>

          {descStr ? (
            descStr.includes("<") && descStr.includes(">") ? (
              <div
                className="section-description reveal stagger-2 strapi-richtext-body max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 leading-relaxed [&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: descStr }}
              />
            ) : (
              <Typography
                variant="b1"
                as="p"
                className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 m-0"
              >
                {descStr}
              </Typography>
            )
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 m-0"
            >
              We&apos;ve been building small cell and DAS networks since the technology&apos;s
              inception, giving us a deep expertise that is embedded throughout our organization.
            </Typography>
          )}
        </div>

        {/* Timeline */}
        <div className="relative w-full max-w-[520px] md:max-w-[1200px] xl:max-w-[1420px] mx-auto reveal stagger-3">
          {/* Mobile vertical timeline line (< md) */}
          <div
            className="md:hidden absolute left-[5px] top-2 bottom-3 w-[2px] z-[1]"
            style={{
              background:
                "linear-gradient(to bottom, #009e94 0%, #7b6ab8 33%, #c48e68 66%, #009e94 100%)",
            }}
            aria-hidden="true"
          />

          {/* Continuous horizontal line on desktop between year and description (>= lg) */}
          <div
            className="hidden lg:block absolute top-[68px] left-0 right-0 h-[2px] bg-gradient-to-r from-[rgba(0,158,148,0.6)] via-[rgba(123,106,184,0.6)] to-[rgba(0,158,148,0.6)] z-[1]"
            aria-hidden="true"
          />

          {/* Milestone items: vertical stack with line on mobile (< md), 2-col on tablet (md), 4-col on desktop (lg) */}
          <div className="flex flex-col gap-9 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-4 xl:gap-6 relative z-[2] lg:[&:hover>div]:opacity-40 lg:[&>div:hover]:!opacity-100">
            {items.map((item, index) => {
              const accent = accentStyles[index % accentStyles.length];
              const itemTitle = item.Title || "";
              const itemDesc = item.Content || "";
              const itemBadge = item.BadgeText;

              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-start text-left pl-8 md:pl-6 p-0 md:p-6 lg:p-5 rounded-2xl bg-transparent md:bg-white/70 border-0 md:border md:border-[#162047]/[0.08] shadow-none md:shadow-sm lg:bg-transparent lg:border-transparent lg:shadow-none lg:hover:bg-[#1a254b] lg:hover:bg-gradient-to-br lg:hover:from-[#1e2d5c] lg:hover:to-[#182350] lg:hover:border-white/10 lg:hover:shadow-[0_8px_28px_-6px_rgba(13,18,36,0.35)] transition-all duration-300 cursor-default"
                >
                  {/* Mobile milestone bullet dot (< md) */}
                  <span
                    className={`md:hidden absolute left-0 top-[6px] w-3 h-3 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(22,32,71,0.08)] z-10 ${accent.dotBg}`}
                    aria-hidden="true"
                  />

                  {/* Year & Badge Header */}
                  <div className="pb-1.5 md:pb-3 lg:pb-5 w-full flex items-center justify-start gap-2">
                    <Typography
                      variant="h5"
                      as="span"
                      uppercase
                      weight="extrabold"
                      className={`tracking-[0.06em] m-0 mb-0 transition-all duration-300 origin-left lg:group-hover:scale-105 lg:group-hover:translate-y-1 block ${accent.text} ${accent.hoverText}`}
                    >
                      {itemTitle}
                    </Typography>

                    {itemBadge && (
                      <span className="whitespace-nowrap inline-flex items-center gap-1.5 text-[0.62rem] leading-none bg-[#daf3f2] text-[#009e94] px-2 py-1 rounded-full font-bold tracking-[0.06em] uppercase align-middle lg:group-hover:!bg-[#00e8d9]/25 lg:group-hover:!text-[#00e8d9] transition-all duration-300 -translate-y-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#009e94] lg:group-hover:!bg-[#00e8d9] shrink-0 inline-block transition-colors duration-300"
                          aria-hidden="true"
                        />
                        {itemBadge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <Typography
                    variant="b3"
                    as="p"
                    className="text-[#162047]/80 lg:group-hover:!text-white transition-all duration-300 lg:pt-5 lg:group-hover:-translate-y-1 m-0 leading-relaxed"
                  >
                    {itemDesc}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
