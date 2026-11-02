import React from "react";
import Link from "next/link";
import { FooterDesktopLogoSvg, FooterMobileLogoSvg } from "@ui-svg";

interface FooterBrandProps {
  logoDesktop?: string;
  logoMobile?: string;
}

export function FooterBrand({ logoDesktop, logoMobile }: FooterBrandProps) {
  return (
    <Link
      href="/"
      aria-label="Arium Networks"
      className="inline-block no-underline shrink-0 text-center min-[601px]:text-left mx-auto min-[601px]:mx-0"
    >
      <span className="hidden min-[601px]:block">
        {logoDesktop ? (
          <span
            dangerouslySetInnerHTML={{ __html: logoDesktop }}
            className="inline-block [&>svg]:w-[160px] [&>svg]:h-auto [&>svg]:text-white"
          />
        ) : (
          <FooterDesktopLogoSvg />
        )}
      </span>

      <span className="block min-[601px]:hidden">
        {logoMobile ? (
          <span
            dangerouslySetInnerHTML={{ __html: logoMobile }}
            className="inline-block [&>svg]:w-[189px] [&>svg]:h-auto [&>svg]:text-white"
          />
        ) : (
          <FooterMobileLogoSvg />
        )}
      </span>
    </Link>
  );
}
