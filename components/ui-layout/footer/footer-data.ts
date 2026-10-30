import {
  FooterLinkItem,
  SocialLinkItem,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_LINK,
} from "@data/navigation.data";

export type { FooterLinkItem, SocialLinkItem };
export { DEFAULT_LEGAL_LINKS, DEFAULT_SOCIAL_LINKS, DEFAULT_CONTACT_LINK };

export interface RawFooterLink {
  id?: string | number;
  name?: string;
  url?: string;
}

export interface RawSocialLink {
  id?: string | number;
  Platform?: string;
  platform?: string;
  url?: string;
  icon?: string;
  Icon?: string;
}

export interface FooterLayoutData {
  FooterLogoDesktop?: string;
  footerLogoDesktop?: string;
  FooterLogoMobile?: string;
  footerLogoMobile?: string;
  Copyright?: string;
  copyright?: string;
  footerColumn?: {
    footerLinks?: RawFooterLink[];
  };
  socialLinks?: RawSocialLink[];
  [key: string]: unknown;
}

export interface FooterProps {
  contactLink?: FooterLinkItem;
  socialLinks?: SocialLinkItem[];
  legalLinks?: FooterLinkItem[];
  copyright?: string;
  logoDesktop?: string;
  logoMobile?: string;
  layoutData?: FooterLayoutData | null;
}
