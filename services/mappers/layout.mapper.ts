import {
  DEFAULT_NAV_ROUTES,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_LINK,
  DEFAULT_FOOTER_DATA,
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
  platform?: string;
  url?: string;
  icon?: string;
}

export interface RawGlobalLayout {
  logoDesktop?: string;
  logoMobile?: string;
  copyright?: string;
  address?: string;
  contact_number?: string;
  contact_number_display?: string;
  navigation?: RawNavigationItem[];
  footer_column?: {
    footer_links?: RawFooterLink[];
  };
  social_links?: RawSocialLink[];
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
  address: string;
  contact_number: string;
  contact_number_display: string;
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

  const logoDesktop = rawGlobalLayout?.logoDesktop || undefined;
  const logoMobile = rawGlobalLayout?.logoMobile || undefined;

  return {
    routes,
    logoDesktop,
    logoMobile,
  };
}

export function mapFooterData(rawGlobalLayout?: RawGlobalLayout | null): FooterPropsClean {
  const allFooterLinks = rawGlobalLayout?.footer_column?.footer_links;

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
  const rawSocial = rawGlobalLayout?.social_links;
  if (Array.isArray(rawSocial) && rawSocial.length > 0) {
    socialLinks = rawSocial.map((s) => ({
      id: s.id,
      platform: s.platform || "Social",
      url: s.url || "#",
      iconHtml: s.icon,
    }));
  }

  const currentYear = new Date().getFullYear();
  const copyright = (rawGlobalLayout?.copyright as string) || `© ${currentYear} Arium Networks`;

  const address = (rawGlobalLayout?.address as string) || DEFAULT_FOOTER_DATA.address;
  const contact_number =
    (rawGlobalLayout?.contact_number as string) || DEFAULT_FOOTER_DATA.contact_number;
  const contact_number_display =
    (rawGlobalLayout?.contact_number_display as string) ||
    DEFAULT_FOOTER_DATA.contact_number_display;

  const logoDesktop = rawGlobalLayout?.logoDesktop || undefined;
  const logoMobile = rawGlobalLayout?.logoMobile || undefined;

  return {
    contactLink,
    socialLinks,
    legalLinks,
    copyright,
    address,
    contact_number,
    contact_number_display,
    logoDesktop,
    logoMobile,
  };
}
