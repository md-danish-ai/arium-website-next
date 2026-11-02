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

export interface SubPageCtaMappedProps {
  prompt_to_cta: string;
  CTA_text: string;
  CTA_url: string;
  background_gradient?: string | null;
  globe_illustration?: string | null;
}

// Hero banner mapper

export function mapSubPageHero(
  raw?: RawRecord | null,
  fallback = LEADERSHIP_HERO_FALLBACK
): SubPageHeroMappedProps {
  const title = (raw?.title as string) || fallback.title;
  const description = (raw?.description as string) || fallback.description;
  const tag = (raw?.tag as string) || fallback.tag || null;
  const CTA_text = (raw?.CTA_text as string) || fallback.CTA_text;
  const CTA_url = (raw?.CTA_url as string) || fallback.CTA_url;
  const background_gradient =
    (raw?.background_gradient as string) || fallback.background_gradient || null;
  const content_max_width =
    (raw?.content_max_width as string) || fallback.content_max_width || null;

  return {
    title,
    description,
    tag,
    CTA_text,
    CTA_url,
    background_gradient,
    content_max_width,
  };
}

// Team members grid mapper

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
    const name = ((item.name || "") as string).trim();
    const role = ((item.designation || "") as string).trim();
    const bioText = ((item.description || "") as string).trim();

    const matchedFallback =
      fallbackMembers.find((f) => f.name.toLowerCase() === name.toLowerCase()) ||
      fallbackMembers[index % (fallbackMembers.length || 1)];

    const fallbackImg =
      matchedFallback?.image ||
      (role.toLowerCase().includes("female")
        ? "/images/team/placeholder-female.png"
        : "/images/team/placeholder-male.png");

    const image = resolveStrapiImage(item.image, fallbackImg);

    const rawModalImg = Array.isArray(item.modal_image) ? item.modal_image[0] : item.modal_image;
    const modal_image = rawModalImg ? resolveStrapiImage(rawModalImg, image) : undefined;

    const background_image_mobile = item.background_image_mobile
      ? resolveStrapiImage(item.background_image_mobile, modal_image || image)
      : modal_image || matchedFallback?.background_image_mobile || matchedFallback?.modal_image;

    const descriptionHtml = bioText
      ? bioText.includes("<p>")
        ? bioText
        : bioText
            .split("\n\n")
            .map((p) => `<p>${p}</p>`)
            .join("")
      : matchedFallback?.description || "";

    const modalBg = (item.modal_upper_section_background ||
      matchedFallback?.modal_upper_section_background ||
      "#162047") as string;

    return {
      name: name || matchedFallback?.name || "Team Member",
      role: role || matchedFallback?.role || "",
      image,
      modal_image,
      background_image_mobile,
      description: descriptionHtml,
      modal_upper_section_background: modalBg,
    };
  });
}

// Sub-page CTA section mapper

export function mapSubPageCta(
  source?: StrapiSectionItem | RawRecord | null,
  fallbackCta = LEADERSHIP_CTA_FALLBACK
): SubPageCtaMappedProps {
  const prompt_to_cta = (source?.prompt_to_cta as string) || fallbackCta.prompt_to_cta;
  const CTA_text = (source?.CTA_text as string) || fallbackCta.CTA_text;
  const CTA_url = (source?.CTA_url as string) || fallbackCta.CTA_url;
  const background_gradient =
    (source?.background_gradient as string) || fallbackCta.background_gradient || null;
  const globe_illustration =
    resolveStrapiImage(source?.globe_illustration, fallbackCta.globe_illustration) || null;

  return {
    prompt_to_cta,
    CTA_text,
    CTA_url,
    background_gradient,
    globe_illustration,
  };
}
