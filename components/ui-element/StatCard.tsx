"use client";

import React from "react";
import Typography from "./Typography";

export interface StatCardProps {
  number: string;
  description?: string;
  bgColor?: string;
  numberColor?: string;
  descriptionColor?: string;
  align?: "left" | "center";
  className?: string;
  style?: React.CSSProperties;
  enableCounter?: boolean;
}

export default function StatCard({
  number,
  description,
  bgColor,
  numberColor,
  descriptionColor,
  align = "left",
  className = "",
  style = {},
  enableCounter = true,
}: StatCardProps) {
  // Extract number and suffix for animated counter support
  const targetMatch = number ? number.match(/[\d.]+/) : null;
  const target = targetMatch ? parseFloat(targetMatch[0]) : 0;
  const suffix = number ? number.replace(target.toString(), "").trim() : "";

  // Alignment classes
  const isCenter = align === "center";
  const alignContainerClass = isCenter ? "items-center text-center" : "items-start text-left";
  const textAlignClass = isCenter ? "text-center" : "text-left";

  return (
    <div
      className={`w-full rounded-[20px] p-4 sm:p-5 md:p-6 flex flex-col gap-1.5 cursor-default transition-all duration-300 border border-midnight/5 hover:-translate-y-1 hover:shadow-xl overflow-hidden box-border ${alignContainerClass} ${className}`}
      style={{
        backgroundColor: bgColor || undefined,
        ...style,
      }}
    >
      <div className={`w-full ${textAlignClass}`}>
        <Typography
          variant="stat"
          className={`text-midnight m-0 leading-none ${enableCounter ? "counter" : ""} ${textAlignClass}`}
          style={{ color: numberColor || undefined }}
          {...(enableCounter ? { "data-target": target, "data-suffix": suffix } : {})}
        >
          {enableCounter ? 0 : number}
        </Typography>
      </div>

      {description ? (
        <Typography
          as="p"
          variant="b3"
          className={`text-midnight/85 text-[13px] w-full m-0 font-medium normal-case leading-[1.3] tracking-normal break-words whitespace-normal ${textAlignClass}`}
          style={{ color: descriptionColor || undefined }}
        >
          {description}
        </Typography>
      ) : null}
    </div>
  );
}
