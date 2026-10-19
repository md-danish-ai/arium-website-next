"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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

  const getFullUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith('http') ? url : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${url}`;
  };

  const finalDesktopUrl = getFullUrl(desktopUrl) || "/assets/images/challenges-bg.png"; // Fallback image
  const finalMobileUrl = getFullUrl(mobileUrl) || finalDesktopUrl;

  const defaultFeatureCards: FeatureCard[] = [
    { Heading: "Design", Description: "We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity." },
    { Heading: "Implement", Description: "We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure." },
    { Heading: "Optimize", Description: "We partner with leading firms to conduct radio frequency (RF) testing and optimization, ensuring the network continues to perform as expected." }
  ];

  const cardsToRender = FeatureCards && FeatureCards.length > 0 ? FeatureCards : (!CTALabel && !CTALink ? defaultFeatureCards : []);
  const hasCards = cardsToRender.length > 0;
  const topPadding = hasCards ? "180px" : "160px";
  const bottomPadding = hasCards ? "60px" : "160px";
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
        className="container bg-feature-container relative z-[2]" 
        style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}
      >
        <div style={{ maxWidth: textMaxWidth }}>
          <h2 
            className="section-title reveal text-[clamp(1.8rem,3vw,2.4rem)] font-normal tracking-[0.06em] uppercase mb-6 leading-[1.45] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" 
            style={{ color: FontColorHeading || undefined }}
          >
            {Heading || "Solving the toughest network challenges"}
          </h2>

          <p 
            className="reveal stagger-1 text-[1.05rem] leading-[1.8] m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] text-white/80" 
            style={{ color: FontColorDescription || undefined }} 
            dangerouslySetInnerHTML={{ __html: Description || "Deploying a small cell or distributed antenna system (DAS) network involves careful planning, precision engineering, and efficient coordination. Whether in dense neighborhoods, difficult terrain, or high-traffic venues and buildings, our customers rely on our deep expertise and established relationships across the country to help them solve even the most unique coverage and capacity challenges." }} 
          />

          {CTALabel && CTALink && (
            <div className="reveal stagger-2 mt-10">
              <Link
                href={CTALink}
                className="inline-block px-10 py-3.5 rounded-full bg-teal text-midnight font-heading text-[0.9rem] font-semibold tracking-[0.06em] uppercase no-underline transition-all duration-300 border-2 border-teal hover:bg-transparent hover:text-teal"
              >
                {CTALabel}
              </Link>
            </div>
          )}
        </div>
      </div>

      {hasCards && (
        <div className="bg-feature-cards-wrap">
          <div className="container">
            <div className="reveal stagger-2 challenges-pillars">
              {cardsToRender.map((card: any, index: number) => (
                <div className="challenges-pillar" key={index}>
                  <div className="challenges-pillar-label" style={{ color: card.HeadingColor || undefined }}>
                    {card.Heading || card.title}
                  </div>
                  <p className="challenges-pillar-desc" style={{ color: card.TextColor || undefined }}>
                    {card.Description || card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
