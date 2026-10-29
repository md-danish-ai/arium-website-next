import React from "react";

export type TypographyVariant =
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b1" | "b2" | "b3" | "b4" | "stat" | "button" | "quote";

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
  b1: "p",
  b2: "p",
  b3: "p",
  b4: "span",
  stat: "span",
  button: "span",
  quote: "blockquote",
};

// Default weights per variant (only applied if `weight` prop is not explicitly passed and no font-* weight exists in className)
const defaultWeightMap: Record<TypographyVariant, TypographyWeight> = {
  h1: "light",
  h2: "light",
  h3: "normal",
  h4: "bold",
  h5: "bold",
  h6: "normal",
  b1: "normal",
  b2: "normal",
  b3: "normal",
  b4: "medium",
  stat: "extrabold",
  button: "bold",
  quote: "light",
};

// All variants use 100% fluid responsive clamp() with font-family, letter-spacing, and line-height.
const variantStyleMap: Record<TypographyVariant, string> = {
  // H1: Main Hero Heading (.hero-title: Fluid 28.8px -> 44.8px, tracking 0.12em, leading 1.4)
  h1: "font-heading tracking-[0.12em] text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.4]",

  // H2: Subpage Hero Heading (.subpage-title: Fluid 29px -> 45px, tracking 0.05em, leading 1.2)
  h2: "font-heading tracking-[0.05em] text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.2]",

  // H3: Section Heading (.section-title: Fluid 1.2rem (19.2px mobile) -> 2.4rem (38.4px desktop), tracking 0.06em, leading 1.4)
  h3: "font-heading tracking-[0.06em] text-[clamp(1.2rem,0.5rem+2.2vw,2.4rem)] leading-[1.4]",

  // H4: Card / Benefit / Pillar Heading (.challenges-pillar-label / .shared-benefits-title: Fluid 1rem -> 2.2rem, tracking 0.06em, leading 1.2)
  h4: "font-heading tracking-[0.06em] text-[clamp(1rem,2vw,2.2rem)] leading-[1.2]",

  // H5: Sub-card / Modal Member Heading (Fluid 16px -> 18.5px, tracking 0.04em, leading-snug)
  h5: "font-heading tracking-[0.04em] text-[clamp(1rem,1.4vw,1.15rem)] leading-snug",

  // H6: Eyebrow / Interactive Trigger (.sas-item-title: Fluid 13px -> 14px, tracking 0.15em, leading-snug)
  h6: "font-heading tracking-[0.15em] text-[clamp(0.8rem,1vw,0.875rem)] leading-snug",

  // B1: Lead / Large Intro Body (.section-description: Fluid 0.9rem (14.4px mobile) -> 1.18rem desktop, leading 1.7)
  b1: "font-body text-[clamp(0.9rem,1.2vw,1.18rem)] leading-[1.7]",

  // B2: Standard Body Text (Fluid 14px -> 16px, leading 1.65)
  b2: "font-body text-[clamp(0.875rem,1.1vw,1rem)] leading-[1.65]",

  // B3: Compact Body Text / Card Description (Fluid 13px -> 14px, leading 1.6)
  b3: "font-body text-[clamp(0.8rem,0.9vw,0.875rem)] leading-[1.6]",

  // B4: Caption / Category Tag / Form Label (Fluid 11px -> 12px, tracking 0.08em, leading-none)
  b4: "font-body tracking-[0.08em] text-[clamp(0.7rem,0.8vw,0.75rem)] leading-none",

  // Stat: Big KPI Numbers (.stats-number / .sol-kpi-num: Fluid 32px mobile -> 44.8px desktop, tracking -0.03em, leading-none)
  stat: "font-heading tracking-[-0.03em] text-[clamp(2rem,1.2rem+1.8vw,2.8rem)] leading-none",

  // Button: CTA Button Label (Fluid 13px -> 14px, tracking 0.1em, leading-none)
  button: "font-heading tracking-[0.1em] text-[clamp(0.8rem,1vw,0.85rem)] leading-none",

  // Quote: Testimonial Quotes (.tm-panel-text: Fluid 16px -> 18.5px, italic, leading 1.8)
  quote: "font-body italic text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.8]",
};

// Maps named and numeric weights cleanly to Tailwind classes.
// Note: 600 safely maps to font-bold (700) because ulmGrotesk-600.otf does not exist.
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
