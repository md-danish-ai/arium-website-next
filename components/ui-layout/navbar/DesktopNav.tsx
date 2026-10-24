"use client";

import React from "react";
import { NavRoute } from "../nav-routes";
import DesktopNavItem from "./DesktopNavItem";

interface DesktopNavProps {
  routes: NavRoute[];
  pathname: string;
  openDropdown: string | null;
  onToggleDropdown: (id: string, e: React.MouseEvent) => void;
  onCloseDropdown: () => void;
}

export default function DesktopNav({
  routes,
  pathname,
  openDropdown,
  onToggleDropdown,
  onCloseDropdown,
}: DesktopNavProps) {
  return (
    <nav
      aria-label="Desktop navigation"
      className="hidden min-[1080px]:flex min-[1080px]:flex-row min-[1080px]:items-center min-[1080px]:justify-end min-[1080px]:gap-1 min-[1280px]:gap-1.5 xl:gap-2.5 min-[1080px]:[&>*:last-child]:-mr-[15px] min-[1280px]:[&>*:last-child]:-mr-[17px] xl:[&>*:last-child]:-mr-[21px]"
    >
      {routes.map((route) => (
        <DesktopNavItem
          key={route.id || route.label}
          route={route}
          pathname={pathname}
          openDropdown={openDropdown}
          onToggleDropdown={onToggleDropdown}
          onClose={onCloseDropdown}
        />
      ))}
    </nav>
  );
}
