import React from "react";

export type TypographyVariant =
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b1" | "b2" | "b3" | "b4" | "stat" | "button" | "quote";

export type TypographyWeight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  weight?: TypographyWeight;
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

const variantStyleMap: Record<TypographyVariant, string> = {
  // H1: Main Hero Heading (Fluid 32px -> 56px, uppercase, tracking 0.05em, leading 1.15)
  h1: "font-heading font-light uppercase tracking-[0.05em] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15]",

  // H2: Subpage Hero Heading (Fluid 28px -> 48px, uppercase, tracking 0.05em, leading 1.2)
  h2: "font-heading font-light uppercase tracking-[0.05em] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.2]",

  // H3: Section Heading (Fluid 26px -> 38px, uppercase, tracking 0.06em, leading 1.35)
  h3: "font-heading font-normal uppercase tracking-[0.06em] text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.35]",

  // H4: Card / Column Heading (Fluid 18px -> 22px, bold, uppercase, tracking 0.04em, leading 1.3)
  h4: "font-heading font-bold uppercase tracking-[0.04em] text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.3]",

  // H5: Sub-card / Feature Heading (16px -> 18px, semibold, uppercase)
  h5: "font-heading font-semibold uppercase tracking-[0.04em] text-base md:text-lg leading-snug",

  // H6: Eyebrow / Small Header (14px -> 16px, medium, uppercase, tracking 0.08em)
  h6: "font-heading font-medium uppercase tracking-[0.08em] text-sm md:text-base leading-snug",

  // B1: Lead / Large Intro Body (Fluid 16px -> 18px, relaxed, text-midnight/80)
  b1: "font-body font-normal text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[#162047]/80",

  // B2: Standard Body Text (14px -> 16px, relaxed, text-midnight/80)
  b2: "font-body font-normal text-sm md:text-base leading-relaxed text-[#162047]/80",

  // B3: Compact Body Text / Card Description (12px -> 14px, text-midnight/75)
  b3: "font-body font-normal text-xs md:text-sm leading-relaxed text-[#162047]/75",

  // B4: Caption / Breadcrumb / Metadata Tag (12px, medium, uppercase, tracking 0.08em)
  b4: "font-body font-medium uppercase tracking-[0.08em] text-xs leading-none",

  // Stat: Big KPI Numbers (e.g. 100K+, 700+, 15+)
  stat: "font-heading font-extrabold tracking-tight text-[clamp(2.5rem,5vw,4.2rem)] leading-none",

  // Button: CTA button typography (12px -> 14px, uppercase, tracking 0.1em)
  button: "font-heading font-semibold uppercase tracking-[0.1em] text-xs md:text-sm leading-none",

  // Quote: Testimonial Quotes (italic, relaxed)
  quote: "font-body font-light italic text-base md:text-lg leading-relaxed text-[#162047]/85",
};

const weightMap: Record<TypographyWeight, string> = {
  light: "font-light", // 300
  normal: "font-normal", // 400
  medium: "font-medium", // 500
  semibold: "font-semibold", // 600
  bold: "font-bold", // 700
  extrabold: "font-extrabold", // 800
};

export default function Typography({
  variant = "b2",
  as,
  weight,
  className = "",
  children,
  ...props
}: TypographyProps) {
  const Component = as || variantTagMap[variant] || "div";
  const variantStyles = variantStyleMap[variant] || "";
  const weightStyle = weight ? weightMap[weight] : "";

  return (
    <Component className={`${variantStyles} ${weightStyle} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
