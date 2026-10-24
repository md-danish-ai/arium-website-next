"use client";

import { useState, useEffect, useRef } from "react";
import { Typography } from "@ui-element";
import type { CareersCultureAccordionProps, CareersPillar } from "./type";

export default function CareersCultureAccordion({
  title,
  contentHtml,
  paragraphs = [],
  pillars = [],
}: CareersCultureAccordionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const startAutoPlay = () => {
    if (pillars.length === 0) return;
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pillars.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pillars.length]);

  const handleMouseEnter = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      stopAutoPlay();
      setCurrentIndex(index);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    startAutoPlay();
  };

  return (
    <section
      id="careers-culture"
      className="careers-accordion-wrapper relative overflow-hidden py-20 bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF] border-y border-black/5"
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative background bubbles */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-[2]">
        <div className="wj-two-col grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-16 items-start w-full">
          {/* LEFT: Section heading & description */}
          <div className="wj-col-left reveal w-full lg:max-w-[660px]">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              className="section-title text-left mb-6 text-[#162047]"
            >
              {title}
            </Typography>
            {contentHtml ? (
              <div
                className="strapi-richtext-body text-[#162047]/90 text-left text-lg leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <div className="text-left space-y-5 text-[#162047]/90 leading-relaxed">
                {paragraphs.map((p, idx) => (
                  <Typography key={idx} variant="b1" as="p" className="text-[#162047]/90 m-0">
                    {p}
                  </Typography>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Pillars accordion */}
          <div className="wj-col-right w-full">
            <div className="reveal wj-interactive-list flex flex-col gap-3.5">
              {pillars.map((pillar: CareersPillar, index: number) => {
                const isActive = index === currentIndex;
                const hasIcon = Boolean(pillar.icon && pillar.icon.trim() !== "");
                return (
                  <div
                    key={index}
                    className={`wj-interactive-item flex flex-col justify-start py-[14px] px-[12px] rounded-lg border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-[#00e8d9]/50 bg-[#162047] shadow-xl"
                        : "border-white/10 bg-[#162047] hover:border-[#00e8d9]/30 shadow-md"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="wj-item-header flex items-center gap-3 min-h-[32px]">
                      {hasIcon && (
                        <div
                          className={`wj-icon-svg w-6 h-6 flex-shrink-0 transition-colors duration-300 ${
                            isActive ? "text-[#00e8d9]" : "text-white/75"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: pillar.icon!.replace(
                              "<svg",
                              '<svg class="wj-icon-svg w-full h-full"'
                            ),
                          }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        as="h3"
                        uppercase
                        className={`wj-interactive-title m-0 transition-colors duration-300 text-sm sm:text-base ${
                          isActive ? "text-[#00e8d9]" : "text-white"
                        }`}
                      >
                        {pillar.title}
                      </Typography>
                    </div>
                    <div
                      className={`wj-expand-desc overflow-hidden transition-all duration-300 ${
                        hasIcon ? "pl-9" : "pl-0"
                      } ${isActive ? "max-h-48 opacity-100 pt-3" : "max-h-0 opacity-0"}`}
                    >
                      <div className="wj-expand-inner">
                        <Typography
                          variant="b3"
                          as="span"
                          className="text-white/80 block text-xs sm:text-sm"
                        >
                          {pillar.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
