"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";
import { allNavItems } from "./navigation-data";
import ChevronDownIconSvg from "@ui-svg/ChevronDownIconSvg";

export function DesktopNavigation() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenGroup(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenGroup(null);
    }, 150);
  };

  const handleToggle = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      className="hidden min-[1080px]:flex items-center gap-1 xl:gap-2 cursor-default select-none"
      aria-label="Desktop Navigation"
    >
      {allNavItems.map((item) => {
        if (item.type === "group") {
          const isGroupActive = item.links.some(
            (link) => pathname === link.href || pathname.startsWith(link.href + "/")
          );
          const isOpen = openGroup === item.label;

          return (
            <div
              key={item.label}
              className="relative cursor-default"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Trigger: Normal cursor-default, text hover only (no pill background) */}
              <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                onClick={() => handleToggle(item.label)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 min-[1280px]:py-2.5 xl:px-5 text-[0.85rem] xl:text-sm font-heading rounded-full border border-transparent transition-all duration-200 cursor-default bg-transparent select-none",
                  isGroupActive || isOpen
                    ? "text-teal font-semibold"
                    : "text-white font-normal hover:text-teal"
                )}
              >
                <span>{item.label}</span>
                <ChevronDownIconSvg isOpen={isOpen} />
              </button>

              {/* Dropdown Menu Container: Normal cursor-default on background & padding */}
              <div
                role="menu"
                aria-label={`${item.label} submenu`}
                className={cn(
                  "absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[360px] cursor-default select-none",
                  "bg-[#162047]/98 backdrop-blur-[16px] border border-teal/20 rounded-[16px]",
                  "shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,232,217,0.1)] p-2.5 flex flex-col gap-1 z-50",
                  "transition-all duration-250 ease-out origin-top",
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
                )}
              >
                <ul className="w-full flex flex-col gap-1 m-0 p-0 list-none cursor-default">
                  {item.links.map((link) => {
                    const Icon = link.icon;
                    const isLinkActive = pathname === link.href;

                    return (
                      <li key={link.href} className="group list-none cursor-default">
                        {/* ONLY the Link item inside the menu has cursor-pointer */}
                        <Link
                          href={link.href}
                          role="menuitem"
                          onClick={() => setOpenGroup(null)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer no-underline box-border",
                            isLinkActive
                              ? "text-teal bg-teal/10 font-semibold"
                              : "text-white hover:text-teal hover:bg-teal/10"
                          )}
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.75}
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 shrink-0 transition-colors pointer-events-none",
                              isLinkActive ? "text-teal" : "text-white/60 group-hover:text-teal"
                            )}
                          />
                          <div className="flex flex-col items-start gap-0.5 pointer-events-none">
                            <span
                              className={cn(
                                "font-heading text-sm font-medium leading-none transition-colors",
                                isLinkActive
                                  ? "text-teal font-semibold"
                                  : "text-white group-hover:text-teal"
                              )}
                            >
                              {link.title}
                            </span>
                            <span className="line-clamp-2 text-xs text-white/70 transition-colors group-hover:text-teal/80">
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

        // Direct Nav Buttons: "Our Solutions", "Your Community", "Careers"
        // These 3 buttons have cursor-pointer and teal pill hover/active state
        const isLinkActive = pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center px-4 py-2 min-[1280px]:py-2.5 xl:px-5 text-[0.85rem] xl:text-sm font-heading rounded-full border border-transparent transition-all duration-200 cursor-pointer whitespace-nowrap",
              isLinkActive
                ? "bg-teal text-[#162047] font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                : "text-white font-normal hover:bg-teal hover:text-[#162047] hover:font-semibold"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default DesktopNavigation;
