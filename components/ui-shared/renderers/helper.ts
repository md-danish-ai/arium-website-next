const STRAPI_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com";

export function resolveMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${STRAPI_BASE}${url}`;
}

export interface SectionRendererProps {
  section: any;
  index: number;
}
