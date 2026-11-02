import React, { ElementType, HTMLAttributes, ReactNode } from "react";

// Responsive container padding classes up to 1920px max-width
export const CONTAINER_CLASSES =
  "w-full mx-auto max-w-[1920px] box-border px-5 sm:px-6 md:px-8 lg:px-12 xl:px-[138px]";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}

// Standard container for page layouts, navbar, and footer
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

// Section wrapper with background slot and nested responsive container
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
      {backgroundSlot}
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
