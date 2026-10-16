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
}

export default function SharedStatsCards({ Heading, Description, CradColorful }: SharedStatsCardsProps) {
  const defaultCards: StatsCardItem[] = [
    { Title: "39B", Description: "Expected number of IoT devices by 2030", Badge: "IoT Analytics, 2025" },
    { Title: "21GB", Description: "Average monthly mobile data consumption per capita", Badge: "Ericsson, 2025" },
    { Title: "89%", Description: "Expected share of 5G mobile connections in North America by 2030", Badge: "GSMA, 2025" }
  ];

  const items = (CradColorful && CradColorful.length > 0 ? CradColorful : null) || defaultCards;
  const headingStr = Heading || "Why our infrastructure matters";

  // Default glow colors mimicking the design
  const defaultColors = [
    { color: "#00e8d9", glow: "0,232,217" },
    { color: "#c8b3ff", glow: "200,179,255" },
    { color: "#ffba5c", glow: "255,186,92" }
  ];

  return (
    <section className="shared-stats-cards-section section-light" style={{ background: "transparent", padding: "100px 0", position: "relative", overflow: "hidden", zIndex: 2 }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "80px" }}>
          <h2 className="section-title reveal" style={{ fontWeight: 400, letterSpacing: "0.06em", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {headingStr}
          </h2>
          {Description && (
            <p className="section-description reveal stagger-1" style={{ maxWidth: "780px", margin: "16px auto 0", marginTop: "20px" }}>
              {Description}
            </p>
          )}
        </div>

        <div className="shared-stats-cards reveal stagger-1">
          {items.map((item, index) => {
            const targetStr = item.Title || "0";
            const targetNum = parseFloat(targetStr) || 0;
            const suffix = targetStr.replace(targetNum.toString(), "").trim();

            let styleIndex = index % defaultColors.length;
            if (item.BgGradient) {
              const bgLower = item.BgGradient.toLowerCase();
              if (bgLower.includes("green") || bgLower.includes("mint") || bgLower.includes("#e6faf8")) styleIndex = 0;
              else if (bgLower.includes("purple") || bgLower.includes("lavender") || bgLower.includes("#eeeafc")) styleIndex = 1;
              else if (bgLower.includes("peach") || bgLower.includes("orange") || bgLower.includes("yellow") || bgLower.includes("#fef3e8")) styleIndex = 2;
            }

            const colorProps = defaultColors[styleIndex];

            // Support passing the raw gradient from CMS
            const inlineStyle: React.CSSProperties = { 
              "--kpi-color": colorProps.color, 
              "--kpi-glow": colorProps.glow 
            } as React.CSSProperties;
            
            if (item.BgGradient) {
              inlineStyle.background = item.BgGradient;
            }

            return (
              <div
                key={index}
                className={`shared-stats-kpi shared-stats-kpi-${styleIndex + 1}`}
                style={inlineStyle}
              >
                <div className="shared-stats-kpi-accent" aria-hidden="true"></div>
                <div className="shared-stats-kpi-num-row">
                  <span className="shared-stats-kpi-num counter" data-target={targetNum} data-suffix={suffix}>
                    0
                  </span>
                </div>
                <p className="shared-stats-kpi-label">{item.Description}</p>
                {item.Badge && <cite className="shared-stats-kpi-cite">{item.Badge}</cite>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
