import React from "react";
import Link from "next/link";
import {
  FooterLinkItem,
  SocialLinkItem,
  DEFAULT_CONTACT_LINK,
  DEFAULT_SOCIAL_LINKS,
} from "./footer-data";
import { FacebookIconSvg, LinkedInIconSvg, TwitterXIconSvg } from "@ui-svg";

interface FooterSocialRowProps {
  contactLink?: FooterLinkItem;
  socialLinks?: SocialLinkItem[];
}

export function FooterSocialRow({
  contactLink = DEFAULT_CONTACT_LINK,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: FooterSocialRowProps) {
  const socialLinkClass =
    "relative flex items-center p-1 -m-1 text-white hover:text-teal transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-teal after:transition-all after:duration-300 hover:after:w-full";

  const itemsToRender = socialLinks && socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL_LINKS;

  return (
    <div className="flex items-center justify-between w-full pb-1">
      <Link
        href={contactLink.url}
        className="relative inline-block text-white text-[1rem] font-body no-underline hover:text-teal transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-teal after:transition-all after:duration-300 hover:after:w-full"
      >
        {contactLink.name}
      </Link>

      <div className="flex items-center gap-[18px]">
        {itemsToRender.map((social: SocialLinkItem, idx: number) => (
          <a
            key={social.id ?? idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Arium ${social.platform || "Social"}`}
            className={socialLinkClass}
          >
            {social.iconHtml ? (
              <span
                dangerouslySetInnerHTML={{ __html: social.iconHtml }}
                className="flex items-center"
              />
            ) : social.platform === "Facebook" ? (
              <FacebookIconSvg />
            ) : social.platform === "LinkedIn" ? (
              <LinkedInIconSvg />
            ) : (
              <TwitterXIconSvg />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
