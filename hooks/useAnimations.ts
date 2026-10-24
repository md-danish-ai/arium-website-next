"use client";

import { useEffect } from "react";

// Scroll Reveal
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

// Parallax Background
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

// Scroll Indicator Fade
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

// Timeline Horizontal Scroll
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

// Animated Number Counters
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
