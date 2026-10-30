"use client";

import React from "react";
import { NavRoute } from "../nav-routes";
import MobileNavItem from "./MobileNavItem";
import { HamburgerIcon } from "./NavbarSvgs";

interface MobileNavProps {
  routes: NavRoute[];
  pathname: string;
  isMobileOpen: boolean;
  onToggleMobile: (e: React.MouseEvent) => void;
  onCloseMobile: () => void;
  openDropdown: string | null;
  onToggleDropdown: (id: string, e: React.MouseEvent) => void;
}

export default function MobileNav({
  routes,
  pathname,
  isMobileOpen,
  onToggleMobile,
  onCloseMobile,
  openDropdown,
  onToggleDropdown,
}: MobileNavProps) {
  return (
    <>
      {/* Mobile Hamburger Toggle Button */}
      <button
        type="button"
        className="block min-[1080px]:hidden bg-transparent border-none cursor-pointer p-3 min-w-[44px] min-h-[44px] -mr-2 z-[51] pointer-events-auto focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-4 focus-visible:rounded"
        id="nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isMobileOpen}
        onClick={onToggleMobile}
      >
        <HamburgerIcon isOpen={isMobileOpen} />
      </button>

      {/* Mobile Drawer */}
      <nav
        aria-label="Mobile navigation"
        id="nav-links"
        className={`fixed top-0 bottom-0 h-screen w-[300px] bg-[#101836]/[0.985] backdrop-blur-[25px] flex flex-col justify-start items-start pt-[100px] px-6 pb-10 gap-2 overflow-y-auto shadow-[-10px_0_30px_rgba(0,0,0,0.25)] transition-[right] duration-300 z-40 pointer-events-auto min-[1080px]:hidden ${
          isMobileOpen ? "right-0" : "-right-full"
        }`}
      >
        {routes.map((route) => (
          <MobileNavItem
            key={route.id || route.label}
            route={route}
            pathname={pathname}
            openDropdown={openDropdown}
            onToggleDropdown={onToggleDropdown}
            onClose={onCloseMobile}
          />
        ))}
      </nav>
    </>
  );
}
