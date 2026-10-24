"use client";

import React from "react";
import { FooterProps } from "./footer-data";
import { FooterBrand } from "./FooterBrand";
import { FooterSocialRow } from "./FooterSocialRow";
import { FooterLegalRow } from "./FooterLegalRow";
import { FooterCopyright } from "./FooterCopyright";

export default function Footer({
  contactLink,
  socialLinks,
  legalLinks,
  copyright,
  logoDesktop,
  logoMobile,
  layoutData,
}: FooterProps) {
  return (
    <footer className="relative z-10 bg-midnight text-white py-10 md:py-14 overflow-hidden">
      <div className="container relative z-[2] w-full">
        <div className="flex flex-col min-[601px]:flex-row items-center min-[601px]:items-start justify-between gap-8 min-[601px]:gap-12 md:gap-16">
          <FooterBrand logoDesktop={logoDesktop} logoMobile={logoMobile} layoutData={layoutData} />

          <div className="w-full min-[601px]:w-auto min-[601px]:max-w-[700px] min-[601px]:ml-auto">
            <FooterSocialRow
              contactLink={contactLink}
              socialLinks={socialLinks}
              layoutData={layoutData}
            />

            <div className="w-full h-px bg-white/15 my-4 md:my-5" />

            <FooterLegalRow legalLinks={legalLinks} layoutData={layoutData} />

            <FooterCopyright copyright={copyright || layoutData?.Copyright} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export * from "./footer-data";
export * from "./FooterSvgs";
export * from "./FooterBrand";
export * from "./FooterSocialRow";
export * from "./FooterLegalRow";
export * from "./FooterCopyright";
