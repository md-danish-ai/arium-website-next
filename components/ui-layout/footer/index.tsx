"use client";

import React from "react";
import { FooterProps } from "./footer-data";
import { FooterBrand } from "./FooterBrand";
import { FooterSocialRow } from "./FooterSocialRow";
import { FooterLegalRow } from "./FooterLegalRow";
import { FooterCopyright } from "./FooterCopyright";

export default function Footer({ layoutData }: FooterProps) {
  return (
    <footer className="footer relative z-10 overflow-hidden min-h-[280px] flex items-center py-5 md:py-8 lg:py-0">
      <div className="container mx-auto px-6">
        <div className="footer-flex-row flex flex-col min-[601px]:flex-row items-center min-[601px]:items-start gap-8 min-[601px]:gap-15">
          <FooterBrand layoutData={layoutData} />

          <div className="footer-links-col flex-1 min-w-0 w-full min-[601px]:w-auto">
            <div className="footer-links-inner w-full min-[601px]:w-fit min-[601px]:ml-auto">
              <FooterSocialRow layoutData={layoutData} />

              <div className="border-t border-white/15 my-4" />

              <FooterLegalRow layoutData={layoutData} />

              <FooterCopyright copyright={layoutData?.Copyright} />
            </div>
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
