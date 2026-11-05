/**
 * Arium Website Design System (V6.3) — Master Container & Gutter Specifications
 *
 * This file serves as the Single Source of Truth (SSOT) for all horizontal padding (gutters),
 * max content bounds, and master alignment frames across the entire website.
 *
 * ---------------------------------------------------------------------------------------------
 * 1. Alignment Frame Architecture:
 *    - Master Frame Cap:   2200px max content width inside gutters (--frame: 2200px)
 *    - Gutter (< 1440px):  Fluid formula = max(24px, 5.29vw) (minimum floor 24px)
 *    - Gutter (>= 1440px): Fluid formula = 7.2vw
 *    - Total Box Width:    calc(var(--frame) + (2 * var(--gutter))) (~2516px at 2200px viewport)
 *
 * ---------------------------------------------------------------------------------------------
 * 2. Breakpoint Padding Matrix:
 *    - Mobile (<= 600px):         24px floor (px-6) [iPhone SE, 13–16, Galaxy S23/S24]
 *    - Large Mobile (601-768px):  31.8px – 40.6px (sm: 640px = ~33.8px) [Foldables, Mini tablets]
 *    - Tablet (769-1079px):       40.7px – 57.1px (md: 768px = ~40.6px, iPad 834px = 44px)
 *    - Hybrid Laptop (1080-1279): 57.1px – 67.7px (1080px = 57.1px, 1200px = 63.5px) [ThinkPad @ 150%]
 *    - Standard Desktop (1280+):  67.7px – 76.1px (xl: 1280px = ~68px, 1366px = 72.3px) [MacBook Air/Pro 13"]
 *    - Large Desktop (1440-1919): 103.7px – 138.2px (1440px = ~104px, MacBook 1512px = ~109px)
 *    - Full HD (1920px):          138.24px (~138px) [1080p Desktop Monitors: 1920 * 0.072]
 *    - Ultra-Wide / 4K (>=2200):  Capped at 2200px content (~2516px container box, centered via mx-auto)
 * ---------------------------------------------------------------------------------------------
 */

/**
 * Fluid horizontal gutter padding matching the styles.css CSS formula.
 * Applies max(24px, 5.29vw) for viewports < 1440px, and jumps to 7.2vw for >= 1440px.
 */
export const CONTAINER_FLUID_PADDING = "px-[max(24px,5.29vw)] min-[1440px]:px-[7.2vw]";

/**
 * Max-width container bound ensuring content conforms to the 2200px frame cap plus gutters.
 */
export const CONTAINER_FRAME_MAX_WIDTH = "max-w-[var(--frame-box,calc(2200px+2*7.2vw))]";

/**
 * Option 1 (Recommended): 100% Exact Parity with styles.css fluid formula.
 * Full width, centered, max-width capped at frame-box, and responsive fluid gutters.
 */
export const CONTAINER_CLASSES_FLUID = `w-full mx-auto ${CONTAINER_FRAME_MAX_WIDTH} box-border ${CONTAINER_FLUID_PADDING}`;

/**
 * Option 2: Discrete Tailwind Breakpoint steps (if arbitrary CSS values are not desired).
 * Provides static step-based approximations for each standard Tailwind breakpoint tier.
 */
export const CONTAINER_CLASSES_STEPPED =
  "w-full mx-auto max-w-[2516px] box-border px-6 sm:px-[34px] md:px-10 lg:px-[57px] xl:px-[68px] 2xl:px-[104px] min-[1920px]:px-[138px]";

/**
 * Default master container class set to Fluid for absolute pixel perfection across all devices.
 */
export const CONTAINER_CLASSES = CONTAINER_CLASSES_FLUID;
