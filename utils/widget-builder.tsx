import React, { ReactElement } from "react";
import type { StrapiWidget } from "../types/strapi.types";
import type { SectionEntry } from "../types/content.types";
import GlobalWidgetRenderer from "@ui-widget/GlobalWidgetRenderer";

/**
 * Checks whether any global widget contains a specific Strapi component.
 */
export function hasWidgetComponent(
  widgets: StrapiWidget[] = [],
  componentName: string | string[]
): boolean {
  const targets = (Array.isArray(componentName) ? componentName : [componentName]).map((t) =>
    t.toLowerCase().replace(/^(shared|widget)\./, "")
  );

  return widgets.some((w) =>
    w.Sections?.some((s) => {
      const comp = (s.__component?.toLowerCase() || "").replace(/^(shared|widget)\./, "");
      return targets.some((target) => comp === target || comp.includes(target));
    })
  );
}

/**
 * Combines static fallback sections with CMS global widgets,
 * filters out skipped fallbacks, and sorts them by position order.
 */
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
