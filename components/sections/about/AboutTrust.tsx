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
    { color: "#00e8d9", glow: "0,232,217" },
    { color: "#c8b3ff", glow: "200,179,255" },
    { color: "#ffba5c", glow: "255,186,92" }
  ];

  return (
    <section id="trust" className="section-light" style={{ background: "transparent", padding: "100px 0", position: "relative", overflow: "hidden", zIndex: 2 }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "80px" }}>
          <h2 className="section-title reveal" style={{ fontWeight: 400, letterSpacing: "0.06em", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "Why our infrastructure matters"}
          </h2>
        </div>

        <div className="wim-kpis reveal stagger-1">
          {items.map((item, index) => {
            const targetStr = item.value;
            const targetNum = parseFloat(targetStr) || 0;
            const suffix = targetStr.replace(targetNum.toString(), "").trim();
            const colorProps = colors[index % colors.length];

            return (
              <div key={index} className="wim-kpi" style={{ "--kpi-color": colorProps.color, "--kpi-glow": colorProps.glow } as React.CSSProperties}>
                <div className="wim-kpi-accent" aria-hidden="true"></div>
                <div className="wim-kpi-num-row">
                  <span className="wim-kpi-num counter" data-target={targetNum} data-suffix={suffix}>0</span>
                </div>
                <p className="wim-kpi-label">{item.label}</p>
                {item.badge && <cite className="wim-kpi-cite">{item.badge}</cite>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
