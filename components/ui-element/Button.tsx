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
      "bg-[#162047] text-white !text-white border-2 border-[#162047] hover:bg-transparent hover:!text-[#162047] hover:border-[#162047] focus-visible:outline-[#162047]",
    outlined:
      "bg-transparent text-[#162047] !text-[#162047] border-2 border-[#162047] hover:bg-[#162047] hover:!text-white hover:border-[#162047] focus-visible:outline-[#162047]",
  },
  // Secondary: #00e8d9 (Teal)
  secondary: {
    filled:
      "bg-[#00e8d9] text-[#162047] !text-[#162047] border-2 border-[#00e8d9] hover:bg-transparent hover:!text-[#00e8d9] hover:border-[#00e8d9] focus-visible:outline-[#00e8d9]",
    outlined:
      "bg-transparent text-[#00e8d9] !text-[#00e8d9] border-2 border-[#00e8d9] hover:bg-[#00e8d9] hover:!text-[#162047] hover:border-[#00e8d9] focus-visible:outline-[#00e8d9]",
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
      {children && <span className="text-inherit">{children}</span>}
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
