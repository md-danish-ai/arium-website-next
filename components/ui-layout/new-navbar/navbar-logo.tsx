"use client";

import React from "react";
import Link from "next/link";
import { DesktopLogoSvg, MobileLogoSvg } from "@ui-svg";

interface NavbarLogoProps {
  logoDesktop?: string;
  logoMobile?: string;
  onClick?: () => void;
}

export function NavbarLogo({ logoDesktop, logoMobile, onClick }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center shrink-0 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-md"
      aria-label="Arium Networks Home"
    >
      {logoDesktop && logoMobile ? (
        <>
          <span
            dangerouslySetInnerHTML={{ __html: logoDesktop }}
            className="hidden min-[1080px]:block [&>svg]:w-[126px] [&>svg]:min-[1080px]:max-h-[800px]:w-[120px] [&>svg]:min-[1280px]:w-[132px] [&>svg]:xl:w-[162px] [&>svg]:h-auto [&>svg]:text-white"
          />
          <span
            dangerouslySetInnerHTML={{ __html: logoMobile }}
            className="block min-[1080px]:hidden [&>svg]:w-[160px] [&>svg]:h-auto [&>svg]:text-white"
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
  );
}

export default NavbarLogo;
