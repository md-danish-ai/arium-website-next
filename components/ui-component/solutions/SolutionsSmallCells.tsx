import React from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { SolutionsSmallCellsProps } from "./type";

export default function SolutionsSmallCells({
  title,
  contentHtml,
  paragraphs = [],
  stats = [],
  illustrationSrc,
  illustrationAlt = "Small cells network illustration",
}: SolutionsSmallCellsProps) {
  const isSvg = illustrationSrc.toLowerCase().endsWith(".svg");

  return (
    <section className="bg-transparent py-[50px] relative overflow-hidden">
      <Container>
        <div className="sol-split grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full md:max-w-none mx-auto relative">
          <div className="sol-split-text order-1">
            {/* Mobile Top-Right Floated Illustration (< md) */}
            <div className="md:hidden float-right w-[115px] sm:w-[140px] ml-4 mb-2 pointer-events-none">
              <Image
                src={illustrationSrc}
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

            <Typography
              variant="h3"
              as="h2"
              uppercase
              weight="normal"
              className="section-title text-left text-[#162047] m-0 mb-3"
            >
              {title}
            </Typography>

            {contentHtml ? (
              <div
                className="strapi-richtext-body text-[#162047]/80 text-[clamp(0.9rem,1.1vw,1rem)] leading-[1.8] mb-6 flex flex-col gap-4 [&>p]:m-0"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <div className="text-[#162047]/80 mb-6 flex flex-col gap-4">
                {paragraphs.map((p, idx) => (
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

            {stats.length > 0 && (
              <div className="clear-both sol-kpis-row flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-4 w-full">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="sol-kpi-item flex flex-col gap-1 py-1 cursor-default shrink-0"
                  >
                    {stat.value && (
                      <Typography
                        variant="stat"
                        weight="bold"
                        className="sol-kpi-num text-[#7c5cbf] leading-none tracking-tight"
                      >
                        {stat.value}
                      </Typography>
                    )}
                    {stat.label && (
                      <Typography
                        variant="b2"
                        as="p"
                        weight="normal"
                        className="sol-kpi-label normal-case tracking-normal text-[#162047]/80 m-0 mt-1.5 whitespace-nowrap"
                      >
                        {stat.label}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop / Tablet Illustration Column (>= md) */}
          <div className="sol-illustration-wrapper small-cells-illust hidden md:flex items-center justify-center md:justify-end self-center order-2 w-full">
            <div className="relative w-full max-w-[340px] md:max-w-[440px]">
              <Image
                src={illustrationSrc}
                alt={illustrationAlt}
                className={`w-full h-auto opacity-85 relative z-[1] [filter:brightness(0)_saturate(0)_invert(13%)_sepia(35%)_saturate(3000%)_hue-rotate(210deg)_brightness(95%)_contrast(92%)] ${
                  isSvg ? "svg-recolor" : ""
                }`}
                width={440}
                height={440}
                unoptimized={isSvg}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
