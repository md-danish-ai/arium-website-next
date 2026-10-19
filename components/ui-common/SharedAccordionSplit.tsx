"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GetStrapiMediaUrl } from "@lib/strapi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AccordionItem {
  Svg?: string;
  Title?: string;
  TitleColor?: string;
  TitleHoverColor?: string;
  Description?: string;
  DescriptionColor?: string;
  BgColor?: string;
  BgImage?: {
    url?: string;
    alternativeText?: string;
  } | null;
}

interface SharedAccordionSplitProps {
  Heading?: string;
  Description?: string;
  HeadingTextColor?: string;
  DescriptionTextColor?: string;
  BgGradient?: string;
  TemplateGridColumns?: string;
  Accordian?: AccordionItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractImageUrl(bgImg: any): string {
  if (!bgImg) return "";
  if (typeof bgImg === "string") return bgImg;
  if (bgImg.url) return bgImg.url;
  if (Array.isArray(bgImg) && bgImg[0]?.url) return bgImg[0].url;
  if (bgImg.data?.attributes?.url) return bgImg.data.attributes.url;
  if (bgImg.formats?.large?.url) return bgImg.formats.large.url;
  return "";
}

function resolveItemImage(item: any): string {
  const directUrl =
    extractImageUrl(item.BgImage) || extractImageUrl(item.bgImage) || extractImageUrl(item.image);
  return directUrl ? GetStrapiMediaUrl(directUrl) : "";
}

function parseGridColumns(raw?: string): string {
  if (!raw) return "1.4fr 0.9fr";
  const cleaned = raw.replace(/^[a-z]\.\s*/i, "").trim();
  return cleaned || "1.4fr 0.9fr";
}

function isImageVariant(items: any[], bgGradient?: string): boolean {
  if (
    items.some(
      (item) =>
        extractImageUrl(item.BgImage) ||
        extractImageUrl(item.bgImage) ||
        extractImageUrl(item.image)
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

export default function SharedAccordionSplit({
  Heading,
  Description,
  HeadingTextColor,
  DescriptionTextColor,
  BgGradient,
  TemplateGridColumns,
  Accordian = [],
}: SharedAccordionSplitProps) {
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
      className={`sas-section relative overflow-hidden py-20 ${imageMode ? "sas-image-mode border-y border-white/5" : "sas-gradient-mode border-y border-black/5"}`}
      style={{ background: sectionBg }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images — image mode only */}
      {imageMode && (
        <div
          className="sas-bg-images absolute left-0 top-0 bottom-0 w-full lg:w-[75%] z-0 pointer-events-none overflow-hidden"
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
          {/* Gradient overlay inside wrapper */}
          <div
            className="sas-overlay absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#0a0e20]/80 via-[#0a0e20]/50 to-midnight"
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
      <div className="container sas-container mx-auto px-6 relative z-[2]">
        <div
          className="sas-two-col grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ gridTemplateColumns: gridColumns }}
        >
          {/* LEFT */}
          <div
            className="sas-col-left reveal flex flex-col"
            style={isCareers ? { maxWidth: "660px" } : undefined}
          >
            {Heading && (
              <h2
                className={`section-title sas-heading font-heading font-normal tracking-[0.06em] text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.35] uppercase mb-4 ${imageMode ? "[text-shadow:0_2px_16px_rgba(0,0,0,0.6),0_4px_32px_rgba(0,0,0,0.3)]" : ""}`}
                style={{
                  color: leftTextColor,
                  ...(isCareers
                    ? { fontSize: "clamp(1.75rem, 2.2vw, 2.2rem)", lineHeight: 1.35 }
                    : {}),
                }}
              >
                {Heading}
              </h2>
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
            <div className="reveal sas-accordion-list flex flex-col gap-3">
              {items.map((item, index) => {
                const isActive = index === currentIndex;
                const itemBg = item.BgColor
                  ? item.BgColor
                  : imageMode
                    ? "rgba(13,18,36,0.75)"
                    : "#162047";

                return (
                  <div
                    key={index}
                    className={`sas-item group flex flex-col justify-start p-4 rounded-xl border transition-all duration-400 cursor-pointer ${isActive ? "active border-teal/50 shadow-[0_8px_24px_rgba(22,32,71,0.18),0_0_16px_rgba(0,232,217,0.1)]" : "border-white/10 hover:border-teal/30"}`}
                    style={{
                      backgroundColor: itemBg,
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                  >
                    <div className="sas-item-header relative flex items-center min-h-[48px] pl-16">
                      {item.Svg && (
                        <span
                          className={`sas-icon absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full ${isActive ? "text-teal stroke-teal" : "text-white/60 stroke-white/60 group-hover:text-teal group-hover:stroke-teal"}`}
                          dangerouslySetInnerHTML={{ __html: item.Svg }}
                          aria-hidden="true"
                        />
                      )}
                      <h3
                        className={`sas-item-title font-heading text-sm font-normal uppercase tracking-[0.15em] m-0 transition-colors duration-300 ${isActive ? "text-teal" : "text-white group-hover:text-teal"}`}
                        style={{
                          color: isActive
                            ? item.TitleHoverColor || undefined
                            : item.TitleColor || undefined,
                        }}
                      >
                        {item.Title}
                      </h3>
                    </div>

                    <div
                      className={`sas-item-body grid transition-[grid-template-rows] duration-500 ease-out pl-16 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="sas-item-body-inner min-h-0 overflow-hidden">
                        <span
                          className={`block font-body text-xs leading-relaxed text-white/80 pt-2 transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
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
      </div>
    </section>
  );
}
