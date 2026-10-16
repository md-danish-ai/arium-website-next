"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Statistic {
  Number?: string;
  Label?: string;
  NumberColor?: string;
}

interface SharedIllustrationSplitProps {
  id?: string;
  heading?: string;
  description?: string;
  media?: { url: string; alternativeText?: string }[];
  mediaAlignment?: "Media Right" | "Media Left" | "Right" | "Left";
  statistics?: Statistic[];
  showBottomDivider?: boolean;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function SharedIllustrationSplit({
  id,
  heading,
  description,
  media,
  mediaAlignment = "Media Right",
  statistics = [],
  showBottomDivider = false,
  HeadingColor,
  DescriptionColor,
}: SharedIllustrationSplitProps) {
  const pathname = usePathname();
  const isSolutions = pathname?.includes("solutions") || pathname?.includes("/solutions");

  let rawImgUrl = undefined;
  if (Array.isArray(media)) {
    rawImgUrl = media[0]?.url;
  } else if (media) {
    rawImgUrl = (media as any).url || (media as any).data?.attributes?.url;
  }
  const imgUrl = rawImgUrl
    ? rawImgUrl.startsWith("http")
      ? rawImgUrl
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${rawImgUrl}`
    : "/assets/images/live_small-cells-illustration.svg";

  const isMediaLeft = mediaAlignment === "Media Left" || mediaAlignment === "Left";

  return (
    <section
      id={id}
      className="section-padding section-light"
      style={{
        background: "transparent",
        padding: isSolutions ? "50px 0" : "100px 0",
        position: "relative",
        overflow: "hidden",
        minHeight: "420px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <div className="infra-grid-bg" aria-hidden="true"></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className={`sol-split ${isMediaLeft ? "sol-split-reverse" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

          {/* Text Content Area */}
          <div className="sol-split-text" style={{ order: isMediaLeft ? 2 : 1 }}>
            {heading && (
              <h2
                className="section-title"
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  fontSize: "2.4rem",
                  lineHeight: 1.45,
                  color: HeadingColor || "#162047",
                  marginBottom: "12px",
                  textTransform: "uppercase"
                }}
              >
                {heading}
              </h2>
            )}

            {description && (
              <div
                className="strapi-richtext-body subpage-intro"
                style={{ fontSize: "1.05rem", lineHeight: 1.8, color: DescriptionColor || "#162047", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "20px" }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {/* Statistics Area */}
            {statistics && statistics.length > 0 && (
              <div className="sol-kpis-row">
                {statistics.map((stat, index) => (
                  <div key={`stat-${index}`} className="sol-kpi-item" style={{ "--kpi-color": stat.NumberColor || "#7c5cbf" } as React.CSSProperties}>
                    {stat.Number ? (
                      <>
                        <span className="sol-kpi-num">{stat.Number}</span>
                        {stat.Label && <p className="sol-kpi-label">{stat.Label}</p>}
                      </>
                    ) : (
                      <p className="sol-kpi-label-pill">{stat.Label}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Optional Bottom Divider */}
            {showBottomDivider && (
              <div style={{ width: "100%", height: "1px", background: "rgba(22,32,71,0.08)", marginTop: "28px" }}></div>
            )}
          </div>

          {/* Media Area */}
          <div
            className="sol-illustration-wrapper"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMediaLeft ? "flex-start" : "flex-end",
              alignSelf: "center",
              order: isMediaLeft ? 1 : 2
            }}
          >
            <div style={{ position: "relative", width: "90%", maxWidth: "440px" }}>
              <img
                src={imgUrl}
                alt={media?.[0]?.alternativeText || heading || "Illustration"}
                className={imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}
                style={{
                  width: "100%",
                  height: "auto",
                  opacity: 0.85,
                  position: "relative",
                  zIndex: 1,
                  filter: "brightness(0) saturate(0) invert(13%) sepia(35%) saturate(3000%) hue-rotate(210deg) brightness(95%) contrast(92%)"
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
