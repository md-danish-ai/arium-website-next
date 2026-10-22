import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { BackgroundFeatureSectionProps, FeatureCard } from "./type";

export default function BackgroundFeatureSection({
  Heading,
  Description,
  BackgroundImage,
  CTALabel,
  CTALink,
  FeatureCards = [],
  FontColorHeading,
  FontColorDescription,
  MaxWidthText,
}: BackgroundFeatureSectionProps) {
  let desktopUrl = "";
  let mobileUrl = "";

  if (Array.isArray(BackgroundImage)) {
    desktopUrl = BackgroundImage[0]?.url || BackgroundImage[0]?.attributes?.url || "";
    mobileUrl = BackgroundImage[1]?.url || BackgroundImage[1]?.attributes?.url || desktopUrl;
  } else if (BackgroundImage && "data" in BackgroundImage && Array.isArray(BackgroundImage.data)) {
    desktopUrl = BackgroundImage.data[0]?.attributes?.url || BackgroundImage.data[0]?.url || "";
    mobileUrl =
      BackgroundImage.data[1]?.attributes?.url || BackgroundImage.data[1]?.url || desktopUrl;
  } else if (BackgroundImage && typeof BackgroundImage === "object") {
    const bgObj = BackgroundImage as {
      url?: string;
      data?: { url?: string; attributes?: { url?: string } };
      attributes?: { url?: string };
    };
    desktopUrl =
      bgObj.data?.attributes?.url || bgObj.data?.url || bgObj.attributes?.url || bgObj.url || "";
    mobileUrl = desktopUrl;
  }

  const finalDesktopUrl = GetStrapiMediaUrl(desktopUrl) || "/assets/images/challenges-bg.png";
  const finalMobileUrl = GetStrapiMediaUrl(mobileUrl) || finalDesktopUrl;

  const defaultFeatureCards: FeatureCard[] = [
    {
      Heading: "Design",
      Description:
        "We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity.",
    },
    {
      Heading: "Implement",
      Description:
        "We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure.",
    },
    {
      Heading: "Optimize",
      Description:
        "We partner with leading firms to conduct radio frequency (RF) testing and optimization, ensuring the network continues to perform as expected.",
    },
  ];

  const cardsToRender =
    FeatureCards && FeatureCards.length > 0
      ? FeatureCards
      : !CTALabel && !CTALink
        ? defaultFeatureCards
        : [];
  const hasCards = cardsToRender.length > 0;
  const textMaxWidth = MaxWidthText || (hasCards ? "620px" : "560px");

  return (
    <section className="relative overflow-hidden p-0">
      {/* Desktop Image */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src={finalDesktopUrl}
          alt={Heading || "Feature Background Desktop"}
          fill
          className="object-cover object-top block"
          aria-hidden="true"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden absolute inset-0 z-0">
        <Image
          src={finalMobileUrl}
          alt={Heading || "Feature Background Mobile"}
          fill
          className="object-cover object-top block"
          aria-hidden="true"
        />
      </div>

      {/* Background Veil */}
      <div className="challenges-veil absolute inset-0 z-[1] [background-image:linear-gradient(90deg,rgba(13,18,36,0.92)_0%,rgba(13,18,36,0.82)_38%,rgba(13,18,36,0.45)_60%,transparent_80%)] max-[1079px]:[background-image:none] max-[1079px]:bg-[#0a1628]/80 max-[480px]:bg-[#0a1628]/85" />

      {/* Bottom Gradient (desktop only) */}
      <div className="challenges-bottom-gradient hidden min-[1080px]:block absolute inset-x-0 bottom-0 h-[380px] z-[1] [background-image:linear-gradient(180deg,transparent_0%,rgba(13,18,36,0.72)_40%,rgba(13,18,36,0.95)_100%)]" />

      <div
        className={`container bg-feature-container relative z-[2] ${
          hasCards
            ? "pt-[75px] max-[768px]:pt-[85px] md:pt-[90px] lg:pt-[110px] xl:pt-[135px] pb-3 max-[768px]:pb-8 md:pb-8 lg:pb-12 xl:pb-[70px]"
            : "py-[75px] max-[768px]:py-[85px] md:py-[100px] lg:py-[135px]"
        }`}
      >
        <div style={{ maxWidth: textMaxWidth }}>
          <Typography
            variant="h3"
            uppercase
            weight="normal"
            className="reveal m-0 mb-3 md:mb-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ color: FontColorHeading || undefined }}
          >
            {Heading || "Solving the toughest network challenges"}
          </Typography>

          <Typography
            variant="b1"
            weight="normal"
            className="reveal stagger-1 m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] text-white/80"
            style={{ color: FontColorDescription || undefined }}
            dangerouslySetInnerHTML={{
              __html:
                Description ||
                "Deploying a small cell or distributed antenna system (DAS) network involves careful planning, precision engineering, and efficient coordination. Whether in dense neighborhoods, difficult terrain, or high-traffic venues and buildings, our customers rely on our deep expertise and established relationships across the country to help them solve even the most unique coverage and capacity challenges.",
            }}
          />

          {CTALabel && CTALink && (
            <div className="reveal stagger-2 mt-6 md:mt-8 lg:mt-10">
              <Link
                href={CTALink}
                className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-teal text-midnight font-heading text-[0.85rem] md:text-[0.9rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all duration-300 border-2 border-teal hover:bg-transparent hover:text-teal whitespace-nowrap"
              >
                {CTALabel}
              </Link>
            </div>
          )}
        </div>
      </div>

      {hasCards && (
        <div className="bg-feature-cards-wrap relative z-[2] pt-3 pb-8 max-[768px]:pt-5 max-[768px]:pb-9 md:pt-6 md:pb-11 lg:pt-11 lg:pb-16 xl:pt-15 xl:pb-[70px]">
          <div className="container">
            <div className="reveal stagger-2 challenges-pillars grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-[clamp(40px,5vw,80px)] w-full max-w-full mx-auto">
              {cardsToRender.map((card: FeatureCard, index: number) => (
                <div
                  className="challenges-pillar flex flex-col items-center text-center p-0"
                  key={index}
                >
                  <Typography
                    variant="h4"
                    uppercase
                    weight="bold"
                    className="challenges-pillar-label m-0 mb-1.5 md:mb-2 lg:mb-3 text-teal [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] max-[600px]:[text-shadow:none] whitespace-nowrap"
                    style={{ color: card.HeadingColor || undefined }}
                  >
                    {card.Heading || card.title}
                  </Typography>
                  <Typography
                    variant="b2"
                    weight="normal"
                    className="challenges-pillar-desc m-0 text-white/85 max-w-[380px] mx-auto text-center"
                    style={{ color: card.TextColor || undefined }}
                  >
                    {card.Description || card.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
