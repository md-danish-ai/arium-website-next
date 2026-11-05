"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";
import { Container } from "@ui-layout/SectionContainer";
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

// Pages whose hero background is light — nav must always be dark/solid
const LIGHT_HERO_PAGES = [
  "/contact",
  "/board-of-directors",
  "/leadership",
  "/right-of-ways",
  "/private-venues",
];

export function Navbar({ logoDesktop, logoMobile }: NewNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll to switch transparent / solid background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isLightHeroPage = LIGHT_HERO_PAGES.some(
    (p) => pathname === p || pathname?.startsWith(p + "/")
  );

  const isSolid = isScrolled || isLightHeroPage;

  return (
    <header
      id="main-nav"
      className={cn(
        "w-full fixed top-0 left-0 right-0 z-[100] text-white transition-[color,background-color,box-shadow] duration-300",
        isSolid
          ? "bg-[#162047]/95 backdrop-blur-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      )}
    >
      <Container
        as="nav"
        className="flex items-center justify-between py-3.5 min-[1280px]:py-4"
        aria-label="Main Navigation"
      >
        <NavbarLogo logoDesktop={logoDesktop} logoMobile={logoMobile} />
        <DesktopNavigation />
        <MobileNavigation logoDesktop={logoDesktop} logoMobile={logoMobile} />
      </Container>
    </header>
  );
}

export default Navbar;
