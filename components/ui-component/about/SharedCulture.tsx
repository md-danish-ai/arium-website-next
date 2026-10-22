import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";
import { GetStrapiMediaUrl } from "@lib/strapi";
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
  let mediaAlts = ["Team collaborating", "Team collaborating in modern office"];

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
    mediaAlts = [
      typeof m0?.alternativeText === "string" ? m0.alternativeText : mediaAlts[0],
      typeof m1?.alternativeText === "string" ? m1.alternativeText : mediaAlts[1],
    ];
  } else if (bgObj) {
    if (Array.isArray(bgObj) && bgObj.length > 0) {
      const b0 = bgObj[0] as Record<string, unknown>;
      const b1 = bgObj.length > 1 ? (bgObj[1] as Record<string, unknown>) : b0;
      mediaUrls = [
        typeof b0?.url === "string" ? b0.url : mediaUrls[0],
        typeof b1?.url === "string" ? b1.url : mediaUrls[1],
      ];
      mediaAlts = [
        typeof b0?.alternativeText === "string" ? b0.alternativeText : mediaAlts[0],
        typeof b1?.alternativeText === "string" ? b1.alternativeText : mediaAlts[1],
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
      mediaAlts = [
        ((typeof fAttrs?.alternativeText === "string"
          ? fAttrs.alternativeText
          : firstMedia?.alternativeText) as string) || mediaAlts[0],
        ((typeof sAttrs?.alternativeText === "string"
          ? sAttrs.alternativeText
          : secondMedia?.alternativeText) as string) || mediaAlts[1],
      ];
    } else if (typeof bgObj.url === "string") {
      mediaUrls = [bgObj.url, bgObj.url];
      mediaAlts = [
        typeof bgObj.alternativeText === "string" ? bgObj.alternativeText : mediaAlts[0],
        typeof bgObj.alternativeText === "string" ? bgObj.alternativeText : mediaAlts[1],
      ];
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

  return (
    <section
      id="culture"
      className="shared-culture-section relative overflow-hidden py-20 mt-[-1px] border-none bg-midnight"
      style={gradientStyle}
    >
      <div className="culture-bg shared-culture-bg absolute top-0 right-0 bottom-0 w-full md:w-[60%] z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)] md:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
        <picture className="w-full h-full block">
          <source media="(max-width: 768px)" srcSet={mediaUrls[0]} />
          <img
            src={mediaUrls[1]}
            alt={mediaAlts[1]}
            className="culture-bg-img shared-culture-bg-img w-full h-full object-cover block"
          />
        </picture>
      </div>

      <div className="culture-veil shared-culture-veil absolute inset-0 z-[1] bg-gradient-to-t from-[#0a1628]/50 to-transparent pointer-events-none" />

      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.06)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-[2]">
        <div className="culture-content-grid shared-culture-content-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="culture-left-column shared-culture-left-column reveal max-w-[640px] text-left">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              className="culture-hero-heading shared-culture-hero-heading text-white mb-4"
              style={{ color: HeadingColor || undefined }}
            >
              {headingText}
            </Typography>

            {descText ? (
              descText.includes("<") && descText.includes(">") ? (
                <div
                  className="culture-hero-desc shared-culture-hero-desc strapi-richtext-body text-[1.05rem] leading-[1.8] text-white/80 mb-8 flex flex-col gap-4 [&>p]:mb-0"
                  style={{ color: DescriptionColor || undefined }}
                  dangerouslySetInnerHTML={{ __html: descText }}
                />
              ) : (
                <Typography
                  variant="b1"
                  as="p"
                  className="culture-hero-desc shared-culture-hero-desc text-white/80 mb-8"
                  style={{ color: DescriptionColor || undefined }}
                >
                  {descText}
                </Typography>
              )
            ) : (
              <Typography
                variant="b1"
                as="p"
                className="culture-hero-desc shared-culture-hero-desc text-white/80 mb-8"
                style={{ color: DescriptionColor || undefined }}
              >
                Our infrastructure powers the connected world we all rely on. By joining our team,
                you&apos;ll be at the center of it all, helping us shape the future of connectivity
                by playing a meaningful role in building the next generation of wireless technology.
              </Typography>
            )}

            <div className="culture-pillars-container shared-culture-pillars-container mt-9 max-w-[585px] flex flex-col gap-0">
              {pillars.map((pillar, index) => {
                const pTitle = pillar.Heading || pillar.title || `Pillar ${index + 1}`;
                const pDesc = pillar.Description || pillar.description || "";
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`culture-mobile-pillar shared-culture-mobile-pillar pillar-${index + 1} shared-culture-pillar-${index + 1} ${index === 0 ? "pb-6" : index === pillars.length - 1 ? "pt-6" : "py-6"}`}
                    >
                      <Typography
                        variant="h5"
                        as="div"
                        uppercase
                        weight="bold"
                        className="culture-mobile-pillar-title shared-culture-mobile-pillar-title text-teal mb-1.5"
                        style={{ color: pillar.HeadingColor || undefined }}
                      >
                        {pTitle}
                      </Typography>
                      <Typography
                        variant="b3"
                        as="p"
                        className="culture-mobile-pillar-desc shared-culture-mobile-pillar-desc text-white/80 m-0"
                        style={{ color: pillar.DescriptionColor || undefined }}
                      >
                        {pDesc}
                      </Typography>
                    </div>
                    {index < pillars.length - 1 && (
                      <div className="culture-pillar-divider shared-culture-pillar-divider w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="reveal stagger-2 mt-9">
              <Link
                href={ctaUrl}
                className="culture-cta-btn inline-block px-10 py-3.5 rounded-full bg-teal text-midnight font-heading text-sm font-semibold tracking-wider uppercase no-underline transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
              >
                <Typography variant="button" uppercase weight="semibold" className="text-midnight">
                  {ctaLabel}
                </Typography>
              </Link>
            </div>
          </div>

          <div />
        </div>
      </div>
    </section>
  );
}
