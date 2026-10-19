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
    <section className="shared-img-hero relative min-h-[80vh] flex items-center overflow-hidden" id={id}>
      <div className="shared-img-hero-bg absolute inset-0 z-[1]">
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
      <div className="shared-img-hero-overlay absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(13,18,36,0.85)_0%,rgba(13,18,36,0.5)_12%,rgba(13,18,36,0.2)_22%,transparent_35%),radial-gradient(ellipse_120%_70%_at_50%_55%,rgba(13,18,36,0.65)_0%,rgba(13,18,36,0.35)_40%,transparent_70%)]" />
      <div className="container shared-img-hero-content mx-auto relative z-[3] px-6 pt-[150px] pb-[100px] text-center w-full">
        <h1
          className="shared-img-hero-heading font-heading text-[clamp(1.85rem,3.5vw,2.95rem)] font-normal uppercase tracking-[0.12em] leading-[1.2] text-white max-w-[1400px] mx-auto mb-[18px] [text-shadow:0_2px_8px_rgba(0,0,0,0.8),0_4px_24px_rgba(0,0,0,0.6),0_8px_48px_rgba(0,0,0,0.4)] reveal stagger-1"
          dangerouslySetInnerHTML={{ __html: heading || "" }}
          style={maxWidthTitle ? { maxWidth: maxWidthTitle, marginLeft: "auto", marginRight: "auto" } : undefined}
        />

        {intro && (
          <p
            className="shared-img-hero-intro font-body text-[clamp(1.02rem,1.5vw,1.22rem)] leading-[1.3] text-white/85 max-w-[920px] mx-auto [text-wrap:balance] [text-shadow:0_1px_12px_rgba(0,0,0,0.4),0_2px_20px_rgba(0,0,0,0.25)] reveal stagger-2"
            style={maxWidthDescription ? { maxWidth: maxWidthDescription, marginLeft: "auto", marginRight: "auto" } : undefined}
          >
            {intro}
          </p>
        )}

        {ctaText && ctaLink && (
          <div className="reveal stagger-3">
            {isExternalLink ? (
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shared-img-hero-cta inline-block px-11 py-3.5 rounded-full bg-teal/80 text-black border-2 border-teal/80 font-heading text-[0.9rem] font-semibold tracking-[0.06em] uppercase no-underline transition-all duration-350 ease-[cubic-bezier(0.2,1,0.2,1)] mt-10 hover:bg-transparent hover:border-white hover:text-white hover:-translate-y-0.5"
              >
                {ctaText}
              </a>
            ) : (
              <Link
                href={ctaLink}
                className="shared-img-hero-cta inline-block px-11 py-3.5 rounded-full bg-teal/80 text-black border-2 border-teal/80 font-heading text-[0.9rem] font-semibold tracking-[0.06em] uppercase no-underline transition-all duration-350 ease-[cubic-bezier(0.2,1,0.2,1)] mt-10 hover:bg-transparent hover:border-white hover:text-white hover:-translate-y-0.5"
              >
                {ctaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
