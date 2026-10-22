import React from "react";
import Link from "next/link";
import { FooterLayoutData, RawSocialLink } from "./footer-data";
import { FacebookIconSvg, LinkedInIconSvg, TwitterXIconSvg } from "@ui-svg";

interface FooterSocialRowProps {
  layoutData?: FooterLayoutData | null;
}

export function FooterSocialRow({ layoutData }: FooterSocialRowProps) {
  const contactLink = layoutData?.footerColumn?.footerLinks?.find(
    (link) => link.url === "/contact"
  );

  const socialLinkClass =
    "relative flex items-center p-1 -m-1 text-white hover:text-teal transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-teal after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="flex items-center justify-between w-full pb-1">
      <Link
        href="/contact"
        className="relative inline-block text-white text-[1rem] font-body no-underline hover:text-teal transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-teal after:transition-all after:duration-300 hover:after:w-full"
      >
        {contactLink?.name || "Contact Us"}
      </Link>

      <div className="flex items-center gap-[18px]">
        {layoutData?.socialLinks && layoutData.socialLinks.length > 0 ? (
          layoutData.socialLinks.map((social: RawSocialLink, idx: number) => (
            <a
              key={social.id ?? idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Arium ${social.Platform || "Social"}`}
              className={socialLinkClass}
            >
              {social.icon ? (
                <span
                  dangerouslySetInnerHTML={{ __html: social.icon }}
                  className="flex items-center"
                />
              ) : null}
            </a>
          ))
        ) : (
          <>
            <a
              href="https://www.facebook.com/AriumNetworks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arium Facebook"
              className={socialLinkClass}
            >
              <FacebookIconSvg />
            </a>
            <a
              href="https://www.linkedin.com/company/arium-networks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arium LinkedIn"
              className={socialLinkClass}
            >
              <LinkedInIconSvg />
            </a>
            <a
              href="https://x.com/AriumNetworks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arium X"
              className={socialLinkClass}
            >
              <TwitterXIconSvg />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
