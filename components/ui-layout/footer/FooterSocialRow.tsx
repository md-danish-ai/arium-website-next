import React from "react";
import Link from "next/link";
import { FooterLayoutData, RawSocialLink } from "./footer-data";
import { FacebookIconSvg, LinkedInIconSvg, TwitterXIconSvg } from "./FooterSvgs";

interface FooterSocialRowProps {
  layoutData?: FooterLayoutData | null;
}

export function FooterSocialRow({ layoutData }: FooterSocialRowProps) {
  const contactLink = layoutData?.footerColumn?.footerLinks?.find(
    (link) => link.url === "/contact"
  );

  return (
    <div className="footer-social-row flex items-center justify-between pb-6 w-full px-5 min-[601px]:px-0">
      <Link
        href="/contact"
        className="text-white text-[0.95rem] no-underline hover:text-teal transition-colors"
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
              className="text-white flex p-1 -m-1 hover:text-teal transition-colors"
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
              className="text-white flex p-1 -m-1 hover:text-teal transition-colors"
            >
              <FacebookIconSvg />
            </a>
            <a
              href="https://www.linkedin.com/company/arium-networks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arium LinkedIn"
              className="text-white flex p-1 -m-1 hover:text-teal transition-colors"
            >
              <LinkedInIconSvg />
            </a>
            <a
              href="https://x.com/AriumNetworks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arium X"
              className="text-white flex p-1 -m-1 hover:text-teal transition-colors"
            >
              <TwitterXIconSvg />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
