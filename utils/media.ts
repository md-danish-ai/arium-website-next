export const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");

// Resolve Strapi upload paths or static assets
export function GetStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("data:")
  ) {
    return url;
  }

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

  if (!STRAPI_URL) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Extract media URL from Strapi payload
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

    // Responsive image formats
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

// Resolve Strapi media with fallback
export function resolveStrapiImage(media: unknown, fallback = ""): string {
  const extracted = extractMediaUrl(media);
  if (!extracted) return fallback;
  return GetStrapiMediaUrl(extracted);
}
