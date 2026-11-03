import React from "react";
import {
  AssessmentIconSvg,
  PlanningIconSvg,
  ConstructionIconSvg,
  DesignIconSvg,
  OptimizationIconSvg,
} from "@ui-svg";

export const DEFAULT_PROCESS_ICONS: Record<string, React.ReactNode> = {
  assessment: (
    <AssessmentIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  ),
  planning: (
    <PlanningIconSvg className="w-9 h-9 lg:w-10 lg:h-10" width="36" height="36" strokeWidth="2.2" />
  ),
  construction: (
    <ConstructionIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  ),
  design: (
    <DesignIconSvg className="w-9 h-9 lg:w-10 lg:h-10" width="36" height="36" strokeWidth="2.2" />
  ),
  optimization: (
    <OptimizationIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  ),
};

export interface ProcessIconProps {
  id?: string;
  title?: string;
  icon_svg?: string | null;
  className?: string;
}

export default function ProcessIcon({
  id = "",
  title = "",
  icon_svg,
  className,
}: ProcessIconProps) {
  if (icon_svg && icon_svg.trim().length > 0) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full ${
          className || ""
        }`}
        dangerouslySetInnerHTML={{ __html: icon_svg }}
      />
    );
  }

  const searchKey = `${id} ${title}`.toLowerCase();
  for (const [key, iconNode] of Object.entries(DEFAULT_PROCESS_ICONS)) {
    if (searchKey.includes(key)) {
      return className ? <span className={className}>{iconNode}</span> : <>{iconNode}</>;
    }
  }

  const fallbackIcon = (
    <AssessmentIconSvg
      className="w-9 h-9 lg:w-10 lg:h-10"
      width="36"
      height="36"
      strokeWidth="2.2"
    />
  );

  return className ? <span className={className}>{fallbackIcon}</span> : <>{fallbackIcon}</>;
}
