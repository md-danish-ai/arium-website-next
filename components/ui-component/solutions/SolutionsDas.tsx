import React from "react";
import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
}

interface SolutionsDasProps {
  data?: {
    title?: string;
    body?: string;
    stats?: StatItem[];
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function SolutionsDas({ data }: SolutionsDasProps) {
  const defaultStats = [
    { value: "300+", label: "premier venues across the country" }
  ];

  const stats = data?.stats && data.stats.length > 0 ? data.stats : defaultStats;
  const imgUrl = data?.media?.[0]?.url || "/assets/images/live_das-illustration.svg";
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="sol-split sol-split-reverse grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="sol-illustration-wrapper das-illust flex items-center justify-center lg:justify-start self-center lg:order-1">
        <div className="relative w-[90%] max-w-[440px]">
          <Image
            src={imgUrl}
            alt={data?.media?.[0]?.alternativeText || "Distributed antenna system illustration"}
            className={`w-full h-auto opacity-75 relative z-[1] ${imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}`}
            width={440}
            height={440}
          />
        </div>
      </div>
      
      <div className="sol-split-text flex flex-col lg:order-2">
        <h2 className="section-title text-left font-heading font-normal tracking-wide text-3xl md:text-4xl text-[#162047] leading-snug mb-3">
          {data?.title || "Distributed Antenna Systems"}
        </h2>

        {data?.body ? (
          <div
            className="strapi-richtext-body text-[#162047] text-base leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        ) : (
          <div className="text-[#162047] text-base leading-relaxed mb-8 space-y-4">
            <p className="m-0">Our distributed antenna systems (DAS) deliver the coverage and capacity needed in complex indoor and venue environments—arenas, stadiums, theme parks, hospitals, airports, campuses, and more—so visitors, staff, and operations stay connected.</p>
            <p className="m-0">We take the lead in building and managing the network, leveraging our longstanding relationships with wireless carriers, vendors, and government agencies.</p>
          </div>
        )}

        <div className="sol-kpis-row flex flex-wrap gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="sol-kpi-item flex flex-col gap-1 py-4 cursor-default" style={{ "--kpi-color": "#7c5cbf" } as React.CSSProperties}>
              <span className="sol-kpi-num font-heading text-5xl md:text-6xl font-extrabold text-[#7c5cbf] leading-none tracking-tight">
                {stat.value}
              </span>
              <p className="sol-kpi-label font-body text-base text-[#162047] m-0 leading-relaxed max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="sol-kpis-row flex flex-wrap gap-3">
          {stats.map((stat, index) => (
            <div key={`pill-${index}`} className="sol-kpi-item" style={{ "--kpi-color": "#7c5cbf" } as React.CSSProperties}>
              <p className="sol-kpi-label-pill font-body text-xs md:text-sm text-[#162047] bg-[#162047]/10 px-4 py-1.5 rounded-full inline-block mt-2 font-medium w-fit">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#162047]/10 mt-7" />
      </div>
        </div>
      </div>
    </section>
  );
}
