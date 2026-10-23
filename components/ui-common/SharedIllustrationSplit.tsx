"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

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
    ? GetStrapiMediaUrl(rawImgUrl)
    : "/assets/images/live_small-cells-illustration.svg";

  const isMediaLeft = mediaAlignment === "Media Left" || mediaAlignment === "Left";

  return (
    <section
      id={id}
      className={`section-padding section-light relative overflow-hidden min-h-[420px] flex items-center bg-transparent ${isSolutions ? "py-10 md:py-16 lg:py-20" : "py-16 md:py-24"}`}
    >
      <div
        className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-[1]">
        <div className="sol-split grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full max-w-[520px] md:max-w-none mx-auto">
          {/* Text Content Area */}
          <div
            className={`sol-split-text flex flex-col order-1 ${isMediaLeft ? "md:order-2" : "md:order-1"}`}
          >
            {heading && (
              <Typography
                as="h2"
                variant="h3"
                uppercase
                weight="normal"
                className="section-title text-left tracking-[0.06em] leading-[1.45] text-midnight m-0 mb-3"
                style={{ color: HeadingColor || undefined }}
              >
                {heading}
              </Typography>
            )}

            {description && (
              <div
                className="strapi-richtext-body subpage-intro font-body text-[clamp(0.9rem,1.1vw,1rem)] leading-[1.8] text-midnight/80 mb-6 flex flex-col gap-4 [&>p]:m-0 [&>p]:mb-0 [&>p+p]:mt-3"
                style={{ color: DescriptionColor || undefined }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {/* Statistics Area */}
            {statistics && statistics.length > 0 && (
              <div className="sol-kpis-row flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-2">
                {statistics.map((stat, index) => {
                  const num = stat.Number || (stat as any).value;
                  const lbl = stat.Label || (stat as any).label;
                  return (
                    <div
                      key={`stat-${index}`}
                      className="sol-kpi-item flex flex-col gap-1 py-2 cursor-default"
                    >
                      {num ? (
                        <>
                          <Typography
                            as="span"
                            variant="stat"
                            weight="bold"
                            className="sol-kpi-num tracking-tight leading-none text-[#7c5cbf]"
                            style={{ color: stat.NumberColor || "#7c5cbf" }}
                          >
                            {num}
                          </Typography>
                          {lbl && (
                            <Typography
                              as="p"
                              variant="b4"
                              uppercase
                              weight="normal"
                              className="sol-kpi-label tracking-wider text-midnight/80 m-0 mt-1 max-w-[220px]"
                            >
                              {lbl}
                            </Typography>
                          )}
                        </>
                      ) : lbl ? (
                        <p className="sol-kpi-label-pill px-3.5 py-1.5 rounded-full text-xs font-medium border border-midnight/15 text-midnight bg-midnight/5 m-0 whitespace-nowrap">
                          {lbl}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Optional Bottom Divider */}
            {showBottomDivider && <div className="w-full h-px bg-midnight/10 mt-7" />}
          </div>

          {/* Media Area */}
          <div
            className={`sol-illustration-wrapper flex items-center self-center w-full order-2 ${
              isMediaLeft
                ? "justify-center md:justify-start md:order-1"
                : "justify-center md:justify-end md:order-2"
            }`}
          >
            <div className="relative w-full max-w-[340px] md:max-w-[440px]">
              <img
                src={imgUrl}
                alt={media?.[0]?.alternativeText || heading || "Illustration"}
                className={`w-full h-auto opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
                  imgUrl.toLowerCase().endsWith(".svg") ? "svg-recolor" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
