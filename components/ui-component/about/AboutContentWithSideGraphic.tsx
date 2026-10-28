import React from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { AboutContentWithSideGraphicProps } from "./type";

export default function AboutContentWithSideGraphic({
  title,
  title_color,
  description,
  description_color,
  background_color,
  image,
}: AboutContentWithSideGraphicProps) {
  const defaultGradient = "bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]";
  const backgroundStyle =
    background_color && !background_color.startsWith("bg-")
      ? { background: background_color }
      : undefined;
  const gradientClass = background_color?.startsWith("bg-") ? background_color : defaultGradient;

  return (
    <section
      className={`pt-16 sm:pt-20 pb-0 lg:py-24 relative overflow-hidden border-none ${gradientClass}`}
      style={backgroundStyle}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <Container className="relative z-[1]">
        <div className="lg:max-w-[760px] text-left">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="reveal text-midnight text-left mb-6 leading-[1.35] whitespace-normal lg:whitespace-nowrap"
            style={title_color ? { color: title_color } : undefined}
          >
            {title}
          </Typography>

          <div
            className="reveal stagger-1 flex flex-col gap-5 text-midnight/80 text-left leading-[1.8]"
            style={description_color ? { color: description_color } : undefined}
          >
            {description
              ? description.split("\n\n").map((paragraph, i) => (
                <Typography variant="b1" as="p" className="m-0" key={i}>
                  {paragraph}
                </Typography>
              ))
              : null}
          </div>
        </div>
      </Container>

      {/* Single Image: Bottom on mobile/tablet (<1024px), Side on desktop (>=1024px) */}
      <div className="relative z-[1] w-full mt-6 sm:mt-8 overflow-hidden lg:mt-0 lg:w-auto lg:overflow-visible lg:absolute lg:-right-8 lg:top-1/2 lg:h-[100%] lg:translate-x-1/2 lg:-translate-y-1/2 lg:-scale-x-100 pointer-events-none">
        {image && (
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            width={800}
            height={800}
            unoptimized={image.endsWith(".svg")}
            className="w-auto h-auto max-w-[85%] max-h-[300px] sm:max-h-[360px] md:max-h-[400px] mx-auto block opacity-[0.18] [filter:brightness(0)_saturate(0)] lg:w-auto lg:max-w-none lg:max-h-none lg:h-full"
          />
        )}
      </div>
    </section>
  );
}
