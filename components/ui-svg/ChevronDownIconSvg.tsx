import React from "react";

export interface ChevronDownIconSvgProps extends React.SVGProps<SVGSVGElement> {
  isOpen?: boolean;
  className?: string;
}

export default function ChevronDownIconSvg({
  isOpen = false,
  className = "",
  ...props
}: ChevronDownIconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 shrink-0 ${
        isOpen ? "rotate-180 text-teal" : "text-current"
      } ${className}`}
      {...props}
    >
      <path d="m8.75.75-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export { ChevronDownIconSvg };
