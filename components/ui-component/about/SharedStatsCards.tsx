import React from "react";
import { Typography } from "@ui-element";
import { SharedStatsCardsProps, StatsCardItem } from "./type";

export default function SharedStatsCards({
  Heading,
  Description,
  CradColorful,
  data,
}: SharedStatsCardsProps) {
  const defaultCards: StatsCardItem[] = [
    {
      Title: "39B",
      Description: "Expected number of IoT devices by 2030",
      Badge: "IoT Analytics, 2025",
    },
    {
      Title: "21GB",
      Description: "Average monthly mobile data consumption per capita",
      Badge: "Ericsson, 2025",
    },
    {
      Title: "89%",
      Description: "Expected share of 5G mobile connections in North America by 2030",
      Badge: "GSMA, 2025",
    },
  ];

  const rawCards =
    (CradColorful && CradColorful.length > 0 ? CradColorful : null) ||
    (data?.stats && data.stats.length > 0 ? data.stats : null) ||
    (data?.cards && data.cards.length > 0 ? data.cards : null) ||
    defaultCards;

  const items: StatsCardItem[] = rawCards.map((c) => {
    const item = c as Record<string, unknown>;
    return {
      Title: (item.Title || item.value || item.title || "") as string,
      Description: (item.Description || item.label || item.description || "") as string,
      Badge: (item.Badge || item.badge || "") as string,
      BgGradient: (item.BgGradient || item.bgGradient) as string | undefined,
    };
  });

  const headingStr = Heading || data?.title || "Why our infrastructure matters";

  // Glow and color schemes matching design
  const colorSchemes = [
    {
      barBg: "bg-[#00e8d9]",
      glowBg: "bg-[radial-gradient(circle,#00e8d9_0%,transparent_70%)]",
      cardBg: "bg-gradient-to-br from-[#e6faf8] via-[#d0f5f1] to-[#c2f0eb]",
    },
    {
      barBg: "bg-[#c8b3ff]",
      glowBg: "bg-[radial-gradient(circle,#c8b3ff_0%,transparent_70%)]",
      cardBg: "bg-gradient-to-br from-[#eeeafc] via-[#e2dbf8] to-[#d8d0f4]",
    },
    {
      barBg: "bg-[#ffba5c]",
      glowBg: "bg-[radial-gradient(circle,#ffba5c_0%,transparent_70%)]",
      cardBg: "bg-gradient-to-br from-[#fef3e8] via-[#fce9d5] to-[#f9e0c8]",
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-[2]">
      <div className="container mx-auto px-4 sm:px-6 relative z-[2]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            weight="light"
            className="section-title reveal text-midnight m-0 mb-0"
          >
            {headingStr}
          </Typography>
          {Description && (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-1 max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 m-0"
            >
              {Description}
            </Typography>
          )}
        </div>

        {/* Cards Grid: 1 col on mobile (< 768px), 3 cols on tablet/desktop (>= 768px) */}
        <div className="grid grid-cols-1 w-full max-w-[520px] mx-auto md:max-w-none md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-stretch reveal stagger-1">
          {items.map((item, index) => {
            const targetStr = item.Title || "0";
            const targetNum = parseFloat(targetStr) || 0;
            const suffix = targetStr.replace(targetNum.toString(), "").trim();

            let styleIndex = index % colorSchemes.length;
            if (item.BgGradient) {
              const bgLower = item.BgGradient.toLowerCase();
              if (
                bgLower.includes("green") ||
                bgLower.includes("mint") ||
                bgLower.includes("#e6faf8")
              )
                styleIndex = 0;
              else if (
                bgLower.includes("purple") ||
                bgLower.includes("lavender") ||
                bgLower.includes("#eeeafc")
              )
                styleIndex = 1;
              else if (
                bgLower.includes("peach") ||
                bgLower.includes("orange") ||
                bgLower.includes("yellow") ||
                bgLower.includes("#fef3e8")
              )
                styleIndex = 2;
            }

            const scheme = colorSchemes[styleIndex];

            return (
              <div
                key={index}
                className={`relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[28px] flex flex-row items-center gap-4 sm:gap-6 md:flex-col md:items-start md:justify-between border border-black/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] md:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl ${scheme.cardBg}`}
              >
                {/* Radial Glow Decoration */}
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-40 ${scheme.glowBg}`}
                  aria-hidden="true"
                />

                {/* Left on mobile, Top on desktop */}
                <div className="shrink-0 flex flex-col items-start relative z-[2]">
                  <Typography
                    variant="stat"
                    as="span"
                    weight="bold"
                    className="shared-stats-kpi-num counter text-midnight tracking-tight m-0 mb-0"
                    data-target={targetNum}
                    data-suffix={suffix}
                  >
                    {targetStr}
                  </Typography>
                  <div
                    className={`hidden md:block w-9 h-0.5 opacity-60 mt-3 mb-4 rounded-full ${scheme.barBg}`}
                  />
                </div>

                {/* Right on mobile, Bottom/Middle on desktop */}
                <div className="flex flex-col items-start gap-2.5 sm:gap-3 flex-1 min-w-0 md:w-full md:flex-1 md:justify-between relative z-[2]">
                  <Typography
                    variant="b2"
                    as="p"
                    className="text-midnight/85 m-0 leading-snug md:leading-relaxed"
                  >
                    {item.Description}
                  </Typography>
                  {item.Badge && (
                    <div className="md:mt-6">
                      <Typography
                        variant="b4"
                        as="span"
                        uppercase
                        weight="semibold"
                        className="whitespace-nowrap not-italic text-midnight/70 px-3 py-1 rounded-full border border-midnight/10 bg-white/40 inline-block text-[0.68rem] tracking-[0.06em]"
                      >
                        {item.Badge}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
