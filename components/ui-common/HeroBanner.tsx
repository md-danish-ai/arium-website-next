import React from "react";
import Image from "next/image";
import { Typography, Button, type ButtonColor, type ButtonVariant } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface HeroBannerProps {
  id?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
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
  title,
  description,
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
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(#0d1224b3_0%,#0d122461_10%,#0d12241a_18%,transparent_26%),radial-gradient(120%_38%_at_50%_55%,#0d122480_0%,#0d122447_40%,transparent_75%)] [-webkit-mask-image:linear-gradient(#000_0%_10%,transparent_28%),radial-gradient(120%_38%_at_50%_55%,#000_20%,transparent_75%)] [mask-image:linear-gradient(#000_0%_10%,transparent_28%),radial-gradient(120%_38%_at_50%_55%,#000_20%,transparent_75%)] [-webkit-mask-composite:source-over] [mask-composite:add] pointer-events-none" />
      <Container className="relative z-[3] pt-[100px] md:pt-[150px] pb-[30px] md:pb-[100px] text-center w-full">
        {title && (
          <Typography
            variant="h1"
            weight="normal"
            uppercase
            className="text-white max-w-[1400px] mx-auto m-0 mb-[18px] max-md:mb-[16px] [text-shadow:0_2px_8px_rgba(0,0,0,0.8),0_4px_24px_rgba(0,0,0,0.6),0_8px_48px_rgba(0,0,0,0.4)] reveal stagger-1"
            dangerouslySetInnerHTML={typeof title === "string" ? { __html: title } : undefined}
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
            {typeof title !== "string" ? title : undefined}
          </Typography>
        )}

        {description && (
          <Typography
            variant="b1"
            className="text-white/85 max-w-[920px] mx-auto m-0 [text-wrap:balance] max-md:mb-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.4),0_2px_20px_rgba(0,0,0,0.25)] reveal stagger-2"
            dangerouslySetInnerHTML={
              typeof description === "string" ? { __html: description } : undefined
            }
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
            {typeof description !== "string" ? description : undefined}
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
