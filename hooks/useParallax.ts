"use client";

import { useEffect } from "react";

/**
 * Parallax Background Hook
 * Smoothly calculates backgroundPositionY offsets for elements with `.parallax-bg`
 * on viewports wider than 1080px.
 */
export function useParallax(pathname?: string) {
  useEffect(() => {
    let parallaxEls: NodeListOf<Element>;
    const SPEED = 0.3;
    const desktopMQ = window.matchMedia("(min-width: 1080px)");
    let ticking = false;

    function update() {
      if (!desktopMQ.matches || !parallaxEls?.length) return;

      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (elCenter - viewCenter) * SPEED;
        (el as HTMLElement).style.backgroundPositionY = `calc(50% + ${offset}px)`;
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    const init = () => {
      parallaxEls = document.querySelectorAll(".parallax-bg");
      if (parallaxEls.length) {
        update();
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
