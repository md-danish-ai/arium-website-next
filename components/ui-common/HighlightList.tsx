import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { ChevronsRightSvg } from "@ui-svg";

interface HighlightItem {
  id?: number;
  ListName: string;
}

interface HighlightListProps {
  heading: string;
  description: string;
  image?: {
    url?: string;
    alternativeText?: string;
    data?: { attributes?: { url?: string; alternativeText?: string } };
  } | null;
  ctaLabel?: string;
  ctaUrl?: string;
  listItems: HighlightItem[];
}

export default function HighlightList({
  heading,
  description,
  image,
  ctaLabel,
  ctaUrl,
  listItems,
}: HighlightListProps) {
  if (!heading && !listItems?.length) return null;

  const imgUrl = image?.url || image?.data?.attributes?.url;
  const absoluteImgUrl = imgUrl ? GetStrapiMediaUrl(imgUrl) : null;

  return (
    <section
      className="shared-hl-section section-light bg-[radial-gradient(circle,#fff_0%,#f6f8fa_40%,#edf3f2_75%,#efeaf7_100%)] py-28 relative overflow-hidden"
      id="highlight-list"
    >
      <div
        className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-[2]">
        {/* Centered Header */}
        <div className="shared-hl-header text-center mb-14">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="section-title reveal stagger-1 tracking-[0.06em] max-w-[880px] mx-auto leading-[1.45] text-midnight"
          >
            {heading}
          </Typography>
          {description && (
            <div
              className="reveal stagger-1 shared-hl-desc text-midnight/80 text-[1.05rem] leading-[1.8] max-w-[800px] mx-auto mt-5 flex flex-col gap-4 [&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className="shared-hl-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT: Job list + CTA */}
          <div className="shared-hl-left flex flex-col justify-between">
            <div className="shared-hl-list flex flex-col divide-y divide-midnight/10">
              {listItems?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`shared-hl-box reveal stagger-${(index % 5) + 1} py-6 flex items-center`}
                  >
                    <Typography
                      as="h3"
                      variant="b2"
                      weight="medium"
                      className="shared-hl-box-title inline-flex items-center gap-3 text-midnight m-0 text-left"
                    >
                      <ChevronsRightSvg className="w-5 h-5 shrink-0 text-[#7C5CBF]" />
                      {item.ListName}
                    </Typography>
                  </div>
                );
              })}
            </div>

            {ctaLabel && ctaUrl && (
              <div className="reveal stagger-5 shared-hl-cta mt-9">
                <Link
                  href={ctaUrl}
                  target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                  rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-block px-10 py-3.5 rounded-full bg-midnight text-white font-heading text-sm font-semibold tracking-wider uppercase no-underline border border-midnight transition-all duration-300 hover:bg-transparent hover:text-midnight hover:-translate-y-0.5"
                >
                  {ctaLabel}
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT: Image */}
          <div className="shared-hl-right reveal h-full">
            {absoluteImgUrl && (
              <div className="shared-hl-img-box relative rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(22,32,71,0.08),0_0_40px_rgba(0,232,217,0.04)] h-full min-h-[360px]">
                <Image
                  src={absoluteImgUrl}
                  alt={image?.alternativeText || heading || "Highlight Image"}
                  fill
                  className="object-cover block"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="shared-hl-img-overlay absolute inset-0 rounded-2xl border border-midnight/10 pointer-events-none" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
