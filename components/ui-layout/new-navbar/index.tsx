"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";
import { NavbarLogo } from "./navbar-logo";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export interface NewNavbarProps {
  logoDesktop?: string;
  logoMobile?: string;
  routes?: unknown;
  layoutData?: unknown;
  [key: string]: unknown;
}

export function Navbar({ logoDesktop, logoMobile }: NewNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const navBarBg =
    isHome && !isScrolled
      ? "bg-transparent"
      : "bg-[#162047]/95 backdrop-blur-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.15)]";
  const navBarPos = isHome ? "fixed" : "sticky";

  return (
    <header
      className={cn(
        "w-full inset-x-0 top-0 z-50 text-white transition-all duration-300",
        navBarPos,
        navBarBg
      )}
    >
      <nav
        className="flex w-full items-center justify-between px-5 sm:px-6 md:px-8 lg:px-12 xl:px-[138px] max-w-[1920px] mx-auto py-3.5 min-[1280px]:py-4"
        aria-label="Main Navigation"
      >
        <NavbarLogo logoDesktop={logoDesktop} logoMobile={logoMobile} />
        <DesktopNavigation />
        <MobileNavigation logoDesktop={logoDesktop} logoMobile={logoMobile} />
      </nav>
    </header>
  );
}

export default Navbar;
