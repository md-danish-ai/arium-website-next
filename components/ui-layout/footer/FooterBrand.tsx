import React from "react";
import Link from "next/link";
import { FooterLayoutData } from "./footer-data";
import { FooterDesktopLogoSvg, FooterMobileLogoSvg } from "./FooterSvgs";

interface FooterBrandProps {
  layoutData?: FooterLayoutData | null;
}

export function FooterBrand({ layoutData }: FooterBrandProps) {
  return (
    <Link href="/" aria-label="Arium Networks" className="inline-block no-underline shrink-0 pt-1">
      {layoutData?.FooterLogoDesktop && layoutData?.FooterLogoMobile ? (
        <>
          <span
            dangerouslySetInnerHTML={{ __html: layoutData.FooterLogoDesktop }}
            className="footer-logo-desktop hidden min-[1080px]:block [&>svg]:w-[160px] [&>svg]:h-auto [&>svg]:text-white"
          />
          <span
            dangerouslySetInnerHTML={{ __html: layoutData.FooterLogoMobile }}
            className="footer-logo-mobile block min-[1080px]:hidden [&>svg]:w-[189px] [&>svg]:h-auto [&>svg]:text-white"
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
