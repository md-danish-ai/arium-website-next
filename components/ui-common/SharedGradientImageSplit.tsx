"use client";

import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";
import { DoubleRightArrowSvg } from "@ui-svg";

export interface GradientSplitPointer {
  heading: string;
  description: string;
  headingColor?: string;
  descriptionColor?: string;
}

export interface SharedGradientImageSplitProps {
  id?: string;
  heading: string;
  description?: string;
  desktopImageUrl: string;
  mobileImageUrl?: string;
  pointers?: GradientSplitPointer[];
  ctaText?: string;
  ctaUrl?: string;
  headingColor?: string;
  descriptionTextColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function SharedGradientImageSplit({
  id = "community",
  heading,
  description,
  desktopImageUrl,
  mobileImageUrl,
  pointers,
  ctaText,
  ctaUrl,
  headingColor,
  descriptionTextColor,
  style,
  className = "",
}: SharedGradientImageSplitProps) {
  return (
    <section
      id={id}
      className={`community-section relative min-h-[560px] overflow-hidden bg-midnight p-0 ${className}`}
      style={style}
    >
      {/* Background image (65% right on desktop, full width on mobile/tablet) */}
      <div className="community-bg absolute top-0 right-0 bottom-0 w-full lg:w-[65%] z-0 lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
        <picture className="w-full h-full block">
          {mobileImageUrl && <source media="(max-width: 600px)" srcSet={mobileImageUrl} />}
          <source media="(min-width: 601px)" srcSet={desktopImageUrl} />
          <img
            src={desktopImageUrl}
            alt={heading}
            className="community-bg-img w-full h-full object-cover block"
          />
        </picture>
      </div>

      {/* Gradient veil (dark backdrop on mobile/tablet for readability, bottom fade on desktop) */}
      <div className="community-veil absolute inset-0 z-[1] bg-[#0a1628]/80 lg:bg-transparent lg:bg-gradient-to-t lg:from-[#0a1628]/50 lg:via-transparent lg:to-transparent pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-[2] py-12 md:py-16 lg:py-[100px]">
        <div className="community-content-inner max-w-[620px]">
          <Typography
            as="h2"
            variant="h3"
            uppercase
            className="reveal challenges-heading community-heading text-white mb-6 text-left max-w-[620px] m-0 !leading-[1.35] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ color: headingColor || undefined }}
          >
            {heading}
          </Typography>

          {description &&
            (description.includes("<") && description.includes(">") ? (
              <div
                className="reveal stagger-1 challenges-body community-body text-[#ffffffd1] text-left max-w-[620px] m-0 mb-6 md:mb-8 !text-[clamp(0.95rem,1.1vw,1.05rem)] !leading-[1.8] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] strapi-richtext-body flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: descriptionTextColor || undefined }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <Typography
                as="p"
                variant="b1"
                className="reveal stagger-1 challenges-body community-body text-[#ffffffd1] text-left max-w-[620px] m-0 mb-6 md:mb-8 !text-[clamp(0.95rem,1.1vw,1.05rem)] !leading-[1.8] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]"
                style={{ color: descriptionTextColor || undefined }}
              >
                {description}
              </Typography>
            ))}

          {/* Vertically stacked plain text pillars left-aligned */}
          {pointers && pointers.length > 0 && (
            <div className="reveal stagger-2 community-features-list max-w-[620px] flex flex-col gap-0">
              {pointers.map((item, index, array) => (
                <div key={index} className="flex flex-col">
                  <div className="community-feature-item pt-[24px] pb-[20px]">
                    <Typography
                      as="div"
                      variant="h5"
                      uppercase
                      weight="bold"
                      className="community-feature-label text-teal mb-2.5 text-left !leading-[1.2] !tracking-[0.06em] m-0"
                      style={{ color: item.headingColor || undefined }}
                    >
                      {item.heading}
                    </Typography>
                    <Typography
                      as="p"
                      variant="b2"
                      className="community-feature-desc text-[#ffffffd1] max-w-[580px] text-left m-0 !text-[clamp(0.875rem,1vw,0.95rem)] !leading-[1.7]"
                      style={{ color: item.descriptionColor || undefined }}
                    >
                      {item.description}
                    </Typography>
                  </div>
                  {index < array.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent m-0" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA Link below pillars */}
          {ctaText && ctaUrl && (
            <div className="reveal stagger-3 community-cta-wrap mt-6 md:mt-8 max-w-[620px]">
              <Link
                href={ctaUrl}
                aria-label={`${ctaText}`}
                className="community-link-cta group inline-flex items-center gap-2 no-underline"
                target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="community-link-text text-xs uppercase tracking-[0.15em] text-white/85 font-body font-medium leading-none transition-colors duration-300 group-hover:text-white whitespace-nowrap">
                  {ctaText}
                </span>
                <DoubleRightArrowSvg className="community-link-arrow w-4 h-4 min-w-4 min-h-4 text-teal shrink-0 transition-transform duration-300 group-hover:translate-x-1 inline-block" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
