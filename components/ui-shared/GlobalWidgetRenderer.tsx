import React from "react";
import FlowBackground from "@ui-animations/FlowBackground";
import { WIDGET_REGISTRY } from "./renderers";

export interface GlobalWidgetSection {
  id?: number | string;
  __component?: string;
}

export interface GlobalWidgetData {
  id?: number | string;
  PositionNumber?: number;
  CustomCssClass?: string;
  Sections?: GlobalWidgetSection[];
}

export interface GlobalWidgetProps {
  widget: GlobalWidgetData;
}

type GroupedSection =
  | {
      type: "storyteller-flow";
      items: { section: GlobalWidgetSection; index: number }[];
    }
  | {
      type: "single";
      section: GlobalWidgetSection;
      index: number;
    };

const STORYTELLER_COMPONENTS = new Set([
  "shared.journey",
  "shared.timeline",
  "shared.journey-timeline",
  "shared.stats-cards",
  "shared.statscards",
  "shared.stats-card",
  "shared.commitments",
  "shared.commitment",
  "widget.commitments",
  "shared.illustration-split",
  "shared.media-text-split",
]);

export default function GlobalWidgetRenderer({ widget }: GlobalWidgetProps) {
  if (!widget?.Sections || !Array.isArray(widget.Sections)) {
    return null;
  }

  const renderNode = (section: GlobalWidgetSection, index: number) => {
    const Component = section?.__component ? WIDGET_REGISTRY[section.__component] : null;
    if (!Component) return null;
    return <Component key={`widget-section-${index}`} section={section} index={index} />;
  };

  // Group contiguous storyteller components into storyteller-flow containers
  const groupedSections: GroupedSection[] = [];
  let currentFlowGroup: { section: GlobalWidgetSection; index: number }[] = [];

  widget.Sections.forEach((section: GlobalWidgetSection, index: number) => {
    if (section.__component && STORYTELLER_COMPONENTS.has(section.__component)) {
      currentFlowGroup.push({ section, index });
    } else {
      if (currentFlowGroup.length > 0) {
        groupedSections.push({ type: "storyteller-flow", items: currentFlowGroup });
        currentFlowGroup = [];
      }
      groupedSections.push({ type: "single", section, index });
    }
  });

  if (currentFlowGroup.length > 0) {
    groupedSections.push({ type: "storyteller-flow", items: currentFlowGroup });
  }

  return (
    <div className={widget.CustomCssClass || undefined}>
      {groupedSections.map((group, groupIndex) => {
        if (group.type === "storyteller-flow") {
          const hasIllustration = group.items.some(
            (item) =>
              item.section.__component === "shared.illustration-split" ||
              item.section.__component === "shared.media-text-split"
          );

          return (
            <div
              key={`flow-group-${groupIndex}`}
              className={`${
                hasIllustration
                  ? "bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#f5f0ff_40%,#ebe2ff_75%,#dfd4ff_100%)] [&_.section-light]:border-none [&_.section-light+*.section-light]:border-none [&_.section-light]:bg-transparent"
                  : ""
              } relative overflow-hidden -mt-px border-none`}
            >
              <FlowBackground />
              {group.items.map((item) => renderNode(item.section, item.index))}
            </div>
          );
        }
        return renderNode(group.section, group.index);
      })}
    </div>
  );
}
