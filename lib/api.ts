import { STRAPI_URL, GetStrapiMediaUrl } from "./strapi";

export { STRAPI_URL, GetStrapiMediaUrl };

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export async function fetchAPI(path: string, options: RequestInit = {}) {
  try {
    const requestUrl = getStrapiURL(path);
    const mergedOptions: RequestInit = {
      cache: "no-store",
      ...options,
    };
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      const errText = await response.text();
      console.error(`An error occurred please check the API endpoint: ${requestUrl}`);
      console.error(`Strapi Error Details: ${response.status} - ${errText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Strapi v5 dynamic zone populate query for page widgets
export const WIDGETS_POPULATE_QUERY = "populate[widgets][populate][Sections][populate]=*";

const PAGE_WIDGET_POPULATE_MAP: Record<string, string> = {
  careers: [
    "populate[widgets][populate][Sections][on][shared.hero][populate]=*",
    "populate[widgets][populate][Sections][on][shared.accordion-split][populate]=*",
    "populate[widgets][populate][Sections][on][shared.gloabl-testimonails][populate]=*",
    "populate[widgets][populate][Sections][on][shared.highlight-list][populate]=*",
    "populate[widgets][populate][Sections][on][shared.benefits][populate][benefits_card][populate]=*",
  ].join("&"),
  community: [
    "populate[widgets][populate][Sections][on][shared.hero][populate]=*",
    "populate[widgets][populate][Sections][on][shared.illustration-split][populate]=*",
    "populate[widgets][populate][Sections][on][shared.image-card-grid][populate][icon_card][populate]=*",
    "populate[widgets][populate][Sections][on][shared.background-feature-section][populate]=*",
    "populate[widgets][populate][Sections][on][shared.gloabl-testimonails][populate]=*",
    "populate[widgets][populate][Sections][on][shared.faq][populate]=*",
  ].join("&"),
  solutions: [
    "populate[widgets][populate][Sections][on][shared.hero][populate]=*",
    "populate[widgets][populate][Sections][on][shared.illustration-split][populate]=*",
    "populate[widgets][populate][Sections][on][shared.accordion-split][populate][accordian_cards][populate]=*",
    "populate[widgets][populate][Sections][on][shared.cta-with-graphic][populate]=*",
  ].join("&"),
};

// Fetches dynamic zone widgets for a given page slug
export async function fetchPageWidgets(slug: string) {
  const query = PAGE_WIDGET_POPULATE_MAP[slug] || WIDGETS_POPULATE_QUERY;
  return fetchAPI(`/api/pages?filters[slug][$eq]=${slug}&${query}`);
}
