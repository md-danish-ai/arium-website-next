import React from "react";
import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { BackgroundFeatureSectionProps } from "./type";

export default function BackgroundFeatureSection({
  heading,
  description,
  desktopBgUrl = "/images/backgrounds/challenges.png",
  mobileBgUrl = desktopBgUrl,
  ctaLabel,
  ctaLink,
  cards = [],
  fontColorHeading,
  fontColorDescription,
  maxWidthText,
}: BackgroundFeatureSectionProps) {
  const hasCards = cards.length > 0;
  const textMaxWidth = maxWidthText || (hasCards ? "620px" : "560px");

  return (
    <section className="relative overflow-hidden p-0">
      {/* Desktop Image */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src={desktopBgUrl}
          alt={heading || "Feature Background Desktop"}
          fill
          className="object-cover object-top block"
          aria-hidden="true"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden absolute inset-0 z-0">
        <Image
          src={mobileBgUrl}
          alt={heading || "Feature Background Mobile"}
          fill
          className="object-cover object-top block"
          aria-hidden="true"
        />
      </div>

      {/* Background Veil */}
      <div className="absolute inset-0 z-[1] [background-image:linear-gradient(90deg,rgba(13,18,36,0.92)_0%,rgba(13,18,36,0.82)_38%,rgba(13,18,36,0.45)_60%,transparent_80%)] max-[1079px]:[background-image:none] max-[1079px]:bg-[#0a1628]/80 max-[480px]:bg-[#0a1628]/85" />

      {/* Bottom Gradient (desktop only) */}
      <div className="hidden min-[1080px]:block absolute inset-x-0 bottom-0 h-[380px] z-[1] [background-image:linear-gradient(180deg,transparent_0%,rgba(13,18,36,0.72)_40%,rgba(13,18,36,0.95)_100%)]" />

      <Container
        className={`relative z-[2] ${
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
            style={{ color: fontColorHeading || undefined }}
          >
            {heading}
          </Typography>

          <Typography
            variant="b1"
            weight="normal"
            className="reveal stagger-1 m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)] text-white/80"
            style={{ color: fontColorDescription || undefined }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />

          {ctaLabel && ctaLink && (
            <div className="reveal stagger-2 mt-6 md:mt-8 lg:mt-10">
              <Button href={ctaLink} color="secondary">
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </Container>

      {hasCards && (
        <div className="relative z-[2] pt-3 pb-8 max-[768px]:pt-5 max-[768px]:pb-9 md:pt-6 md:pb-11 lg:pt-11 lg:pb-16 xl:pt-15 xl:pb-[70px]">
          <Container>
            <div className="reveal stagger-2 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-[clamp(40px,5vw,80px)] w-full max-w-full mx-auto">
              {cards.map((card, index) => (
                <div className="flex flex-col items-center text-center p-0" key={card.id ?? index}>
                  <Typography
                    variant="h4"
                    uppercase
                    weight="bold"
                    className="m-0 mb-1.5 md:mb-2 lg:mb-3 text-teal [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] max-[600px]:[text-shadow:none] whitespace-nowrap"
                    style={{ color: card.headingColor || undefined }}
                  >
                    {card.heading}
                  </Typography>
                  <Typography
                    variant="b2"
                    weight="normal"
                    className="m-0 text-white/85 max-w-[380px] mx-auto text-center"
                    style={{ color: card.textColor || undefined }}
                  >
                    {card.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
