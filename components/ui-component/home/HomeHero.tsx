"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Typography } from "@ui-element";
import { DoubleDownArrowSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";
import { useSpringShapes } from "@hooks/useSpringShapes";
import { HomeHeroProps } from "./type";

export default function HomeHero({
  heading = "Build with clarity—connect with confidence",
  description = "We are the country's largest small cell provider, bringing densification and capacity services to the wireless industry. With a focus on clarity and precision, we design, build, and deploy the essential infrastructure that powers today's most advanced wireless networks.",
  fontColor,
  bgColor,
  scrollText = "Scroll to explore",
}: HomeHeroProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const { tealShapeRef, whiteShapeRef, tealInnerRef, whiteInnerRef, shapesWrapRef, bgRef } =
    useSpringShapes();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const resolvedBg = bgColor || "#162047";
  const resolvedFont = fontColor || "#ffffff";

  return (
    <section
      id="hero"
      className="shared-mh-section relative grid place-items-center h-screen h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      {/* Background with animated shapes */}
      <div
        ref={bgRef}
        className="shared-mh-bg absolute inset-0 pointer-events-none"
        style={{ backgroundColor: resolvedBg }}
        aria-hidden="true"
      >
        <div className="shared-mh-shapes-container absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <div
            ref={shapesWrapRef}
            className="shared-mh-shapes-wrap relative h-full w-full opacity-0"
          >
            {/* Teal shape */}
            <div
              ref={tealShapeRef}
              className="shared-mh-shape shared-mh-shape--teal absolute [width:170vmin] [aspect-ratio:1955/1769] pointer-events-none opacity-50 will-change-transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: "26%", top: "33%", rotate: "180deg" }}
            >
              <div
                ref={tealInnerRef}
                className="shared-mh-shape-inner relative h-full w-full animate-breathe-teal"
              >
                <Image
                  src="/assets/svg-images/shape-teal.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* White shape */}
            <div
              ref={whiteShapeRef}
              className="shared-mh-shape shared-mh-shape--white absolute [width:170vmin] [aspect-ratio:1940/1757] pointer-events-none opacity-50 will-change-transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: "73%", top: "97%", rotate: "525deg" }}
            >
              <div
                ref={whiteInnerRef}
                className="shared-mh-shape-inner relative h-full w-full animate-breathe-white"
              >
                <Image
                  src="/assets/svg-images/shape-white.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Container className="shared-mh-content relative z-[5] pt-[150px] pb-[100px] text-center w-full">
        <Typography
          variant="h1"
          uppercase
          weight="normal"
          className="hero-title shared-mh-heading m-0 mb-0 mx-auto max-w-[970px] text-[clamp(1.8rem,3.5vw,2.8rem)] max-[768px]:text-[1.6rem] max-[480px]:text-[1.4rem] tracking-[0.12em] leading-[1.4] relative z-[1]"
          style={{ color: resolvedFont }}
          dangerouslySetInnerHTML={{ __html: heading || "" }}
        />
        <Typography
          variant="b1"
          weight="normal"
          className="hero-desc shared-mh-description mx-auto mt-6 lg:mt-10 max-[480px]:mt-5 max-w-[800px] text-[clamp(1.05rem,1.8vw,1.25rem)] max-[768px]:text-[0.9rem] leading-[1.6] max-[768px]:tracking-[0.02em] text-center relative z-[1]"
          style={{ color: resolvedFont }}
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </Container>

      {/* Scroll indicator */}
      <div
        className={`scroll-indicator shared-mh-scroll-indicator ${isScrolled ? "is-scrolled pointer-events-none opacity-0" : "opacity-70 hover:opacity-100"} absolute bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 transition-opacity duration-300`}
        id="scroll-indicator"
      >
        <Typography
          variant="b4"
          uppercase
          weight="normal"
          className="scroll-indicator-text shared-mh-scroll-text block text-[0.75rem] text-white/60 tracking-[0.15em] font-normal whitespace-nowrap"
        >
          {scrollText || "Scroll to explore"}
        </Typography>
        <div className="scroll-indicator-arrow shared-mh-scroll-arrow text-teal animate-bounce">
          <DoubleDownArrowSvg width={24} height={24} />
        </div>
      </div>
    </section>
  );
}
