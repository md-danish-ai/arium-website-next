import React from "react";

interface StatsCardItem {
  Title?: string;
  Description?: string;
  Badge?: string;
  BgGradient?: string;
}

interface SharedStatsCardsProps {
  Heading?: string;
  Description?: string;
  CradColorful?: StatsCardItem[];
  data?: {
    title?: string;
    body?: string;
    stats?: any[];
    cards?: any[];
  };
}

export default function SharedStatsCards({ Heading, Description, CradColorful, data }: SharedStatsCardsProps) {
  const defaultCards: StatsCardItem[] = [
    { Title: "39B", Description: "Expected number of IoT devices by 2030", Badge: "IoT Analytics, 2025" },
    { Title: "21GB", Description: "Average monthly mobile data consumption per capita", Badge: "Ericsson, 2025" },
    { Title: "89%", Description: "Expected share of 5G mobile connections in North America by 2030", Badge: "GSMA, 2025" }
  ];

  const rawCards = (CradColorful && CradColorful.length > 0 ? CradColorful : null) || (data?.stats && data.stats.length > 0 ? data.stats : null) || (data?.cards && data.cards.length > 0 ? data.cards : null) || defaultCards;
  const items = rawCards.map((c: any) => ({
    Title: c.Title || c.value || c.title || "",
    Description: c.Description || c.label || c.description || "",
    Badge: c.Badge || c.badge || "",
    BgGradient: c.BgGradient || c.bgGradient,
  }));
  const headingStr = Heading || data?.title || "Why our infrastructure matters";

  // Default glow and color schemes mimicking the design with Tailwind
  const colorSchemes = [
    {
      barBg: "bg-[#00e8d9]",
      glowBg: "bg-[radial-gradient(circle,#00e8d9_0%,transparent_70%)]",
      cardBg: "bg-gradient-to-br from-[#e6faf8] via-[#d0f5f1] to-[#c2f0eb]"
    },
    {
      barBg: "bg-[#c8b3ff]",
      glowBg: "bg-[radial-gradient(circle,#c8b3ff_0%,transparent_70%)]",
      cardBg: "bg-gradient-to-br from-[#eeeafc] via-[#e2dbf8] to-[#d8d0f4]"
    },
    {
      barBg: "bg-[#ffba5c]",
      glowBg: "bg-[radial-gradient(circle,#ffba5c_0%,transparent_70%)]",
      cardBg: "bg-gradient-to-br from-[#fef3e8] via-[#fce9d5] to-[#f9e0c8]"
    }
  ];

  return (
    <section className="shared-stats-cards-section section-light bg-white py-24 relative overflow-hidden z-[2]">
      <div className="container mx-auto px-6 relative z-[2]">
        <div className="section-header text-center mb-20">
          <h2 className="section-title reveal font-heading font-normal tracking-[0.06em] text-[2.4rem] leading-[1.45] text-midnight uppercase">
            {headingStr}
          </h2>
          {Description && (
            <p className="section-description reveal stagger-1 max-w-[780px] mx-auto mt-5 text-midnight/85 text-base leading-relaxed">
              {Description}
            </p>
          )}
        </div>

        <div className="shared-stats-cards reveal stagger-1 grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch max-w-[1420px] mx-auto">
          {items.map((item, index) => {
            const targetStr = item.Title || "0";
            const targetNum = parseFloat(targetStr) || 0;
            const suffix = targetStr.replace(targetNum.toString(), "").trim();

            let styleIndex = index % colorSchemes.length;
            if (item.BgGradient) {
              const bgLower = item.BgGradient.toLowerCase();
              if (bgLower.includes("green") || bgLower.includes("mint") || bgLower.includes("#e6faf8")) styleIndex = 0;
              else if (bgLower.includes("purple") || bgLower.includes("lavender") || bgLower.includes("#eeeafc")) styleIndex = 1;
              else if (bgLower.includes("peach") || bgLower.includes("orange") || bgLower.includes("yellow") || bgLower.includes("#fef3e8")) styleIndex = 2;
            }

            const scheme = colorSchemes[styleIndex];

            return (
              <div
                key={index}
                className={`shared-stats-kpi relative p-11 pb-9 rounded-3xl flex flex-col gap-5 border border-black/5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-xl ${scheme.cardBg}`}
              >
                <div
                  className={`shared-stats-kpi-accent absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-40 ${scheme.glowBg}`}
                  aria-hidden="true"
                />
                <div className="shared-stats-kpi-num-row relative z-[2] flex items-baseline">
                  <span className="shared-stats-kpi-num counter font-heading text-[4.2rem] font-extrabold text-midnight leading-none tracking-[-0.04em]" data-target={targetNum} data-suffix={suffix}>
                    0
                  </span>
                </div>
                <div className={`w-9 h-0.5 opacity-60 mb-1 ${scheme.barBg}`} />
                <p className="shared-stats-kpi-label relative z-[2] text-midnight/85 text-base leading-[1.65] m-0">{item.Description}</p>
                {item.Badge && (
                  <cite className="shared-stats-kpi-cite self-start text-[0.68rem] not-italic font-semibold uppercase tracking-[0.12em] text-midnight/75 mt-6 px-3.5 py-1.5 rounded-full border border-midnight/10 bg-white/40">
                    {item.Badge}
                  </cite>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
