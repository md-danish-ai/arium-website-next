import React from "react";
import Link from "next/link";
import {
  FooterLinkItem,
  SocialLinkItem,
  DEFAULT_CONTACT_LINK,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_FOOTER_DATA,
} from "./footer-data";
import { FacebookIconSvg, LinkedInIconSvg, TwitterXIconSvg } from "@ui-svg";

interface FooterSocialRowProps {
  contactLink?: FooterLinkItem;
  address?: string;
  contact_number?: string;
  contact_number_display?: string;
  socialLinks?: SocialLinkItem[];
}

export function FooterSocialRow({
  contactLink = DEFAULT_CONTACT_LINK,
  address = DEFAULT_FOOTER_DATA.address,
  contact_number = DEFAULT_FOOTER_DATA.contact_number,
  contact_number_display = DEFAULT_FOOTER_DATA.contact_number_display,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: FooterSocialRowProps) {
  const addressLines = (address || DEFAULT_FOOTER_DATA.address)
    .replace(/<br\s*\/?>/gi, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const cleanPhone = (contact_number || DEFAULT_FOOTER_DATA.contact_number).replace(/[^0-9+]/g, "");
  const displayPhone = (
    contact_number_display || DEFAULT_FOOTER_DATA.contact_number_display
  ).trim();

  const itemsToRender = socialLinks && socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL_LINKS;

  const renderSocialIcons = () => (
    <div className="flex items-center gap-4">
      {itemsToRender.map((social, idx) => (
        <a
          key={social.id ?? idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Arium ${social.platform || "Social"}`}
          className="text-white hover:text-teal transition-colors p-1 -m-1 inline-flex items-center"
        >
          {social.iconHtml ? (
            <span
              dangerouslySetInnerHTML={{ __html: social.iconHtml }}
              className="inline-flex items-center [&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:fill-current"
            />
          ) : social.platform === "Facebook" ? (
            <FacebookIconSvg width="18" height="18" />
          ) : social.platform === "LinkedIn" ? (
            <LinkedInIconSvg width="18" height="18" />
          ) : (
            <TwitterXIconSvg width="18" height="18" />
          )}
        </a>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* On mobile (<md): Contact Us and Social icons on the same row */}
      <div className="flex items-center justify-between w-full">
        <Link
          href={contactLink.url || "/contact"}
          className="text-white text-lg md:text-xl font-bold tracking-tight hover:text-teal transition-colors no-underline block"
        >
          {contactLink.name || "Contact Us"}
        </Link>
        {/* Mobile social icons */}
        <div className="md:hidden">{renderSocialIcons()}</div>
      </div>

      {/* Address */}
      <div className="text-white/70 text-sm md:text-base leading-relaxed space-y-0.5">
        {addressLines.map((line, idx) => (
          <p key={idx} className="m-0">
            {line}
          </p>
        ))}
      </div>

      {/* Phone */}
      <div className="pt-1">
        <a
          href={`tel:${cleanPhone}`}
          className="text-white font-bold text-base md:text-lg hover:text-teal transition-colors no-underline inline-block"
        >
          {displayPhone}
        </a>
      </div>

      {/* Desktop & Tablet social icons (below phone) */}
      <div className="hidden md:block pt-1">{renderSocialIcons()}</div>
    </div>
  );
}
