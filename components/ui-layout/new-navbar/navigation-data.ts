import { Building2, Users, Briefcase, MapPin, Route, Building, LucideIcon } from "lucide-react";

export interface NavigationLinkItem {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  label: string;
  links: NavigationLinkItem[];
}

export interface NavigationDirectLink {
  label: string;
  href: string;
}

export type NavItem =
  | {
      type: "group";
      label: string;
      links: NavigationLinkItem[];
    }
  | {
      type: "link";
      label: string;
      href: string;
    };

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Our Company",
    links: [
      {
        title: "About Us",
        href: "/about",
        description: "Our mission, roots, and digital infrastructure story.",
        icon: Building2,
      },
      {
        title: "Leadership",
        href: "/leadership",
        description: "Executive leaders driving strategic network growth.",
        icon: Users,
      },
      {
        title: "Board of Directors",
        href: "/board-of-directors",
        description: "Experienced governance guiding long-term vision.",
        icon: Briefcase,
      },
    ],
  },
  {
    label: "Where We Build",
    links: [
      {
        title: "Overview",
        href: "/where-we-build",
        description: "Connecting urban and rural communities nationwide.",
        icon: MapPin,
      },
      {
        title: "Right of Way",
        href: "/right-of-ways",
        description: "Streamlined municipal partnership across public corridors.",
        icon: Route,
      },
      {
        title: "Private Venues",
        href: "/private-venues",
        description: "Customized DAS and indoor wireless infrastructure.",
        icon: Building,
      },
    ],
  },
];

export const navigationLinks: NavigationDirectLink[] = [
  {
    label: "Our Solutions",
    href: "/solutions",
  },
  {
    label: "Your Community",
    href: "/community",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

export const allNavItems: NavItem[] = [
  {
    type: "group",
    label: "Our Company",
    links: navigationGroups[0].links,
  },
  {
    type: "link",
    label: "Our Solutions",
    href: "/solutions",
  },
  {
    type: "group",
    label: "Where We Build",
    links: navigationGroups[1].links,
  },
  {
    type: "link",
    label: "Your Community",
    href: "/community",
  },
  {
    type: "link",
    label: "Careers",
    href: "/careers",
  },
];
