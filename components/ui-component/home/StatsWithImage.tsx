"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography, StatCard } from "@ui-element";
import { StatsWithImageProps, StatItem } from "./type";

const DEFAULT_CARD_BG_COLORS = ["#898cf3", "#bcf6f2", "#ffffff", "#ffffca", "#ffdac8"];

const COLOR_MAP: Record<string, string> = {
  purple: "#898cf3",
  teal: "#bcf6f2",
  white: "#ffffff",
  yellow: "#ffffca",
  orange: "#ffdac8",
};

const resolveBgColor = (color?: string, index: number = 0): string => {
  if (!color) return DEFAULT_CARD_BG_COLORS[index % DEFAULT_CARD_BG_COLORS.length];
  const normalized = color.toLowerCase().replace(/[^a-z]/g, "");
  return COLOR_MAP[normalized] || color;
};

const DEFAULT_STATS: StatItem[] = [
  { Number: "100K+", Description: "Small cells on air or under contract", BgColor: "#898cf3" },
  { Number: "300+", Description: "DAS-connected venues and buildings", BgColor: "#bcf6f2" },
  { Number: "700+", Description: "Supported municipal networks", BgColor: "#ffffff" },
  { Number: "15+", Description: "Years of expertise", BgColor: "#ffffca" },
  { Number: "24/7", Description: "Monitoring via the NOC", BgColor: "#ffdac8" },
];

const DEFAULT_MAP_IMAGE = "/assets/images/us-dot-map-faint.svg";
const DEFAULT_HEADING = "Scale and experience to match your ambition";

export default function StatsWithImage({
  heading,
  statscards,
  image,
  HeadingColor,
}: StatsWithImageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".counter");
            counters.forEach((counter) => {
              const el = counter as HTMLElement;
              const target = +el.getAttribute("data-target")!;
              const suffix = el.getAttribute("data-suffix") || "";
              const duration = 2000;

              const startTime = performance.now();
              const updateCounter = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);

                el.innerText = current + suffix;

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                } else {
                  el.innerText = target + suffix;
                }
              };

              requestAnimationFrame(updateCounter);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imgObj = image as
    | {
        url?: string;
        alternativeText?: string;
        data?: {
          url?: string;
          alternativeText?: string;
          attributes?: { url?: string; alternativeText?: string };
        };
        attributes?: { url?: string; alternativeText?: string };
      }
    | undefined;

  const imageUrl =
    imgObj?.url ||
    imgObj?.data?.attributes?.url ||
    imgObj?.data?.url ||
    imgObj?.attributes?.url ||
    DEFAULT_MAP_IMAGE;
  const absoluteImageUrl = imageUrl.startsWith("/assets/") ? imageUrl : GetStrapiMediaUrl(imageUrl);
  const altText =
    imgObj?.alternativeText ||
    imgObj?.data?.attributes?.alternativeText ||
    imgObj?.data?.alternativeText ||
    heading ||
    "Stats graphic";

  const cardsToRender = statscards && statscards.length > 0 ? statscards : DEFAULT_STATS;

  return (
    <section
      className="shared-swi-section relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-[72px] lg:pb-[120px] bg-midnight"
      ref={sectionRef}
    >
      <div className="shared-swi-bg-gradient absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,232,217,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 relative z-[1]">
        <div className="shared-swi-header mb-8 md:mb-12 lg:mb-16 text-center reveal">
          <Typography
            variant="h3"
            uppercase
            className="shared-swi-title text-center text-white max-w-full m-0"
            style={{ color: HeadingColor || undefined }}
          >
            {heading || DEFAULT_HEADING}
          </Typography>
        </div>

        <div className="shared-swi-top-grid grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div className="shared-swi-bento-grid grid grid-cols-2 gap-3 sm:gap-3.5 md:gap-4 w-full h-full reveal stagger-1">
            {cardsToRender.map((stat: StatItem, index: number, array: StatItem[]) => {
              const isLastSpan2 = index === array.length - 1 && array.length % 2 !== 0;

              return (
                <StatCard
                  key={index}
                  number={stat.Number || stat.value || "0"}
                  description={stat.Description || stat.label || ""}
                  bgColor={resolveBgColor(stat.BgColor, index)}
                  numberColor={stat.NumberColor}
                  descriptionColor={stat.DescriptionColor}
                  align={isLastSpan2 ? "center" : "left"}
                  className={isLastSpan2 ? "col-span-2" : ""}
                />
              );
            })}
          </div>

          <div className="shared-swi-map-container flex items-center justify-center h-full w-full reveal stagger-2 mt-4 lg:mt-0">
            <Image
              src={absoluteImageUrl}
              alt={altText}
              width={800}
              height={480}
              unoptimized
              className="w-full max-w-[650px] lg:max-w-none max-h-[340px] md:max-h-[420px] lg:max-h-[480px] object-contain object-center h-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
