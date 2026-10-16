export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com"
  }${path}`;
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
      console.error(
        `An error occurred please check the API endpoint: ${requestUrl}`,
      );
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

// The generic populate=* at the start covers all scalar fields and direct media
// for every component. Only nested components (repeatable components, deep media)
// need explicit per-component rules. This keeps the URL well within AWS ALB limits.
export const WIDGETS_POPULATE_QUERY =
  "populate[widgets][populate][Sections][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.test-banner][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.global-cta][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.inner-page-hero][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.illustration-split][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.main-hero][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.image-gradient-split][populate][sectionPointers][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.image-gradient-split][populate][BgImage][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.centered-image-cta][populate][BgImage][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.cta-with-graphic][populate][Graphic][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.highlight-list][populate][Name][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.highlight-list][populate][Image][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.accordion-split][populate][Accordian][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.timeline][populate][TimeCards][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.commitments][populate][PillarCard][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.pillar-highlights][populate][Pillarcard][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.stats-with-image][populate][Statscard][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.stats-with-image][populate][Image][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.detailed-card-grid][populate][PanelsCards][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.benefits][populate][BenefitsCard][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.background-feature-section][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.stats-cards][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.process][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.faq][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.people-global-section][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.image-card-grid][populate][cardgrid][populate][image][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.gloabl-testimonails][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.image-split][populate]=*" +
  "&populate[widgets][populate][Sections][on][shared.content-with-side-graphic][populate]=*";
/**
 * Dedicated widget fetch — always a clean, short URL separate from page-data queries.
 */
export async function fetchPageWidgets(slug: string) {
  return fetchAPI(
    `/api/pages?filters[slug][$eq]=${slug}&${WIDGETS_POPULATE_QUERY}`,
  );
}
