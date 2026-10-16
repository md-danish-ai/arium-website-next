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
    <div className="sol-split sol-split-reverse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
      <div className="sol-illustration-wrapper das-illust" style={{ display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
        <div style={{ position: "relative", width: "90%", maxWidth: "440px" }}>
          <Image
            src={imgUrl}
            alt={data?.media?.[0]?.alternativeText || "Distributed antenna system illustration"}
            className={imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}
            width={440}
            height={440}
            style={{ width: "100%", height: "auto", opacity: 0.7, position: "relative", zIndex: 1 }}
          />
        </div>
      </div>
      <div className="sol-split-text">
        <h2 className="section-title" style={{ textAlign: "left", fontWeight: 400, letterSpacing: "0.06em", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047", marginBottom: "12px" }}>
          {data?.title || "Distributed Antenna Systems"}
        </h2>

        {data?.body ? (
          <div
            className="strapi-richtext-body"
            style={{ fontSize: "1rem", lineHeight: 1.8, color: "#162047", marginBottom: "32px" }}
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        ) : (
          <>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#162047", margin: "0 0 16px" }}>Our distributed antenna systems (DAS) deliver the coverage and capacity needed in complex indoor and venue environments—arenas, stadiums, theme parks, hospitals, airports, campuses, and more—so visitors, staff, and operations stay connected.</p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#162047", margin: "0 0 32px" }}>We take the lead in building and managing the network, leveraging our longstanding relationships with wireless carriers, vendors, and government agencies.</p>
          </>
        )}

        <div className="sol-kpis-row">
          {stats.map((stat, index) => (
            <div key={index} className="sol-kpi-item" style={{ "--kpi-color": "#7c5cbf" } as React.CSSProperties}>
              <span className="sol-kpi-num">{stat.value}</span>
              <p className="sol-kpi-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="sol-kpis-row">
          {stats.map((stat, index) => (
            <div key={`pill-${index}`} className="sol-kpi-item" style={{ "--kpi-color": "#7c5cbf" } as React.CSSProperties}>
              <p className="sol-kpi-label-pill">{stat.label}</p>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", height: "1px", background: "rgba(22,32,71,0.08)", marginTop: "28px" }}></div>
      </div>
    </div>
  );
}
