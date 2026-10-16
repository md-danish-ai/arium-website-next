"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeatureCard {
  id?: number;
  Heading?: string;
  Description?: string;
  TextColor?: string;
  HeadingColor?: string;
}

interface BackgroundFeatureSectionProps {
  Heading?: string;
  Description?: string;
  BackgroundImage?: any;
  CTALabel?: string;
  CTALink?: string;
  FeatureCards?: FeatureCard[];
  FontColorHeading?: string;
  FontColorDescription?: string;
  MaxWidthText?: string;
}

export default function BackgroundFeatureSection({
  Heading,
  Description,
  BackgroundImage,
  CTALabel,
  CTALink,
  FeatureCards = [],
  FontColorHeading,
  FontColorDescription,
  MaxWidthText,
}: BackgroundFeatureSectionProps) {
  let desktopUrl = "";
  let mobileUrl = "";

  if (Array.isArray(BackgroundImage)) {
    desktopUrl = BackgroundImage[0]?.url || "";
    mobileUrl = BackgroundImage[1]?.url || desktopUrl;
  } else if (BackgroundImage?.data && Array.isArray(BackgroundImage.data)) {
    desktopUrl = BackgroundImage.data[0]?.attributes?.url || "";
    mobileUrl = BackgroundImage.data[1]?.attributes?.url || desktopUrl;
  } else {
    desktopUrl = BackgroundImage?.data?.attributes?.url || (BackgroundImage as any)?.url || "";
    mobileUrl = desktopUrl;
  }

  const getFullUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith('http') ? url : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${url}`;
  };

  const finalDesktopUrl = getFullUrl(desktopUrl) || "/assets/images/challenges-bg.png"; // Fallback image
  const finalMobileUrl = getFullUrl(mobileUrl) || finalDesktopUrl;

  const hasCards = FeatureCards && FeatureCards.length > 0;
  const topPadding = hasCards ? "180px" : "160px";
  const bottomPadding = hasCards ? "60px" : "160px";
  const textMaxWidth = MaxWidthText || (hasCards ? "620px" : "560px");

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: 0 }}>
      <style>{`
        .bg-feature-desktop { display: none; }
        .bg-feature-mobile { display: block; }
        @media (min-width: 768px) {
          .bg-feature-desktop { display: block; }
          .bg-feature-mobile { display: none; }
        }
        @media (max-width: 480px) {
          .challenges-veil {
            background: linear-gradient(153deg, rgba(13, 18, 36, 0.92) 0%, rgba(13, 18, 36, 0.82) 38%, rgba(13, 18, 36, 0.45) 60%, transparent 80%) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1079px) {
          .challenges-veil {
            background: rgba(10, 22, 40, 0.75) !important;
          }
          .challenges-pillars {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
          }
            .challenges-pillar {
        text-align: center !important;
        padding: 0 !important;
    }
            .challenges-pillar-desc {
        font-size: 0.84rem !important;
        line-height: 1.55 !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        text-align: center !important;
    }
         .shared-dcg-panel-card svg {
    margin-top: 0px;
  }
    .shared-igs-heading {
        font-size: 2rem !important;
    }
        }
      `}</style>

      {/* Desktop Image */}
      <div className="bg-feature-desktop" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={finalDesktopUrl}
          alt={Heading || "Feature Background Desktop"}
          fill
          style={{ objectFit: "cover", objectPosition: "center top", display: "block" }}
          aria-hidden="true"
        />
      </div>

      {/* Mobile Image */}
      <div className="bg-feature-mobile" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={finalMobileUrl}
          alt={Heading || "Feature Background Mobile"}
          fill
          style={{ objectFit: "cover", objectPosition: "center top", display: "block" }}
          aria-hidden="true"
        />
      </div>

      <div className="challenges-veil" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(13, 18, 36, 0.92) 0%, rgba(13, 18, 36, 0.82) 38%, rgba(13, 18, 36, 0.45) 60%, transparent 80%)" }}></div>

      <div className="challenges-bottom-gradient" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "380px", zIndex: 1, background: "linear-gradient(180deg, transparent 0%, rgba(13, 18, 36, 0.72) 40%, rgba(13, 18, 36, 0.95) 100%)" }}></div>

      <div className="container bg-feature-container" style={{ position: "relative", zIndex: 2, paddingTop: topPadding, paddingBottom: bottomPadding }}>
        <div style={{ maxWidth: textMaxWidth }}>
          {Heading && (
            <h2 className="section-title reveal" style={{ color: FontColorHeading || "var(--color-white)", fontSize: "2.4rem", fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "24px", lineHeight: 1.45, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              {Heading}
            </h2>
          )}

          {Description && (
            <p className="reveal stagger-1" style={{ color: FontColorDescription || "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.8, margin: 0, textShadow: "0 1px 12px rgba(0,0,0,0.4)" }} dangerouslySetInnerHTML={{ __html: Description }} />
          )}

          {CTALabel && CTALink && (
            <div className="reveal stagger-2" style={{ marginTop: "40px" }}>
              <Link
                href={CTALink}
                style={{
                  display: "inline-block",
                  padding: "14px 40px",
                  borderRadius: "999px",
                  background: "var(--color-sky-teal)",
                  color: "var(--color-midnight-blue)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.35s cubic-bezier(0.2, 1, 0.2, 1)",
                  border: "2px solid var(--color-sky-teal)"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-sky-teal)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-sky-teal)'; e.currentTarget.style.color = 'var(--color-midnight-blue)' }}
              >
                {CTALabel}
              </Link>
            </div>
          )}
        </div>
      </div>

      {FeatureCards && FeatureCards.length > 0 && (
        <div className="bg-feature-cards-wrap">
          <div className="container">
            <div className="reveal stagger-2 challenges-pillars">
              {FeatureCards.map((card, index) => (
                <div className="challenges-pillar" key={index}>
                  <div className="challenges-pillar-label" style={{ color: card.HeadingColor || undefined }}>
                    {card.Heading}
                  </div>
                  <p className="challenges-pillar-desc" style={{ color: card.TextColor || undefined }}>
                    {card.Description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
