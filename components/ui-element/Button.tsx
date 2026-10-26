import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "filled" | "outlined";
export type ButtonColor = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBaseProps {
  /**
   * Button style variant
   * @default "filled"
   */
  variant?: ButtonVariant;
  /**
   * Color palette:
   * - primary: #162047 (Midnight Blue)
   * - secondary: #00e8d9 (Teal)
   * @default "primary"
   */
  color?: ButtonColor;
  /**
   * Button sizing
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Link destination (if provided, renders as Next.js Link or external <a>)
   */
  href?: string;
  /**
   * Forces opening as external link
   */
  isExternal?: boolean;
  /**
   * Icon placed before label
   */
  leftIcon?: ReactNode;
  /**
   * Icon placed after label
   */
  rightIcon?: ReactNode;
  /**
   * Stretch button to 100% width of parent
   */
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

const variantStyles: Record<ButtonColor, Record<ButtonVariant, string>> = {
  // Primary: #162047 (Midnight)
  primary: {
    filled:
      "bg-midnight text-white border-2 border-midnight hover:bg-transparent hover:text-midnight focus-visible:outline-midnight",
    outlined:
      "bg-transparent text-midnight border-2 border-midnight hover:bg-midnight hover:text-white focus-visible:outline-midnight",
  },
  // Secondary: #00e8d9 (Teal)
  secondary: {
    filled:
      "bg-teal text-midnight border-2 border-teal hover:bg-transparent hover:text-teal focus-visible:outline-teal",
    outlined:
      "bg-transparent text-teal border-2 border-teal hover:bg-teal hover:text-midnight focus-visible:outline-teal",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2 text-[0.75rem] min-h-[36px]",
  md: "px-8 sm:px-10 py-2.5 sm:py-3.5 text-[0.8rem] sm:text-[0.85rem] min-h-[44px]",
  lg: "px-10 sm:px-12 py-3.5 sm:py-4 text-[0.9rem] sm:text-[1rem] min-h-[52px]",
};

export default function Button({
  variant = "filled",
  color = "primary",
  size = "md",
  href,
  isExternal = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-[0.08em] rounded-full whitespace-nowrap cursor-pointer select-none no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0";

  const computedClasses = [
    baseClasses,
    variantStyles[color][variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
    </>
  );

  // External Link
  if (href && (isExternal || href.startsWith("http") || href.startsWith("//"))) {
    const { target, rel, ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={computedClasses}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // Internal Next.js Link
  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={computedClasses} {...anchorProps}>
        {content}
      </Link>
    );
  }

  // Native Button
  const {
    type = "button",
    disabled,
    ...buttonProps
  } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} disabled={disabled} className={computedClasses} {...buttonProps}>
      {content}
    </button>
  );
}
