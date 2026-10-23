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
      className={`infra-panel-card w-full h-full bg-white/[0.04] border border-teal/15 hover:border-teal/35 rounded-2xl md:rounded-3xl pb-6 md:pb-8 relative overflow-hidden flex flex-col items-center transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35),0_0_40px_rgba(0,232,217,0.1)] ${className}`}
    >
      {imageUrl ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
            position: "relative",
            height: "180px",
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            width={240}
            height={180}
            unoptimized
            style={{ objectFit: "contain", height: "100%", width: "auto" }}
          />
        </div>
      ) : svgComponent ? (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {svgComponent}
        </div>
      ) : cleanSvg ? (
        <div
          dangerouslySetInnerHTML={{ __html: cleanSvg }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          className="[&>svg]:infra-panel-svg [&>svg]:draw-svg"
        />
      ) : null}

      <div className="infra-panel-text px-6 md:px-8 pt-6 text-center w-full flex-1 flex flex-col items-center">
        <Typography
          variant="h4"
          uppercase
          weight="normal"
          className="infra-panel-heading m-0 mb-2 md:mb-2.5 text-white"
        >
          {title}
        </Typography>

        {description ? (
          <Typography
            variant="b2"
            weight="normal"
            className="infra-panel-desc text-white/80 max-w-[480px] mx-auto m-0 flex-1"
          >
            {description}
          </Typography>
        ) : null}

        {ctaLink && (
          <Link
            href={ctaLink}
            aria-label={`${ctaText} about ${title}`}
            className="community-link-cta group inline-flex items-center gap-2 no-underline mt-4"
          >
            <span className="community-link-text inline-block text-xs uppercase tracking-[0.15em] text-white font-body font-semibold leading-none transition-colors duration-300 group-hover:text-teal whitespace-nowrap">
              {ctaText}
            </span>
            <DoubleRightArrowSvg className="community-link-arrow text-teal inline-block w-4 h-4 min-w-4 min-h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
