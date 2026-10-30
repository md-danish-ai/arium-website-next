import React from "react";

export interface FaqChevronSvgProps extends React.SVGProps<SVGSVGElement> {
  isOpen?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function FaqChevronSvg({
  isOpen = false,
  className = "",
  width = "20",
  height = "20",
  ...props
}: FaqChevronSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${className}`}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export { FaqChevronSvg };
