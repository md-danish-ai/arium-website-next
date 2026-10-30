import { GetStrapiMediaUrl, STRAPI_URL } from "@lib/strapi";

export { GetStrapiMediaUrl, STRAPI_URL };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SectionRendererProps<T = any> {
  section: T;
  index: number;
}
