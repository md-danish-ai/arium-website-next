"use client";

import React from "react";
import { FooterProps } from "./footer-data";
import { FooterBrand } from "./FooterBrand";
import { FooterSocialRow } from "./FooterSocialRow";
import { FooterLegalRow } from "./FooterLegalRow";
import { FooterCopyright } from "./FooterCopyright";

export default function Footer({ layoutData }: FooterProps) {
  return (
    <footer className="relative z-10 overflow-hidden min-h-[280px] flex items-center p-0">
      {/* Footer background illustration with gradient mask */}
      <div
        className="absolute inset-0 z-0 bg-[url('/assets/footer_art.png')] bg-center bg-cover bg-no-repeat opacity-15 mix-blend-lighten pointer-events-none [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)]"
        aria-hidden="true"
      />

      <div className="container relative z-1 w-full mx-auto px-6">
        <div className="flex flex-col min-[601px]:flex-row items-center min-[601px]:items-start gap-8 min-[601px]:gap-15">
          <FooterBrand layoutData={layoutData} />

          <div className="flex-1 min-w-0 w-full min-[601px]:w-auto">
            <div className="w-full min-[601px]:w-fit min-[601px]:ml-auto">
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
