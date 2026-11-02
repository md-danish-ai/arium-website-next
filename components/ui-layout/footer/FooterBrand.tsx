import React from "react";
import Link from "next/link";
import { FooterDesktopLogoSvg, FooterMobileLogoSvg } from "@ui-svg";

interface FooterBrandProps {
  logoDesktop?: string;
  logoMobile?: string;
}

export function FooterBrand({ logoDesktop, logoMobile }: FooterBrandProps) {
  return (
    <div className="flex justify-center md:justify-start w-full md:w-auto">
      <Link
        href="/"
        aria-label="Arium Networks"
        className="inline-block no-underline shrink-0"
      >

        <span className="hidden md:block">
          {logoDesktop ? (
            <span
              dangerouslySetInnerHTML={{ __html: logoDesktop }}
              className="inline-block [&>svg]:w-[150px] lg:[&>svg]:w-[185px] [&>svg]:h-auto [&>svg]:text-white"
            />
          ) : (
            <FooterDesktopLogoSvg className="w-[150px] lg:w-[185px] h-auto text-white" />
          )}
        </span>

        {/* Mobile Logo (single-line horizontal: Arium Networks) */}
        <span className="block md:hidden">
          {logoMobile ? (
            <span
              dangerouslySetInnerHTML={{ __html: logoMobile }}
              className="inline-block [&>svg]:w-[200px] sm:[&>svg]:w-[230px] [&>svg]:h-auto [&>svg]:text-white"
            />
          ) : (
            <FooterMobileLogoSvg className="w-[200px] sm:w-[230px] h-auto text-white" />
          )}
        </span>
      </Link>
    </div>
  );
}
