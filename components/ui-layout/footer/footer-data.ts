import {
  FooterLinkItem,
  SocialLinkItem,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_LINK,
} from "@data/navigation.data";

export type { FooterLinkItem, SocialLinkItem };
export { DEFAULT_LEGAL_LINKS, DEFAULT_SOCIAL_LINKS, DEFAULT_CONTACT_LINK };

export interface FooterProps {
  contactLink?: FooterLinkItem;
  socialLinks?: SocialLinkItem[];
  legalLinks?: FooterLinkItem[];
  copyright?: string;
  logoDesktop?: string;
  logoMobile?: string;
}
