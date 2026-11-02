import {
  FooterLinkItem,
  SocialLinkItem,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_LINK,
  DEFAULT_FOOTER_DATA,
} from "@data/navigation.data";

export type { FooterLinkItem, SocialLinkItem };
export {
  DEFAULT_LEGAL_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_LINK,
  DEFAULT_FOOTER_DATA,
};

export interface FooterProps {
  contactLink?: FooterLinkItem;
  socialLinks?: SocialLinkItem[];
  legalLinks?: FooterLinkItem[];
  copyright?: string;
  address?: string;
  contact_number?: string;
  contact_number_display?: string;
  logoDesktop?: string;
  logoMobile?: string;
}
