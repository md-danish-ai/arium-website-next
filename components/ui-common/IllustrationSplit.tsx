"use client";

import React from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { resolveStrapiImage } from "@utils";
import { SmallCellsSvg, DasSvg } from "@ui-svg";
import { useSvgDraw } from "@hooks/useSvgDraw";

export interface IllustrationSplitStatItem {
  stat?: string;
  description?: string;
  stat_color?: string;
}

export interface IllustrationSplitProps {
  id?: string;
  title?: string;
  title_color?: string | null;
  description?: string;
  description_color?: string | null;
  illustration_image?: unknown;
  illustration_image_alignment?: "Right" | "Left" | "Media Right" | "Media Left";
  show_bottom_divider?: boolean;
  statistics?: IllustrationSplitStatItem[];
  background?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function IllustrationSplit({
  id,
  title,
  title_color,
  description,
  description_color,
  illustration_image,
  illustration_image_alignment = "Right",
  show_bottom_divider = false,
  statistics = [],
  background,
  className = "",
  style,
}: IllustrationSplitProps) {
  const isLeft =
    illustration_image_alignment === "Left" || illustration_image_alignment === "Media Left";

  const defaultImg = isLeft
    ? "/images/svg-images/das-illustration.svg"
    : "/images/svg-images/small-cells-illustration.svg";

  const resolvedImg = resolveStrapiImage(illustration_image, defaultImg);
  const isSvg = (resolvedImg || "").toLowerCase().endsWith(".svg");

  const titleStr = (title || "").toLowerCase();
  const imgStr = (resolvedImg || "").toLowerCase();
  const isDas =
    isLeft || titleStr.includes("antenna") || titleStr.includes("das") || imgStr.includes("das");

  const svgColor = title_color || "#162047";
  const containerRef = useSvgDraw<HTMLElement>({
    color: svgColor,
    strokeWidth: 0.22,
    circleStrokeWidth: 0.3,
  });

  const isHtml = Boolean(
    description &&
    (description.includes("<br") ||
      description.includes("<p") ||
      (description.includes("<") && description.includes(">")))
  );

  const defaultBg = "radial-gradient(circle, #fff 0%, #f5f0ff 40%, #ebe2ff 75%, #dfd4ff 100%)";
  const resolvedBg = background || (className.includes("bg-transparent") ? undefined : defaultBg);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-[50px] relative overflow-hidden ${className}`}
      style={{
        ...(resolvedBg ? { background: resolvedBg } : {}),
        ...style,
      }}
    >
      <Container>
        <div
          className={`relative max-lg:block ${
            !isLeft ? "max-lg:mb-12" : "max-lg:mb-0"
          } lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full lg:max-w-none mx-auto`}
        >
          <div
            className={`sol-split-text max-lg:relative max-lg:z-[1] max-lg:pt-[75px] max-lg:pr-4 order-1 reveal ${
              isLeft ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {title && (
              <Typography
                variant="h3"
                as="h2"
                uppercase
                weight="normal"
                className="section-title text-left text-[#162047] m-0 mb-3 max-w-[300px] sm:max-w-[480px] lg:max-w-none"
                style={title_color ? { color: title_color } : undefined}
              >
                {title}
              </Typography>
            )}

            {isHtml ? (
              <div
                className="strapi-richtext-body text-[#162047]/80 leading-[1.65] lg:leading-[1.8] text-[0.9rem] lg:text-[1.05rem] mb-6 flex flex-col gap-4 [&>p]:m-0 [&>p]:mb-4 last:[&>p]:mb-0 max-lg:text-justify lg:text-left [&>p]:max-lg:text-justify [&>p]:lg:text-left"
                style={description_color ? { color: description_color } : undefined}
                dangerouslySetInnerHTML={{ __html: description || "" }}
              />
            ) : description ? (
              <div
                className="text-[#162047]/80 mb-6 flex flex-col gap-4 max-lg:text-justify lg:text-left"
                style={description_color ? { color: description_color } : undefined}
              >
                {description
                  .split("\n\n")
                  .filter(Boolean)
                  .map((p, idx) => (
                    <Typography
                      key={idx}
                      variant="b1"
                      as="p"
                      className="text-[#162047]/80 m-0 mb-4 last:mb-0 max-lg:text-justify lg:text-left"
                    >
                      {p}
                    </Typography>
                  ))}
              </div>
            ) : null}

            {statistics && statistics.length > 0 && (
              <div className="sol-kpis-row flex flex-row flex-nowrap gap-4 sm:gap-6 lg:gap-10 items-baseline mt-6 lg:mt-4 w-full">
                {statistics.map((item, index) => (
                  <div
                    key={index}
                    className="sol-kpi-item flex-1 min-w-0 flex flex-col gap-1 py-2 lg:py-1 cursor-default"
                  >
                    {item.stat && (
                      <Typography
                        variant="stat"
                        weight="bold"
                        className="sol-kpi-num text-[#7c5cbf]"
                        style={item.stat_color ? { color: item.stat_color } : undefined}
                      >
                        {item.stat}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography
                        variant="b3"
                        as="p"
                        weight="normal"
                        className="sol-kpi-label normal-case tracking-normal text-[#162047] lg:text-[#162047]/80 m-0 mt-0.5 lg:mt-1.5 whitespace-normal"
                      >
                        {item.description}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="w-full h-px bg-[#162047]/[0.08] mt-3 lg:mt-7" />
          </div>

          {/* Illustration wrapper */}
          {resolvedImg && (
            <div
              className={`sol-illustration-wrapper max-lg:block max-lg:absolute max-lg:-top-[60px] max-lg:-right-[120px] max-lg:w-[180px] max-lg:h-[180px] max-lg:z-0 max-lg:pointer-events-none max-lg:overflow-visible lg:flex items-center self-center order-2 w-full reveal-scale ${
                isLeft ? "lg:justify-start lg:order-1" : "lg:justify-end lg:order-2"
              }`}
            >
              <div className="relative w-full max-w-[340px] lg:max-w-[440px] max-lg:static max-lg:max-w-none">
                {isSvg ? (
                  isDas ? (
                    <DasSvg className="draw-svg w-full h-auto opacity-75 lg:opacity-85 max-lg:static relative z-[1]" />
                  ) : (
                    <SmallCellsSvg className="draw-svg w-full h-auto opacity-75 lg:opacity-85 max-lg:static relative z-[1]" />
                  )
                ) : (
                  <Image
                    src={resolvedImg}
                    alt={title || "Illustration"}
                    className="w-full h-auto opacity-75 lg:opacity-85 max-lg:static relative z-[1]"
                    width={440}
                    height={440}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
      {show_bottom_divider && (
        <div className="max-w-[1200px] mx-auto mt-12 border-b border-[#162047]/10" />
      )}
    </section>
  );
}
