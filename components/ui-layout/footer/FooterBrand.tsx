import React from "react";
import Link from "next/link";
import { FooterLayoutData } from "./footer-data";
import { FooterDesktopLogoSvg, FooterMobileLogoSvg } from "@ui-svg";

interface FooterBrandProps {
  logoDesktop?: string;
  logoMobile?: string;
  layoutData?: FooterLayoutData | null;
}

export function FooterBrand({ logoDesktop, logoMobile, layoutData }: FooterBrandProps) {
  const finalDesktopLogo = logoDesktop || layoutData?.FooterLogoDesktop;
  const finalMobileLogo = logoMobile || layoutData?.FooterLogoMobile;

  return (
    <Link
      href="/"
      aria-label="Arium Networks"
      className="inline-block no-underline shrink-0 text-center min-[601px]:text-left mx-auto min-[601px]:mx-0"
    >
      {/* Desktop Logo */}
      <span className="hidden min-[601px]:block">
        {finalDesktopLogo ? (
          <span
            dangerouslySetInnerHTML={{ __html: finalDesktopLogo }}
            className="inline-block [&>svg]:w-[160px] [&>svg]:h-auto [&>svg]:text-white"
          />
        ) : (
          <FooterDesktopLogoSvg />
        )}
      </span>

      {/* Mobile Logo */}
      <span className="block min-[601px]:hidden">
        {finalMobileLogo ? (
          <span
            dangerouslySetInnerHTML={{ __html: finalMobileLogo }}
            className="inline-block [&>svg]:w-[189px] [&>svg]:h-auto [&>svg]:text-white"
          />
        ) : (
          <FooterMobileLogoSvg />
        )}
      </span>
    </Link>
  );
}
