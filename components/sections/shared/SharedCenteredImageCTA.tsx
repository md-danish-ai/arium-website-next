import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SharedCenteredImageCTAProps {
  heading: string;
  text: string;
  ctaLabel?: string;
  ctaUrl?: string;
  bgImage?: any;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function SharedCenteredImageCTA({
  heading,
  text,
  ctaLabel,
  ctaUrl,
  bgImage,
  HeadingColor,
  DescriptionColor,
}: SharedCenteredImageCTAProps) {
  if (!heading && !text) return null;

  const bgImageUrl = bgImage?.url || bgImage?.data?.attributes?.url;
  const absoluteBgImageUrl = bgImageUrl
    ? bgImageUrl.startsWith("http")
      ? bgImageUrl
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${bgImageUrl}`
    : "/assets/images/careers-bg.jpg";

  return (
    <section className="shared-centered-image-cta-section" id="centered-image-cta">
      <div className="shared-centered-image-cta-bg">
        <Image 
          src={absoluteBgImageUrl} 
          alt={bgImage?.alternativeText || heading || "Background Image"} 
          fill
          style={{ objectFit: "cover" }}
          className="shared-centered-image-cta-bg-img" 
        />
      </div>

      <div className="shared-centered-image-cta-content">
        <div className="container text-center">
          <div className="shared-centered-image-cta-textbox">
            <h2 
              className="section-title reveal stagger-1" 
              style={{ 
                color: HeadingColor || undefined, 
                fontSize: "clamp(1.9rem, 0.5rem + 2.2vw, 2.4rem)", 
                fontWeight: 400,
                letterSpacing: "0.06em",
                lineHeight: 1.45 
              }}
            >
              {heading}
            </h2>
            <p className="section-description reveal stagger-2" style={{ color: DescriptionColor || undefined, maxWidth: "800px", margin: "16px auto 0" }}>
              {text}
            </p>
            {ctaLabel && ctaUrl && (
              <div className="reveal stagger-3" style={{ marginTop: "32px" }}>
                <Link 
                  href={ctaUrl} 
                  target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                  rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-primary"
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
