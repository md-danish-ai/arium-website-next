"use client";

import React from "react";
import Link from "next/link";
import { NavRoute } from "../nav-routes";
import { ChevronDownIconSvg } from "@ui-svg";

interface MobileNavItemProps {
  route: NavRoute;
  pathname: string;
  openDropdown: string | null;
  onToggleDropdown: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

export default function MobileNavItem({
  route,
  pathname,
  openDropdown,
  onToggleDropdown,
  onClose,
}: MobileNavItemProps) {
  const isCollapse =
    route.type === "collapse" && Array.isArray(route.children) && route.children.length > 0;
  const dropId = route.id || route.label.toLowerCase().replace(/\s+/g, "-");
  const isOpen = openDropdown === dropId;

  const isChildActive = Boolean(
    route.children?.some(
      (child) =>
        pathname === child.url || (child.url !== "/" && pathname.startsWith(child.url + "/"))
    )
  );

  const isCurrentActive =
    pathname === route.url || (route.url !== "/" && pathname.startsWith(route.url + "/"));

  if (!isCollapse) {
    return (
      <Link
        href={route.url}
        onClick={onClose}
        className={`w-full inline-flex items-center justify-between px-4 py-3 text-[1.05rem] font-heading rounded-lg border border-transparent whitespace-nowrap leading-none transition-all duration-200 cursor-pointer ${
          isCurrentActive
            ? "text-teal font-semibold bg-teal/5"
            : "text-white/90 font-normal hover:text-teal hover:bg-teal/8"
        }`}
      >
        {route.label}
      </Link>
    );
  }

  return (
    <div
      className={`w-full rounded-[10px] border border-transparent transition-[background-color,border-color] duration-250 box-border ${
        isOpen ? "bg-white/[0.04] border-white/[0.07] pb-2" : ""
      }`}
      id={`mobile-dropdown-${dropId}`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={(e) => onToggleDropdown(dropId, e)}
        className={`w-full inline-flex items-center justify-between px-4 py-3 text-[1.05rem] font-heading rounded-lg border-none bg-transparent whitespace-nowrap leading-none transition-all duration-200 cursor-pointer ${
          isChildActive || isOpen
            ? "text-teal font-semibold"
            : "text-white/90 font-normal hover:text-teal hover:bg-teal/8"
        }`}
      >
        {route.label}
        <ChevronDownIconSvg isOpen={isOpen} />
      </button>

      <div
        role="menu"
        aria-label={`${route.label} mobile submenu`}
        className={`w-full overflow-hidden flex flex-col gap-1 transition-[max-height,opacity] duration-380 ease-out box-border static bg-transparent border-none shadow-none ${
          isOpen
            ? "max-h-[260px] opacity-100 visible pointer-events-auto pt-2 px-3 pb-1"
            : "max-h-0 opacity-0 invisible pointer-events-none p-0"
        }`}
      >
        {route.children?.map((child) => {
          const isItemActive =
            pathname === child.url || (child.url !== "/" && pathname.startsWith(child.url + "/"));
          return (
            <Link
              key={child.url}
              href={child.url}
              role="menuitem"
              onClick={onClose}
              className={`block w-full text-left px-3.5 py-2.5 text-[0.95rem] font-heading font-medium rounded-lg transition-all duration-200 no-underline box-border whitespace-nowrap cursor-pointer ${
                isItemActive
                  ? "!text-teal font-medium !bg-[#1c3657]"
                  : "text-white/85 hover:!text-teal hover:!bg-[#1c3657]"
              }`}
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
