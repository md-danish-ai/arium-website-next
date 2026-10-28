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

// In Strapi v5, populate[widgets][populate][Sections][populate]=* cleanly populates
// all shared component fields, nested card arrays, and media assets across all widgets,
// avoiding fragile manual field lists and staying well within AWS ALB URL limits.
export const WIDGETS_POPULATE_QUERY = "populate[widgets][populate][Sections][populate]=*";
/**
 * Dedicated widget fetch — always a clean, short URL separate from page-data queries.
 */
export async function fetchPageWidgets(slug: string) {
  return fetchAPI(`/api/pages?filters[slug][$eq]=${slug}&${WIDGETS_POPULATE_QUERY}`);
}
