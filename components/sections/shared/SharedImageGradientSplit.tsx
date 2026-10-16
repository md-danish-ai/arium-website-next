import React from "react";
import Link from "next/link";

interface SectionPointer {
  id?: number;
  Heading: string;
  Description: string;
  FontHeading?: string;
  FontDescription?: string;
}

interface SharedImageGradientSplitProps {
  heading: string;
  description: string;
  sectionPointers?: SectionPointer[];
  ctaText?: string;
  ctaUrl?: string;
  bgImage?: any;
  HeadingColor?: string;
  DescriptionTextColor?: string;
}

export default function SharedImageGradientSplit({
  heading,
  description,
  sectionPointers,
  ctaText,
  ctaUrl,
  bgImage,
  HeadingColor,
  DescriptionTextColor,
}: SharedImageGradientSplitProps) {
  if (!heading && !description) return null;

  let desktopUrl = "";
  let mobileUrl = "";

  const extractUrl = (item: any) => item?.attributes?.url || item?.url || "";
  const getWidth = (item: any) => item?.attributes?.width || item?.width || 0;

  let images: any[] = [];
  if (Array.isArray(bgImage)) {
    images = bgImage;
  } else if (bgImage?.data && Array.isArray(bgImage.data)) {
    images = bgImage.data;
  }

  if (images.length >= 2) {
    const sorted = [...images].sort((a, b) => getWidth(b) - getWidth(a));
    if (getWidth(sorted[0]) === getWidth(sorted[1])) {
      const isFirstMobile = extractUrl(images[0]).toLowerCase().includes('mobile') || extractUrl(images[0]).includes('1080x');
      if (isFirstMobile) {
        desktopUrl = extractUrl(images[1]);
        mobileUrl = extractUrl(images[0]);
      } else {
        desktopUrl = extractUrl(images[0]);
        mobileUrl = extractUrl(images[1]);
      }
    } else {
      desktopUrl = extractUrl(sorted[0]);
      mobileUrl = extractUrl(sorted[1]);
    }
  } else if (images.length === 1) {
    desktopUrl = extractUrl(images[0]);
    mobileUrl = desktopUrl;
  } else {
    desktopUrl = bgImage?.data?.attributes?.url || (bgImage as any)?.url || "";
    mobileUrl = desktopUrl;
  }

  const getFullUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${url}`;
  };

  const finalDesktopUrl = getFullUrl(desktopUrl) || "/assets/images/arena_wide.jpg";
  const finalMobileUrl = getFullUrl(mobileUrl) || finalDesktopUrl;

  return (
    <section className="shared-igs-section" id="image-gradient-split" style={{ padding: 0 }}>

      <div className="shared-igs-bg">
        <picture style={{ width: "100%", height: "100%", display: "block" }}>
          <source media="(max-width: 767px)" srcSet={finalMobileUrl} />
          <source media="(min-width: 768px)" srcSet={finalDesktopUrl} />
          <img src={finalDesktopUrl} alt={heading || "Section Background"} className="shared-igs-bg-img" />
        </picture>
      </div>

      <div className="shared-igs-veil"></div>

      <div className="container shared-igs-content">
        <div className="shared-igs-inner">
          <h2 className="section-title reveal challenges-heading shared-igs-heading" style={{ color: HeadingColor || undefined }}>
            {heading}
          </h2>
          <p className="reveal stagger-1 shared-igs-body" style={{ color: DescriptionTextColor || undefined }}>
            {description}
          </p>

          <div className="reveal stagger-2 shared-igs-pointers">
            {sectionPointers && sectionPointers.length > 0 ? (
              sectionPointers.map((item, index, array) => (
                <div key={index}>
                  <div style={{ padding: index === 0 ? "0 0 24px 0" : index === array.length - 1 ? "24px 0 0 0" : "24px 0" }}>
                    <div className="shared-igs-pointer-heading" style={{ color: item.FontHeading || undefined }}>{item.Heading}</div>
                    <p className="shared-igs-pointer-desc" style={{ color: item.FontDescription || undefined }}>{item.Description}</p>
                  </div>
                  {index < array.length - 1 && (
                    <div className="shared-igs-divider"></div>
                  )}
                </div>
              ))
            ) : null}
          </div>

          {ctaText && ctaUrl && (
            <div className="reveal stagger-3 shared-igs-cta-wrap">
              <Link
                href={ctaUrl}
                aria-label={`${ctaText}`}
                className="shared-igs-link-cta"
                target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="shared-igs-link-text">{ctaText}</span>
                <svg className="shared-igs-link-arrow" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e8d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="8 17 13 12 8 7"></polyline>
                  <polyline points="14 17 19 12 14 7"></polyline>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
