"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface AccordionItem {
  Svg?: string;
  Title?: string;
  TitleColor?: string;
  TitleHoverColor?: string;
  Description?: string;
  DescriptionColor?: string;
  BgColor?: string;
  BgImage?: StrapiMediaItem | StrapiMediaItem[] | string | null;
  bgImage?: StrapiMediaItem | StrapiMediaItem[] | string | null;
  image?: StrapiMediaItem | StrapiMediaItem[] | string | null;
  [key: string]: unknown;
}

interface AccordionSplitProps {
  Heading?: string;
  Description?: string;
  HeadingTextColor?: string;
  DescriptionTextColor?: string;
  BgGradient?: string;
  TemplateGridColumns?: string;
  Accordian?: AccordionItem[];
}

import { extractMediaUrl } from "@utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveItemImage(item: AccordionItem): string {
  const directUrl =
    extractMediaUrl(item.BgImage) || extractMediaUrl(item.bgImage) || extractMediaUrl(item.image);
  return directUrl ? GetStrapiMediaUrl(directUrl) : "";
}

function parseGridColumns(raw?: string): string {
  if (!raw) return "1.4fr 0.9fr";
  const cleaned = raw.replace(/^[a-z]\.\s*/i, "").trim();
  return cleaned || "1.4fr 0.9fr";
}

function isImageVariant(items: AccordionItem[], bgGradient?: string): boolean {
  if (
    items.some(
      (item) =>
        extractMediaUrl(item.BgImage) ||
        extractMediaUrl(item.bgImage) ||
        extractMediaUrl(item.image)
    )
  )
    return true;
  if (
    bgGradient &&
    (bgGradient.includes("#0a0e20") ||
      bgGradient.includes("#162047") ||
      bgGradient.includes("rgba(10, 14, 32") ||
      bgGradient.includes("var(--color-midnight-blue)"))
  )
    return true;
  return false;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AccordionSplit({
  Heading,
  Description,
  HeadingTextColor,
  DescriptionTextColor,
  BgGradient,
  TemplateGridColumns,
  Accordian = [],
}: AccordionSplitProps) {
  const pathname = usePathname();
  const isCareers = pathname?.includes("careers") || pathname?.includes("/careers");

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const items = Accordian.length > 0 ? Accordian : [];
  const gridColumns = parseGridColumns(TemplateGridColumns);
  const imageMode = isImageVariant(items, BgGradient);

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

  const leftTextColor = HeadingTextColor || (imageMode ? "#ffffff" : "var(--color-midnight-blue)");
  const descriptionColor =
    DescriptionTextColor || (imageMode ? "rgba(255,255,255,0.85)" : "rgba(22,32,71,0.88)");
  const sectionBg = !imageMode
    ? BgGradient || "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)"
    : "var(--color-midnight-blue)";

  return (
    <section
      className={`sas-section relative overflow-hidden py-14 md:py-20 ${imageMode ? "sas-image-mode" : "sas-gradient-mode"} border-none`}
      style={{ background: sectionBg }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images — image mode only */}
      {imageMode && (
        <div
          className="sas-bg-images absolute inset-0 lg:w-[75%] z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {items.map((item, i) => {
            const imgUrl = resolveItemImage(item);
            if (!imgUrl) return null;
            return (
              <Image
                key={i}
                src={imgUrl}
                alt={item.Title || `Background image ${i + 1}`}
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
          {/* Gradient overlay inside wrapper: vertical fade on mobile/tablet, horizontal fade on desktop */}
          <div
            className="sas-overlay absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#101830]/85 via-[#101830]/70 to-[#101830]/95 lg:bg-gradient-to-r lg:from-[#0a0e20]/80 lg:via-[#0a0e20]/50 lg:to-midnight"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Decorative blobs — gradient / light mode only */}
      {!imageMode && (
        <>
          <div
            className="sas-blob sas-blob-1 absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[200px] -right-[100px] bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="sas-blob sas-blob-2 absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[200px] -left-[100px] bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="sas-blob sas-blob-3 absolute w-[400px] h-[400px] rounded-full pointer-events-none -bottom-[100px] -left-[50px] bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)]"
            aria-hidden="true"
          />
        </>
      )}

      {/* Content */}
      <Container className="relative z-[2]">
        <div
          className="sas-two-col grid grid-cols-1 lg:[grid-template-columns:var(--sas-cols)] gap-8 lg:gap-16 items-start"
          style={{ "--sas-cols": gridColumns } as React.CSSProperties}
        >
          {/* LEFT */}
          <div
            className={`sas-col-left reveal flex flex-col w-full ${isCareers ? "lg:max-w-[660px]" : "min-[1450px]:max-w-[700px]"}`}
          >
            {Heading && (
              <Typography
                variant="h3"
                uppercase
                className={`section-title sas-heading mb-3 md:mb-6 ${imageMode ? "[text-shadow:0_2px_16px_rgba(0,0,0,0.6),0_4px_32px_rgba(0,0,0,0.3)]" : ""}`}
                style={{
                  color: leftTextColor,
                  ...(isCareers
                    ? { fontSize: "clamp(1.75rem, 2.2vw, 2.2rem)", lineHeight: 1.35 }
                    : {}),
                }}
              >
                {Heading}
              </Typography>
            )}
            {Description && (
              <div
                className="section-description sas-description text-base leading-relaxed opacity-90 flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: descriptionColor }}
                dangerouslySetInnerHTML={{ __html: Description }}
              />
            )}
          </div>

          {/* RIGHT — Accordion */}
          <div className="sas-col-right w-full">
            <div className="reveal sas-accordion-list flex flex-col gap-2.5 sm:gap-3">
              {items.map((item, index) => {
                const isActive = index === currentIndex;
                const itemBg = item.BgColor
                  ? item.BgColor
                  : imageMode
                    ? isActive
                      ? "rgba(13,18,36,0.85)"
                      : "rgba(13,18,36,0.65)"
                    : "#162047";
                const hasIcon = Boolean(item.Svg && item.Svg.trim() !== "");

                return (
                  <div
                    key={index}
                    className={`sas-item group flex flex-col justify-start py-[14px] px-[12px] rounded-xl border backdrop-blur-sm transition-all duration-350 cursor-pointer ${
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
                    <div className="sas-item-header flex items-center gap-3 min-h-[32px]">
                      {hasIcon && (
                        <span
                          className={`sas-icon w-6 h-6 md:w-7 md:h-7 flex-shrink-0 flex items-center justify-center transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full ${
                            isActive
                              ? "text-teal stroke-teal"
                              : "text-white/60 stroke-white/60 group-hover:text-teal group-hover:stroke-teal"
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.Svg! }}
                          aria-hidden="true"
                        />
                      )}
                      <Typography
                        variant="h6"
                        as="h3"
                        uppercase
                        className={`sas-item-title tracking-[0.12em] md:tracking-[0.15em] m-0 transition-colors duration-300 text-sm sm:text-base ${
                          isActive ? "text-teal" : "text-white group-hover:text-teal"
                        }`}
                        style={{
                          color: isActive
                            ? item.TitleHoverColor || undefined
                            : item.TitleColor || undefined,
                        }}
                      >
                        {item.Title}
                      </Typography>
                    </div>

                    <div
                      className={`sas-item-body grid transition-[grid-template-rows] duration-500 ease-out ${
                        hasIcon ? "pl-9 md:pl-10" : "pl-0"
                      } ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="sas-item-body-inner min-h-0 overflow-hidden">
                        <Typography
                          variant="b3"
                          as="span"
                          className={`block pt-2 transition-all duration-500 text-white/85 text-xs sm:text-sm ${
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                          }`}
                          style={{ color: item.DescriptionColor || undefined }}
                          dangerouslySetInnerHTML={{ __html: item.Description || "" }}
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
