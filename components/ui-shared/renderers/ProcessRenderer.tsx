import React from "react";
import Image from "next/image";
import { ProcessSection } from "@ui-common";
import { SectionRendererProps, GetStrapiMediaUrl } from "./helper";

interface ProcessCardItem {
  Name?: string;
  Description?: string;
  BackgroundColor?: string;
}

interface StepIconImg {
  url?: string;
}

interface ProcessStepItem {
  Stepname?: string;
  StepNameIconimg?: StepIconImg;
  StepNameIconImg?: StepIconImg;
  StepNameIcon?: string;
  ThemeColor?: string;
  themeColor?: string;
  Theme?: string;
  ProcessCard?: ProcessCardItem[];
}

interface ProcessSectionData {
  ProcessSectionTitle?: string;
  title?: string;
  ProcessSectionDescription?: string;
  description?: string;
  MaxWidthTitle?: string;
  ProcessStep?: ProcessStepItem[];
}

export default function ProcessRenderer({
  section,
  index,
}: SectionRendererProps<ProcessSectionData>) {
  const title = section.ProcessSectionTitle || section.title || "Our Process";
  const description = section.ProcessSectionDescription || section.description || "";

  const pillars = (section.ProcessStep || []).map((step, idx) => {
    let iconNode: React.ReactNode = null;
    const iconImg = step.StepNameIconimg || step.StepNameIconImg;
    if (iconImg && iconImg.url) {
      const mediaUrl = GetStrapiMediaUrl(iconImg.url);
      const isSvg = mediaUrl.endsWith(".svg");
      iconNode = (
        <Image
          src={mediaUrl}
          alt={step.Stepname || `Step ${idx + 1}`}
          width={40}
          height={40}
          unoptimized={isSvg}
          className="w-full h-full object-contain"
        />
      );
    } else if (step.StepNameIcon) {
      iconNode = <div dangerouslySetInnerHTML={{ __html: step.StepNameIcon }} />;
    }

    return {
      id: step.Stepname?.toLowerCase().replace(/\s+/g, "-") || `pillar-${idx}`,
      title: step.Stepname || `Step ${idx + 1}`,
      iconSvg: iconNode,
      themeColor:
        step.ThemeColor ||
        step.themeColor ||
        step.Theme ||
        step.ProcessCard?.[0]?.BackgroundColor ||
        "#FBCBB5",
      steps: (step.ProcessCard || []).map((card) => card.Name || ""),
      timelineItems: (step.ProcessCard || []).map((card) => ({
        label: card.Name || "",
        desc: card.Description || "",
        backgroundColor: card.BackgroundColor || undefined,
      })),
    };
  });

  return (
    <ProcessSection
      key={`process-${index}`}
      title={title}
      description={description}
      pillars={pillars}
      maxWidthTitle={section.MaxWidthTitle}
    />
  );
}
