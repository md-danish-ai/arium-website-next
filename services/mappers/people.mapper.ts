import type { StrapiSectionItem } from "@types";
import { resolveStrapiImage } from "@utils";
import type { PeopleMemberItem } from "@data/leadership.data";

type RawRecord = Record<string, unknown>;

export interface InnerPageHeroMappedProps {
  id?: string;
  heroTitle: string;
  heroDescription: string;
  heroCtasLabel?: string;
  heroCtasUrl?: string;
}

export interface GlobeCtaMappedProps {
  heading: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

/**
 * 1. Inner Page Hero Mapper (used by Leadership, Board of Directors, etc.)
 */
export function mapInnerHero(
  raw?: RawRecord | null,
  fallback = {
    heroTitle: "Our Leadership",
    heroDescription:
      "Seasoned industry leaders driving strategic growth and operational excellence.",
  }
): InnerPageHeroMappedProps {
  const heroTitle =
    (raw?.heroTitle as string) ||
    (raw?.Heading as string) ||
    (raw?.heading as string) ||
    (raw?.title as string) ||
    fallback.heroTitle;

  const heroDescription =
    (raw?.heroDescription as string) ||
    (raw?.Description as string) ||
    (raw?.description as string) ||
    fallback.heroDescription;

  const rawCtas = raw?.heroCtas as RawRecord | RawRecord[] | undefined;
  let heroCtasLabel: string | undefined;
  let heroCtasUrl: string | undefined;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    heroCtasLabel = rawCtas[0].label as string;
    heroCtasUrl = rawCtas[0].url as string;
  } else if (rawCtas && !Array.isArray(rawCtas) && typeof rawCtas === "object") {
    heroCtasLabel = rawCtas.label as string;
    heroCtasUrl = rawCtas.url as string;
  }

  return {
    heroTitle,
    heroDescription,
    heroCtasLabel,
    heroCtasUrl,
  };
}

/**
 * 2. People Grid Mapper (used by Leadership and Board of Directors)
 */
export function mapPeopleMembers(
  sectionItem?: StrapiSectionItem | RawRecord | null,
  fallbackMembers: PeopleMemberItem[] = []
): PeopleMemberItem[] {
  const rawCards = (sectionItem?.cards ||
    sectionItem?.Cards ||
    sectionItem?.PeopleCard ||
    sectionItem?.Peoplecard ||
    sectionItem?.peoplecard) as RawRecord[] | undefined;

  if (!Array.isArray(rawCards) || rawCards.length === 0) {
    return fallbackMembers;
  }

  return rawCards.map((card, index) => {
    const name = (card.Name || card.name || card.title || "") as string;
    const role = (card.Designation || card.designation || card.badge || card.role || "") as string;
    const bioText = (card.Description || card.description || card.bio || "") as string;

    const matchedFallback =
      fallbackMembers.find((f) => f.name.toLowerCase() === name.toLowerCase()) ||
      fallbackMembers[index % (fallbackMembers.length || 1)];

    const fallbackImg =
      matchedFallback?.image ||
      (role.toLowerCase().includes("female")
        ? "/images/team/placeholder-female.png"
        : "/images/team/placeholder-male.png");

    const rawImg = (card.Image || card.image) as unknown;
    const image = resolveStrapiImage(rawImg, fallbackImg);

    const bioHtml = bioText
      ? bioText
          .split("\n\n")
          .map((p) => `<p>${p}</p>`)
          .join("")
      : matchedFallback?.bio || "";

    const modalBg = (card.ModalUpperSectionBg ||
      card.modalUpperSectionBg ||
      card.modalBg ||
      matchedFallback?.modalBg ||
      "#162047") as string;

    return {
      name: name || matchedFallback?.name || "Team Member",
      role: role || matchedFallback?.role || "",
      image,
      bio: bioHtml,
      modalBg,
    };
  });
}

/**
 * 3. Globe CTA Mapper (used by Leadership and Board of Directors)
 */
export function mapPeopleCta(
  sectionItem?: StrapiSectionItem | RawRecord | null,
  fallbackCta = {
    heading:
      "Interested in joining a team of industry leaders building the future of connectivity?",
    buttonText: "Explore Careers",
    buttonLink: "/careers",
  }
): GlobeCtaMappedProps {
  const heading =
    (sectionItem?.title as string) ||
    (sectionItem?.Title as string) ||
    (sectionItem?.Heading as string) ||
    (sectionItem?.heading as string) ||
    fallbackCta.heading;

  const description =
    (sectionItem?.body as string) ||
    (sectionItem?.Body as string) ||
    (sectionItem?.description as string) ||
    (sectionItem?.Description as string) ||
    undefined;

  const rawCtas = (sectionItem?.cta || sectionItem?.CTA || sectionItem?.ctas) as
    RawRecord | RawRecord[] | undefined;

  let buttonText = (sectionItem?.buttonText as string) || fallbackCta.buttonText;
  let buttonLink = (sectionItem?.buttonLink as string) || fallbackCta.buttonLink;

  if (Array.isArray(rawCtas) && rawCtas.length > 0) {
    if (rawCtas[0].label) buttonText = rawCtas[0].label as string;
    if (rawCtas[0].url) buttonLink = rawCtas[0].url as string;
  } else if (rawCtas && typeof rawCtas === "object" && !Array.isArray(rawCtas)) {
    if (rawCtas.label) buttonText = rawCtas.label as string;
    if (rawCtas.url) buttonLink = rawCtas.url as string;
  }

  return {
    heading,
    description,
    buttonText,
    buttonLink,
  };
}
