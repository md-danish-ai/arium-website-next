"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface CounterAnimationOptions {
  duration?: number;
  threshold?: number;
}

function formatNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Custom hook to animate element counters (.counter) upon intersection.
 * Returns a containerRef to attach to the animated section/container.
 */
export function useCounterAnimation<T extends HTMLElement = HTMLDivElement>(
  options: CounterAnimationOptions = {},
  externalRef?: RefObject<T | null>
): RefObject<T | null> {
  const internalRef = useRef<T>(null);
  const containerRef = externalRef || internalRef;
  const { duration = 2000, threshold = 0.2 } = options;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const counters = root.querySelectorAll(".counter");
    if (!counters.length) return;

    const animFrameIds: number[] = [];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const entryCounters = entry.target.querySelectorAll(".counter");
            entryCounters.forEach((counter) => {
              const el = counter as HTMLElement;
              const targetStr = el.getAttribute("data-target");
              if (!targetStr) return;

              const target = parseFloat(targetStr);
              if (isNaN(target)) return;

              const suffix = el.getAttribute("data-suffix") || "";
              const startTime = performance.now();

              const updateCounter = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(easeOutQuart(progress) * target);

                el.innerText = formatNumber(current) + suffix;

                if (progress < 1) {
                  const id = requestAnimationFrame(updateCounter);
                  animFrameIds.push(id);
                } else {
                  el.innerText = formatNumber(target) + suffix;
                }
              };

              const firstId = requestAnimationFrame(updateCounter);
              animFrameIds.push(firstId);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      animFrameIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, [containerRef, duration, threshold]);

  return containerRef;
}
