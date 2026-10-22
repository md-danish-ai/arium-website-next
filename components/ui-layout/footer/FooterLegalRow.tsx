import React from "react";
import { FooterLayoutData, RawFooterLink, DEFAULT_LEGAL_LINKS } from "./footer-data";

interface FooterLegalRowProps {
  layoutData?: FooterLayoutData | null;
}

export function FooterLegalRow({ layoutData }: FooterLegalRowProps) {
  const dynamicLinks = layoutData?.footerColumn?.footerLinks?.filter(
    (link) => link.url !== "/contact"
  );

  const hasDynamicLinks = Boolean(dynamicLinks && dynamicLinks.length > 0);

  const linkClass =
    "relative inline-block text-white/75 text-[0.78rem] whitespace-nowrap no-underline hover:text-white transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-teal after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="flex flex-wrap items-center justify-center min-[601px]:justify-start gap-x-[clamp(20px,4vw,32px)] md:gap-x-9 gap-y-3 pt-4.5 md:pt-6 text-center min-[601px]:text-left">
      {hasDynamicLinks && dynamicLinks
        ? dynamicLinks.map((link: RawFooterLink, idx: number) => (
            <a
              key={link.id ?? idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.name}
            </a>
          ))
        : DEFAULT_LEGAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.name}
            </a>
          ))}
    </div>
  );
}
