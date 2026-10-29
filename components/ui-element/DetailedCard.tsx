"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "./Typography";
import { DoubleRightArrowSvg } from "@ui-svg";

export interface DetailedCardProps {
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  svgCode?: string;
  svgComponent?: React.ReactNode;
  className?: string;
}

export default function DetailedCard({
  title,
  description,
  ctaText = "Explore more",
  ctaLink,
  imageUrl,
  svgCode,
  svgComponent,
  className = "",
}: DetailedCardProps) {
  const cleanSvg = svgCode
    ? svgCode
      .replace(/style="[^"]*stroke-dashoffset[^"]*"/gi, "")
      .replace(/style="[^"]*stroke-dasharray[^"]*"/gi, "")
      .replace(/data-done="1"/gi, "")
    : "";

  return (
    <div
      className={`w-full h-full bg-white/[0.04] border border-teal/15 hover:border-teal/35 rounded-2xl md:rounded-3xl pb-6 md:pb-8 relative overflow-hidden flex flex-col items-center transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35),0_0_40px_rgba(0,232,217,0.1)] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-linear-to-r before:from-transparent before:via-teal/60 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 [&_.infra-panel-svg]:drop-shadow-[0_0_16px_rgba(0,232,217,0.12)] hover:[&_.infra-panel-svg]:drop-shadow-[0_0_28px_rgba(0,232,217,0.22)] hover:[&_.infra-panel-svg]:scale-105 [&_.infra-panel-svg]:transition-all [&_.infra-panel-svg]:duration-500 [&_.infra-panel-svg]:w-[40%] sm:[&_.infra-panel-svg]:w-[40%] md:[&_.infra-panel-svg]:w-[40%] [&_.infra-panel-svg]:max-w-[300px] md:[&_.infra-panel-svg]:max-w-[340px] [&_.infra-panel-svg]:min-w-[180px] [&_.infra-panel-svg]:h-auto [&_.infra-panel-svg]:block [&_.infra-panel-svg]:mx-auto ${className}`}
    >
      {imageUrl ? (
        <div className="w-full flex items-center justify-center pt-8  pb-2 relative h-[220px] md:h-[260px]">
          <Image
            src={imageUrl}
            alt={title}
            width={280}
            height={240}
            unoptimized
            style={{ objectFit: "contain", maxHeight: "100%", width: "auto" }}
          />
        </div>
      ) : svgComponent ? (
        <div className="w-full flex items-center justify-center pt-8  pb-2">{svgComponent}</div>
      ) : cleanSvg ? (
        <div
          dangerouslySetInnerHTML={{ __html: cleanSvg }}
          className="w-full flex items-center justify-center pt-8  pb-2 [&>svg]:infra-panel-svg [&>svg]:draw-svg"
        />
      ) : null}

      <div className="px-6 md:px-8 pt-4 md:pt-6 text-center w-full flex-1 flex flex-col items-center">
        <Typography
          variant="h5"
          as="h4"
          uppercase
          weight="normal"
          className="!leading-[1.35] tracking-[0.06em] m-0 mb-3 md:mb-3.5 text-white"
        >
          {title}
        </Typography>

        {description ? (
          <Typography
            variant="b2"
            weight="normal"
            className="text-white/80 !leading-[1.65] mx-auto m-0 flex-1"
          >
            {description}
          </Typography>
        ) : null}

        {ctaLink && (
          <Link
            href={ctaLink}
            aria-label={`${ctaText} about ${title}`}
            className="group inline-flex items-center gap-2 no-underline mt-4 md:mt-5"
          >
            <Typography
              as="span"
              variant="button"
              uppercase
              weight="bold"
              className="inline-block tracking-[0.15em] text-white leading-none transition-all duration-300 group-hover:text-teal group-hover:scale-105 whitespace-nowrap"
            >
              {ctaText}
            </Typography>
            <DoubleRightArrowSvg className="text-teal inline-block w-4 h-4 min-w-4 min-h-4 max-w-4 max-h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
