"use client";

import { useScrollReveal, useParallax, useScrollIndicator, useCounters, useTimeline } from "../../hooks/useAnimations";

export default function PageAnimations() {
  useScrollReveal();
  useParallax();
  useScrollIndicator();
  useCounters();
  useTimeline();
  
  return null;
}
