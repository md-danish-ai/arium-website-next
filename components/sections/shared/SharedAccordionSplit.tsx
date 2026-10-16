"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  TemplateGridColumns?: string; // "a. 1.4fr .9fr" | "b. 1.35fr 1fr"
  Accordian?: AccordionItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com";

function absoluteUrl(url?: string): string {
  if (!url) return "";
  return url.startsWith("http") || url.startsWith("/") ? url : `${STRAPI_URL}${url}`;
}

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
    extractImageUrl(item.BgImage) ||
    extractImageUrl(item.bgImage) ||
    extractImageUrl(item.image);
  return directUrl ? absoluteUrl(directUrl) : "";
}

function parseGridColumns(raw?: string): string {
  if (!raw) return "1.4fr 0.9fr";
  const cleaned = raw.replace(/^[a-z]\.\s*/i, "").trim();
  return cleaned || "1.4fr 0.9fr";
}

function isImageVariant(items: any[], bgGradient?: string): boolean {
  if (items.some((item) => extractImageUrl(item.BgImage) || extractImageUrl(item.bgImage) || extractImageUrl(item.image))) return true;
  if (bgGradient && (bgGradient.includes("#0a0e20") || bgGradient.includes("#162047") || bgGradient.includes("rgba(10, 14, 32") || bgGradient.includes("var(--color-midnight-blue)"))) return true;
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
  const descriptionColor = DescriptionTextColor || (imageMode ? "rgba(255,255,255,0.85)" : "rgba(22,32,71,0.88)");
  const sectionBg = !imageMode
    ? BgGradient || "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)"
    : "var(--color-midnight-blue)";

  return (
    <section
      className={"sas-section" + (imageMode ? " sas-image-mode" : " sas-gradient-mode")}
      style={{ background: sectionBg }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images — image mode only */}
      {imageMode && (
        <div className="sas-bg-images" aria-hidden="true">
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
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  opacity: i === currentIndex ? 1 : 0,
                  zIndex: i === currentIndex ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                }}
              />
            );
          })}
          {/* Gradient overlay inside wrapper */}
          <div className="sas-overlay" aria-hidden="true" />
        </div>
      )}

      {/* Decorative blobs — gradient / light mode only */}
      {!imageMode && (
        <>
          <div className="sas-blob sas-blob-1" aria-hidden="true" />
          <div className="sas-blob sas-blob-2" aria-hidden="true" />
          <div className="sas-blob sas-blob-3" aria-hidden="true" />
        </>
      )}

      {/* Content */}
      <div className="container sas-container">
        <div className="sas-two-col" style={{ gridTemplateColumns: gridColumns }}>
          {/* LEFT */}
          <div
            className="sas-col-left reveal"
            style={isCareers ? { maxWidth: "660px" } : undefined}
          >
            {Heading && (
              <h2
                className="section-title sas-heading"
                style={{
                  color: leftTextColor,
                  ...(isCareers ? { fontSize: "clamp(1.75rem, 2.2vw, 2.2rem)", lineHeight: 1.35 } : {}),
                  textShadow: imageMode
                    ? "0 2px 16px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.3)"
                    : "none",
                }}
              >
                {Heading}
              </h2>
            )}
            {Description && (
              <div
                className="section-description sas-description"
                style={{ color: descriptionColor }}
                dangerouslySetInnerHTML={{ __html: Description }}
              />
            )}
          </div>

          {/* RIGHT — Accordion */}
          <div className="sas-col-right">
            <div className="reveal sas-accordion-list">
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
                    className={"sas-item" + (isActive ? " active" : "") + (!item.Svg ? " no-icon" : "")}
                    style={{ 
                      "--sas-item-bg": itemBg,
                      ...(item.TitleColor ? { "--sas-title-color": item.TitleColor } : {}),
                      ...(item.TitleHoverColor ? { "--sas-title-hover-color": item.TitleHoverColor } : {}),
                      ...(item.DescriptionColor ? { "--sas-desc-color": item.DescriptionColor } : {}),
                    } as React.CSSProperties}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                  >
                    <div className="sas-item-header">
                      {item.Svg && (
                        <span
                          className="sas-icon"
                          dangerouslySetInnerHTML={{ __html: item.Svg }}
                          aria-hidden="true"
                        />
                      )}
                      <h3 className="sas-item-title">{item.Title}</h3>
                    </div>

                    <div className="sas-item-body">
                      <div className="sas-item-body-inner">
                        <span dangerouslySetInnerHTML={{ __html: item.Description || "" }} />
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
