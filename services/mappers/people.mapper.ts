import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import type { PeopleMemberItem } from "@data/leadership.data";
import {
  LEADERSHIP_HERO_FALLBACK,
  LEADERSHIP_MEMBERS_FALLBACK,
  LEADERSHIP_CTA_FALLBACK,
} from "@data/leadership.data";

type RawRecord = Record<string, unknown>;

export interface SubPageHeroMappedProps {
  id?: string;
  title: string;
  description: string;
  tag?: string | null;
  CTA_text?: string | null;
  CTA_url?: string | null;
  background_gradient?: string | null;
  content_max_width?: string | null;
}

export interface GlobeCtaMappedProps {
  prompt_to_cta: string;
  CTA_text: string;
  CTA_url: string;
  background_gradient?: string | null;
  globe_illustration?: string | null;
}

/**
 * 1. Sub Page Hero Mapper (used by Leadership, Board of Directors, etc.)
 */
export function mapSubPageHero(
  raw?: RawRecord | null,
  fallback = LEADERSHIP_HERO_FALLBACK
): SubPageHeroMappedProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const tag = (raw?.tag as string) || fallback.tag || null;
  const background_gradient =
    (raw?.background_gradient as string) || fallback.background_gradient || null;
  const content_max_width =
    (raw?.content_max_width as string) || fallback.content_max_width || null;

  let CTA_text = (raw?.CTA_text as string) || null;
  let CTA_url = (raw?.CTA_url as string) || null;

  if (!CTA_text && raw?.heroCtas) {
    const rawCtas = raw.heroCtas as RawRecord[] | RawRecord;
    const firstCta = Array.isArray(rawCtas) ? rawCtas[0] : rawCtas;
    CTA_text = (firstCta?.label as string) || null;
    CTA_url = (firstCta?.url as string) || null;
  }

  return {
    title,
    description,
    tag,
    CTA_text: CTA_text || fallback.CTA_text,
    CTA_url: CTA_url || fallback.CTA_url,
    background_gradient,
    content_max_width,
  };
}

/**
 * 2. People Grid Mapper (used by Leadership and Board of Directors)
 */
export function mapPeopleMembers(
  source?: StrapiSectionItem | RawRecord | RawRecord[] | null,
  fallbackMembers: PeopleMemberItem[] = LEADERSHIP_MEMBERS_FALLBACK
): PeopleMemberItem[] {
  let rawItems: RawRecord[] = [];

  if (Array.isArray(source)) {
    rawItems = source as RawRecord[];
  } else if (source && typeof source === "object") {
    rawItems = ((source as RawRecord).cards || (source as RawRecord).Sections || []) as RawRecord[];
  }

  if (!rawItems || rawItems.length === 0) {
    return fallbackMembers;
  }

  return rawItems.map((item, index) => {
    const name = ((item.name || item.title || "") as string).trim();
    const role = ((item.designation || item.badge || item.role || "") as string).trim();
    const bioText = ((item.description || item.bio || "") as string).trim();

    const matchedFallback =
      fallbackMembers.find((f) => f.name.toLowerCase() === name.toLowerCase()) ||
      fallbackMembers[index % (fallbackMembers.length || 1)];

    const fallbackImg =
      matchedFallback?.image ||
      (role.toLowerCase().includes("female")
        ? "/images/team/placeholder-female.png"
        : "/images/team/placeholder-male.png");

    const image = resolveStrapiImage(item.image, fallbackImg);

    const descriptionHtml = bioText
      ? bioText.includes("<p>")
        ? bioText
        : bioText
            .split("\n\n")
            .map((p) => `<p>${p}</p>`)
            .join("")
      : matchedFallback?.description || "";

    const modalBg = (item.modal_upper_section_background ||
      item.modalBg ||
      matchedFallback?.modal_upper_section_background ||
      "#162047") as string;

    return {
      name: name || matchedFallback?.name || "Team Member",
      role: role || matchedFallback?.role || "",
      image,
      description: descriptionHtml,
      modal_upper_section_background: modalBg,
    };
  });
}

/**
 * 3. Globe CTA Mapper (used by Leadership and Board of Directors)
 */
export function mapPeopleCta(
  source?: StrapiSectionItem | RawRecord | null,
  fallbackCta = LEADERSHIP_CTA_FALLBACK
): GlobeCtaMappedProps {
  const prompt_to_cta = (source?.prompt_to_cta as string) || fallbackCta.prompt_to_cta;

  let CTA_text = (source?.CTA_text as string) || null;
  let CTA_url = (source?.CTA_url as string) || null;

  if (!CTA_text && source?.cta) {
    const rawCta = source.cta as RawRecord | RawRecord[];
    const firstCta = Array.isArray(rawCta) ? rawCta[0] : rawCta;
    CTA_text = (firstCta?.label as string) || null;
    CTA_url = (firstCta?.url as string) || null;
  }

  const background_gradient =
    (source?.background_gradient as string) || fallbackCta.background_gradient || null;

  const globe_illustration =
    resolveStrapiImage(source?.globe_illustration, fallbackCta.globe_illustration) || null;

  return {
    prompt_to_cta,
    CTA_text: CTA_text || fallbackCta.CTA_text,
    CTA_url: CTA_url || fallbackCta.CTA_url,
    background_gradient,
    globe_illustration,
  };
}
