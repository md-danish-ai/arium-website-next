import React from "react";

export interface DoubleRightArrowSvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  stroke?: string;
  strokeWidth?: number | string;
}

export default function DoubleRightArrowSvg({
  className = "",
  width = 16,
  height = 16,
  stroke = "#00e8d9",
  strokeWidth = "1.8",
  ...props
}: DoubleRightArrowSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <polyline points="8 17 13 12 8 7" />
      <polyline points="14 17 19 12 14 7" />
    </svg>
  );
}
