"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNormalizedNavRoutes, RawNavigationItem } from "../nav-routes";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { DesktopLogoSvg, MobileLogoSvg } from "@ui-svg";

export interface NavbarLayoutData {
  logoDesktop?: string;
  logoMobile?: string;
  navigation?: RawNavigationItem[];
  [key: string]: unknown;
}

export interface NavbarProps {
  layoutData?: NavbarLayoutData | null;
}

export default function Navbar({ layoutData }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Normalize navigation routes (supports Strapi CMS or static fallback)
  const routes = getNormalizedNavRoutes(layoutData?.navigation);

  // Track window scroll to switch transparent / solid background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns and mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Trap focus and handle Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (!navRef.current) return;
          const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        } else if (e.key === "Escape") {
          setIsMobileOpen(false);
          setOpenDropdown(null);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Pages whose hero background is light — nav must always be dark
  const LIGHT_HERO_PAGES = [
    "/contact",
    "/board-of-directors",
    "/leadership",
    "/right-of-ways",
    "/private-venues",
  ];
  const isLightHeroPage = LIGHT_HERO_PAGES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  const navClasses = [
    "w-full fixed top-0 left-0 right-0 z-50 text-white transition-[color,background-color,box-shadow] duration-300",
    isScrolled || isLightHeroPage
      ? "bg-[#162047]/95 backdrop-blur-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
      : "bg-transparent",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navClasses} id="main-nav" ref={navRef}>
      <div className="flex items-center justify-between w-full px-[var(--gutter)] min-[1080px]:px-[var(--frame-edge)] py-3.5 min-[1080px]:py-3.5 min-[1280px]:py-4 xl:py-5 min-[1080px]:max-h-[800px]:py-2.5 box-border">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 pointer-events-auto"
          aria-label="Arium Networks Home"
          onClick={closeMobileMenu}
        >
          {layoutData?.logoDesktop && layoutData?.logoMobile ? (
            <>
              <span
                dangerouslySetInnerHTML={{ __html: layoutData.logoDesktop }}
                className="hidden min-[1080px]:block [&>svg]:w-[126px] [&>svg]:min-[1080px]:max-h-[800px]:w-[120px] [&>svg]:min-[1280px]:w-[132px] [&>svg]:xl:w-[162px] [&>svg]:h-auto [&>svg]:text-white"
              />
              <span
                dangerouslySetInnerHTML={{ __html: layoutData.logoMobile }}
                className="block min-[1080px]:hidden [&>svg]:w-[189px] [&>svg]:h-auto [&>svg]:text-white"
              />
            </>
          ) : (
            <>
              <span className="hidden min-[1080px]:block">
                <DesktopLogoSvg />
              </span>
              <span className="block min-[1080px]:hidden">
                <MobileLogoSvg />
              </span>
            </>
          )}
        </Link>

        {/* Mobile Navigation (Drawer & Toggle) */}
        <MobileNav
          routes={routes}
          pathname={pathname}
          isMobileOpen={isMobileOpen}
          onToggleMobile={toggleMobileMenu}
          onCloseMobile={closeMobileMenu}
          openDropdown={openDropdown}
          onToggleDropdown={toggleDropdown}
        />

        {/* Desktop Navigation */}
        <DesktopNav
          routes={routes}
          pathname={pathname}
          openDropdown={openDropdown}
          onToggleDropdown={toggleDropdown}
          onCloseDropdown={() => setOpenDropdown(null)}
        />
      </div>
    </header>
  );
}
