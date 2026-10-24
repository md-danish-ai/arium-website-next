export interface RawNavDropdownItem {
  id?: string | number;
  label?: string;
  url?: string;
}

export interface RawNavigationItem {
  id?: string | number;
  label?: string;
  url?: string;
  dropdown?: RawNavDropdownItem[];
}

export interface NavItemChild {
  label: string;
  url: string;
}

export interface NavRoute {
  id?: string;
  label: string;
  url: string;
  type: "item" | "collapse";
  children?: NavItemChild[];
}

export const navRoutes: NavRoute[] = [
  {
    id: "company",
    label: "Our Company",
    url: "/about",
    type: "collapse",
    children: [
      {
        label: "About Us",
        url: "/about",
      },
      {
        label: "Leadership",
        url: "/leadership",
      },
      {
        label: "Board of Directors",
        url: "/board-of-directors",
      },
    ],
  },
  {
    id: "solutions",
    label: "Our Solutions",
    url: "/solutions",
    type: "item",
    children: [],
  },
  {
    id: "where",
    label: "Where We Build",
    url: "/where-we-build",
    type: "collapse",
    children: [
      {
        label: "Overview",
        url: "/where-we-build",
      },
      {
        label: "Right of Way",
        url: "/right-of-ways",
      },
      {
        label: "Private Venues",
        url: "/private-venues",
      },
    ],
  },
  {
    id: "community",
    label: "Your Community",
    url: "/community",
    type: "item",
    children: [],
  },
  {
    id: "careers",
    label: "Careers",
    url: "/careers",
    type: "item",
    children: [],
  },
];

export function getNormalizedNavRoutes(layoutNavigation?: RawNavigationItem[]): NavRoute[] {
  if (Array.isArray(layoutNavigation) && layoutNavigation.length > 0) {
    return layoutNavigation.map((item: RawNavigationItem): NavRoute => {
      const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;
      const dropId = item.label ? item.label.toLowerCase().replace(/\s+/g, "-") : undefined;
      const routeType: "collapse" | "item" = hasDropdown ? "collapse" : "item";
      return {
        id: dropId,
        label: item.label || "",
        url: item.url || (hasDropdown ? item.dropdown?.[0]?.url || "#" : "#"),
        type: routeType,
        children:
          hasDropdown && item.dropdown
            ? item.dropdown.map((sub: RawNavDropdownItem): NavItemChild => ({
                label: sub.label || "",
                url: sub.url || "#",
              }))
            : [],
      };
    });
  }
  return navRoutes;
}
