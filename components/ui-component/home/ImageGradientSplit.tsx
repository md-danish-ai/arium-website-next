"use client";

import React from "react";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { DoubleRightArrowSvg } from "@ui-svg";
import { ImageGradientSplitProps, SectionPointer } from "./type";

interface MediaItemLike {
  url?: string;
  width?: number;
  attributes?: {
    url?: string;
    width?: number;
  };
}

const DEFAULT_HEADING = "Keeping communities safe and connected";
const DEFAULT_DESCRIPTION =
  "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes.";

const DEFAULT_POINTERS: SectionPointer[] = [
  {
    Heading: "Reliability",
    Description:
      "Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps, and data they depend on.",
  },
  {
    Heading: "Opportunity",
    Description:
      "Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.",
  },
  {
    Heading: "Safety",
    Description:
      "In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters, and other first responders can access the essential data they need to do their jobs effectively.",
  },
];

const DEFAULT_DESKTOP_IMG = "/assets/images/arena_wide.jpg";
const DEFAULT_MOBILE_IMG = "/assets/images/arena-wide-mobile.jpg";

export default function ImageGradientSplit({
  heading,
  description,
  sectionPointers,
  ctaText,
  ctaUrl,
  bgImage,
  HeadingColor,
  DescriptionTextColor,
}: ImageGradientSplitProps) {
  let desktopUrl = "";
  let mobileUrl = "";

  const extractUrl = (item: MediaItemLike | null | undefined) =>
    item?.attributes?.url || item?.url || "";
  const getWidth = (item: MediaItemLike | null | undefined) =>
    item?.attributes?.width || item?.width || 0;

  let images: MediaItemLike[] = [];
  if (Array.isArray(bgImage)) {
    images = bgImage as MediaItemLike[];
  } else if (
    bgImage &&
    typeof bgImage === "object" &&
    "data" in bgImage &&
    Array.isArray((bgImage as { data?: unknown }).data)
  ) {
    images = (bgImage as { data: MediaItemLike[] }).data;
  }

  if (images.length >= 2) {
    const sorted = [...images].sort((a, b) => getWidth(b) - getWidth(a));
    if (getWidth(sorted[0]) === getWidth(sorted[1])) {
      const isFirstMobile =
        extractUrl(images[0]).toLowerCase().includes("mobile") ||
        extractUrl(images[0]).includes("1080x");
      if (isFirstMobile) {
        desktopUrl = extractUrl(images[1]);
        mobileUrl = extractUrl(images[0]);
      } else {
        desktopUrl = extractUrl(images[0]);
        mobileUrl = extractUrl(images[1]);
      }
    } else {
      desktopUrl = extractUrl(sorted[0]);
      mobileUrl = extractUrl(sorted[1]);
    }
  } else if (images.length === 1) {
    desktopUrl = extractUrl(images[0]);
    mobileUrl = desktopUrl;
  } else if (bgImage && typeof bgImage === "object") {
    const singleObj = bgImage as {
      url?: string;
      data?: { attributes?: { url?: string } };
    };
    desktopUrl = singleObj.data?.attributes?.url || singleObj.url || "";
    mobileUrl = desktopUrl;
  }

  const finalDesktopUrl = GetStrapiMediaUrl(desktopUrl) || DEFAULT_DESKTOP_IMG;
  const finalMobileUrl = GetStrapiMediaUrl(mobileUrl) || DEFAULT_MOBILE_IMG;

  const pointersToRender =
    sectionPointers && sectionPointers.length > 0 ? sectionPointers : DEFAULT_POINTERS;

  const renderedHeading = heading || DEFAULT_HEADING;
  const renderedDescription = description || DEFAULT_DESCRIPTION;
  const renderedCtaText = ctaText || "Learn More";
  const renderedCtaUrl = ctaUrl || "/community";

  return (
    <section
      id="community"
      className="community-section relative min-h-[560px] overflow-hidden bg-midnight p-0"
    >
      {/* Background image (65% right on desktop, full width on mobile/tablet) */}
      <div className="community-bg absolute top-0 right-0 bottom-0 w-full lg:w-[65%] z-0 lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
        <picture className="w-full h-full block">
          <source media="(max-width: 600px)" srcSet={finalMobileUrl} />
          <source media="(min-width: 601px)" srcSet={finalDesktopUrl} />
          <img
            src={finalDesktopUrl}
            alt={renderedHeading}
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
            style={{ color: HeadingColor || undefined }}
          >
            {renderedHeading}
          </Typography>

          <Typography
            as="p"
            variant="b1"
            className="reveal stagger-1 challenges-body community-body text-[#ffffffd1] text-left max-w-[620px] m-0 mb-6 md:mb-8 !text-[clamp(0.95rem,1.1vw,1.05rem)] !leading-[1.8] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]"
            style={{ color: DescriptionTextColor || undefined }}
          >
            {renderedDescription}
          </Typography>

          {/* Vertically stacked plain text pillars left-aligned */}
          <div className="reveal stagger-2 community-features-list max-w-[620px] flex flex-col gap-0">
            {pointersToRender.map(
              (item: SectionPointer, index: number, array: SectionPointer[]) => {
                const itemHeading = item.Heading || item.title || "";
                const itemDesc = item.Description || item.description || "";

                return (
                  <div key={index} className="flex flex-col">
                    <div className="community-feature-item pt-[24px] pb-[20px]">
                      <Typography
                        as="div"
                        variant="h5"
                        uppercase
                        weight="bold"
                        className="community-feature-label text-teal mb-2.5 text-left !leading-[1.2] !tracking-[0.06em] m-0"
                        style={{ color: item.FontHeading || undefined }}
                      >
                        {itemHeading}
                      </Typography>
                      <Typography
                        as="p"
                        variant="b2"
                        className="community-feature-desc text-[#ffffffd1] max-w-[580px] text-left m-0 !text-[clamp(0.875rem,1vw,0.95rem)] !leading-[1.7]"
                        style={{ color: item.FontDescription || undefined }}
                      >
                        {itemDesc}
                      </Typography>
                    </div>
                    {index < array.length - 1 && (
                      <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent m-0" />
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* CTA link below pillars */}
          {renderedCtaText && renderedCtaUrl && (
            <div className="reveal stagger-3 community-cta-wrap mt-6 md:mt-8 max-w-[620px]">
              <Link
                href={renderedCtaUrl}
                aria-label={`${renderedCtaText}`}
                className="community-link-cta group inline-flex items-center gap-2 no-underline"
                target={renderedCtaUrl.startsWith("http") ? "_blank" : undefined}
                rel={renderedCtaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="community-link-text text-xs uppercase tracking-[0.15em] text-white/85 font-body font-medium leading-none transition-colors duration-300 group-hover:text-white whitespace-nowrap">
                  {renderedCtaText}
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
