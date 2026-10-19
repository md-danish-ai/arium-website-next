"use client";

import { useEffect } from "react";

// Scroll Reveal
export function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Parallax Background
export function useParallax() {
  useEffect(() => {
    const parallaxEls = document.querySelectorAll(".parallax-bg");
    if (!parallaxEls.length) return;

    const SPEED = 0.3;
    const desktopMQ = window.matchMedia("(min-width: 1080px)");
    let ticking = false;

    function update() {
      if (!desktopMQ.matches) return;

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

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // Initial position

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// Scroll Indicator Fade
export function useScrollIndicator() {
  useEffect(() => {
    const indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const opacity = 1 - Math.min(window.scrollY / 200, 1);
        (indicator as HTMLElement).style.opacity = opacity.toString();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// Timeline Horizontal Scroll
export function useTimeline() {
  useEffect(() => {
    const track = document.querySelector(".timeline-track");
    if (!track) return;

    const desktopMQ = window.matchMedia("(min-width: 1080px)");

    function handleWheel(e: Event) {
      const wheelEvent = e as WheelEvent;
      if (!desktopMQ.matches) return;

      const trackEl = track as HTMLElement;
      const maxScrollLeft = trackEl.scrollWidth - trackEl.clientWidth;
      if (maxScrollLeft <= 0) return;

      const atStart = trackEl.scrollLeft <= 0 && wheelEvent.deltaY < 0;
      const atEnd = trackEl.scrollLeft >= maxScrollLeft && wheelEvent.deltaY > 0;

      if (atStart || atEnd) return;

      wheelEvent.preventDefault();
      trackEl.scrollLeft += wheelEvent.deltaY;
    }

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);
}

// Animated Number Counters
export function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

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

    const observer = new IntersectionObserver(
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

    counters.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
