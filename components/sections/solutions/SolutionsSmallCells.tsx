import React from "react";
import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
}

interface SolutionsSmallCellsProps {
  data?: {
    title?: string;
    body?: string;
    stats?: StatItem[];
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function SolutionsSmallCells({ data }: SolutionsSmallCellsProps) {
  const defaultStats = [
    { value: "100K+", label: "small cells on air or under contract" },
    { value: "700+", label: "municipalities served" }
  ];

  const stats = data?.stats && data.stats.length > 0 ? data.stats : defaultStats;
  const imgUrl = data?.media?.[0]?.url || "/assets/images/live_small-cells-illustration.svg";
  return (
    <div className="sol-split" style={{ marginBottom: "100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
      <div className="sol-split-text">
        <h2 className="section-title" style={{ textAlign: "left", fontWeight: 400, letterSpacing: "0.06em", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047", marginBottom: "12px" }}>
          {data?.title || "Small Cells"}
        </h2>

        {data?.body ? (
          <div
            className="strapi-richtext-body"
            style={{ fontSize: "1rem", lineHeight: 1.8, color: "#162047", marginBottom: "32px" }}
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        ) : (
          <>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#162047", margin: "0 0 16px" }}>For more than 15 years, we&apos;ve partnered with mobile network operators (MNOs) to design and deploy small cells that add targeted coverage and capacity. Our discrete antennas help communities and wireless carriers keep pace with growing demand.</p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#162047", margin: "0 0 32px" }}>Our small cell networks strengthen everyday connectivity and critical communication—supporting faster speeds and more reliable service.</p>
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
      <div className="sol-illustration-wrapper small-cells-illust" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", alignSelf: "center" }}>
        <div style={{ position: "relative", width: "90%", maxWidth: "440px" }}>
          <Image
            src={imgUrl}
            alt={data?.media?.[0]?.alternativeText || "Small cells network illustration"}
            className={imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}
            width={440}
            height={440}
            style={{ width: "100%", height: "auto", opacity: 0.7, position: "relative", zIndex: 1 }}
          />
        </div>
      </div>
    </div>
  );
}
