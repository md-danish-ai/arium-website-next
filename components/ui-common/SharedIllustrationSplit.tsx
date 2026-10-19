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
      className={`section-padding section-light relative overflow-hidden min-h-[420px] flex items-center bg-white ${isSolutions ? "py-12" : "py-24"}`}
    >
      <div className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-[1]">
        <div className="sol-split grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content Area */}
          <div className={`sol-split-text flex flex-col ${isMediaLeft ? "md:order-2" : "md:order-1"}`}>
            {heading && (
              <h2
                className="section-title text-left font-heading font-normal tracking-[0.06em] text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.45] text-midnight mb-3 uppercase"
                style={{ color: HeadingColor || undefined }}
              >
                {heading}
              </h2>
            )}

            {description && (
              <div
                className="strapi-richtext-body subpage-intro text-[1.05rem] leading-[1.8] text-midnight mb-8 flex flex-col gap-5 [&>p]:mb-0"
                style={{ color: DescriptionColor || undefined }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {/* Statistics Area */}
            {statistics && statistics.length > 0 && (
              <div className="sol-kpis-row flex flex-wrap gap-6 items-baseline mt-2">
                {statistics.map((stat, index) => (
                  <div key={`stat-${index}`} className="sol-kpi-item flex flex-col gap-1">
                    {stat.Number ? (
                      <>
                        <span className="sol-kpi-num font-heading text-3xl font-bold tracking-tight leading-none" style={{ color: stat.NumberColor || "#7c5cbf" }}>{stat.Number}</span>
                        {stat.Label && <p className="sol-kpi-label text-xs uppercase tracking-wider text-midnight/70 m-0">{stat.Label}</p>}
                      </>
                    ) : (
                      <p className="sol-kpi-label-pill px-3.5 py-1.5 rounded-full text-xs font-medium border border-midnight/15 text-midnight bg-midnight/5 m-0">{stat.Label}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Optional Bottom Divider */}
            {showBottomDivider && (
              <div className="w-full h-px bg-midnight/10 mt-7" />
            )}
          </div>

          {/* Media Area */}
          <div
            className={`sol-illustration-wrapper flex items-center self-center w-full ${isMediaLeft ? "justify-center md:justify-start md:order-1" : "justify-center md:justify-end md:order-2"}`}
          >
            <div className="relative w-[90%] max-w-[440px]">
              <img
                src={imgUrl}
                alt={media?.[0]?.alternativeText || heading || "Illustration"}
                className={`w-full h-auto opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}`}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
