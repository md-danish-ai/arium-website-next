export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com";

/**
 * Converts a relative Strapi media URL (e.g. /uploads/image.png)
 * into a full absolute URL using NEXT_PUBLIC_STRAPI_URL or the fallback ALB URL.
 */
export function GetStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
