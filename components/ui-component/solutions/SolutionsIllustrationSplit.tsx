import React from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { SolutionsIllustrationSplitProps } from "./type";

export default function SolutionsIllustrationSplit({
  title,
  title_color,
  description,
  description_color,
  illustration_image,
  illustration_image_alignment = "Right",
  show_bottom_divider = true,
  statistics = [],
  className = "",
}: SolutionsIllustrationSplitProps) {
  const isSvg = illustration_image?.toLowerCase().endsWith(".svg") || false;
  const isHtml = Boolean(
    description && (description.includes("<br") || description.includes("<p"))
  );
  const isLeft = illustration_image_alignment === "Left";

  return (
    <section className={`bg-transparent py-[50px] relative overflow-hidden ${className}`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full md:max-w-none mx-auto relative">
          <div className={`order-1 ${isLeft ? "md:order-2" : "md:order-1"}`}>
            {/* Mobile Top-Right Floated Illustration (< md) */}
            {illustration_image && (
              <div className="md:hidden float-right w-[115px] sm:w-[140px] ml-4 mb-2 pointer-events-none">
                <Image
                  src={illustration_image}
                  alt=""
                  aria-hidden="true"
                  className={`w-full h-auto opacity-75 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
                    isSvg ? "svg-recolor" : ""
                  }`}
                  width={140}
                  height={140}
                  unoptimized={isSvg}
                />
              </div>
            )}

            <Typography
              variant="h3"
              as="h2"
              uppercase
              weight="normal"
              className="section-title text-left text-[#162047] m-0 mb-3"
              style={title_color ? { color: title_color } : undefined}
            >
              {title}
            </Typography>

            {isHtml ? (
              <div
                className="strapi-richtext-body text-[#162047]/80 leading-[1.8] mb-6 flex flex-col gap-4 [&>p]:m-0"
                style={description_color ? { color: description_color } : undefined}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div
                className="text-[#162047]/80 mb-6 flex flex-col gap-4"
                style={description_color ? { color: description_color } : undefined}
              >
                {description
                  .split("\n\n")
                  .filter(Boolean)
                  .map((p, idx) => (
                    <Typography
                      key={idx}
                      variant="b1"
                      as="p"
                      className="text-[#162047]/80 m-0 leading-[1.8]"
                    >
                      {p}
                    </Typography>
                  ))}
              </div>
            )}

            {statistics.length > 0 && (
              <div className="clear-both flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-4 w-full">
                {statistics.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 py-1 cursor-default shrink-0">
                    {item.stat && (
                      <Typography
                        variant="stat"
                        weight="bold"
                        className="text-[#7c5cbf] leading-none tracking-tight"
                        style={item.stat_color ? { color: item.stat_color } : undefined}
                      >
                        {item.stat}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography
                        variant="b2"
                        as="p"
                        weight="normal"
                        className="normal-case tracking-normal text-[#162047]/80 m-0 mt-1.5 whitespace-nowrap"
                      >
                        {item.description}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop / Tablet Illustration Column (>= md) */}
          {illustration_image && (
            <div
              className={`hidden md:flex items-center self-center order-2 w-full ${
                isLeft
                  ? "justify-center md:justify-start md:order-1"
                  : "justify-center md:justify-end md:order-2"
              }`}
            >
              <div className="relative w-full max-w-[340px] md:max-w-[440px]">
                <Image
                  src={illustration_image}
                  alt={title || "Illustration"}
                  className={`w-full h-auto opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
                    isSvg ? "svg-recolor" : ""
                  }`}
                  width={440}
                  height={440}
                  unoptimized={isSvg}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
      {show_bottom_divider && (
        <div className="max-w-[1200px] mx-auto mt-12 border-b border-[#162047]/10" />
      )}
    </section>
  );
}
