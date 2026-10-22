import React from "react";
import Link from "next/link";
import { FooterLayoutData } from "./footer-data";
import { FooterDesktopLogoSvg, FooterMobileLogoSvg } from "@ui-svg";

interface FooterBrandProps {
  layoutData?: FooterLayoutData | null;
}

export function FooterBrand({ layoutData }: FooterBrandProps) {
  return (
    <Link
      href="/"
      aria-label="Arium Networks"
      className="inline-block no-underline shrink-0 text-center min-[601px]:text-left mx-auto min-[601px]:mx-0"
    >
      {layoutData?.FooterLogoDesktop && layoutData?.FooterLogoMobile ? (
        <>
          <span
            dangerouslySetInnerHTML={{ __html: layoutData.FooterLogoDesktop }}
            className="footer-logo-desktop hidden min-[601px]:block [&>svg]:w-[160px] [&>svg]:h-auto [&>svg]:text-white"
          />
          <span
            dangerouslySetInnerHTML={{ __html: layoutData.FooterLogoMobile }}
            className="footer-logo-mobile block min-[601px]:hidden [&>svg]:w-[189px] [&>svg]:h-auto [&>svg]:text-white"
          />
        </>
      ) : (
        <>
          <FooterDesktopLogoSvg />
          <FooterMobileLogoSvg />
        </>
      )}
    </Link>
  );
}
