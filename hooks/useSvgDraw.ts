"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface SvgDrawOptions {
  selector?: string;
  color?: string;
  fillColor?: string;
  strokeWidth?: number | string;
  circleStrokeWidth?: number | string;
  drawDuration?: number;
  totalSpread?: number;
  fillDelay?: number;
  fillDuration?: number;
  threshold?: number;
  replay?: boolean;
}

// Animates SVG path drawing and fill on scroll enter/exit
export function useSvgDraw<T extends HTMLElement = HTMLElement>(
  options: SvgDrawOptions = {},
  externalRef?: RefObject<T | null>
): RefObject<T | null> {
  const internalRef = useRef<T>(null);
  const containerRef = externalRef || internalRef;

  const {
    selector = ".draw-svg",
    color = "#00E8D9",
    fillColor,
    strokeWidth = "0.5",
    circleStrokeWidth = "1.3",
    drawDuration = 1.5,
    totalSpread = 2.5,
    fillDelay = 0.3,
    fillDuration = 0.5,
    threshold = 0.25,
    replay = true,
  } = options;

  useEffect(() => {
    const root = containerRef.current || document;
    const svgs = root.querySelectorAll(selector);
    if (!svgs.length) return;

    const timerMap = new Map<Element, NodeJS.Timeout[]>();

    const resetSvg = (svg: Element) => {
      const activeTimers = timerMap.get(svg) || [];
      activeTimers.forEach((t) => clearTimeout(t));
      timerMap.set(svg, []);

      const paths = svg.querySelectorAll("path[data-i]");
      for (let p = 0; p < paths.length; p++) {
        const path = paths[p] as SVGPathElement;
        const len = path.getTotalLength();
        path.style.transition = "none";
        path.style.fill = "transparent";
        path.style.stroke = "transparent";
        const defaultW = path.getAttribute("data-circle")
          ? circleStrokeWidth.toString()
          : strokeWidth.toString();
        const strokeW = path.getAttribute("data-stroke-width") || defaultW;
        path.style.strokeWidth = strokeW;
        path.style.strokeDasharray = len.toString();
        path.style.strokeDashoffset = len.toString();
      }
    };

    // Hide all paths initially
    for (let s = 0; s < svgs.length; s++) {
      const svgEl = svgs[s] as HTMLElement;
      svgEl.removeAttribute("data-done");
      resetSvg(svgEl);
    }

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
        const fillTargets = svg.querySelectorAll('path[data-circle="1"], path[data-fill="1"]');
        fillTargets.forEach((c) => {
          const el = c as SVGPathElement;
          el.style.transition = `fill ${fillDuration}s ease`;
          el.style.fill = fillColor || color;
        });
      }, fillStart);

      const currentTimers = timerMap.get(svg) || [];
      currentTimers.push(timer);
      timerMap.set(svg, currentTimers);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const svgEl = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (!svgEl.hasAttribute("data-done")) {
              svgEl.setAttribute("data-done", "true");
              animate(entry.target);
            }
          } else if (replay && svgEl.hasAttribute("data-done")) {
            svgEl.removeAttribute("data-done");
            resetSvg(entry.target);
          }
        });
      },
      { threshold }
    );

    svgs.forEach((svg) => observer.observe(svg));

    return () => {
      observer.disconnect();
      timerMap.forEach((timers) => timers.forEach((t) => clearTimeout(t)));
      timerMap.clear();
    };
  }, [
    containerRef,
    selector,
    color,
    fillColor,
    strokeWidth,
    circleStrokeWidth,
    drawDuration,
    totalSpread,
    fillDelay,
    fillDuration,
    threshold,
    replay,
  ]);

  return containerRef;
}
