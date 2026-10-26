import React from "react";
import { Typography, AboutStatCard } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { AboutStatsCardsProps } from "./type";

const COLOR_SCHEMES = [
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

export default function AboutStatsCards({ heading, description, stats }: AboutStatsCardsProps) {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-[2]">
      <Container className="relative z-[2]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            weight="light"
            className="section-title reveal text-midnight m-0 mb-0"
          >
            {heading}
          </Typography>
          {description && (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-1 max-w-[780px] mx-auto mt-4 md:mt-5 text-midnight/80 m-0"
            >
              {description}
            </Typography>
          )}
        </div>

        {/* Cards Grid: 1 col on mobile (< 768px), 3 cols on tablet/desktop (>= 768px) */}
        <div className="grid grid-cols-1 w-full max-w-[520px] mx-auto md:max-w-none md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-stretch reveal stagger-1">
          {stats.map((item, index) => {
            const targetStr = item.title || "0";
            const targetNum = parseFloat(targetStr) || 0;
            const suffix = targetStr.replace(targetNum.toString(), "").trim();

            let styleIndex = index % COLOR_SCHEMES.length;
            if (item.bgGradient) {
              const bgLower = item.bgGradient.toLowerCase();
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

            const scheme = COLOR_SCHEMES[styleIndex];

            return (
              <AboutStatCard
                key={index}
                targetStr={targetStr}
                targetNum={targetNum}
                suffix={suffix}
                description={item.description}
                badge={item.badge}
                cardBg={scheme.cardBg}
                glowBg={scheme.glowBg}
                barBg={scheme.barBg}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
