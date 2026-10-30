import React from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CommunitySmallCellsProps } from "./type";

export default function CommunitySmallCells({
  id = "what-are-small-cells",
  title,
  title_color,
  description,
  description_color,
  illustration_image = "/images/svg-images/small-cells-illustration.svg",
  illustration_image_alignment = "Right",
  show_bottom_divider,
  statistics = [],
}: CommunitySmallCellsProps) {
  const isSvg = (illustration_image || "").toLowerCase().endsWith(".svg");
  const isLeft =
    illustration_image_alignment === "Left" || illustration_image_alignment === "Media Left";

  const isHtml = Boolean(description && description.includes("<") && description.includes(">"));

  return (
    <section
      id={id}
      className="relative overflow-hidden py-16 md:py-24 min-h-[420px] flex items-center bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]"
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <Container className="relative z-[1]">
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={`flex flex-col ${isLeft ? "lg:order-2" : "lg:order-1"}`}>
            <Typography
              as="h2"
              variant="h2"
              uppercase
              className="text-left text-[#162047] mb-6"
              style={title_color ? { color: title_color } : undefined}
            >
              {title}
            </Typography>

            {isHtml ? (
              <div
                className="strapi-richtext-body text-[#162047] text-left flex flex-col gap-5 leading-relaxed [&>p]:m-0 [&>p]:mb-0 [&>p+p]:mt-4"
                style={description_color ? { color: description_color } : undefined}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div
                className="text-[#162047] text-left leading-relaxed space-y-5"
                style={description_color ? { color: description_color } : undefined}
              >
                <Typography as="p" variant="b1" className="m-0">
                  {description}
                </Typography>
              </div>
            )}

            {statistics && statistics.length > 0 && (
              <div className="flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-10 items-baseline mt-6 w-full">
                {statistics.map((stat, index) => (
                  <div key={`stat-${index}`} className="flex flex-col gap-1 py-1 shrink-0">
                    <Typography
                      as="span"
                      variant="stat"
                      weight="bold"
                      className="tracking-tight leading-none text-[#7c5cbf]"
                      style={stat.stat_color ? { color: stat.stat_color } : undefined}
                    >
                      {stat.stat}
                    </Typography>
                    {stat.description && (
                      <Typography
                        as="p"
                        variant="b2"
                        className="text-[#162047]/80 m-0 mt-1 whitespace-nowrap"
                      >
                        {stat.description}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            )}

            {show_bottom_divider && <div className="w-full h-px bg-[#162047]/10 mt-8" />}
          </div>

          <div
            className={`flex items-center justify-center ${
              isLeft ? "lg:justify-start lg:order-1" : "lg:justify-end lg:order-2"
            }`}
          >
            <div className="relative w-[90%] max-w-[440px]">
              <Image
                src={illustration_image}
                alt={title}
                width={440}
                height={330}
                unoptimized={isSvg}
                className={`w-full h-auto opacity-85 relative z-[1] ${isSvg ? "svg-recolor" : ""}`}
                style={{
                  filter:
                    "brightness(0) saturate(0) invert(13%) sepia(35%) saturate(3000%) hue-rotate(210deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
