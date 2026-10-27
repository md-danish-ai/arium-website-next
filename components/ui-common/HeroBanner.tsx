import React from "react";
import Image from "next/image";
import { Typography, Button, type ButtonColor, type ButtonVariant } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

interface HeroBannerProps {
  id?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  heading?: React.ReactNode;
  intro?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  isExternalLink?: boolean;
  maxWidthTitle?: string | number;
  maxWidthDescription?: string | number;
  objectPosition?: string;
  ctaColor?: ButtonColor;
  ctaVariant?: ButtonVariant;
}

const formatMaxWidth = (val?: string | number) => {
  if (!val) return undefined;
  if (typeof val === "number") return `${val}px`;
  return /^\d+$/.test(val.trim()) ? `${val.trim()}px` : val;
};

export default function HeroBanner({
  id = "hero-section",
  imageSrc,
  videoSrc,
  imageAlt = "",
  heading,
  intro,
  ctaText,
  ctaLink,
  isExternalLink = false,
  maxWidthTitle,
  maxWidthDescription,
  objectPosition = "center top",
  ctaColor = "secondary",
  ctaVariant = "filled",
}: HeroBannerProps) {
  const finalObjectPosition = objectPosition || "center top";
  const isExternal =
    isExternalLink ||
    (typeof ctaLink === "string" &&
      (ctaLink.startsWith("http://") || ctaLink.startsWith("https://")));

  return (
    <section
      className="relative min-h-[80vh] max-md:min-h-[60vh] flex items-center overflow-hidden"
      id={id}
    >
      <div className="absolute inset-0 z-[1]">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover block"
            style={{ objectPosition: finalObjectPosition }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover block"
            style={{ objectPosition: finalObjectPosition }}
            priority
          />
        ) : null}
      </div>
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(13,18,36,0.85)_0%,rgba(13,18,36,0.5)_12%,rgba(13,18,36,0.2)_22%,transparent_35%),radial-gradient(ellipse_120%_70%_at_50%_55%,rgba(13,18,36,0.65)_0%,rgba(13,18,36,0.35)_40%,transparent_70%)]" />
      <Container className="relative z-[3] pt-[130px] md:pt-[150px] pb-[80px] md:pb-[100px] text-center w-full">
        {heading && (
          <Typography
            variant="h1"
            uppercase
            className="text-white max-w-[1400px] mx-auto m-0 mb-[18px] [text-shadow:0_2px_8px_rgba(0,0,0,0.8),0_4px_24px_rgba(0,0,0,0.6),0_8px_48px_rgba(0,0,0,0.4)] reveal stagger-1"
            dangerouslySetInnerHTML={typeof heading === "string" ? { __html: heading } : undefined}
            style={
              maxWidthTitle
                ? {
                    maxWidth: formatMaxWidth(maxWidthTitle),
                    marginLeft: "auto",
                    marginRight: "auto",
                  }
                : undefined
            }
          >
            {typeof heading !== "string" ? heading : undefined}
          </Typography>
        )}

        {intro && (
          <Typography
            variant="b1"
            className="text-white/85 max-w-[920px] mx-auto m-0 [text-wrap:balance] [text-shadow:0_1px_12px_rgba(0,0,0,0.4),0_2px_20px_rgba(0,0,0,0.25)] reveal stagger-2"
            dangerouslySetInnerHTML={typeof intro === "string" ? { __html: intro } : undefined}
            style={
              maxWidthDescription
                ? {
                    maxWidth: formatMaxWidth(maxWidthDescription),
                    marginLeft: "auto",
                    marginRight: "auto",
                  }
                : undefined
            }
          >
            {typeof intro !== "string" ? intro : undefined}
          </Typography>
        )}

        {ctaText && ctaLink && (
          <div className="reveal stagger-3">
            <Button
              href={ctaLink}
              isExternal={isExternal}
              color={ctaColor}
              variant={ctaVariant}
              className="mt-8 md:mt-10"
            >
              {ctaText}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
