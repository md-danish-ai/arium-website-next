import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";

interface SharedCtaWithGraphicProps {
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  graphic?: any;
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

  return (
    <section
      className="shared-cta-graphic-section relative overflow-hidden bg-[#D2C7FF]"
      style={bgColor ? { background: bgColor } : undefined}
    >
      <div className="shared-cta-graphic-flex-wrapper container mx-auto px-6 relative z-[2] flex flex-row items-center">
        <div className="shared-cta-graphic-text-col max-w-[min(640px,58vw)] py-24 text-left">
          <h2
            className="shared-cta-graphic-title reveal stagger-1 font-heading text-[clamp(1.8rem,3.2vw,2.4rem)] font-normal tracking-[0.06em] leading-[1.45] text-midnight mb-4"
            style={{ color: HeadingColor || undefined }}
          >
            {heading}
          </h2>
          <p
            className="shared-cta-graphic-description reveal stagger-2 text-[1.05rem] leading-[1.75] text-midnight/85 mb-8"
            style={{ color: DescriptionColor || undefined }}
          >
            {description}
          </p>
          {ctaText && ctaLink && (
            <div className="shared-cta-graphic-actions reveal stagger-3 flex justify-start">
              <Link
                href={ctaLink}
                target={ctaLink.startsWith("http") ? "_blank" : undefined}
                rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                className="shared-cta-graphic-btn-outline inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-white no-underline px-7 py-3 bg-midnight border border-midnight rounded-full transition-all duration-300 hover:bg-transparent hover:text-midnight hover:-translate-y-0.5"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className="shared-cta-graphic-illustration-wrap absolute top-0 bottom-0 right-0 h-full aspect-square pointer-events-none z-[1] flex items-center justify-end overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={absoluteGraphicUrl}
          alt={graphic?.alternativeText || heading || "CTA Graphic"}
          className="shared-cta-graphic-illustration-img w-full h-full block object-contain object-right"
        />
        <div
          className="shared-cta-graphic-illustration-fade hidden"
          aria-hidden="true"
          style={
            bgColor
              ? {
                  background: `linear-gradient(90deg, rgba(210, 199, 255, 0) 7.64%, ${bgColor} 101.48%)`,
                }
              : undefined
          }
        />
      </div>
    </section>
  );
}
