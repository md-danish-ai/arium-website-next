"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useScrollReveal, useParallax, useScrollIndicator, useCounters, useTimeline } from "@hooks";

export default function PageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top upon navigating to a new page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useScrollReveal(pathname);
  useParallax(pathname);
  useScrollIndicator(pathname);
  useCounters(pathname);
  useTimeline(pathname);

  return null;
}
