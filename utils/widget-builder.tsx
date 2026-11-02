import React, { ReactElement } from "react";
import type { StrapiWidget } from "../types/strapi.types";
import type { SectionEntry } from "../types/content.types";
import GlobalWidgetRenderer from "@ui-widget/GlobalWidgetRenderer";

// Checks if any global widget matches the given component name
export function hasWidgetComponent(
  widgets: StrapiWidget[] = [],
  componentName: string | string[]
): boolean {
  const targets = (Array.isArray(componentName) ? componentName : [componentName]).map((t) => {
    let clean = t.toLowerCase().replace(/^(shared|widget)\./, "");
    if (clean === "test-banner" || clean === "sub-page-banner") clean = "hero-banner";
    if (clean === "inner-page-hero") clean = "sub-page-hero";
    return clean;
  });

  return widgets.some((w) =>
    w.Sections?.some((s) => {
      let comp = (s.__component?.toLowerCase() || "").replace(/^(shared|widget)\./, "");
      if (comp === "test-banner" || comp === "sub-page-banner") comp = "hero-banner";
      if (comp === "inner-page-hero") comp = "sub-page-hero";
      return targets.some((target) => comp === target || comp.includes(target));
    })
  );
}

// Combines static fallback sections and CMS widgets sorted by position
export function combinePageSections(
  fallbackSections: SectionEntry[],
  globalWidgets: StrapiWidget[] = []
): ReactElement[] {
  const widgetSections: SectionEntry[] = globalWidgets.map((widget, idx) => ({
    pos: typeof widget.PositionNumber === "number" ? widget.PositionNumber : 99,
    key: `widget-${widget.id ?? idx}`,
    el: <GlobalWidgetRenderer key={`widget-${widget.id ?? idx}`} widget={widget} />,
  }));

  return [...fallbackSections.filter((s) => !s.skip), ...widgetSections]
    .sort((a, b) => a.pos - b.pos)
    .map((entry) => entry.el);
}
