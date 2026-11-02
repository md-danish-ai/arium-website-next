import React from "react";
import { FooterLinkItem, DEFAULT_LEGAL_LINKS } from "./footer-data";

interface FooterLegalRowProps {
  legalLinks?: FooterLinkItem[];
  variant?: "column" | "wrapped";
}

export function FooterLegalRow({
  legalLinks = DEFAULT_LEGAL_LINKS,
  variant = "column",
}: FooterLegalRowProps) {
  const linksToRender = legalLinks && legalLinks.length > 0 ? legalLinks : DEFAULT_LEGAL_LINKS;

  if (variant === "wrapped") {
    return (
      <nav
        aria-label="Legal links"
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center"
      >
        {linksToRender.map((link, idx: number) => (
          <a
            key={link.id ?? link.name ?? idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-teal text-xs sm:text-sm font-normal no-underline transition-colors whitespace-nowrap"
          >
            {link.name}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="Legal links" className="flex flex-col space-y-3.5">
      {linksToRender.map((link, idx: number) => (
        <a
          key={link.id ?? link.name ?? idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-teal text-sm md:text-base font-normal no-underline transition-colors leading-normal"
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
}
