import React from "react";
import { SharedProcess } from "@ui-common";
import { SectionRendererProps, GetStrapiMediaUrl } from "./helper";

export default function ProcessRenderer({ section, index }: SectionRendererProps) {
  const title = section.ProcessSectionTitle || section.title || "Our Process";
  const description = section.ProcessSectionDescription || section.description || "";

  const pillars = (section.ProcessStep || []).map((step: any, idx: number) => {
    let iconNode: React.ReactNode = null;
    const iconImg = step.StepNameIconimg || step.StepNameIconImg;
    if (iconImg && iconImg.url) {
      const mediaUrl = GetStrapiMediaUrl(iconImg.url);
      iconNode = <img src={mediaUrl} alt={step.Stepname || `Step ${idx + 1}`} className="w-full h-full object-contain" />;
    } else if (step.StepNameIcon) {
      iconNode = <div dangerouslySetInnerHTML={{ __html: step.StepNameIcon }} />;
    }

    return {
      id: step.Stepname?.toLowerCase().replace(/\s+/g, "-") || `pillar-${idx}`,
      title: step.Stepname || `Step ${idx + 1}`,
      iconSvg: iconNode,
      themeColor: step.ThemeColor || step.themeColor || step.Theme || (step.ProcessCard?.[0]?.BackgroundColor) || "#FBCBB5",
      steps: (step.ProcessCard || []).map((card: any) => card.Name || ""),
      timelineItems: (step.ProcessCard || []).map((card: any) => ({
        label: card.Name || "",
        desc: card.Description || "",
        backgroundColor: card.BackgroundColor || undefined,
      })),
    };
  });

  return (
    <SharedProcess
      key={`process-${index}`}
      title={title}
      description={description}
      pillars={pillars}
      maxWidthTitle={section.MaxWidthTitle}
    />
  );
}
