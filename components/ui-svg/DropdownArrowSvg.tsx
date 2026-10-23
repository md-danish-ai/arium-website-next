import React from "react";

export interface DropdownArrowSvgProps extends React.SVGProps<SVGSVGElement> {
  isOpen?: boolean;
  className?: string;
}

export default function DropdownArrowSvg({
  isOpen = false,
  className = "",
  ...props
}: DropdownArrowSvgProps) {
  return (
    <svg
      className={`w-3 h-2 text-[#162047]/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M1 1l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { DropdownArrowSvg };
