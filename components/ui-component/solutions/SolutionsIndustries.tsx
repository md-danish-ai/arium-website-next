"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import {
  IndustryStadiumsSvg,
  IndustryAmusementSvg,
  IndustryEducationSvg,
  IndustryRealEstateSvg,
  IndustryHealthcareSvg,
  IndustryGovernmentSvg,
  IndustryAirportsSvg,
} from "@ui-svg";
import { INDUSTRY_BG_IMAGES } from "@data/solutions.data";
import type { SolutionsIndustriesProps } from "./type";

const ICON_MAP: Record<string, React.ReactNode> = {
  "stadiums & arenas": <IndustryStadiumsSvg />,
  "stadiums and arenas": <IndustryStadiumsSvg />,
  stadiums: <IndustryStadiumsSvg />,
  "amusement parks, hospitality & entertainment": <IndustryAmusementSvg />,
  "amusement parks": <IndustryAmusementSvg />,
  "higher education": <IndustryEducationSvg />,
  "commercial real estate": <IndustryRealEstateSvg />,
  healthcare: <IndustryHealthcareSvg />,
  "state & local government": <IndustryGovernmentSvg />,
  "state and local government": <IndustryGovernmentSvg />,
  government: <IndustryGovernmentSvg />,
  airports: <IndustryAirportsSvg />,
};

export default function SolutionsIndustries({
  title,
  title_color,
  description,
  description_color,
  background_color,
  accordian_cards = [],
}: SolutionsIndustriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoDisabled, setIsAutoDisabled] = useState(false);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (isAutoDisabled || accordian_cards.length === 0) return;
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % accordian_cards.length);
    }, 5500);
  }, [isAutoDisabled, accordian_cards.length, stopAutoPlay]);

  useEffect(() => {
    if (!isAutoDisabled) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoDisabled, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      stopAutoPlay();
      setCurrentIndex(index);
    }, 200);
  };

  const handleClick = (index: number) => {
    setIsAutoDisabled(true);
    stopAutoPlay();
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!isAutoDisabled) {
      startAutoPlay();
    }
  };

  return (
    <section
      id="industries"
      className="relative overflow-hidden py-14 md:py-20 lg:py-24 bg-[#101830] border-none"
      style={background_color ? { background: background_color } : undefined}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images wrapper */}
      <div className="absolute left-0 top-0 w-full h-full lg:w-3/4 z-0 pointer-events-none overflow-hidden">
        {accordian_cards.map((card, index) => {
          const bgSrc = INDUSTRY_BG_IMAGES[index % INDUSTRY_BG_IMAGES.length];
          return (
            <Image
              key={index}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100 z-0" : "opacity-0"
              }`}
              src={bgSrc}
              alt={card.title}
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
          );
        })}
        {/* Gradient overlay inside wrapper: vertical fade on mobile, horizontal fade on desktop */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#101830]/85 via-[#101830]/70 to-[#101830]/95 lg:bg-gradient-to-r lg:from-[#0a0e20]/80 lg:via-[#0a0e20]/50 lg:to-[#101830]" />
      </div>

      {/* Two-column layout: heading left, pillars right */}
      <Container className="relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-16 items-start">
          {/* LEFT: Section heading & description */}
          <div className="reveal w-full lg:max-w-[540px] lg:sticky lg:top-36">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              weight="normal"
              className="section-title text-left text-white m-0 mb-3 md:mb-6 leading-tight tracking-[0.06em]"
              style={title_color ? { color: title_color } : undefined}
            >
              {title}
            </Typography>
            <Typography
              variant="b1"
              as="p"
              className="section-description text-white/80 text-left m-0 leading-relaxed"
              style={description_color ? { color: description_color } : undefined}
            >
              {description}
            </Typography>
          </div>

          {/* RIGHT: Industry pillars */}
          <div className="w-full flex flex-col justify-center">
            <div className="reveal flex flex-col gap-2.5 md:gap-3">
              {accordian_cards.map((card, index) => {
                const isActive = index === currentIndex;
                const iconKey = card.title.toLowerCase().trim();
                const iconNode = ICON_MAP[iconKey] || null;
                const hasSvgCode = Boolean(card.svg_code);

                return (
                  <div
                    key={index}
                    className={`group flex flex-col justify-start py-[14px] px-[12px] rounded-lg border transition-all duration-350 cursor-pointer ${
                      isActive
                        ? "border-[#00e8d9]/40 bg-[#0d1224]/90 shadow-lg"
                        : "border-white/10 bg-[#0d1224]/75 hover:border-[#00e8d9]/30 hover:bg-[#0d1224]/85"
                    }`}
                    style={
                      card.background_color ? { background: card.background_color } : undefined
                    }
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="flex items-center gap-3 min-h-[32px]">
                      {hasSvgCode ? (
                        <span
                          className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 transition-colors duration-350 [&>svg]:w-full [&>svg]:h-full ${
                            isActive
                              ? "[&>svg]:fill-[#00e8d9] [&>svg]:stroke-[#00e8d9]"
                              : "[&>svg]:fill-white/65 [&>svg]:stroke-white/65 group-hover:[&>svg]:fill-[#00e8d9] group-hover:[&>svg]:stroke-[#00e8d9]"
                          }`}
                          dangerouslySetInnerHTML={{ __html: card.svg_code! }}
                        />
                      ) : iconNode ? (
                        <span
                          className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 transition-colors duration-350 [&>svg]:w-full [&>svg]:h-full ${
                            isActive
                              ? "[&>svg]:fill-[#00e8d9] [&>svg]:stroke-[#00e8d9]"
                              : "[&>svg]:fill-white/65 [&>svg]:stroke-white/65 group-hover:[&>svg]:fill-[#00e8d9] group-hover:[&>svg]:stroke-[#00e8d9]"
                          }`}
                        >
                          {iconNode}
                        </span>
                      ) : null}

                      <Typography
                        variant="h6"
                        as="h3"
                        uppercase
                        weight="normal"
                        className={`m-0 transition-colors duration-350 tracking-[0.12em] md:tracking-[0.15em] ${
                          isActive ? "text-[#00e8d9]" : "text-white group-hover:text-[#00e8d9]"
                        }`}
                        style={
                          isActive && card.title_color_hover
                            ? { color: card.title_color_hover }
                            : card.title_color
                              ? { color: card.title_color }
                              : undefined
                        }
                      >
                        {card.title}
                      </Typography>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        hasSvgCode || iconNode ? "pl-9 md:pl-10" : "pl-0"
                      } ${isActive ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
                    >
                      <Typography
                        variant="b3"
                        as="span"
                        className="text-white/70 block leading-relaxed"
                        style={
                          card.description_color ? { color: card.description_color } : undefined
                        }
                      >
                        {card.description}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
