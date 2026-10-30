"use client";

import { useEffect } from "react";

/**
 * Timeline Horizontal Scroll Hook
 * Translates vertical wheel deltas into horizontal scroll for `.timeline-track` on desktop viewports.
 */
export function useTimeline(pathname?: string) {
  useEffect(() => {
    let track: HTMLElement | null = null;
    const desktopMQ = window.matchMedia("(min-width: 1080px)");

    function handleWheel(e: Event) {
      const wheelEvent = e as WheelEvent;
      if (!desktopMQ.matches || !track) return;

      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      if (maxScrollLeft <= 0) return;

      const atStart = track.scrollLeft <= 0 && wheelEvent.deltaY < 0;
      const atEnd = track.scrollLeft >= maxScrollLeft && wheelEvent.deltaY > 0;

      if (atStart || atEnd) return;

      wheelEvent.preventDefault();
      track.scrollLeft += wheelEvent.deltaY;
    }

    const init = () => {
      track = document.querySelector(".timeline-track");
      if (track) {
        track.addEventListener("wheel", handleWheel, { passive: false });
      }
    };

    init();
    const t1 = setTimeout(init, 100);

    return () => {
      clearTimeout(t1);
      if (track) {
        track.removeEventListener("wheel", handleWheel);
      }
    };
  }, [pathname]);
}
