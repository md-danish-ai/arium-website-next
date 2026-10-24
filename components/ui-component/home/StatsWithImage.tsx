"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography, StatCard } from "@ui-element";
import { StatsWithImageProps, StatItem } from "./type";

export default function StatsWithImage({
  heading,
  stats,
  mapImageSrc,
  headingColor,
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

  return (
    <section
      className="shared-swi-section relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-[72px] lg:pb-[120px] bg-midnight"
      ref={sectionRef}
    >
      <div className="shared-swi-bg-gradient absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,232,217,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container relative z-[1]">
        <div className="shared-swi-header mb-8 md:mb-12 lg:mb-16 text-center reveal">
          <Typography
            variant="h3"
            uppercase
            className="shared-swi-title text-center text-white max-w-full m-0"
            style={{ color: headingColor || undefined }}
          >
            {heading}
          </Typography>
        </div>

        <div className="shared-swi-top-grid grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center">
          <div className="shared-swi-bento-grid grid grid-cols-2 gap-3 sm:gap-3.5 md:gap-4 w-full h-full reveal stagger-1">
            {stats.map((stat: StatItem, index: number, array: StatItem[]) => {
              const isLastSpan2 = index === array.length - 1 && array.length % 2 !== 0;

              return (
                <StatCard
                  key={index}
                  number={stat.number}
                  description={stat.description}
                  bgColor={stat.bgColor}
                  numberColor={stat.numberColor}
                  descriptionColor={stat.descriptionColor}
                  align={isLastSpan2 ? "center" : "left"}
                  className={isLastSpan2 ? "col-span-2" : ""}
                />
              );
            })}
          </div>

          <div className="shared-swi-map-container flex items-center justify-center h-full w-full reveal stagger-2 mt-4 lg:mt-0">
            <Image
              src={mapImageSrc}
              alt={heading || "Coverage Map"}
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
