"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

interface Statistic {
  stat: string;
  description: string;
  stat_color?: string;
}

interface StrapiMediaObject {
  url?: string;
  data?: { attributes?: { url?: string } };
  alternativeText?: string;
}

interface IllustrationSplitProps {
  id?: string;
  title?: string;
  title_color?: string;
  description?: string;
  description_color?: string;
  illustration_image?: StrapiMediaObject[] | StrapiMediaObject | string | null;
  illustration_image_alignment?: "Media Right" | "Media Left" | "Right" | "Left";
  show_bottom_divider?: boolean;
  statistics?: Statistic[];
}

export default function IllustrationSplit({
  id,
  title,
  title_color,
  description,
  description_color,
  illustration_image,
  illustration_image_alignment,
  show_bottom_divider,
  statistics = [],
}: IllustrationSplitProps) {
  const pathname = usePathname();
  const isSolutions = pathname?.includes("solutions") || pathname?.includes("/solutions");

  let rawImgUrl: string | undefined = undefined;
  let altText: string | undefined = undefined;

  if (typeof illustration_image === "string") {
    rawImgUrl = illustration_image;
  } else if (Array.isArray(illustration_image)) {
    rawImgUrl = illustration_image[0]?.url;
    altText = illustration_image[0]?.alternativeText;
  } else if (illustration_image) {
    const singleMedia = illustration_image as StrapiMediaObject;
    rawImgUrl = singleMedia.url ?? singleMedia.data?.attributes?.url;
    altText = singleMedia.alternativeText;
  }

  const isMediaLeft =
    illustration_image_alignment === "Media Left" ||
    illustration_image_alignment === "Left" ||
    (title ? title.toLowerCase().includes("antenna") : false) ||
    (title ? title.toLowerCase().includes("das") : false);

  const defaultSvg = isMediaLeft
    ? "/images/svg-images/das-illustration.svg"
    : "/images/svg-images/small-cells-illustration.svg";
  const imgUrl = rawImgUrl ? GetStrapiMediaUrl(rawImgUrl) : defaultSvg;

  return (
    <section
      id={id}
      className={`relative overflow-hidden flex items-center bg-transparent border-none ${
        isSolutions ? "py-[50px]" : "py-16 md:py-24"
      }`}
    >
      <div
        className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="md:hidden absolute top-[-25px] right-0 w-[150px] sm:w-[180px] pointer-events-none z-[1]"
        aria-hidden="true"
      >
        <Image
          src={imgUrl}
          alt=""
          aria-hidden="true"
          width={180}
          height={180}
          unoptimized={imgUrl.toLowerCase().endsWith(".svg")}
          className={`w-full h-auto opacity-75 [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
            imgUrl.toLowerCase().endsWith(".svg") ? "svg-recolor" : ""
          }`}
        />
      </div>

      <Container className="relative z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full md:max-w-none mx-auto relative">
          <div className={`order-1 ${isMediaLeft ? "md:order-2" : "md:order-1"}`}>
            {title && (
              <Typography
                as="h2"
                variant="h3"
                uppercase
                weight="normal"
                className="section-title text-left tracking-[0.06em] leading-[1.45] text-midnight m-0 mb-3"
                style={{ color: title_color || undefined }}
              >
                {title}
              </Typography>
            )}

            {description && (
              <div
                className="strapi-richtext-body leading-[1.8] text-midnight/80 mb-6 flex flex-col gap-4 [&>p]:m-0 [&>p]:mb-0 [&>p+p]:mt-3"
                style={{ color: description_color || undefined }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {statistics && statistics.length > 0 && (
              <div className="flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-4 w-full">
                {statistics.map((stat, index) => (
                  <div
                    key={`stat-${index}`}
                    className="flex flex-col gap-1 py-1 cursor-default shrink-0"
                  >
                    <Typography
                      as="span"
                      variant="stat"
                      weight="bold"
                      className="tracking-tight leading-none text-[#7c5cbf]"
                      style={{ color: stat.stat_color || "#7c5cbf" }}
                    >
                      {stat.stat}
                    </Typography>
                    {stat.description && (
                      <Typography
                        as="p"
                        variant="b2"
                        weight="normal"
                        className="normal-case tracking-normal text-midnight/80 m-0 mt-1.5 whitespace-nowrap"
                      >
                        {stat.description}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            )}

            {show_bottom_divider && !isSolutions && (
              <div className="w-full h-px bg-midnight/10 mt-7" />
            )}
          </div>

          <div
            className={`hidden md:flex items-center self-center w-full ${
              isMediaLeft
                ? "justify-center md:justify-start md:order-1"
                : "justify-center md:justify-end md:order-2"
            }`}
          >
            <div className="relative w-full max-w-[340px] md:max-w-[440px]">
              <Image
                src={imgUrl}
                alt={altText || title || "Illustration"}
                width={440}
                height={440}
                unoptimized={imgUrl.toLowerCase().endsWith(".svg")}
                className={`w-full h-auto opacity-75 md:opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
                  imgUrl.toLowerCase().endsWith(".svg") ? "svg-recolor" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
