import React from "react";
import FlowBackground from "@ui-animations/FlowBackground";
import { PeopleGlobalSection } from "@ui-common";
import { mapPeopleMembers } from "@services/mappers/people.mapper";
import { WIDGET_REGISTRY } from "./registry";

export interface GlobalWidgetSection {
  id?: number | string;
  __component?: string;
  [key: string]: unknown;
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
      type: "people-group";
      items: { section: GlobalWidgetSection; index: number }[];
    }
  | {
      type: "single";
      section: GlobalWidgetSection;
      index: number;
    };

const STORYTELLER_COMPONENTS = new Set([
  "timeline",
  "stats-cards",
  "commitments",
  "illustration-split",
]);

export default function GlobalWidgetRenderer({ widget }: GlobalWidgetProps) {
  if (!widget?.Sections || !Array.isArray(widget.Sections)) {
    return null;
  }

  const renderNode = (section: GlobalWidgetSection, index: number) => {
    const raw = section?.__component || "";
    const widgetKey = raw.startsWith("widget.") ? raw : `widget.${raw.replace(/^shared\./, "")}`;
    const Component = WIDGET_REGISTRY[widgetKey] || WIDGET_REGISTRY[raw] || null;
    if (!Component) return null;
    return <Component key={`widget-section-${index}`} section={section} index={index} />;
  };

  // Group contiguous storyteller components and contiguous people cards
  const groupedSections: GroupedSection[] = [];
  let currentFlowGroup: { section: GlobalWidgetSection; index: number }[] = [];
  let currentPeopleGroup: { section: GlobalWidgetSection; index: number }[] = [];

  const flushGroups = () => {
    if (currentFlowGroup.length > 0) {
      groupedSections.push({ type: "storyteller-flow", items: currentFlowGroup });
      currentFlowGroup = [];
    }
    if (currentPeopleGroup.length > 0) {
      groupedSections.push({ type: "people-group", items: currentPeopleGroup });
      currentPeopleGroup = [];
    }
  };

  widget.Sections.forEach((section: GlobalWidgetSection, index: number) => {
    const compBase = section.__component?.toLowerCase().replace(/^(shared|widget)\./, "") || "";
    if (STORYTELLER_COMPONENTS.has(compBase)) {
      if (currentPeopleGroup.length > 0) {
        groupedSections.push({ type: "people-group", items: currentPeopleGroup });
        currentPeopleGroup = [];
      }
      currentFlowGroup.push({ section, index });
    } else if (compBase === "people-global-section") {
      if (currentFlowGroup.length > 0) {
        groupedSections.push({ type: "storyteller-flow", items: currentFlowGroup });
        currentFlowGroup = [];
      }
      currentPeopleGroup.push({ section, index });
    } else {
      flushGroups();
      groupedSections.push({ type: "single", section, index });
    }
  });

  flushGroups();

  return (
    <div className={widget.CustomCssClass || undefined}>
      {groupedSections.map((group, groupIndex) => {
        if (group.type === "storyteller-flow") {
          const hasIllustration = group.items.some((item) => {
            const base =
              item.section.__component?.toLowerCase().replace(/^(shared|widget)\./, "") || "";
            return base === "illustration-split";
          });

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

        if (group.type === "people-group") {
          const members = mapPeopleMembers(group.items.map((i) => i.section));
          return <PeopleGlobalSection key={`people-group-${groupIndex}`} members={members} />;
        }

        return renderNode(group.section, group.index);
      })}
    </div>
  );
}
