import React from "react";
import { FooterLinkItem, DEFAULT_LEGAL_LINKS } from "./footer-data";

interface FooterLegalRowProps {
  legalLinks?: FooterLinkItem[];
}

export function FooterLegalRow({ legalLinks = DEFAULT_LEGAL_LINKS }: FooterLegalRowProps) {
  const linkClass =
    "relative inline-block text-white/75 hover:text-white text-[0.78rem] font-body whitespace-nowrap no-underline transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-teal after:transition-all after:duration-300 hover:after:w-full";

  const linksToRender = legalLinks && legalLinks.length > 0 ? legalLinks : DEFAULT_LEGAL_LINKS;

  return (
    <div className="flex flex-wrap xl:flex-nowrap items-center justify-center min-[601px]:justify-start gap-x-5 md:gap-x-6 xl:gap-x-7 gap-y-2.5 pt-1 text-center min-[601px]:text-left">
      {linksToRender.map((link, idx: number) => (
        <a
          key={link.id ?? link.name ?? idx}
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
