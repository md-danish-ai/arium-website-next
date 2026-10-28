"use client";

import React from "react";
import Image from "next/image";
import { Typography, StatCard } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { useCounterAnimation } from "@hooks/useCounterAnimation";
import { StatsWithImageProps, StatItem } from "./type";

export default function StatsWithImage({
  title,
  title_color,
  image,
  StatsCard = [],
}: StatsWithImageProps) {
  const sectionRef = useCounterAnimation();

  return (
    <section
      className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-[72px] lg:pb-[120px] bg-midnight"
      ref={sectionRef}
    >
      <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,232,217,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <Container className="relative z-[1]">
        <div className="mb-8 md:mb-12 lg:mb-16 text-center reveal">
          <Typography
            variant="h3"
            uppercase
            className="text-center text-white max-w-full m-0"
            style={{ color: title_color || undefined }}
          >
            {title}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-3.5 md:gap-4 w-full h-full reveal stagger-1">
            {StatsCard.map((stat: StatItem, index: number, array: StatItem[]) => {
              const isLastSpan2 = index === array.length - 1 && array.length % 2 !== 0;

              return (
                <StatCard
                  key={stat.id ?? index}
                  number={stat.number}
                  description={stat.description}
                  bgColor={stat.background_color}
                  numberColor={stat.number_color}
                  descriptionColor={stat.description_color}
                  align={isLastSpan2 ? "center" : "left"}
                  className={isLastSpan2 ? "col-span-2" : ""}
                />
              );
            })}
          </div>

          {image && (
            <div className="flex items-center justify-center h-full w-full reveal stagger-2 mt-4 lg:mt-0">
              <Image
                src={image}
                alt={title || "Coverage Map"}
                width={800}
                height={480}
                unoptimized
                className="w-full max-w-[650px] lg:max-w-none max-h-[340px] md:max-h-[420px] lg:max-h-[480px] object-contain object-center h-auto mx-auto"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
