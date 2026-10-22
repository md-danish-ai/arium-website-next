import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

export interface StrapiMedia {
  url?: string;
  alternativeText?: string;
  data?: {
    attributes?: {
      url?: string;
      alternativeText?: string;
    };
  };
}

export type GraphicType = string | StrapiMedia | null;

export interface SharedCtaWithGraphicProps {
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  graphic?: GraphicType;
  bgColor?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function SharedCtaWithGraphic({
  heading,
  description,
  ctaText,
  ctaLink,
  graphic,
  bgColor,
  HeadingColor,
  DescriptionColor,
}: SharedCtaWithGraphicProps) {
  if (!heading && !description) return null;

  const graphicUrl =
    typeof graphic === "string" ? graphic : graphic?.url || graphic?.data?.attributes?.url;
  const absoluteGraphicUrl = graphicUrl
    ? GetStrapiMediaUrl(graphicUrl)
    : "/assets/images/connection-cta.svg";
  const altText =
    (typeof graphic === "object" && graphic?.alternativeText) ||
    (typeof graphic === "object" && graphic?.data?.attributes?.alternativeText) ||
    heading ||
    "CTA Graphic";
  const isSvg =
    absoluteGraphicUrl.toLowerCase().endsWith(".svg") || absoluteGraphicUrl.includes(".svg");

  return (
    <section
      className="shared-cta-graphic-section relative overflow-hidden bg-[#D2C7FF]"
      style={bgColor ? { background: bgColor } : undefined}
    >
      <div className="container mx-auto px-6 sm:px-8 max-w-[1440px] relative z-[2]">
        <div className="w-full max-w-full md:max-w-[550px] lg:max-w-[650px] py-12 sm:py-16 md:py-20 lg:py-24 text-left">
          <Typography
            as="h2"
            variant="h3"
            uppercase
            weight="bold"
            className="reveal stagger-1 m-0 mb-4 md:mb-6 text-midnight leading-[1.15] tracking-tight"
            style={{ color: HeadingColor || undefined }}
          >
            {heading}
          </Typography>

          <Typography
            as="p"
            variant="b1"
            className="reveal stagger-2 m-0 mb-6 md:mb-8 text-midnight/85 max-w-[620px] leading-[1.6]"
            style={{ color: DescriptionColor || undefined }}
          >
            {description}
          </Typography>

          {ctaText && ctaLink && (
            <div className="reveal stagger-3 flex justify-start">
              <Link
                href={ctaLink}
                target={ctaLink.startsWith("http") ? "_blank" : undefined}
                rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-center whitespace-nowrap px-8 py-3.5 bg-midnight text-white border border-midnight rounded-full transition-all duration-300 hover:bg-transparent hover:border-midnight hover:text-midnight hover:-translate-y-0.5 no-underline shadow-sm"
              >
                <Typography
                  as="span"
                  variant="button"
                  weight="semibold"
                  uppercase
                  className="whitespace-nowrap tracking-wider text-white group-hover:text-midnight transition-colors duration-300"
                >
                  {ctaText}
                </Typography>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className="shared-cta-graphic-illustration-wrap absolute top-0 bottom-0 right-0 h-full aspect-square pointer-events-none z-[1] flex items-center justify-end overflow-hidden opacity-25 sm:opacity-40 md:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <Image
          src={absoluteGraphicUrl}
          alt={altText}
          fill
          unoptimized={isSvg}
          className="shared-cta-graphic-illustration-img w-full h-full block object-contain object-right"
        />
      </div>
    </section>
  );
}
