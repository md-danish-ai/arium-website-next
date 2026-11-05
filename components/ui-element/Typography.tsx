import React from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "subpage-h1"
  | "subpage-title"
  | "story-title"
  | "cta-title"
  | "pillar-title"
  | "infra-title"
  | "eyebrow"
  | "lead"
  | "subpage-intro"
  | "stat"
  | "button"
  | "quote"
  | "team-overlay-name"
  | "team-overlay-role"
  | "team-modal-name"
  | "faq-massive"
  | "faq-question"
  | "disclaimer";

export type TypographyWeight =
  | "light"
  | 300
  | "normal"
  | 400
  | "medium"
  | 500
  | "semibold"
  | 600
  | "bold"
  | 700
  | "extrabold"
  | 800;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  weight?: TypographyWeight;
  uppercase?: boolean;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}

const variantTagMap: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "subpage-h1": "h1",
  "subpage-title": "h1",
  "story-title": "h2",
  "cta-title": "h2",
  "pillar-title": "h3",
  "infra-title": "h3",
  b1: "p",
  b2: "p",
  b3: "p",
  b4: "span",
  stat: "span",
  button: "span",
  quote: "blockquote",
  lead: "p",
  disclaimer: "p",
  "subpage-intro": "p",
  "team-overlay-role": "p",
  eyebrow: "span",
  "faq-massive": "h2",
  "faq-question": "h3",
  "team-modal-name": "h2",
  "team-overlay-name": "h3",
};

// Default weights per variant (only applied if `weight` prop is not explicitly passed and no font-* weight exists in className)
const defaultWeightMap: Record<TypographyVariant, TypographyWeight> = {
  h1: "normal",
  h2: "normal",
  h3: "normal",
  h4: "bold",
  h5: "bold",
  h6: "normal",
  eyebrow: "semibold",
  lead: "normal",
  b1: "normal",
  b2: "normal",
  b3: "normal",
  b4: "medium",
  stat: "extrabold",
  button: "bold",
  quote: "light",
  disclaimer: "normal",
  "subpage-h1": "normal",
  "subpage-title": "normal",
  "story-title": "normal",
  "cta-title": "normal",
  "pillar-title": "normal",
  "infra-title": "semibold",
  "subpage-intro": "normal",
  "team-overlay-name": "bold",
  "team-overlay-role": "medium",
  "team-modal-name": "bold",
  "faq-massive": "normal",
  "faq-question": "normal",
};

// All variants use 100% fluid responsive clamp() with font-family, letter-spacing, and line-height.
const variantStyleMap: Record<TypographyVariant, string> = {
  h1: "font-heading tracking-[0.12em] text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.35] md:leading-[1.4] uppercase",
  "subpage-h1":
    "font-heading tracking-[0.05em] text-[clamp(1.5rem,3.5vw,2.95rem)] leading-[1.2] uppercase",
  "subpage-title":
    "font-heading tracking-[0.05em] text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.2] uppercase",
  h2: "font-heading tracking-[0.05em] text-[clamp(1.2rem,0.5rem+2.2vw,2.4rem)] leading-[1.2] md:leading-[1.3] uppercase",
  "story-title": "font-heading tracking-normal text-[clamp(1.2rem,2.2vw,2.2rem)] leading-[1.35]",
  "cta-title":
    "font-heading tracking-[0.05em] text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.2] uppercase",
  h3: "font-heading tracking-[0.06em] text-[clamp(1.4rem,1.8vw,2rem)] leading-[1.2]",
  "pillar-title":
    "font-heading tracking-[0.06em] text-[clamp(1rem,0.6rem+1.2vw,2rem)] leading-[1.35] uppercase",
  "infra-title":
    "font-heading tracking-[0.2em] md:tracking-[0.05em] text-[clamp(1rem,1.2vw,1.35rem)] leading-[1.3] uppercase",
  h4: "font-heading tracking-normal text-[clamp(1rem,1.15vw,1.15rem)] leading-[1.35]",
  h5: "font-heading tracking-[0.04em] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-snug",
  h6: "font-heading tracking-[0.12em] text-[clamp(0.8rem,1vw,0.875rem)] leading-snug uppercase",
  eyebrow:
    "font-heading tracking-[0.15em] md:tracking-[0.18em] text-[clamp(0.78rem,0.8vw,0.85rem)] leading-none uppercase",
  lead: "font-body tracking-normal text-[clamp(0.9rem,1.4vw,1.28rem)] leading-[1.65]",
  "subpage-intro": "font-body tracking-normal text-[clamp(0.9rem,1.1vw,1.05rem)] leading-[1.65]",
  b1: "font-body tracking-[0.015em] text-[clamp(0.9rem,1.1vw,1.15rem)] leading-[1.65] md:leading-[1.7]",
  b2: "font-body tracking-[0.015em] text-[clamp(0.85rem,0.95vw,0.95rem)] leading-[1.6] md:leading-[1.65]",
  b3: "font-body tracking-normal text-[clamp(0.8rem,0.88vw,0.88rem)] leading-[1.6]",
  b4: "font-body tracking-[0.08em] text-[clamp(0.7rem,0.8vw,0.75rem)] leading-none",
  stat: "font-heading tracking-[-0.02em] text-[clamp(2rem,1.2rem+2.5vw,3.6rem)] leading-none",
  button:
    "font-heading tracking-[0.1em] text-[clamp(0.8rem,0.85vw,0.88rem)] leading-none uppercase",
  quote: "font-body italic text-[clamp(0.95rem,1.2vw,1.15rem)] leading-[1.75]",
  "team-overlay-name":
    "font-heading tracking-[0.05em] text-[clamp(0.8rem,1vw,1.15rem)] leading-tight uppercase",
  "team-overlay-role":
    "font-body tracking-[0.08em] text-[clamp(0.65rem,0.75vw,0.78rem)] leading-tight",
  "team-modal-name":
    "font-heading tracking-[0.05em] text-[clamp(1.9rem,1.5vw,1.8rem)] leading-tight uppercase",
  "faq-massive":
    "font-heading tracking-[0.05em] text-[clamp(1.5rem,5vw,4.5rem)] leading-[1.1] uppercase",
  "faq-question": "font-heading tracking-[0.05em] text-[clamp(1.1rem,1.8vw,1.6rem)] leading-[1.35]",
  disclaimer: "font-body tracking-[0.02em] text-[clamp(0.74rem,0.9vw,0.82rem)] leading-[1.75]",
};

const weightMap: Record<string | number, string> = {
  light: "font-light",
  300: "font-light",
  normal: "font-normal",
  400: "font-normal",
  medium: "font-medium",
  500: "font-medium",
  semibold: "font-bold",
  600: "font-bold",
  bold: "font-bold",
  700: "font-bold",
  extrabold: "font-extrabold",
  800: "font-extrabold",
};

// Regex to detect if className already provides an explicit font weight
const HAS_FONT_WEIGHT_REGEX = /\bfont-(light|normal|medium|semibold|bold|extrabold)\b/;

// Regex to detect HTML tags in string children
const HTML_TAG_REGEX = /<\/?[a-z][a-z0-9]*\b[^>]*>/i;

export default function Typography({
  variant = "b2",
  as,
  weight,
  uppercase,
  className = "",
  children,
  dangerouslySetInnerHTML,
  ...props
}: TypographyProps) {
  const Component = as || variantTagMap[variant] || "div";
  const variantStyles = variantStyleMap[variant] || "";

  // Dynamic conflict-free weight resolution:
  // 1. Explicit `weight` prop always takes priority.
  // 2. If no `weight` prop, but `className` already specifies `font-*`, do NOT inject default weight.
  // 3. Otherwise, inject the variant's default weight.
  let weightClass = "";
  if (weight !== undefined) {
    weightClass = weightMap[weight] || "";
  } else if (!HAS_FONT_WEIGHT_REGEX.test(className)) {
    const defaultWeight = defaultWeightMap[variant] || "normal";
    weightClass = weightMap[defaultWeight] || "";
  }

  // Uppercase prop
  const uppercaseClass = uppercase ? "uppercase" : "";

  const classes = [variantStyles, weightClass, uppercaseClass, className].filter(Boolean).join(" ");

  // Auto-detect HTML string in children or use explicit dangerouslySetInnerHTML
  const isHtmlString = typeof children === "string" && HTML_TAG_REGEX.test(children);
  const finalDangerouslySetInnerHTML =
    dangerouslySetInnerHTML || (isHtmlString ? { __html: children } : undefined);
  const finalChildren = finalDangerouslySetInnerHTML ? undefined : children;

  return (
    <Component
      className={classes}
      {...(finalDangerouslySetInnerHTML
        ? { dangerouslySetInnerHTML: finalDangerouslySetInnerHTML }
        : {})}
      {...props}
    >
      {finalChildren}
    </Component>
  );
}
