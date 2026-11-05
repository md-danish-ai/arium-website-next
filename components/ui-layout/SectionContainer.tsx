import React, { ElementType, HTMLAttributes, ReactNode } from "react";
import { CONTAINER_CLASSES, CONTAINER_FLUID_PADDING } from "@ui-layout/container.constants";

export * from "@ui-layout/container.constants";

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
        ${fluid ? `w-full box-border ${CONTAINER_FLUID_PADDING}` : CONTAINER_CLASSES}
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
  fluid?: boolean;
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
  fluid = false,
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
      <Container fluid={fluid} className={containerClassName}>
        {children}
      </Container>
    </Component>
  );
}
