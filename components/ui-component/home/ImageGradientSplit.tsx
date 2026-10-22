import React from "react";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { ImageGradientSplitProps, SectionPointer } from "./type";

interface MediaItemLike {
  url?: string;
  width?: number;
  attributes?: {
    url?: string;
    width?: number;
  };
}

export default function ImageGradientSplit({
  heading,
  description,
  sectionPointers,
  ctaText,
  ctaUrl,
  bgImage,
  HeadingColor,
  DescriptionTextColor,
}: ImageGradientSplitProps) {
  if (!heading && !description) return null;

  let desktopUrl = "";
  let mobileUrl = "";

  const extractUrl = (item: MediaItemLike | null | undefined) =>
    item?.attributes?.url || item?.url || "";
  const getWidth = (item: MediaItemLike | null | undefined) =>
    item?.attributes?.width || item?.width || 0;

  let images: MediaItemLike[] = [];
  if (Array.isArray(bgImage)) {
    images = bgImage as MediaItemLike[];
  } else if (
    bgImage &&
    typeof bgImage === "object" &&
    "data" in bgImage &&
    Array.isArray((bgImage as { data?: unknown }).data)
  ) {
    images = (bgImage as { data: MediaItemLike[] }).data;
  }

  if (images.length >= 2) {
    const sorted = [...images].sort((a, b) => getWidth(b) - getWidth(a));
    if (getWidth(sorted[0]) === getWidth(sorted[1])) {
      const isFirstMobile =
        extractUrl(images[0]).toLowerCase().includes("mobile") ||
        extractUrl(images[0]).includes("1080x");
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
  } else if (bgImage && typeof bgImage === "object") {
    const singleObj = bgImage as {
      url?: string;
      data?: { attributes?: { url?: string } };
    };
    desktopUrl = singleObj.data?.attributes?.url || singleObj.url || "";
    mobileUrl = desktopUrl;
  }

  const finalDesktopUrl = GetStrapiMediaUrl(desktopUrl) || "/assets/images/arena_wide.jpg";
  const finalMobileUrl = GetStrapiMediaUrl(mobileUrl) || finalDesktopUrl;

  const defaultPointers: SectionPointer[] = [
    {
      Heading: "Reliability",
      Description:
        "Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps and data they depend on.",
    },
    {
      Heading: "Opportunity",
      Description:
        "Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.",
    },
    {
      Heading: "Safety",
      Description:
        "In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters and other first responders can access the essential data they need to do their jobs effectively.",
    },
  ];

  const pointersToRender =
    sectionPointers && sectionPointers.length > 0 ? sectionPointers : defaultPointers;

  return (
    <section
      className="shared-igs-section relative min-h-[720px] overflow-hidden bg-midnight p-0"
      id="image-gradient-split"
    >
      <div className="shared-igs-bg absolute top-0 right-0 bottom-0 w-full md:w-[60%] z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)] md:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_15%,rgba(0,0,0,0.85)_35%,black_50%)]">
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={finalMobileUrl} />
          <source media="(min-width: 768px)" srcSet={finalDesktopUrl} />
          <img
            src={finalDesktopUrl}
            alt={heading || "Section Background"}
            className="shared-igs-bg-img w-full h-full object-cover block"
          />
        </picture>
      </div>

      <div className="shared-igs-veil absolute inset-0 z-[1] bg-gradient-to-t from-[#0a1628]/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-[2] py-12 md:py-16 lg:py-20">
        <div className="shared-igs-inner max-w-[600px]">
          <Typography
            variant="h3"
            uppercase
            className="section-title reveal challenges-heading shared-igs-heading text-white mb-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ color: HeadingColor || undefined }}
          >
            {heading || "Keeping communities safe and connected"}
          </Typography>
          <Typography
            variant="b1"
            className="reveal stagger-1 shared-igs-body text-white/80 m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]"
            style={{ color: DescriptionTextColor || undefined }}
          >
            {description ||
              "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes."}
          </Typography>

          <div className="reveal stagger-2 shared-igs-pointers mt-8 md:mt-9 max-w-[600px] flex flex-col gap-0">
            {pointersToRender.map(
              (item: SectionPointer, index: number, array: SectionPointer[]) => {
                const itemHeading = item.Heading || item.title || "";
                const itemDesc = item.Description || item.description || "";
                return (
                  <div key={index}>
                    <div
                      className={
                        index === 0 ? "pb-6" : index === array.length - 1 ? "pt-6" : "py-6"
                      }
                    >
                      <Typography
                        variant="h5"
                        uppercase
                        className="shared-igs-pointer-heading text-teal mb-1.5"
                        style={{ color: item.FontHeading || undefined }}
                      >
                        {itemHeading}
                      </Typography>
                      <Typography
                        variant="b3"
                        className="shared-igs-pointer-desc text-white/80 m-0"
                        style={{ color: item.FontDescription || undefined }}
                      >
                        {itemDesc}
                      </Typography>
                    </div>
                    {index < array.length - 1 && (
                      <div className="shared-igs-divider w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                    )}
                  </div>
                );
              }
            )}
          </div>

          {ctaText && ctaUrl && (
            <div className="reveal stagger-3 shared-igs-cta-wrap mt-8 md:mt-9">
              <Link
                href={ctaUrl}
                aria-label={`${ctaText}`}
                className="shared-igs-link-cta group inline-flex items-center gap-2 no-underline"
                target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Typography
                  variant="b4"
                  uppercase
                  className="shared-igs-link-text text-white tracking-[0.15em] transition-colors duration-300 group-hover:text-teal"
                >
                  {ctaText}
                </Typography>
                <svg
                  className="shared-igs-link-arrow w-4 h-4 text-teal transition-transform duration-300 group-hover:translate-x-1 inline-block"
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
