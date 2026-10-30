"use client";

import { useEffect } from "react";

/**
 * Animated Number Counters Hook (Global Page Level)
 * Observes elements with `.counter` class and animates their numbers upon viewport entry.
 */
export function useCounters(pathname?: string) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    function formatNumber(n: number) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el: Element) {
      const targetStr = (el as HTMLElement).dataset.target;
      if (!targetStr) return;

      const target = parseInt(targetStr, 10);
      if (isNaN(target)) return;

      const suffix = (el as HTMLElement).dataset.suffix || "";
      const duration = 2500; // ms
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.round(easedProgress * target);

        el.textContent = formatNumber(current) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    const initCounters = () => {
      const counters = document.querySelectorAll(".counter");
      if (!counters.length) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
      }

      counters.forEach((el) => observer!.observe(el));
    };

    initCounters();
    const t1 = setTimeout(initCounters, 100);

    return () => {
      clearTimeout(t1);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);
}
