import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

interface FeatureCard {
  id?: number;
  Heading?: string;
  Description?: string;
  TextColor?: string;
  HeadingColor?: string;
}

interface BackgroundFeatureSectionProps {
  Heading?: string;
  Description?: string;
  BackgroundImage?: any;
  CTALabel?: string;
  CTALink?: string;
  FeatureCards?: FeatureCard[];
  FontColorHeading?: string;
  FontColorDescription?: string;
  MaxWidthText?: string;
}

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
    desktopUrl = BackgroundImage[0]?.url || "";
    mobileUrl = BackgroundImage[1]?.url || desktopUrl;
  } else if (BackgroundImage?.data && Array.isArray(BackgroundImage.data)) {
    desktopUrl = BackgroundImage.data[0]?.attributes?.url || "";
    mobileUrl = BackgroundImage.data[1]?.attributes?.url || desktopUrl;
  } else {
    desktopUrl = BackgroundImage?.data?.attributes?.url || (BackgroundImage as any)?.url || "";
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

      <div className="challenges-veil absolute inset-0 z-[1] [background-image:linear-gradient(90deg,rgba(13,18,36,0.92)_0%,rgba(13,18,36,0.82)_38%,rgba(13,18,36,0.45)_60%,transparent_80%)] max-[480px]:[background-image:linear-gradient(153deg,rgba(13,18,36,0.92)_0%,rgba(13,18,36,0.82)_38%,rgba(13,18,36,0.45)_60%,transparent_80%)]" />

      <div className="challenges-bottom-gradient absolute inset-x-0 bottom-0 h-[380px] z-[1] [background-image:linear-gradient(180deg,transparent_0%,rgba(13,18,36,0.72)_40%,rgba(13,18,36,0.95)_100%)]" />

      <div
        className={`container bg-feature-container relative z-[2] ${
          hasCards ? "pt-24 md:pt-40 lg:pt-44 pb-12 md:pb-16" : "py-24 md:py-36 lg:py-40"
        }`}
      >
        <div style={{ maxWidth: textMaxWidth }}>
          <Typography
            variant="h3"
            uppercase
            className="reveal mb-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ color: FontColorHeading || undefined }}
          >
            {Heading || "Solving the toughest network challenges"}
          </Typography>

          <Typography
            variant="b1"
            className="reveal stagger-1 m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] text-white/80"
            style={{ color: FontColorDescription || undefined }}
            dangerouslySetInnerHTML={{
              __html:
                Description ||
                "Deploying a small cell or distributed antenna system (DAS) network involves careful planning, precision engineering, and efficient coordination. Whether in dense neighborhoods, difficult terrain, or high-traffic venues and buildings, our customers rely on our deep expertise and established relationships across the country to help them solve even the most unique coverage and capacity challenges.",
            }}
          />

          {CTALabel && CTALink && (
            <div className="reveal stagger-2 mt-8 md:mt-10">
              <Link
                href={CTALink}
                className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-teal text-midnight font-heading text-[0.85rem] md:text-[0.9rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all duration-300 border-2 border-teal hover:bg-transparent hover:text-teal"
              >
                {CTALabel}
              </Link>
            </div>
          )}
        </div>
      </div>

      {hasCards && (
        <div className="bg-feature-cards-wrap relative z-[2] pb-12 md:pb-20">
          <div className="container">
            <div className="reveal stagger-2 challenges-pillars grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {cardsToRender.map((card: any, index: number) => (
                <div className="challenges-pillar flex flex-col" key={index}>
                  <Typography
                    variant="h4"
                    uppercase
                    className="challenges-pillar-label mb-2"
                    style={{ color: card.HeadingColor || undefined }}
                  >
                    {card.Heading || card.title}
                  </Typography>
                  <Typography
                    variant="b2"
                    className="challenges-pillar-desc text-white/80"
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
