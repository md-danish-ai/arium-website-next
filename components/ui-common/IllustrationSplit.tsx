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
  className?: string;
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
  className = "",
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

  return (
    <section
      ref={containerRef}
      id={id}
      className={`py-[50px] relative overflow-hidden ${className}`}
      style={{ background: "radial-gradient(circle, #fff 0%, #f5f0ff 40%, #ebe2ff 75%, #dfd4ff 100%) !important" }}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full md:max-w-none mx-auto relative">
          <div className={`order-1 reveal ${isLeft ? "md:order-2" : "md:order-1"}`}>
            {resolvedImg && (
              <div className="md:hidden float-right w-[115px] sm:w-[140px] ml-4 mb-2 pointer-events-none">
                {isSvg ? (
                  isDas ? (
                    <DasSvg className="draw-svg w-full h-auto opacity-75 relative z-[1]" />
                  ) : (
                    <SmallCellsSvg className="draw-svg w-full h-auto opacity-75 relative z-[1]" />
                  )
                ) : (
                  <Image
                    src={resolvedImg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-auto opacity-75 relative z-[1]"
                    width={140}
                    height={140}
                  />
                )}
              </div>
            )}

            {title && (
              <Typography
                variant="h3"
                as="h2"
                uppercase
                weight="normal"
                className="section-title text-left text-[#162047] m-0 mb-3"
                style={title_color ? { color: title_color } : undefined}
              >
                {title}
              </Typography>
            )}

            {isHtml ? (
              <div
                className="strapi-richtext-body text-[#162047]/80 leading-[1.8] mb-6 flex flex-col gap-4 [&>p]:m-0"
                style={description_color ? { color: description_color } : undefined}
                dangerouslySetInnerHTML={{ __html: description || "" }}
              />
            ) : description ? (
              <div
                className="text-[#162047]/80 mb-6 flex flex-col gap-4"
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
                      className="text-[#162047]/80 m-0 leading-[1.8]"
                    >
                      {p}
                    </Typography>
                  ))}
              </div>
            ) : null}

            {statistics && statistics.length > 0 && (
              <div className="clear-both flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-4 w-full">
                {statistics.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 py-1 cursor-default shrink-0">
                    {item.stat && (
                      <Typography
                        variant="stat"
                        weight="bold"
                        className="text-[#7c5cbf] leading-none tracking-tight"
                        style={item.stat_color ? { color: item.stat_color } : undefined}
                      >
                        {item.stat}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography
                        variant="b2"
                        as="p"
                        weight="normal"
                        className="normal-case tracking-normal text-[#162047]/80 m-0 mt-1.5 whitespace-nowrap"
                      >
                        {item.description}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop illustration */}
          {resolvedImg && (
            <div
              className={`hidden md:flex items-center self-center order-2 w-full reveal-scale ${isLeft
                ? "justify-center md:justify-start md:order-1"
                : "justify-center md:justify-end md:order-2"
                }`}
            >
              <div className="relative w-full max-w-[340px] md:max-w-[440px]">
                {isSvg ? (
                  isDas ? (
                    <DasSvg className="draw-svg w-full h-auto opacity-85 relative z-[1]" />
                  ) : (
                    <SmallCellsSvg className="draw-svg w-full h-auto opacity-85 relative z-[1]" />
                  )
                ) : (
                  <Image
                    src={resolvedImg}
                    alt={title || "Illustration"}
                    className="w-full h-auto opacity-85 relative z-[1]"
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
