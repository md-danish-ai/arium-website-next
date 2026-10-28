export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.co";

/**
 * Converts a relative Strapi media URL (e.g. /uploads/image.png)
 * into a full absolute URL using STRAPI_URL.
 * If the URL is already absolute, or is a local static asset (e.g. /images/...),
 * it is returned as-is.
 */
export function GetStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";

  // 1. Return already resolved absolute URLs, protocol-relative, or data URIs
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // 2. Return local static public assets as-is (e.g., /images/..., /assets/..., /icons/...)
  // Strapi media uploads always reside in /uploads/. Any other root-relative path is a local Next.js asset.
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

  // 3. Strapi media uploads (e.g. /uploads/filename.png or uploads/filename.png)
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Deeply extracts the relative or absolute media URL from any Strapi media shape:
 * - Direct string ("/uploads/...")
 * - Media item with .url
 * - Media item with .attributes.url
 * - Wrapper with .data.attributes.url or .data.url
 * - Array of media items (takes the first item)
 * - Nested formats (e.g. .formats.large.url)
 */
export function extractMediaUrl(media: unknown): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media.trim() || undefined;

  if (Array.isArray(media)) {
    if (media.length === 0) return undefined;
    return extractMediaUrl(media[0]);
  }

  if (typeof media === "object" && media !== null) {
    const record = media as Record<string, unknown>;

    // 1. Direct url property
    if (typeof record.url === "string" && record.url) {
      return record.url;
    }

    // 2. data property (Strapi v4 envelope)
    if (record.data !== undefined) {
      return extractMediaUrl(record.data);
    }

    // 3. attributes property (Strapi v4 entity)
    if (record.attributes && typeof record.attributes === "object") {
      const attrs = record.attributes as Record<string, unknown>;
      if (typeof attrs.url === "string" && attrs.url) {
        return attrs.url;
      }
    }

    // 4. formats fallback (e.g. large, medium, small)
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

/**
 * Resolves an array of media objects into a clean array of full URLs.
 */
export function resolveMediaList(media: unknown): string[] {
  if (!media) return [];
  if (!Array.isArray(media)) {
    const single = resolveStrapiImage(media);
    return single ? [single] : [];
  }

  return media.map((item) => resolveStrapiImage(item)).filter((url): url is string => Boolean(url));
}
