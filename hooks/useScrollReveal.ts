"use client";

import { useEffect } from "react";

// Toggles active state on reveal elements as they enter/leave viewport
export function useScrollReveal(pathname?: string) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const reveals = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      if (!reveals.length) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("active");
              } else {
                entry.target.classList.remove("active");
              }
            });
          },
          { threshold: 0.08 }
        );
      }

      reveals.forEach((el) => {
        observer!.observe(el);
      });
    };

    // Staggered checks for client transitions
    setupObserver();
    const t1 = setTimeout(setupObserver, 50);
    const t2 = setTimeout(setupObserver, 150);
    const t3 = setTimeout(setupObserver, 350);

    // Re-check when route content updates
    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    const mainContent = document.getElementById("main-content") || document.body;
    if (mainContent) {
      mutationObserver.observe(mainContent, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      mutationObserver.disconnect();
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);
}
