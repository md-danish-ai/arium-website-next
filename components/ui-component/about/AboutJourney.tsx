import React from "react";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { AboutJourneyProps } from "./type";

const ACCENT_STYLES = [
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

export default function AboutJourney({ heading, description, timelineItems }: AboutJourneyProps) {
  return (
    <section
      id="shared-journey"
      className="bg-white py-16 md:py-20 lg:py-28 relative overflow-hidden z-[2]"
    >
      <Container className="relative z-[2]">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            weight="light"
            className="section-title reveal stagger-1 text-midnight m-0 mb-0 min-[1080px]:text-[clamp(1.9rem,0.5rem+2.2vw,2.4rem)]"
          >
            {heading}
          </Typography>

          {description &&
            (description.includes("<") && description.includes(">") ? (
              <div
                className="section-description reveal stagger-2 strapi-richtext-body max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 leading-relaxed [&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <Typography
                variant="b1"
                as="p"
                className="section-description reveal stagger-2 max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 m-0"
              >
                {description}
              </Typography>
            ))}
        </div>

        {/* Timeline */}
        <div className="relative w-full max-w-[520px] md:max-w-none mx-auto reveal stagger-3">
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

          {/* Milestone items */}
          <div className="flex flex-col gap-9 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-4 xl:gap-6 relative z-[2] lg:[&:hover>div]:opacity-40 lg:[&>div:hover]:!opacity-100">
            {timelineItems.map((item, index) => {
              const accent = ACCENT_STYLES[index % ACCENT_STYLES.length];
              const itemTitle = item.title;
              const itemDesc = item.description;
              const itemBadge = item.badgeText;

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
      </Container>
    </section>
  );
}
