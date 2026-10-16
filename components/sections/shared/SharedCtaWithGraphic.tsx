import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SharedCtaWithGraphicProps {
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  graphic?: any;
  bgColor?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function SharedCtaWithGraphic({
  heading,
  description,
  ctaText,
  ctaLink,
  graphic,
  bgColor,
  HeadingColor,
  DescriptionColor,
}: SharedCtaWithGraphicProps) {
  if (!heading && !description) return null;

  const graphicUrl = graphic?.url || graphic?.data?.attributes?.url;
  const absoluteGraphicUrl = graphicUrl
    ? graphicUrl.startsWith("http")
      ? graphicUrl
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${graphicUrl}`
    : "/assets/images/connection-cta.svg";


  return (
    <section 
      className="shared-cta-graphic-section" 
      style={{ background: bgColor || "#D2C7FF" }}
    >
      <div className="shared-cta-graphic-flex-wrapper">
        <div className="shared-cta-graphic-text-col">
          <h2 className="shared-cta-graphic-title reveal stagger-1" style={{ color: HeadingColor || undefined }}>
            {heading}
          </h2>
          <p className="shared-cta-graphic-description reveal stagger-2" style={{ color: DescriptionColor || undefined }}>
            {description}
          </p>
          {ctaText && ctaLink && (
            <div className="shared-cta-graphic-actions reveal stagger-3">
              <Link 
                href={ctaLink} 
                target={ctaLink.startsWith("http") ? "_blank" : undefined}
                rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                className="shared-cta-graphic-btn-outline"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="shared-cta-graphic-illustration-wrap" aria-hidden="true">
        <img 
          src={absoluteGraphicUrl} 
          alt={graphic?.alternativeText || heading || "CTA Graphic"} 
          className="shared-cta-graphic-illustration-img" 
        />
        <div className="shared-cta-graphic-illustration-fade" aria-hidden="true" style={bgColor ? { background: `linear-gradient(90deg, rgba(210, 199, 255, 0) 7.64%, ${bgColor} 101.48%)` } : undefined}></div>
      </div>
    </section>
  );
}
