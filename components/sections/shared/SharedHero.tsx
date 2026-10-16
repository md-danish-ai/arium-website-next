import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageHeroProps {
  id?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  isExternalLink?: boolean;
  maxWidthTitle?: string;
  maxWidthDescription?: string;
  objectPosition?: string;
}

export default function SharedHero({
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
  objectPosition = "center top"
}: ImageHeroProps) {
  const finalObjectPosition = objectPosition || "center top";

  return (
    <section className="shared-img-hero" id={id}>
      <div className="shared-img-hero-bg">
        {videoSrc ? (
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: finalObjectPosition, display: "block" }}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{ objectFit: "cover", objectPosition: finalObjectPosition, display: "block" }}
            priority
          />
        ) : null}
      </div>
      <div className="shared-img-hero-overlay"></div>
      <div className="container shared-img-hero-content">
        <h1
          className="shared-img-hero-heading reveal stagger-1"
          dangerouslySetInnerHTML={{ __html: heading || "" }}
          style={maxWidthTitle ? { maxWidth: maxWidthTitle, marginLeft: "auto", marginRight: "auto" } : undefined}
        />

        {intro && (
          <p
            className="shared-img-hero-intro reveal stagger-2"
            style={maxWidthDescription ? { maxWidth: maxWidthDescription, marginLeft: "auto", marginRight: "auto" } : undefined}
          >
            {intro}
          </p>
        )}

        {ctaText && ctaLink && (
          <div className="reveal stagger-3">
            {isExternalLink ? (
              <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="shared-img-hero-cta">
                {ctaText}
              </a>
            ) : (
              <Link href={ctaLink} className="shared-img-hero-cta">
                {ctaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
