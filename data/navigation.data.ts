export interface NavItemChild {
  label: string;
  url: string;
}

export interface NavRoute {
  id?: string;
  label: string;
  url: string;
  type: "item" | "collapse";
  children?: NavItemChild[];
}

export interface FooterLinkItem {
  id?: string | number;
  name: string;
  url: string;
}

export interface SocialLinkItem {
  id?: string | number;
  platform: string;
  url: string;
  iconHtml?: string;
}

export const DEFAULT_NAV_ROUTES: NavRoute[] = [
  {
    id: "company",
    label: "Our Company",
    url: "/about",
    type: "collapse",
    children: [
      {
        label: "About Us",
        url: "/about",
      },
      {
        label: "Leadership",
        url: "/leadership",
      },
      {
        label: "Board of Directors",
        url: "/board-of-directors",
      },
    ],
  },
  {
    id: "solutions",
    label: "Our Solutions",
    url: "/solutions",
    type: "item",
    children: [],
  },
  {
    id: "where",
    label: "Where We Build",
    url: "/where-we-build",
    type: "collapse",
    children: [
      {
        label: "Overview",
        url: "/where-we-build",
      },
      {
        label: "Right of Way",
        url: "/right-of-ways",
      },
      {
        label: "Private Venues",
        url: "/private-venues",
      },
    ],
  },
  {
    id: "community",
    label: "Your Community",
    url: "/community",
    type: "item",
    children: [],
  },
  {
    id: "careers",
    label: "Careers",
    url: "/careers",
    type: "item",
    children: [],
  },
];

export const DEFAULT_LEGAL_LINKS: FooterLinkItem[] = [
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

export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/AriumNetworks",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/company/arium-networks",
  },
  {
    platform: "X",
    url: "https://x.com/AriumNetworks",
  },
];

export const DEFAULT_CONTACT_LINK: FooterLinkItem = {
  name: "Contact Us",
  url: "/contact",
};
