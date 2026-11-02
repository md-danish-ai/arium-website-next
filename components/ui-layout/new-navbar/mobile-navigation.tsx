"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarLogo } from "./navbar-logo";
import { cn } from "@lib/utils";
import { allNavItems } from "./navigation-data";
import ChevronDownIconSvg from "@ui-svg/ChevronDownIconSvg";

interface MobileNavigationProps {
  logoDesktop?: string;
  logoMobile?: string;
}

export function MobileNavigation({ logoDesktop, logoMobile }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const pathname = usePathname();

  function closeMenu() {
    setOpen(false);
  }

  // Close menu and collapse groups whenever page route changes (recommended React pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setExpandedGroup(null);
  }

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <div className="min-[1080px]:hidden">
      {/* Animated Colorful Hamburger / Cross Button - always visible at z-[60] */}
      <button
        type="button"
        className="relative z-[60] inline-flex flex-col items-center justify-center size-11 p-2 rounded-xl text-teal hover:bg-white/10 transition-colors cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal -mr-1"
        id="nav-toggle"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span
          className={cn(
            "block w-5 h-[2.5px] bg-teal my-[3px] rounded-[2px] transition-all duration-300 origin-center",
            open && "translate-y-[5.5px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block w-5 h-[2.5px] bg-teal my-[3px] rounded-[2px] transition-all duration-300",
            open ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        />
        <span
          className={cn(
            "block w-5 h-[2.5px] bg-teal my-[3px] rounded-[2px] transition-all duration-300 origin-center",
            open && "-translate-y-[5.5px] -rotate-45"
          )}
        />
      </button>

      {/* Smooth Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/75 backdrop-blur-[4px] transition-opacity duration-300 ease-out",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Smooth Sliding Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
        className={cn(
          "fixed top-0 bottom-0 right-0 h-screen w-[min(88vw,360px)] bg-[#101836]/[0.985] backdrop-blur-[25px] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-50 flex flex-col justify-start items-stretch p-0 text-white select-none transition-transform duration-300 ease-out",
          open ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        )}
      >
        {/* Drawer Header: Logo aligned with the toggle button */}
        <div className="border-b border-white/10 px-6 py-3.5 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center">
            <NavbarLogo logoDesktop={logoDesktop} logoMobile={logoMobile} onClick={closeMenu} />
          </div>
          {/* Spacer to balance the toggle button that sits at z-[60] in top-right */}
          <div className="size-11" aria-hidden="true" />
        </div>

        {/* Drawer Navigation List */}
        <nav aria-label="Mobile navigation" className="px-4 py-4 overflow-y-auto flex-1">
          <div className="flex flex-col gap-1.5">
            {allNavItems.map((item) => {
              if (item.type === "group") {
                const isExpanded = expandedGroup === item.label;
                const isGroupActive = item.links.some(
                  (link) => pathname === link.href || pathname.startsWith(link.href + "/")
                );

                return (
                  <div
                    key={item.label}
                    className={cn(
                      "w-full rounded-xl transition-all duration-200",
                      isExpanded ? "bg-white/[0.04]" : ""
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedGroup(isExpanded ? null : item.label)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-left font-heading text-[1.05rem] rounded-xl transition-all duration-200 cursor-pointer bg-transparent border-none",
                        isGroupActive || isExpanded
                          ? "text-teal font-semibold bg-teal/5"
                          : "text-white/90 font-normal hover:text-teal hover:bg-teal/8"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDownIconSvg isOpen={isExpanded} />
                    </button>

                    {/* Smooth accordion container */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-out",
                        isExpanded
                          ? "max-h-[340px] opacity-100 visible pt-1 pb-2"
                          : "max-h-0 opacity-0 invisible"
                      )}
                    >
                      <ul className="space-y-1 pl-3 pr-2 m-0 list-none">
                        {item.links.map((link) => {
                          const Icon = link.icon;
                          const isLinkActive = pathname === link.href;

                          return (
                            <li key={link.href} className="list-none">
                              <Link
                                href={link.href}
                                onClick={closeMenu}
                                className={cn(
                                  "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer text-white group",
                                  isLinkActive
                                    ? "text-teal font-medium bg-[#1c3657]"
                                    : "text-white/85 hover:text-teal hover:bg-[#1c3657]"
                                )}
                              >
                                <Icon
                                  size={16}
                                  className={cn(
                                    "mt-0.5 shrink-0 transition-colors pointer-events-none",
                                    isLinkActive
                                      ? "text-teal"
                                      : "text-white/60 group-hover:text-teal"
                                  )}
                                />
                                <div className="flex flex-col items-start gap-0.5 pointer-events-none">
                                  <span
                                    className={cn(
                                      "block text-sm font-heading font-medium transition-colors",
                                      isLinkActive
                                        ? "text-teal font-medium"
                                        : "group-hover:text-teal"
                                    )}
                                  >
                                    {link.title}
                                  </span>
                                  <span className="block text-xs text-white/65 line-clamp-1 transition-colors group-hover:text-teal/80">
                                    {link.description}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }

              // Direct Links ("Our Solutions", "Your Community", "Careers")
              const isLinkActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <div key={item.href} className="w-full">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left font-heading text-[1.05rem] rounded-xl transition-all duration-200 cursor-pointer",
                      isLinkActive
                        ? "bg-teal text-[#162047] font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                        : "text-white/90 font-normal hover:bg-teal hover:text-[#162047] hover:font-semibold"
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MobileNavigation;
