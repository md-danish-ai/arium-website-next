import React from "react";

export interface ChevronsRightSvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
}

export default function ChevronsRightSvg({
  className = "",
  width = 20,
  height = 20,
  strokeWidth = 2,
  ...props
}: ChevronsRightSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <polyline points="6 17 11 12 6 7" />
      <polyline points="13 17 18 12 13 7" />
    </svg>
  );
}

export { ChevronsRightSvg };
