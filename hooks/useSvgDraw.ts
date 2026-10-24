"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface SvgDrawOptions {
  selector?: string;
  color?: string;
  drawDuration?: number;
  totalSpread?: number;
  fillDelay?: number;
  fillDuration?: number;
  threshold?: number;
}

/**
 * Custom hook to animate SVG paths with stroke-dashoffset drawing and circle filling.
 * Returns a containerRef to attach to the container element.
 */
export function useSvgDraw<T extends HTMLElement = HTMLElement>(
  options: SvgDrawOptions = {},
  externalRef?: RefObject<T | null>
): RefObject<T | null> {
  const internalRef = useRef<T>(null);
  const containerRef = externalRef || internalRef;

  const {
    selector = ".draw-svg",
    color = "#00E8D9",
    drawDuration = 1.5,
    totalSpread = 2.5,
    fillDelay = 0.3,
    fillDuration = 0.5,
    threshold = 0.3,
  } = options;

  useEffect(() => {
    const root = containerRef.current || document;
    const svgs = root.querySelectorAll(selector);
    if (!svgs.length) return;

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

    const timers: NodeJS.Timeout[] = [];

    const animate = (svg: Element) => {
      const paths = svg.querySelectorAll("path[data-i]");
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j] as SVGPathElement;
        p.style.stroke = color;
      }

      const stagger = paths.length > 1 ? totalSpread / (paths.length - 1) : 0;
      let lastDelay = 0;
      for (let k = 0; k < paths.length; k++) {
        const p2 = paths[k] as SVGPathElement;
        const delay = k * stagger;
        p2.style.transition = `stroke-dashoffset ${drawDuration}s ease ${delay}s`;
        p2.style.strokeDashoffset = "0";
        lastDelay = delay;
      }

      const fillStart = (lastDelay + drawDuration + fillDelay) * 1000;
      const timer = setTimeout(() => {
        const circles = svg.querySelectorAll('path[data-circle="1"]');
        circles.forEach((c) => {
          const circle = c as SVGPathElement;
          circle.style.transition = `fill ${fillDuration}s ease`;
          circle.style.fill = color;
        });
      }, fillStart);
      timers.push(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const svgEl = entry.target as HTMLElement;
            if (!svgEl.hasAttribute("data-done")) {
              svgEl.setAttribute("data-done", "true");
              animate(entry.target);
            }
          }
        });
      },
      { threshold }
    );

    svgs.forEach((svg) => observer.observe(svg));

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, [
    containerRef,
    selector,
    color,
    drawDuration,
    totalSpread,
    fillDelay,
    fillDuration,
    threshold,
  ]);

  return containerRef;
}
