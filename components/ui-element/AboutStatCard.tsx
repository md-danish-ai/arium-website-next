import React from "react";
import Typography from "./Typography";

export interface AboutStatCardProps {
  targetStr?: string;
  title?: string;
  targetNum?: number;
  suffix?: string;
  description: string;
  badge?: string;
  cardBg?: string;
  glowBg?: string;
  barBg?: string;
  className?: string;
}

export default function AboutStatCard({
  targetStr,
  title,
  targetNum,
  suffix,
  description,
  badge,
  cardBg = "",
  glowBg = "",
  barBg = "",
  className = "",
}: AboutStatCardProps) {
  const displayTitle = targetStr ?? title ?? "0";
  const num = targetNum ?? (parseFloat(displayTitle) || 0);
  const suf = suffix ?? displayTitle.replace(num.toString(), "").trim();

  return (
    <div
      className={`relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[28px] flex flex-row items-center gap-4 sm:gap-6 md:flex-col md:items-start md:justify-between border border-black/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] md:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl ${cardBg} ${className}`}
    >
      {/* Radial Glow Decoration */}
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-40 ${glowBg}`}
        aria-hidden="true"
      />

      {/* Left on mobile, Top on desktop */}
      <div className="shrink-0 flex flex-col items-start relative z-[2]">
        <Typography
          variant="stat"
          as="span"
          weight="bold"
          className="shared-stats-kpi-num counter text-midnight tracking-tight m-0 mb-0"
          data-target={num}
          data-suffix={suf}
        >
          {displayTitle}
        </Typography>
        <div className={`hidden md:block w-9 h-0.5 opacity-60 mt-3 mb-4 rounded-full ${barBg}`} />
      </div>

      {/* Right on mobile, Bottom/Middle on desktop */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 flex-1 min-w-0 md:w-full md:flex-1 md:justify-between relative z-[2]">
        <Typography
          variant="b2"
          as="p"
          className="text-midnight/85 m-0 leading-snug md:leading-relaxed"
        >
          {description}
        </Typography>
        {badge && (
          <div className="md:mt-6">
            <Typography
              variant="b4"
              as="span"
              uppercase
              weight="semibold"
              className="whitespace-nowrap not-italic text-midnight/70 px-3 py-1 rounded-full border border-midnight/10 bg-white/40 inline-block text-[0.68rem] tracking-[0.06em]"
            >
              {badge}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
