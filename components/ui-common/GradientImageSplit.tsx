"use client";

import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";
import { DoubleRightArrowSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";

export interface GradientSplitPointer {
  id?: string | number;
  title: string;
  description: string;
  title_color?: string;
  description_color?: string;
}

export interface GradientImageSplitProps {
  id?: string;
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  section_pointers?: GradientSplitPointer[];
  CTA_text?: string;
  CTA_url?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function GradientImageSplit({
  id = "community",
  title,
  title_color,
  description,
  description_color,
  background_image_desktop,
  background_image_mobile,
  section_pointers = [],
  CTA_text,
  CTA_url,
  style,
  className = "",
}: GradientImageSplitProps) {
  const mobileImg = background_image_mobile || background_image_desktop;

  return (
    <section
      id={id}
      className={`relative min-h-[560px] overflow-hidden bg-midnight p-0 ${className}`}
      style={style}
    >
      {/* Background image (65% right on desktop, full width on mobile/tablet) */}
      {background_image_desktop && (
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[65%] z-0 lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
          <picture className="w-full h-full block">
            {mobileImg && <source media="(max-width: 600px)" srcSet={mobileImg} />}
            <source media="(min-width: 601px)" srcSet={background_image_desktop} />
            <img
              src={background_image_desktop}
              alt={title || "Background Graphic"}
              className="w-full h-full object-cover block"
            />
          </picture>
        </div>
      )}

      {/* Gradient veil */}
      <div className="absolute inset-0 z-[1] bg-[#0a1628]/80 lg:bg-transparent lg:bg-gradient-to-t lg:from-[#0a1628]/50 lg:via-transparent lg:to-transparent pointer-events-none" />

      {/* Content */}
      <Container className="relative z-[2] py-12 md:py-16 lg:py-[100px]">
        <div className="max-w-[620px]">
          <Typography
            as="h2"
            variant="h3"
            uppercase
            className="reveal text-white mb-6 text-left max-w-[620px] m-0 !leading-[1.35] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ color: title_color || undefined }}
          >
            {title}
          </Typography>

          {description &&
            (description.includes("<") && description.includes(">") ? (
              <div
                className="reveal stagger-1 text-[#ffffffd1] text-left max-w-[620px] m-0 mb-6 md:mb-8 !leading-[1.8] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] strapi-richtext-body flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: description_color || undefined }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <Typography
                as="p"
                variant="b1"
                className="reveal stagger-1 text-[#ffffffd1] text-left max-w-[620px] m-0 mb-6 md:mb-8 !leading-[1.8] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]"
                style={{ color: description_color || undefined }}
              >
                {description}
              </Typography>
            ))}

          {/* Vertically stacked plain text pointers left-aligned */}
          {section_pointers.length > 0 && (
            <div className="reveal stagger-2 max-w-[620px] flex flex-col gap-0">
              {section_pointers.map((item, index, array) => (
                <div key={item.id ?? index} className="flex flex-col">
                  <div className="pt-[24px] pb-[20px]">
                    <Typography
                      as="div"
                      variant="h5"
                      uppercase
                      weight="bold"
                      className="text-teal mb-2.5 text-left !leading-[1.2] !tracking-[0.06em] m-0"
                      style={{ color: item.title_color || undefined }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      as="p"
                      variant="b2"
                      className="text-[#ffffffd1] max-w-[580px] text-left m-0 !leading-[1.7]"
                      style={{
                        color: item.description_color || undefined,
                      }}
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

          {/* CTA Link below pointers */}
          {CTA_text && CTA_url && (
            <div className="reveal stagger-3 mt-6 md:mt-8 max-w-[620px]">
              <Link
                href={CTA_url}
                aria-label={`${CTA_text}`}
                className="group inline-flex items-center gap-2 no-underline"
                target={CTA_url.startsWith("http") ? "_blank" : undefined}
                rel={CTA_url.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Typography
                  as="span"
                  variant="button"
                  uppercase
                  weight="medium"
                  className="inline-block tracking-[0.15em] text-white/85 leading-none transition-all duration-300 group-hover:text-white group-hover:scale-105 whitespace-nowrap"
                >
                  {CTA_text}
                </Typography>
                <DoubleRightArrowSvg className="w-4 h-4 min-w-4 min-h-4 max-w-4 max-h-4 text-teal shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 inline-block" />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
