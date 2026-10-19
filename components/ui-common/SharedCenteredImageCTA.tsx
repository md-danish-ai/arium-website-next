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

  const bgImageUrl = typeof bgImage === "string" 
    ? bgImage 
    : (bgImage?.url || bgImage?.data?.attributes?.url);
  const absoluteBgImageUrl = bgImageUrl
    ? bgImageUrl.startsWith("http") || bgImageUrl.startsWith("/")
      ? bgImageUrl
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${bgImageUrl}`
    : "/assets/images/careers-bg.jpg";

  return (
    <section className="shared-centered-image-cta-section relative overflow-hidden min-h-[clamp(440px,82vh,620px)]" id="centered-image-cta">
      <div className="shared-centered-image-cta-bg absolute inset-0 z-0">
        <Image 
          src={absoluteBgImageUrl} 
          alt={bgImage?.alternativeText || heading || "Background Image"} 
          fill
          className="shared-centered-image-cta-bg-img w-full h-full object-cover object-[center_40%] block" 
        />
      </div>

      <div className="shared-centered-image-cta-content relative z-[2] flex items-center justify-center min-h-[clamp(440px,82vh,620px)] py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="shared-centered-image-cta-textbox relative max-w-[860px] mx-auto before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[200%] before:h-[250%] before:bg-[radial-gradient(ellipse_at_center,rgba(10,22,40,0.85)_0%,rgba(10,22,40,0.65)_30%,rgba(10,22,40,0.35)_55%,transparent_80%)] before:-z-[1] before:pointer-events-none">
            <h2 
              className="section-title reveal stagger-1 font-heading text-[clamp(1.9rem,0.5rem+2.2vw,2.4rem)] font-normal tracking-[0.06em] leading-[1.45] text-white uppercase" 
              style={{ 
                color: HeadingColor || undefined, 
              }}
            >
              {heading}
            </h2>
            <p className="section-description reveal stagger-2 text-white/85 max-w-[800px] mx-auto mt-4 text-base leading-relaxed" style={{ color: DescriptionColor || undefined }}>
              {text}
            </p>
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
