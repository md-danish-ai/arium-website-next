import React, { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Single source of truth for responsive left & right padding across all breakpoints up to 1920px
 * - Mobile (< 640px): 20px (px-5)
 * - Phablet (>= 640px): 24px (sm:px-6)
 * - Tablet (>= 768px): 32px (md:px-8)
 * - Laptop (>= 1024px): 48px (lg:px-12)
 * - Desktop / Laptop+ (>= 1280px): 138px (xl:px-[138px])
 * - Max Width: 1920px auto-centered
 */
export const CONTAINER_CLASSES =
  "w-full mx-auto max-w-[1920px] box-border px-5 sm:px-6 md:px-8 lg:px-12 xl:px-[138px]";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}

/**
 * Pure Container component for Navbar, Footer, Breadcrumbs, and custom inner layouts.
 */
export function Container({
  as: Component = "div",
  children,
  className = "",
  fluid = false,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`
        ${fluid ? "w-full px-5 sm:px-6 md:px-8" : CONTAINER_CLASSES}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  id?: string;
  bg?: string;
  py?: string;
  className?: string;
  containerClassName?: string;
  backgroundSlot?: ReactNode;
  children: ReactNode;
}

/**
 * Full-bleed Section + Centered Responsive Container.
 * Ensures section background stretches 100vw while inner content stays perfectly aligned.
 */
export default function SectionContainer({
  as: Component = "section",
  id,
  bg = "bg-transparent",
  py = "py-14 md:py-20 lg:py-24",
  className = "",
  containerClassName = "",
  backgroundSlot,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={`w-full relative overflow-hidden ${bg} ${py} ${className}`.trim()}
      {...props}
    >
      {/* Background Layer: 100% full-bleed textures/particles */}
      {backgroundSlot}

      {/* Content Layer: Clamped to 1920px with responsive left/right padding */}
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
