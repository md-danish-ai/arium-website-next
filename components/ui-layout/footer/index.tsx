"use client";

import React from "react";
import { FooterProps } from "./footer-data";
import { FooterBrand } from "./FooterBrand";
import { FooterSocialRow } from "./FooterSocialRow";
import { FooterLegalRow } from "./FooterLegalRow";
import { FooterCopyright } from "./FooterCopyright";
import { Container } from "@ui-layout/SectionContainer";

export default function Footer({
  contactLink,
  socialLinks,
  legalLinks,
  copyright,
  address,
  contact_number,
  contact_number_display,
  logoDesktop,
  logoMobile,
}: FooterProps) {
  return (
    <footer className="relative z-10 bg-midnight text-white pt-10 md:pt-16 lg:pt-20 pb-8 md:pb-10 overflow-hidden">
      <Container className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 lg:gap-16">
          <FooterBrand logoDesktop={logoDesktop} logoMobile={logoMobile} />

          <div className="w-full md:w-auto">
            <div className="hidden md:grid grid-cols-2 gap-8 md:gap-10 lg:gap-20 xl:gap-32 w-auto">
              <FooterLegalRow legalLinks={legalLinks} variant="column" />
              <FooterSocialRow
                contactLink={contactLink}
                address={address}
                contact_number={contact_number}
                contact_number_display={contact_number_display}
                socialLinks={socialLinks}
              />
            </div>

            <div className="block md:hidden w-full">
              <FooterSocialRow
                contactLink={contactLink}
                address={address}
                contact_number={contact_number}
                contact_number_display={contact_number_display}
                socialLinks={socialLinks}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mt-8 md:mt-12 lg:mt-16 mb-6 md:mb-8" />

        <div className="flex flex-col items-center gap-5 md:hidden">
          <FooterLegalRow legalLinks={legalLinks} variant="wrapped" />
          <FooterCopyright copyright={copyright} className="text-center" />
        </div>

        <div className="hidden md:flex justify-end items-center">
          <FooterCopyright copyright={copyright} className="text-right" />
        </div>
      </Container>
    </footer>
  );
}

export * from "./footer-data";
export * from "./FooterBrand";
export * from "./FooterSocialRow";
export * from "./FooterLegalRow";
export * from "./FooterCopyright";
