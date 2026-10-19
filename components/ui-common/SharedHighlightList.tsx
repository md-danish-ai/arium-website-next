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
    <section className="shared-hl-section section-light bg-[radial-gradient(circle,#fff_0%,#f6f8fa_40%,#edf3f2_75%,#efeaf7_100%)] py-28 relative overflow-hidden" id="highlight-list">
      <div className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-[2]">
        {/* Centered Header */}
        <div className="shared-hl-header text-center mb-14">
          <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-[0.06em] max-w-[880px] mx-auto text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.45] text-midnight">
            {heading}
          </h2>
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
                    <h3 className="shared-hl-box-title inline-flex items-center gap-3 text-midnight text-[0.95rem] font-medium m-0 text-left">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-[#7C5CBF]">
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
              <div className="reveal stagger-5 shared-hl-cta mt-9">
                <Link
                  href={ctaUrl}
                  target={ctaUrl.startsWith("http") ? "_blank" : undefined}
                  rel={ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-primary inline-block px-10 py-3.5 rounded-full bg-midnight text-white font-heading text-sm font-semibold tracking-wider uppercase no-underline border border-midnight transition-all duration-300 hover:bg-transparent hover:text-midnight hover:-translate-y-0.5"
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
                <img
                  src={absoluteImgUrl}
                  alt={image?.alternativeText || heading || "Highlight Image"}
                  className="w-full h-full object-cover block"
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
