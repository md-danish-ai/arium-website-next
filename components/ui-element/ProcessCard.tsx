"use client";

import React from "react";
import Typography from "./Typography";

export interface ProcessCardProps {
  step: number | string;
  title?: string;
  label?: string;
  description?: string;
  desc?: string;
  backgroundColor?: string;
  isFourCols?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProcessCard({
  step,
  title,
  label,
  description,
  desc,
  backgroundColor = "#FBCBB5",
  isFourCols = false,
  className = "",
  style,
}: ProcessCardProps) {
  const stepLabel =
    typeof step === "number" || !step.toString().toLowerCase().startsWith("step")
      ? `Step ${step}`
      : step;
  const cardTitle = title || label || "";
  const cardDescription = description || desc || "";

  return (
    <div
      className={`shrink-0 snap-start w-[280px] sm:w-[320px] min-w-[270px] max-w-[340px] min-h-[260px] p-6 sm:p-7 rounded-[20px] shadow-[0_4px_16px_rgba(22,32,71,0.04)] hover:shadow-[0_16px_36px_rgba(22,32,71,0.09)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start justify-start text-left lg:w-full lg:min-w-0 lg:shrink lg:p-8 lg:min-h-[310px] ${
        isFourCols ? "lg:max-w-[303px]" : "lg:max-w-[380px]"
      } ${className}`}
      style={{
        backgroundColor,
        ...style,
      }}
    >
      <Typography
        as="span"
        variant="b4"
        uppercase
        weight="bold"
        className="self-start inline-flex items-center justify-center py-1.5 px-3.5 rounded-full bg-[#162047] text-white tracking-[0.06em] mb-4 leading-none select-none w-fit"
      >
        {stepLabel}
      </Typography>
      <Typography
        as="h4"
        variant="h4"
        weight="bold"
        className="text-[#162047] m-0 mb-2.5 leading-[1.3] normal-case"
      >
        {cardTitle}
      </Typography>
      <Typography
        as="p"
        variant="b1"
        weight="normal"
        className="leading-[1.58] text-[#162047]/90 m-0"
      >
        {cardDescription}
      </Typography>
    </div>
  );
}
