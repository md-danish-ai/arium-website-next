import React from "react";

interface StatItem {
  value: string;
  label: string;
  badge?: string;
  sublabel?: string;
}

interface AboutTrustProps {
  data?: {
    title?: string;
    stats?: StatItem[];
  };
}

export default function AboutTrust({ data }: AboutTrustProps) {
  const defaultKpis = [
    { value: "39B", label: "Expected number of IoT devices by 2030", badge: "IoT Analytics, 2025" },
    { value: "21GB", label: "Average monthly mobile data consumption per capita", badge: "Ericsson, 2025" },
    { value: "89%", label: "Expected share of 5G mobile connections in North America by 2030", badge: "GSMA, 2025" }
  ];

  const items = data?.stats && data.stats.length > 0 ? data.stats : defaultKpis;
  const colors = [
    { 
      barBg: "bg-[#00e8d9]", 
      glowClass: "bg-[radial-gradient(circle,rgba(0,232,217,0.25)_0%,transparent_70%)]", 
      bg: "bg-gradient-to-br from-[#e6faf8] via-[#d0f5f1] to-[#c2f0eb]" 
    },
    { 
      barBg: "bg-[#c8b3ff]", 
      glowClass: "bg-[radial-gradient(circle,rgba(200,179,255,0.25)_0%,transparent_70%)]", 
      bg: "bg-gradient-to-br from-[#eeeafc] via-[#e2dbf8] to-[#d8d0f4]" 
    },
    { 
      barBg: "bg-[#ffba5c]", 
      glowClass: "bg-[radial-gradient(circle,rgba(255,186,92,0.25)_0%,transparent_70%)]", 
      bg: "bg-gradient-to-br from-[#fef3e8] via-[#fce9d5] to-[#f9e0c8]" 
    }
  ];

  return (
    <section id="trust" className="section-light bg-white py-24 relative overflow-hidden z-[2]">
      <div className="container relative z-[2]">
        <div className="section-header text-center mb-16 md:mb-20">
          <h2 className="section-title reveal font-heading font-normal tracking-wide text-3xl md:text-4xl text-[#162047] leading-snug uppercase">
            {data?.title || "Why our infrastructure matters"}
          </h2>
        </div>

        <div className="wim-kpis reveal stagger-1 grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {items.map((item, index) => {
            const targetStr = item.value;
            const targetNum = parseFloat(targetStr) || 0;
            const suffix = targetStr.replace(targetNum.toString(), "").trim();
            const colorProps = colors[index % colors.length];

            return (
              <div 
                key={index} 
                className={`wim-kpi group relative p-8 md:p-11 pb-9 rounded-[24px] flex flex-col border border-black/5 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden ${colorProps.bg}`}
              >
                <div 
                  className={`wim-kpi-accent absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[30px] pointer-events-none transition-transform duration-600 group-hover:scale-150 ${colorProps.glowClass}`}
                  aria-hidden="true" 
                />
                <div className="wim-kpi-num-row flex items-baseline relative z-[2] transition-transform duration-500 origin-left group-hover:scale-105 mb-4">
                  <span className="wim-kpi-num counter font-heading text-5xl md:text-6xl font-extrabold text-[#162047] leading-none tracking-tight" data-target={targetNum} data-suffix={suffix}>
                    0
                  </span>
                  <span className="wim-kpi-sfx font-heading text-5xl md:text-6xl font-extrabold text-[#162047] leading-none tracking-tight ml-1">
                    {suffix}
                  </span>
                </div>
                
                <div className={`w-9 h-[2px] mb-4 opacity-60 transition-all duration-500 group-hover:w-14 group-hover:opacity-100 ${colorProps.barBg}`} />

                <p className="wim-kpi-label text-[#162047]/85 text-base leading-relaxed m-0 relative z-[2] transition-colors duration-500 group-hover:text-[#162047] flex-1">
                  {item.label}
                </p>
                {item.badge && (
                  <cite className="wim-kpi-cite text-[0.68rem] not-italic font-semibold uppercase tracking-widest text-[#162047]/80 inline-block mt-4 px-3.5 py-1 rounded-full border border-black/10 bg-white/40 self-start relative z-[2]">
                    {item.badge}
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
