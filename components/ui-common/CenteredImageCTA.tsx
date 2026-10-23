import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

interface CenteredImageCTAProps {
  heading: string;
  text: string;
  ctaLabel?: string;
  ctaUrl?: string;
  bgImage?:
    | string
    | {
        url?: string;
        alternativeText?: string;
        data?: { attributes?: { url?: string; alternativeText?: string } };
      }
    | null;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function CenteredImageCTA({
  heading,
  text,
  ctaLabel,
  ctaUrl,
  bgImage,
  HeadingColor,
  DescriptionColor,
}: CenteredImageCTAProps) {
  if (!heading && !text) return null;

  const bgImageUrl =
    typeof bgImage === "string" ? bgImage : bgImage?.url || bgImage?.data?.attributes?.url;
  const absoluteBgImageUrl = bgImageUrl
    ? GetStrapiMediaUrl(bgImageUrl)
    : "/assets/images/careers-bg.jpg";

  const altText =
    typeof bgImage === "object" && bgImage !== null
      ? bgImage.alternativeText || heading || "Background Image"
      : heading || "Background Image";

  return (
    <section
      className="shared-centered-image-cta-section relative overflow-hidden min-h-[clamp(440px,82vh,620px)] sm:min-h-[clamp(460px,88vh,720px)]"
      id="centered-image-cta"
    >
      <div className="shared-centered-image-cta-bg absolute inset-0 z-0">
        <Image
          src={absoluteBgImageUrl}
          alt={altText}
          fill
          className="shared-centered-image-cta-bg-img w-full h-full object-cover object-[center_40%] block"
        />
      </div>

      <div className="shared-centered-image-cta-content relative z-[2] flex items-center justify-center min-h-[clamp(440px,82vh,620px)] sm:min-h-[clamp(460px,88vh,720px)] py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="shared-centered-image-cta-textbox relative max-w-[860px] mx-auto before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[200%] before:h-[250%] before:bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.85)_0%,rgba(10,22,40,0.65)_30%,rgba(10,22,40,0.35)_55%,transparent_80%)] before:-z-[1] before:pointer-events-none">
            <Typography
              variant="h3"
              uppercase
              className="section-title reveal stagger-1 text-white text-center"
              style={{
                color: HeadingColor || undefined,
              }}
            >
              {heading}
            </Typography>
            <Typography
              variant="b1"
              className="section-description reveal stagger-2 text-white/85 max-w-[800px] mx-auto mt-4 text-center"
              style={{ color: DescriptionColor || undefined }}
            >
              {text}
            </Typography>
            {ctaLabel && ctaUrl && (
              <div className="reveal stagger-3 mt-8">
                <Link
                  href={ctaUrl}
                  target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                  rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-primary inline-block px-10 py-3.5 rounded-full bg-teal text-midnight font-heading text-sm font-semibold tracking-wider uppercase no-underline transition-all duration-300 hover:bg-white hover:text-midnight hover:-translate-y-0.5 shadow-lg"
                >
                  {ctaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
