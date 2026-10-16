import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HighlightItem {
  id?: number;
  ListName: string;
}

interface SharedHighlightListProps {
  heading: string;
  description: string;
  image?: any;
  ctaLabel?: string;
  ctaUrl?: string;
  listItems: HighlightItem[];
}

export default function SharedHighlightList({
  heading,
  description,
  image,
  ctaLabel,
  ctaUrl,
  listItems,
}: SharedHighlightListProps) {
  if (!heading && !listItems?.length) return null;

  const imgUrl = image?.url || image?.data?.attributes?.url;
  const absoluteImgUrl = imgUrl
    ? imgUrl.startsWith("http")
      ? imgUrl
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${imgUrl}`
    : null;

  return (
    <section className="shared-hl-section section-light" id="highlight-list">
      <div className="infra-grid-bg" aria-hidden="true"></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Centered Header */}
        <div className="shared-hl-header text-center">
          <h2 className="section-title reveal stagger-1">
            {heading}
          </h2>
          {description && (
            <div
              className="reveal stagger-1 shared-hl-desc"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className="shared-hl-grid">
          {/* LEFT: Job list + CTA */}
          <div className="shared-hl-left">
            <div className="shared-hl-list">
              {listItems?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`shared-hl-box reveal stagger-${(index % 5) + 1}`}
                  >
                    <h3 className="shared-hl-box-title" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px", flexShrink: 0, color: "var(--item-accent, #7C5CBF)" }}>
                        <polyline points="6 17 11 12 6 7"/>
                        <polyline points="13 17 18 12 13 7"/>
                      </svg>
                      {item.ListName}
                    </h3>
                  </div>
                );
              })}
            </div>

            {ctaLabel && ctaUrl && (
              <div className="reveal stagger-5 shared-hl-cta">
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

          {/* RIGHT: Image */}
          <div className="shared-hl-right reveal">
            {absoluteImgUrl && (
              <div className="shared-hl-img-box">
                <img
                  src={absoluteImgUrl}
                  alt={image?.alternativeText || heading || "Highlight Image"}
                />
                <div className="shared-hl-img-overlay"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
