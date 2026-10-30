import React from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

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

export interface CtaWithGraphicProps {
  title?: string;
  description?: string;
  CTA_text?: string;
  CTA_url?: string;
  globe_illustration_desktop?: GraphicType;
  globe_illustration_mobile?: GraphicType;
  background_color?: string;
  title_color?: string;
  description_color?: string;
}

export default function CtaWithGraphic({
  title,
  description,
  CTA_text,
  CTA_url,
  globe_illustration_desktop,
  background_color,
  title_color,
  description_color,
}: CtaWithGraphicProps) {
  if (!title && !description) return null;

  const graphicUrl =
    typeof globe_illustration_desktop === "string"
      ? globe_illustration_desktop
      : globe_illustration_desktop?.url ||
        globe_illustration_desktop?.data?.attributes?.url ||
        "/images/svg-images/connection-cta.svg";
  const absoluteGraphicUrl = GetStrapiMediaUrl(graphicUrl);

  const altText =
    (typeof globe_illustration_desktop === "object" &&
      globe_illustration_desktop?.alternativeText) ||
    (typeof globe_illustration_desktop === "object" &&
      globe_illustration_desktop?.data?.attributes?.alternativeText) ||
    title ||
    "CTA Graphic";
  const isSvg =
    absoluteGraphicUrl.toLowerCase().endsWith(".svg") || absoluteGraphicUrl.includes(".svg");

  return (
    <section
      className="relative overflow-hidden bg-[#D2C7FF]"
      style={background_color ? { background: background_color } : undefined}
    >
      <Container className="relative z-[2]">
        <div className="w-full max-w-full md:max-w-[550px] lg:max-w-[650px] py-12 sm:py-16 md:py-20 lg:py-24 text-left">
          <Typography
            as="h2"
            variant="h3"
            uppercase
            className="reveal stagger-1 m-0 mb-4 md:mb-6 text-midnight leading-[1.15] tracking-tight"
            style={{ color: title_color || undefined }}
          >
            {title}
          </Typography>

          <Typography
            as="p"
            variant="b1"
            className="reveal stagger-2 m-0 mb-6 md:mb-8 text-midnight/85 max-w-[620px] leading-[1.6]"
            style={{ color: description_color || undefined }}
          >
            {description}
          </Typography>

          {CTA_text && CTA_url && (
            <div className="reveal stagger-3 flex justify-start">
              <Button href={CTA_url} color="primary">
                {CTA_text}
              </Button>
            </div>
          )}
        </div>
      </Container>

      <div
        className="absolute top-0 bottom-0 right-0 h-full aspect-square pointer-events-none z-[1] flex items-center justify-end overflow-hidden opacity-15 sm:opacity-20 md:opacity-25 lg:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <Image
          src={absoluteGraphicUrl}
          alt={altText}
          fill
          unoptimized={isSvg}
          className="w-full h-full block object-contain object-right"
        />
      </div>
    </section>
  );
}
