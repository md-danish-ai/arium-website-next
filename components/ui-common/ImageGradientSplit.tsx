"use client";

import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";
import { DoubleRightArrowSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";

export interface SectionPointerItem {
  id?: string | number;
  title: string;
  description: string;
  title_color?: string;
  description_color?: string;
}

export type GradientSplitPointer = SectionPointerItem;

export interface ImageGradientSplitProps {
  id?: string;
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  background_image_desktop?: string;
  background_image_mobile?: string;
  section_pointers?: SectionPointerItem[];
  CTA_text?: string;
  CTA_url?: string;
  style?: React.CSSProperties;
  className?: string;
}

export type GradientImageSplitProps = ImageGradientSplitProps;

export default function ImageGradientSplit({
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
}: ImageGradientSplitProps) {
  const mobileImg = background_image_mobile || background_image_desktop;

  return (
    <section
      id={id}
      className={`relative min-h-0 min-[1025px]:min-h-[720px] overflow-hidden bg-midnight p-0 ${className}`}
      style={style}
    >
      {background_image_desktop && (
        <div className="absolute top-0 right-0 bottom-0 w-full min-[1025px]:w-[58%] xl:w-[50%] min-[1350px]:w-[56%] 2xl:w-[58%] z-0 min-[1025px]:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_8%,rgba(0,0,0,0.85)_16%,black_25%)] after:content-[''] after:absolute after:inset-0 after:z-[1] after:bg-[#162047]/35">
          <picture className="w-full h-full block">
            {mobileImg && <source media="(max-width: 767px)" srcSet={mobileImg} />}
            <source media="(min-width: 768px)" srcSet={background_image_desktop} />
            <img
              src={background_image_desktop}
              alt={title || "Background Graphic"}
              className="w-full h-full object-cover block"
            />
          </picture>
        </div>
      )}

      <div className="absolute inset-0 z-[1] bg-[#0a1628bf] min-[1025px]:bg-transparent min-[1025px]:bg-gradient-to-t min-[1025px]:from-[#0a1628]/50 min-[1025px]:to-transparent min-[1025px]:to-[18%] pointer-events-none" />

      {/* Content */}
      <Container className="relative z-[2] py-[60px] min-[1025px]:pt-[50px] min-[1025px]:pb-[54px]">
        <div className="max-w-[600px] min-[1030px]:max-w-[475px] xl:max-w-[min(620px,48vw)] min-[1350px]:max-w-[min(590px,48vw)] 2xl:max-w-[600px]">
          <Typography
            variant="h2"
            uppercase
            className="reveal text-white mb-6 text-left m-0 font-normal [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ color: title_color || undefined }}
          >
            {title}
          </Typography>

          {description &&
            (description.includes("<") && description.includes(">") ? (
              <div
                className="reveal stagger-1 text-[#ffffffcc] text-left m-0 mb-6 md:mb-8 text-[0.88rem] sm:text-[1.05rem] !leading-[1.7] sm:!leading-[1.8] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] strapi-richtext-body flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: description_color || undefined }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <Typography
                as="p"
                variant="b1"
                className="reveal stagger-1 text-left m-0 mb-6 md:mb-8 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] font-normal"
                style={{ color: description_color || undefined }}
              >
                {description}
              </Typography>
            ))}

          {/* Vertically stacked plain text pointers left-aligned */}
          {section_pointers.length > 0 && (
            <div className="reveal stagger-2 mt-9 flex flex-col gap-0">
              {section_pointers.map((item, index, array) => (
                <div key={item.id ?? index} className="flex flex-col">
                  <div
                    className={index === 0 ? "pb-6" : index === array.length - 1 ? "pt-6" : "py-6"}
                  >
                    <Typography
                      as="h4"
                      variant="h4"
                      uppercase
                      weight="bold"
                      className="text-teal mb-1.5 text-left m-0"
                      style={{ color: item.title_color || undefined }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      as="p"
                      variant="b2"
                      className="text-[#ffffffcc] text-left m-0 font-normal"
                      style={{
                        color: item.description_color || undefined,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </div>
                  {index < array.length - 1 && (
                    <div className="w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA Link below pointers */}
          {CTA_text && CTA_url && (
            <div className="reveal stagger-3 mt-9">
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
                  weight="normal"
                  className="inline-block tracking-[0.15em] text-white leading-none transition-colors duration-300 group-hover:text-teal whitespace-nowrap"
                >
                  {CTA_text}
                </Typography>
                <DoubleRightArrowSvg className="w-4 h-4 min-w-4 min-h-4 max-w-4 max-h-4 text-teal shrink-0 transition-transform duration-300 group-hover:translate-x-1 inline-block" />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export const GradientImageSplit = ImageGradientSplit;
