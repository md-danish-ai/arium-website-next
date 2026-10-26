"use client";

import { useEffect } from "react";

/**
 * Scroll Reveal Hook
 * Observes elements with `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`
 * and applies the `.active` class when they enter the viewport.
 */
export function useScrollReveal(pathname?: string) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const activateElement = (el: Element) => {
      el.classList.add("active");
    };

    const setupObserver = () => {
      const reveals = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      if (!reveals.length) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                activateElement(entry.target);
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
      }

      reveals.forEach((el) => {
        if (el.classList.contains("active")) return;

        const rect = el.getBoundingClientRect();
        // If element is already within the viewport, activate it immediately
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          activateElement(el);
        } else {
          observer!.observe(el);
        }
      });
    };

    // Run immediately and at staggered intervals to catch streaming/client transitions
    setupObserver();
    const t1 = setTimeout(setupObserver, 50);
    const t2 = setTimeout(setupObserver, 150);
    const t3 = setTimeout(setupObserver, 350);

    // MutationObserver to automatically catch any newly added reveal elements on client-side routing
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
