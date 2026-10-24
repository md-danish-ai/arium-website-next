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

interface StrapiMediaObject {
  url?: string;
  data?: { attributes?: { url?: string } };
  alternativeText?: string;
}

interface IllustrationSplitProps {
  id?: string;
  heading?: string;
  description?: string;
  media?: StrapiMediaObject[] | StrapiMediaObject;
  mediaAlignment?: "Media Right" | "Media Left" | "Right" | "Left";
  statistics?: Statistic[];
  showBottomDivider?: boolean;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function IllustrationSplit({
  id,
  heading,
  description,
  media,
  mediaAlignment = "Media Right",
  statistics = [],
  showBottomDivider = false,
  HeadingColor,
  DescriptionColor,
}: IllustrationSplitProps) {
  const pathname = usePathname();
  const isSolutions = pathname?.includes("solutions") || pathname?.includes("/solutions");

  let rawImgUrl = undefined;
  let altText: string | undefined = undefined;
  if (Array.isArray(media)) {
    rawImgUrl = media[0]?.url;
    altText = media[0]?.alternativeText;
  } else if (media) {
    const singleMedia = media as StrapiMediaObject;
    rawImgUrl = singleMedia.url ?? singleMedia.data?.attributes?.url;
    altText = singleMedia.alternativeText;
  }
  const imgUrl = rawImgUrl
    ? GetStrapiMediaUrl(rawImgUrl)
    : "/assets/images/live_small-cells-illustration.svg";

  const isMediaLeft = mediaAlignment === "Media Left" || mediaAlignment === "Left";

  return (
    <section
      id={id}
      className={`relative overflow-hidden flex items-center bg-transparent border-none ${
        isSolutions ? "py-[50px]" : "py-16 md:py-24"
      }`}
    >
      <div
        className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Mobile-only illustration — absolutely pinned to top-right of section so text is full width */}
      <div
        className="md:hidden absolute top-[-25px] right-0 w-[150px] sm:w-[180px] pointer-events-none z-[1]"
        aria-hidden="true"
      >
        <Image
          src={imgUrl}
          alt=""
          aria-hidden="true"
          width={180}
          height={180}
          unoptimized={imgUrl.toLowerCase().endsWith(".svg")}
          className={`w-full h-auto opacity-75 [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
            imgUrl.toLowerCase().endsWith(".svg") ? "svg-recolor" : ""
          }`}
        />
      </div>

      <div className="container relative z-[1]">
        <div className="sol-split grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full md:max-w-none mx-auto relative">
          {/* Text Content Area */}
          <div className={`sol-split-text order-1 ${isMediaLeft ? "md:order-2" : "md:order-1"}`}>
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
              <div className="sol-kpis-row flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-4 w-full">
                {statistics.map((stat, index) => (
                  <div
                    key={`stat-${index}`}
                    className="sol-kpi-item flex flex-col gap-1 py-1 cursor-default shrink-0"
                  >
                    {stat?.Number ? (
                      <>
                        <Typography
                          as="span"
                          variant="stat"
                          weight="bold"
                          className="sol-kpi-num tracking-tight leading-none text-[#7c5cbf]"
                          style={{ color: stat.NumberColor || "#7c5cbf" }}
                        >
                          {stat?.Number}
                        </Typography>
                        {stat?.Label && (
                          <Typography
                            as="p"
                            variant="b2"
                            weight="normal"
                            className="sol-kpi-label normal-case tracking-normal text-midnight/80 m-0 mt-1.5 whitespace-nowrap"
                          >
                            {stat?.Label}
                          </Typography>
                        )}
                      </>
                    ) : stat?.Label ? (
                      <p className="sol-kpi-label-pill px-3.5 py-1.5 rounded-full text-xs font-medium border border-midnight/15 text-midnight bg-midnight/5 m-0 whitespace-nowrap">
                        {stat?.Label}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}

            {/* Optional Bottom Divider */}
            {showBottomDivider && !isSolutions && (
              <div className="w-full h-px bg-midnight/10 mt-7" />
            )}
          </div>

          {/* Desktop / Tablet Illustration Column (>= md) */}
          <div
            className={`sol-illustration-wrapper hidden md:flex items-center self-center w-full ${
              isMediaLeft
                ? "justify-center md:justify-start md:order-1"
                : "justify-center md:justify-end md:order-2"
            }`}
          >
            <div className="relative w-full max-w-[340px] md:max-w-[440px]">
              <Image
                src={imgUrl}
                alt={altText || heading || "Illustration"}
                width={440}
                height={440}
                unoptimized={imgUrl.toLowerCase().endsWith(".svg")}
                className={`w-full h-auto opacity-75 md:opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
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
