import React from "react";
import Link from "next/link";
import { Typography } from "@ui-element";

interface CulturePillar {
  Heading?: string;
  Description?: string;
  title?: string;
  description?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

interface SharedCultureProps {
  Heading?: string;
  Description?: string;
  Pillarcard?: CulturePillar[];
  CtaButton?: string;
  CTALink?: string;
  BgImage?:
    | { data?: { attributes?: { url: string; alternativeText?: string } } }
    | { url: string; alternativeText?: string }[]
    | any;
  BgGradient?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
  data?: {
    title?: string;
    body?: string;
    cards?: CulturePillar[];
    cta?: { label: string; url: string }[];
    media?: { url: string; alternativeText?: string }[];
  };
}

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

  const pillars =
    (Pillarcard && Pillarcard.length > 0 ? Pillarcard : null) ||
    (data?.cards && data.cards.length > 0 ? data.cards : null) ||
    defaultPillars;

  // Extract media safely based on Strapi formats or fallback
  let mediaUrls = ["/assets/images/culture-bg-mobile.jpg", "/assets/images/culture-bg.jpg"];
  let mediaAlts = ["Team collaborating", "Team collaborating in modern office"];

  if (data?.media && data.media.length > 0) {
    mediaUrls = [
      data.media[0]?.url || mediaUrls[0],
      data.media[1]?.url || data.media[0]?.url || mediaUrls[1],
    ];
    mediaAlts = [
      data.media[0]?.alternativeText || mediaAlts[0],
      data.media[1]?.alternativeText || data.media[0]?.alternativeText || mediaAlts[1],
    ];
  } else if (BgImage) {
    if (Array.isArray(BgImage) && BgImage.length > 0) {
      mediaUrls = [
        BgImage[0]?.url || mediaUrls[0],
        BgImage[1]?.url || BgImage[0]?.url || mediaUrls[1],
      ];
      mediaAlts = [
        BgImage[0]?.alternativeText || mediaAlts[0],
        BgImage[1]?.alternativeText || BgImage[0]?.alternativeText || mediaAlts[1],
      ];
    } else if (BgImage.data) {
      const isArray = Array.isArray(BgImage.data);
      const firstMedia = isArray ? BgImage.data[0] : BgImage.data;
      const secondMedia = isArray && BgImage.data.length > 1 ? BgImage.data[1] : firstMedia;

      mediaUrls = [
        firstMedia?.attributes?.url || firstMedia?.url || mediaUrls[0],
        secondMedia?.attributes?.url || secondMedia?.url || mediaUrls[1],
      ];
      mediaAlts = [
        firstMedia?.attributes?.alternativeText || firstMedia?.alternativeText || mediaAlts[0],
        secondMedia?.attributes?.alternativeText || secondMedia?.alternativeText || mediaAlts[1],
      ];
    } else if (BgImage.url) {
      mediaUrls = [BgImage.url, BgImage.url];
      mediaAlts = [
        BgImage.alternativeText || mediaAlts[0],
        BgImage.alternativeText || mediaAlts[1],
      ];
    }
  }

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
