"use client";

import { useEffect } from "react";
import { Typography, DetailedCard } from "@ui-element";
import { DetailedCardGridProps } from "./type";
import { SmallCellsSvg, DasSvg } from "@ui-svg";

export default function DetailedCardGrid({
  heading,
  description,
  bgColor,
  cards,
}: DetailedCardGridProps) {
  useEffect(() => {
    const svgs = document.querySelectorAll(".draw-svg");
    if (!svgs.length) return;

    const DRAW = 1.5,
      TOTAL_SPREAD = 2.5,
      FILL_DELAY = 0.3,
      FILL_DUR = 0.5,
      COLOR = "#00E8D9";

    // Hide all paths initially
    for (let s = 0; s < svgs.length; s++) {
      const svgEl = svgs[s] as HTMLElement;
      svgEl.removeAttribute("data-done");

      const paths = svgs[s].querySelectorAll("path[data-i]");
      for (let p = 0; p < paths.length; p++) {
        const path = paths[p] as SVGPathElement;
        const len = path.getTotalLength();
        path.style.fill = "transparent";
        path.style.stroke = "transparent";
        path.style.strokeWidth = path.getAttribute("data-circle") ? "1.5" : "0.6";
        path.style.strokeDasharray = len.toString();
        path.style.strokeDashoffset = len.toString();
      }
    }

    const animate = (svg: Element) => {
      const paths = svg.querySelectorAll("path[data-i]");
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j] as SVGPathElement;
        p.style.stroke = COLOR;
      }

      const stagger = paths.length > 1 ? TOTAL_SPREAD / (paths.length - 1) : 0;
      let lastDelay = 0;
      for (let k = 0; k < paths.length; k++) {
        const p2 = paths[k] as SVGPathElement;
        const delay = k * stagger;
        p2.style.transition = `stroke-dashoffset ${DRAW}s ease ${delay}s`;
        p2.style.strokeDashoffset = "0";
        lastDelay = delay;
      }

      const fillStart = (lastDelay + DRAW + FILL_DELAY) * 1000;
      setTimeout(() => {
        const circles = svg.querySelectorAll('path[data-circle="1"]');
        for (let c = 0; c < circles.length; c++) {
          const circle = circles[c] as SVGPathElement;
          circle.style.transition = `fill ${FILL_DUR}s ease`;
          circle.style.fill = COLOR;
        }
      }, fillStart);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const svg = entry.target.querySelector(".draw-svg") as HTMLElement;
            if (svg && !svg.dataset.done) {
              svg.dataset.done = "1";
              animate(svg);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cardsElements = document.querySelectorAll(".infra-panel-card");
    cardsElements.forEach((c) => observer.observe(c));

    return () => {
      observer.disconnect();
    };
  }, []);

  const backgroundStyle = bgColor ? { background: bgColor } : undefined;

  return (
    <section
      className="infra-section py-10 max-[768px]:py-12 md:py-20 lg:py-24 relative overflow-hidden bg-midnight"
      id="infrastructure"
      style={backgroundStyle}
    >
      <div className="infra-grid-bg"></div>

      <div className="infra-particles" id="infra-particles"></div>

      <div className="container relative z-[2]">
        <div className="section-header text-center mb-8 md:mb-12 lg:mb-16">
          <Typography
            variant="h3"
            uppercase
            weight="normal"
            className="section-title reveal stagger-1 m-0 text-white"
          >
            {heading}
          </Typography>
          <Typography
            variant="b1"
            weight="normal"
            className="section-description reveal stagger-2 max-w-[960px] mx-auto mt-4 md:mt-5 text-white/80"
          >
            {description}
          </Typography>
        </div>

        <div className="infra-panels grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 lg:gap-8 max-w-[520px] md:max-w-none mx-auto w-full">
          {cards.map((card, index) => (
            <div
              className={`infra-panel w-full h-full transition-all duration-300 hover:-translate-y-1.5 reveal stagger-${index + 3}`}
              key={index}
            >
              <DetailedCard
                title={card.title}
                description={card.description}
                ctaText={card.ctaText}
                ctaLink={card.ctaLink}
                imageUrl={card.imageUrl}
                svgCode={card.svgCode}
                svgComponent={
                  card.svgType === "small-cells" ? (
                    <SmallCellsSvg />
                  ) : card.svgType === "das" ? (
                    <DasSvg />
                  ) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
