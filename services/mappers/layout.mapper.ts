import {
  DEFAULT_NAV_ROUTES,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_LINK,
  NavRoute,
  NavItemChild,
  FooterLinkItem,
  SocialLinkItem,
} from "@data/navigation.data";

export interface RawNavDropdownItem {
  id?: string | number;
  label?: string;
  url?: string;
}

export interface RawNavigationItem {
  id?: string | number;
  label?: string;
  url?: string;
  dropdown?: RawNavDropdownItem[];
}

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

export interface RawGlobalLayout {
  logoDesktop?: string;
  LogoDesktop?: string;
  logoMobile?: string;
  LogoMobile?: string;
  FooterLogoDesktop?: string;
  footerLogoDesktop?: string;
  FooterLogoMobile?: string;
  footerLogoMobile?: string;
  Copyright?: string;
  copyright?: string;
  navigation?: RawNavigationItem[];
  footerColumn?: {
    footerLinks?: RawFooterLink[];
  };
  socialLinks?: RawSocialLink[];
  [key: string]: unknown;
}

export interface NavbarPropsClean {
  routes: NavRoute[];
  logoDesktop?: string;
  logoMobile?: string;
}

export interface FooterPropsClean {
  contactLink: FooterLinkItem;
  socialLinks: SocialLinkItem[];
  legalLinks: FooterLinkItem[];
  copyright: string;
  logoDesktop?: string;
  logoMobile?: string;
}

export function mapNavbarData(rawGlobalLayout?: RawGlobalLayout | null): NavbarPropsClean {
  let routes = DEFAULT_NAV_ROUTES;

  if (Array.isArray(rawGlobalLayout?.navigation) && rawGlobalLayout.navigation.length > 0) {
    routes = rawGlobalLayout.navigation.map((item: RawNavigationItem): NavRoute => {
      const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;
      const dropId = item.label ? item.label.toLowerCase().replace(/\s+/g, "-") : undefined;
      const routeType: "collapse" | "item" = hasDropdown ? "collapse" : "item";

      return {
        id: dropId,
        label: item.label || "",
        url: item.url || (hasDropdown ? item.dropdown?.[0]?.url || "#" : "#"),
        type: routeType,
        children:
          hasDropdown && item.dropdown
            ? item.dropdown.map((sub: RawNavDropdownItem): NavItemChild => ({
                label: sub.label || "",
                url: sub.url || "#",
              }))
            : [],
      };
    });
  }

  const logoDesktop = rawGlobalLayout?.logoDesktop || rawGlobalLayout?.LogoDesktop || undefined;
  const logoMobile = rawGlobalLayout?.logoMobile || rawGlobalLayout?.LogoMobile || undefined;

  return {
    routes,
    logoDesktop,
    logoMobile,
  };
}

export function mapFooterData(rawGlobalLayout?: RawGlobalLayout | null): FooterPropsClean {
  const allFooterLinks = rawGlobalLayout?.footerColumn?.footerLinks;

  let contactLink = DEFAULT_CONTACT_LINK;
  if (Array.isArray(allFooterLinks)) {
    const foundContact = allFooterLinks.find((link) => link.url === "/contact");
    if (foundContact && foundContact.name) {
      contactLink = {
        name: foundContact.name,
        url: foundContact.url || "/contact",
      };
    }
  }

  let legalLinks = DEFAULT_LEGAL_LINKS;
  if (Array.isArray(allFooterLinks)) {
    const filteredLegal = allFooterLinks.filter((link) => link.url !== "/contact");
    if (filteredLegal.length > 0) {
      legalLinks = filteredLegal.map((link) => ({
        id: link.id,
        name: link.name || "",
        url: link.url || "#",
      }));
    }
  }

  let socialLinks = DEFAULT_SOCIAL_LINKS;
  if (Array.isArray(rawGlobalLayout?.socialLinks) && rawGlobalLayout.socialLinks.length > 0) {
    socialLinks = rawGlobalLayout.socialLinks.map((s) => ({
      id: s.id,
      platform: s.Platform || s.platform || "Social",
      url: s.url || "#",
      iconHtml: s.icon || s.Icon,
    }));
  }

  const currentYear = new Date().getFullYear();
  const copyright =
    rawGlobalLayout?.Copyright || rawGlobalLayout?.copyright || `© ${currentYear} Arium Networks`;

  const logoDesktop =
    rawGlobalLayout?.FooterLogoDesktop || rawGlobalLayout?.footerLogoDesktop || undefined;
  const logoMobile =
    rawGlobalLayout?.FooterLogoMobile || rawGlobalLayout?.footerLogoMobile || undefined;

  return {
    contactLink,
    socialLinks,
    legalLinks,
    copyright,
    logoDesktop,
    logoMobile,
  };
}
