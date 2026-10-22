export interface RawFooterLink {
  id?: string | number;
  name?: string;
  url?: string;
}

export interface RawSocialLink {
  id?: string | number;
  Platform?: string;
  url?: string;
  icon?: string;
}

export interface FooterLayoutData {
  FooterLogoDesktop?: string;
  FooterLogoMobile?: string;
  Copyright?: string;
  footerColumn?: {
    footerLinks?: RawFooterLink[];
  };
  socialLinks?: RawSocialLink[];
  [key: string]: unknown;
}

export interface FooterProps {
  layoutData?: FooterLayoutData | null;
}

export const DEFAULT_LEGAL_LINKS: { name: string; url: string }[] = [
  {
    name: "Accessibility Statements",
    url: "https://d2919ce8l80osk.cloudfront.net/Acessibility_Statement_Arium_Networks_Redline_v_Send42726_1f79ed2b31.pdf",
  },
  {
    name: "Ethics Policy",
    url: "https://d2919ce8l80osk.cloudfront.net/Ethics_Policy_Arium_Networks_043026_6bd2df50a0.pdf",
  },
  {
    name: "Regulatory Statement",
    url: "https://d2919ce8l80osk.cloudfront.net/Regulatory_Status_Arium_Networks_Redline_v_Send42726_6ffecd8508.pdf",
  },
  {
    name: "Acceptable Use",
    url: "https://d2919ce8l80osk.cloudfront.net/Acceptable_Use_Policy_Arium_Networks_v0422726_a5e69bb019.pdf",
  },
  {
    name: "Privacy Policy",
    url: "https://d2919ce8l80osk.cloudfront.net/Privacy_Statement_Arium_Networks_Redline_v_Send42726_4d4afd83b8.pdf",
  },
  {
    name: "Terms of Use",
    url: "https://d2919ce8l80osk.cloudfront.net/Terms_of_Use_Arium_Networks_043026_accfd8cd2c.pdf",
  },
];
