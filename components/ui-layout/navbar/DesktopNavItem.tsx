"use client";

import React from "react";
import Link from "next/link";
import { NavRoute } from "../nav-routes";
import { ChevronDownIcon } from "./NavbarSvgs";

interface DesktopNavItemProps {
  route: NavRoute;
  pathname: string;
  openDropdown: string | null;
  onToggleDropdown: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

export default function DesktopNavItem({
  route,
  pathname,
  openDropdown,
  onToggleDropdown,
  onClose,
}: DesktopNavItemProps) {
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
        className={`inline-flex items-center justify-start gap-1.5 px-4 py-3.5 min-[1280px]:px-4 min-[1280px]:py-4 xl:px-5 xl:py-3.5 text-[0.84rem] min-[1280px]:text-[0.86rem] xl:text-sm font-heading rounded-2xl border border-transparent whitespace-nowrap leading-none transition-all duration-200 cursor-pointer ${
          isCurrentActive
            ? "text-teal font-semibold bg-transparent hover:!text-[#162047] hover:bg-teal hover:border-teal/60 hover:font-bold"
            : "text-white font-normal hover:!text-[#162047] hover:bg-teal hover:border-teal/60 hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:font-bold"
        }`}
      >
        {route.label}
      </Link>
    );
  }

  return (
    <div
      className="relative z-50 inline-flex flex-col items-center leading-none"
      id={`desktop-dropdown-${dropId}`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={(e) => onToggleDropdown(dropId, e)}
        className={`inline-flex items-center justify-start gap-1.5 px-4 py-3.5 min-[1280px]:px-4 min-[1280px]:py-4 xl:px-5 xl:py-3.5 text-[0.84rem] min-[1280px]:text-[0.86rem] xl:text-sm font-heading rounded-full border border-transparent bg-transparent whitespace-nowrap leading-none transition-all duration-200 cursor-pointer ${
          isChildActive || isOpen
            ? "text-teal font-semibold"
            : "text-white font-normal hover:bg-transparent hover:text-teal hover:font-bold"
        }`}
      >
        {route.label}
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      <div
        role="menu"
        aria-label={`${route.label} submenu`}
        className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-[220px] w-max bg-[#162047]/98 backdrop-blur-[12px] border border-teal/20 rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,232,217,0.1)] p-3 pt-4 flex flex-col gap-1 transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none p-0"
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
              className={`block w-full text-left px-4 py-3 text-[0.95rem] font-heading font-medium rounded-lg transition-all duration-200 no-underline box-border whitespace-nowrap cursor-pointer ${
                isItemActive
                  ? "!text-teal !bg-teal/10"
                  : "text-white hover:!text-teal hover:!bg-teal/10"
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
