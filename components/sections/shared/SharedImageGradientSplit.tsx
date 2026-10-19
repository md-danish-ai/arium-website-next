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
    <section className="shared-igs-section relative min-h-[720px] overflow-hidden bg-midnight p-0" id="image-gradient-split">
      <div className="shared-igs-bg absolute top-0 right-0 bottom-0 w-full md:w-[60%] z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)] md:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={finalMobileUrl} />
          <source media="(min-width: 768px)" srcSet={finalDesktopUrl} />
          <img src={finalDesktopUrl} alt={heading || "Section Background"} className="shared-igs-bg-img w-full h-full object-cover block" />
        </picture>
      </div>

      <div className="shared-igs-veil absolute inset-0 z-[1] bg-gradient-to-t from-[#0a1628]/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-[2] pt-[50px] pb-[54px]">
        <div className="shared-igs-inner max-w-[600px]">
          <h2 className="section-title reveal challenges-heading shared-igs-heading font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-normal tracking-[0.06em] text-white mb-6 leading-[1.45] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ color: HeadingColor || undefined }}>
            {heading}
          </h2>
          <p className="reveal stagger-1 shared-igs-body text-white/80 text-[1.05rem] leading-[1.8] m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]" style={{ color: DescriptionTextColor || undefined }}>
            {description}
          </p>

          <div className="reveal stagger-2 shared-igs-pointers mt-9 max-w-[600px] flex flex-col gap-0">
            {sectionPointers && sectionPointers.length > 0 ? (
              sectionPointers.map((item, index, array) => (
                <div key={index}>
                  <div className={index === 0 ? "pb-6" : index === array.length - 1 ? "pt-6" : "py-6"}>
                    <div className="shared-igs-pointer-heading font-heading text-[1.15rem] font-bold text-teal leading-[1.2] tracking-[0.06em] mb-1.5 uppercase" style={{ color: item.FontHeading || undefined }}>{item.Heading}</div>
                    <p className="shared-igs-pointer-desc text-[0.9rem] leading-[1.65] text-white/80 m-0" style={{ color: item.FontDescription || undefined }}>{item.Description}</p>
                  </div>
                  {index < array.length - 1 && (
                    <div className="shared-igs-divider w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                  )}
                </div>
              ))
            ) : null}
          </div>

          {ctaText && ctaUrl && (
            <div className="reveal stagger-3 shared-igs-cta-wrap mt-9">
              <Link
                href={ctaUrl}
                aria-label={`${ctaText}`}
                className="shared-igs-link-cta group inline-flex items-center gap-2 no-underline"
                target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="shared-igs-link-text text-xs uppercase tracking-[0.15em] text-white font-body font-normal leading-none transition-colors duration-300 group-hover:text-teal">{ctaText}</span>
                <svg className="shared-igs-link-arrow w-4 h-4 text-teal transition-transform duration-300 group-hover:translate-x-1 inline-block" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
