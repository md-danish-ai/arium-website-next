import React from "react";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { SharedGradientImageSplit } from "@ui-common";
import { CulturePillar, SharedCultureProps } from "./type";

export default function SharedCulture({
  Heading,
  Description,
  Pillarcard,
  CtaButton,
  CTALink,
  BgImage,
  BgGradient,
  HeadingColor,
  DescriptionColor,
  data,
}: SharedCultureProps) {
  const defaultPillars: CulturePillar[] = [
    {
      title: "Leadership",
      description:
        "We're trusted leaders in the industry and we value people who want to help us move fast, make a difference, and solve difficult challenges.",
    },
    {
      title: "Passion",
      description:
        "Our team cares deeply about the businesses and communities we serve. They understand that what we do makes a true difference in people's lives.",
    },
    {
      title: "Optimism",
      description:
        "Our team believes in the transformative power of wireless technology and is excited to play a meaningful role in ushering in a new generation of innovation.",
    },
  ];

  const rawPillars =
    (Pillarcard && Pillarcard.length > 0 ? Pillarcard : null) ||
    (data?.cards && data.cards.length > 0 ? data.cards : null) ||
    defaultPillars;
  const pillars: CulturePillar[] = rawPillars.map((p) => {
    const item = p as Record<string, unknown>;
    return {
      Heading: (item.Heading || item.title || "") as string,
      Description: (item.Description || item.description || "") as string,
      HeadingColor: item.HeadingColor as string | undefined,
      DescriptionColor: item.DescriptionColor as string | undefined,
    };
  });

  // Extract media safely based on Strapi formats or fallback
  let mediaUrls = ["/assets/images/culture-bg-mobile.jpg", "/assets/images/culture-bg.jpg"];

  const mediaList = Array.isArray(data?.media) ? (data.media as Record<string, unknown>[]) : null;
  const bgObj =
    typeof BgImage === "object" && BgImage !== null ? (BgImage as Record<string, unknown>) : null;

  if (mediaList && mediaList.length > 0) {
    const m0 = mediaList[0];
    const m1 = mediaList.length > 1 ? mediaList[1] : m0;
    mediaUrls = [
      typeof m0?.url === "string" ? m0.url : mediaUrls[0],
      typeof m1?.url === "string" ? m1.url : mediaUrls[1],
    ];
  } else if (bgObj) {
    if (Array.isArray(bgObj) && bgObj.length > 0) {
      const b0 = bgObj[0] as Record<string, unknown>;
      const b1 = bgObj.length > 1 ? (bgObj[1] as Record<string, unknown>) : b0;
      mediaUrls = [
        typeof b0?.url === "string" ? b0.url : mediaUrls[0],
        typeof b1?.url === "string" ? b1.url : mediaUrls[1],
      ];
    } else if (bgObj.data) {
      const isArray = Array.isArray(bgObj.data);
      const dataArr = isArray
        ? (bgObj.data as Record<string, unknown>[])
        : [bgObj.data as Record<string, unknown>];
      const firstMedia = dataArr[0];
      const secondMedia = dataArr.length > 1 ? dataArr[1] : firstMedia;

      const fAttrs = firstMedia?.attributes as Record<string, unknown> | undefined;
      const sAttrs = secondMedia?.attributes as Record<string, unknown> | undefined;

      mediaUrls = [
        ((typeof fAttrs?.url === "string" ? fAttrs.url : firstMedia?.url) as string) ||
          mediaUrls[0],
        ((typeof sAttrs?.url === "string" ? sAttrs.url : secondMedia?.url) as string) ||
          mediaUrls[1],
      ];
    } else if (typeof bgObj.url === "string") {
      mediaUrls = [bgObj.url, bgObj.url];
    }
  }

  mediaUrls = mediaUrls.map((url) => (url.startsWith("/uploads") ? GetStrapiMediaUrl(url) : url));

  const headingText = Heading || data?.title || "Help Us Shape the Future of Connectivity";
  const descText = Description || data?.body;
  const ctaLabel = CtaButton || data?.cta?.[0]?.label || "Explore Careers";
  const ctaUrl = CTALink || data?.cta?.[0]?.url || "/careers";

  // Determine optional background gradient if set
  const isMisplacedVeil =
    BgGradient &&
    (BgGradient.includes("#0a1628") ||
      BgGradient.includes("10, 22, 40") ||
      BgGradient.includes("10,22,40"));
  const gradientStyle = BgGradient && !isMisplacedVeil ? { background: BgGradient } : undefined;

  const pointers = pillars.map((p) => ({
    heading: p.Heading || p.title || "",
    description: p.Description || p.description || "",
    headingColor: p.HeadingColor,
    descriptionColor: p.DescriptionColor,
  }));

  return (
    <SharedGradientImageSplit
      id="culture"
      heading={headingText}
      description={
        descText ||
        "Our infrastructure powers the connected world we all rely on. By joining our team, you'll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology."
      }
      desktopImageUrl={mediaUrls[1]}
      mobileImageUrl={mediaUrls[0]}
      pointers={pointers}
      ctaText={ctaLabel}
      ctaUrl={ctaUrl}
      headingColor={HeadingColor}
      descriptionTextColor={DescriptionColor}
      style={gradientStyle}
    />
  );
}
