import React from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface CenteredImageCTAProps {
  title?: string;
  description?: string;
  background_image?:
    | string
    | {
        url?: string;
        alternativeText?: string;
        data?: { attributes?: { url?: string; alternativeText?: string } };
      }
    | null;
  CTA_text?: string;
  CTA_url?: string;
  title_color?: string;
  description_color?: string;
}

export default function CenteredImageCTA({
  title,
  description,
  background_image,
  CTA_text,
  CTA_url,
  title_color,
  description_color,
}: CenteredImageCTAProps) {
  if (!title && !description) return null;

  const bgImageUrl =
    typeof background_image === "string"
      ? background_image
      : background_image?.url ||
        background_image?.data?.attributes?.url ||
        "/images/backgrounds/careers.jpg";
  const absoluteBgImageUrl = GetStrapiMediaUrl(bgImageUrl);

  const altText =
    typeof background_image === "object" && background_image !== null
      ? background_image.alternativeText ||
        background_image?.data?.attributes?.alternativeText ||
        title ||
        "Background Image"
      : title || "Background Image";

  return (
    <section
      className="relative overflow-hidden min-h-[clamp(440px,82vh,620px)] sm:min-h-[clamp(460px,88vh,720px)]"
      id="centered-image-cta"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={absoluteBgImageUrl}
          alt={altText}
          fill
          className="w-full h-full object-cover object-[center_40%] block"
        />
      </div>

      <div className="relative z-[2] flex items-center justify-center min-h-[clamp(440px,82vh,620px)] sm:min-h-[clamp(460px,88vh,720px)] py-16">
        <Container className="text-center">
          <div className="relative max-w-[860px] mx-auto before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[200%] before:h-[250%] before:bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.85)_0%,rgba(10,22,40,0.65)_30%,rgba(10,22,40,0.35)_55%,transparent_80%)] before:-z-[1] before:pointer-events-none">
            <Typography
              variant="h3"
              uppercase
              className="section-title reveal stagger-1 text-white text-center"
              style={{
                color: title_color || undefined,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="b1"
              className="section-description reveal stagger-2 text-white/85 max-w-[800px] mx-auto mt-4 text-center"
              style={{ color: description_color || undefined }}
            >
              {description}
            </Typography>
            {CTA_text && CTA_url && (
              <div className="reveal stagger-3 mt-8">
                <Button href={CTA_url} color="secondary" size="md">
                  {CTA_text}
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
