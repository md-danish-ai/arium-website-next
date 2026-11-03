export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.co";

// Resolves relative Strapi upload paths or returns absolute/static URLs as-is
export function GetStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";

  // Return already resolved URLs
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // Return local public assets as-is
  if (
    url.startsWith("/images/") ||
    url.startsWith("/assets/") ||
    url.startsWith("/video/") ||
    url.startsWith("/fonts/") ||
    url.startsWith("/css/") ||
    url.startsWith("/icons/") ||
    url.startsWith("/svg/") ||
    (url.startsWith("/") && !url.startsWith("/uploads/"))
  ) {
    return url;
  }

  // Strapi media upload
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Extracts media URL from Strapi v4/v5 payload formats
export function extractMediaUrl(media: unknown): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media.trim() || undefined;

  if (Array.isArray(media)) {
    if (media.length === 0) return undefined;
    return extractMediaUrl(media[0]);
  }

  if (typeof media === "object" && media !== null) {
    const record = media as Record<string, unknown>;

    if (typeof record.url === "string" && record.url) {
      return record.url;
    }

    if (record.data !== undefined) {
      return extractMediaUrl(record.data);
    }

    if (record.attributes && typeof record.attributes === "object") {
      const attrs = record.attributes as Record<string, unknown>;
      if (typeof attrs.url === "string" && attrs.url) {
        return attrs.url;
      }
    }

    // Check responsive formats (large, medium, small, thumbnail)
    if (record.formats && typeof record.formats === "object") {
      const formats = record.formats as Record<string, Record<string, unknown>>;
      const formatOrder = ["large", "medium", "small", "thumbnail"];
      for (const fmt of formatOrder) {
        if (formats[fmt] && typeof formats[fmt].url === "string") {
          return formats[fmt].url as string;
        }
      }
    }
  }

  return undefined;
}

/**
 * Resolves a media field into a full URL, or returns the provided fallback.
 */
export function resolveStrapiImage(media: unknown, fallback = ""): string {
  const extracted = extractMediaUrl(media);
  if (!extracted) return fallback;
  return GetStrapiMediaUrl(extracted);
}
