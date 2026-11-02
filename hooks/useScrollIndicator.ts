"use client";

import { useEffect } from "react";

// Fades out scroll indicator as user scrolls away from hero
export function useScrollIndicator(pathname?: string) {
  useEffect(() => {
    let indicator: HTMLElement | null = null;
    let ticking = false;

    function onScroll() {
      if (ticking || !indicator) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (indicator) {
          const opacity = 1 - Math.min(window.scrollY / 200, 1);
          indicator.style.opacity = opacity.toString();
        }
        ticking = false;
      });
    }

    const init = () => {
      indicator = document.querySelector(".scroll-indicator");
      if (indicator) {
        onScroll();
      }
    };

    init();
    const t1 = setTimeout(init, 100);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
}
