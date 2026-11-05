"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { INDUSTRY_BG_IMAGES } from "@data/solutions.data";
import { extractMediaUrl } from "@utils";

interface StrapiMediaItem {
  url?: string;
  alternativeText?: string;
  data?: {
    attributes?: {
      url?: string;
    };
  };
  formats?: {
    large?: { url?: string };
  };
}

export interface AccordionItem {
  title: string;
  description: string;
  svg_code?: string | null;
  title_color?: string | null;
  title_color_hover?: string | null;
  description_color?: string | null;
  background_color?: string | null;
  bg_image?: StrapiMediaItem | StrapiMediaItem[] | string | null;
  [key: string]: unknown;
}

export type AccordionCardItem = AccordionItem;

export interface AccordionSplitProps {
  title?: string;
  title_color?: string | null;
  description?: string;
  description_color?: string | null;
  background_color?: string | null;
  template_grid_columns?: string | null;
  accordian_cards?: AccordionItem[];
}

function resolveItemImage(item: AccordionItem, index?: number): string {
  const directUrl = extractMediaUrl(item.background_image || item.bg_image);
  if (directUrl) return GetStrapiMediaUrl(directUrl);
  if (typeof index === "number" && index >= 0 && INDUSTRY_BG_IMAGES.length > 0) {
    return INDUSTRY_BG_IMAGES[index % INDUSTRY_BG_IMAGES.length];
  }
  return "";
}

function parseGridColumns(raw?: string | null): string {
  if (!raw) return "1.4fr 0.9fr";
  const cleaned = raw.replace(/^[a-z]\.\s*/i, "").trim();
  return cleaned || "1.4fr 0.9fr";
}

function isImageVariant(items: AccordionItem[], bgGradient?: string | null): boolean {
  if (items.some((item) => extractMediaUrl(item.bg_image))) {
    return true;
  }
  if (
    bgGradient &&
    (bgGradient.includes("#0a0e20") ||
      bgGradient.includes("#162047") ||
      bgGradient.includes("rgba(10, 14, 32") ||
      bgGradient.includes("var(--color-midnight-blue)"))
  ) {
    return true;
  }
  return false;
}

export default function AccordionSplit({
  title,
  title_color,
  description,
  description_color,
  background_color,
  template_grid_columns,
  accordian_cards = [],
}: AccordionSplitProps) {
  const pathname = usePathname();
  const isCareers = pathname?.includes("careers") || pathname?.includes("/careers");

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const items = accordian_cards;
  const gridColumns = parseGridColumns(template_grid_columns);
  const imageMode = isImageVariant(items, background_color);

  const startAutoPlay = () => {
    stopAutoPlay();
    if (items.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleMouseEnter = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      stopAutoPlay();
      setCurrentIndex(index);
    }, 150);
  };

  const handleClick = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    stopAutoPlay();
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    startAutoPlay();
  };

  if (items.length === 0) return null;

  const leftTextColor = title_color || (imageMode ? "#ffffff" : "var(--color-midnight-blue)");
  const leftDescColor =
    description_color || (imageMode ? "rgba(255,255,255,0.85)" : "rgba(22,32,71,0.88)");
  const sectionBg = !imageMode
    ? background_color || "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)"
    : "#162047";

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 border-none bg-[#162047]"
      style={{ background: sectionBg }}
      onMouseLeave={handleMouseLeave}
    >
      {imageMode && (
        <div
          className="absolute left-0 bottom-0 top-auto w-full h-[70%] lg:top-0 lg:bottom-0 lg:w-[75%] lg:h-full z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {items.map((item, i) => {
            const imgUrl = resolveItemImage(item, i);
            if (!imgUrl) return null;
            return (
              <Image
                key={i}
                src={imgUrl}
                alt={item.title || `Background image ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover object-center transition-opacity duration-800 ease-in-out"
                style={{
                  opacity: i === currentIndex ? 1 : 0,
                  zIndex: i === currentIndex ? 1 : 0,
                }}
              />
            );
          })}
          <div
            className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,#162047_0%,#16204799_25%,transparent_55%,#16204766_80%,#162047_100%)] lg:bg-[linear-gradient(90deg,#0a0e20c7_0%,#0a0e2080_35%,#0a0e2033_55%,transparent_80%,#162047_96%,#162047_100%)]"
            aria-hidden="true"
          />
        </div>
      )}

      {!imageMode && (
        <>
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[200px] -right-[100px] bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[200px] -left-[100px] bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none -bottom-[100px] -left-[50px] bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)]"
            aria-hidden="true"
          />
        </>
      )}

      <Container className="relative z-[2]">
        <div
          className="grid grid-cols-1 lg:[grid-template-columns:var(--sas-cols)] gap-8 lg:gap-16 items-start"
          style={{ "--sas-cols": gridColumns } as React.CSSProperties}
        >
          <div
            className={`reveal flex flex-col w-full ${isCareers ? "lg:max-w-[660px]" : "min-[1450px]:max-w-[700px]"}`}
          >
            {title && (
              <Typography
                variant={isCareers ? "story-title" : "h2"}
                as="h2"
                uppercase
                className={`section-title mb-3 md:mb-6 ${imageMode ? "[text-shadow:0_2px_16px_rgba(0,0,0,0.6),0_4px_32px_rgba(0,0,0,0.3)]" : ""}`}
                style={{
                  color: leftTextColor,
                  ...(isCareers ? { lineHeight: 1.35 } : {}),
                }}
              >
                {title}
              </Typography>
            )}
            {description && (
              <div
                className="section-description leading-relaxed opacity-90 flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: leftDescColor }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>

          <div className="w-full">
            <div className="reveal flex flex-col gap-2.5 sm:gap-3">
              {items.map((item, index) => {
                const isActive = index === currentIndex;
                const hasIcon = Boolean(item.svg_code && item.svg_code.trim() !== "");

                const itemBg = item.background_color
                  ? item.background_color
                  : imageMode
                    ? "rgba(13,18,36,0.75)"
                    : "#162047";

                const titleColor = isActive
                  ? item.title_color_hover || undefined
                  : item.title_color || undefined;
                const descColor = item.description_color || undefined;

                return (
                  <div
                    key={index}
                    className={`group flex flex-col justify-start py-[14px] px-[12px] rounded-xl border backdrop-blur-sm transition-all duration-350 cursor-pointer ${
                      isActive
                        ? "active border-teal/50 shadow-[0_8px_24px_rgba(22,32,71,0.18),0_0_16px_rgba(0,232,217,0.1)]"
                        : "border-white/10 hover:border-teal/30 hover:bg-[#0d1224]/75"
                    }`}
                    style={{
                      backgroundColor: itemBg,
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                  >
                    <div className="flex items-center gap-3 min-h-[32px]">
                      {hasIcon && (
                        <span
                          className={`w-6 h-6 md:w-7 md:h-7 flex-shrink-0 flex items-center justify-center transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full ${
                            isActive
                              ? "text-teal stroke-teal"
                              : "text-white/60 stroke-white/60 group-hover:text-teal group-hover:stroke-teal"
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.svg_code! }}
                          aria-hidden="true"
                        />
                      )}
                      <Typography
                        variant="h5"
                        as="h3"
                        uppercase
                        weight="bold"
                        className={`tracking-[0.1em] m-0 transition-colors duration-300 ${
                          isActive ? "text-teal" : "text-white group-hover:text-teal"
                        }`}
                        style={{
                          color: titleColor,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </div>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        hasIcon ? "pl-9 md:pl-10" : "pl-0"
                      } ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <Typography
                          variant="b3"
                          as="span"
                          className={`block pt-2 transition-all duration-500 text-white/85 ${
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                          }`}
                          style={{ color: descColor }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
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
