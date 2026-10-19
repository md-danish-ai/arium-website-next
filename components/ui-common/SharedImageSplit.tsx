import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStrapiMediaUrl } from "@lib/strapi";

interface SharedImageSplitProps {
  data: {
    Heading?: string;
    Description?: string;
    Image?: any;
    CTAText?: string;
    CTAUrl?: string;
    ImageAlignment?: string;
    BgGradient?: string;
    HeadingColor?: string;
    DescriptionColor?: string;
  };
}

export default function SharedImageSplit({ data }: SharedImageSplitProps) {
  const {
    Heading,
    Description,
    Image: mediaObj,
    CTAText,
    CTAUrl,
    ImageAlignment,
    BgGradient,
    HeadingColor,
    DescriptionColor,
  } = data;

  const rawImgUrl = mediaObj?.url || mediaObj?.data?.attributes?.url;
  const imgUrl = rawImgUrl
    ? GetStrapiMediaUrl(rawImgUrl)
    : "/assets/images/placeholder.png";

  const isMediaLeft = ImageAlignment === "Left" || ImageAlignment === "Media Left";

  // Determine background based on BgGradient string from Strapi
  let bgStyle = { background: "#ffffff" }; // Default
  if (BgGradient && BgGradient.includes("gradient")) {
    bgStyle = { background: BgGradient };
  } else if (BgGradient === "Peach") {
    bgStyle = { background: "linear-gradient(135deg, #fff5ef 0%, #ffdac8 35%, #ffe4d4 65%, #fff0e8 100%)" };
  } else if (BgGradient === "Teal") {
    bgStyle = { background: "linear-gradient(135deg, #e3fdfa 0%, #b8f7f0 35%, #c8f9f3 65%, #e0fcf9 100%)" };
  } else if (BgGradient) {
    bgStyle = { background: BgGradient };
  }

  return (
    <section
      className="shared-image-split relative overflow-hidden py-24 flex items-center"
      style={bgStyle}
    >
      <div className="container mx-auto px-6 relative z-[1]">
        <div
          className={`image-split-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isMediaLeft ? "image-split-reverse" : ""}`}
        >
          {/* Text Content Area */}
          <div className={`image-split-text flex flex-col ${isMediaLeft ? "lg:order-2" : "lg:order-1"}`}>
            {Heading && (
              <h2
                className="font-heading text-left font-normal tracking-[0.06em] text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.4] text-midnight mb-6 uppercase"
                style={{ color: HeadingColor || undefined }}
              >
                {Heading}
              </h2>
            )}

            {Description && (
              <div
                className="strapi-richtext-body text-[1.05rem] leading-[1.8] text-midnight mb-10 opacity-85 flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: DescriptionColor || undefined }}
                dangerouslySetInnerHTML={{ __html: Description }}
              />
            )}

            {CTAText && CTAUrl && (
              <Link
                href={CTAUrl}
                className="image-split-cta inline-flex items-center gap-3 px-8 py-3.5 bg-midnight text-white font-heading text-[0.85rem] font-semibold uppercase tracking-[0.1em] rounded-full border-2 border-midnight hover:bg-transparent hover:text-midnight transition-all duration-300 self-start no-underline"
              >
                {CTAText}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            )}
          </div>

          {/* Media Area */}
          <div
            className={`image-split-media relative w-full h-[360px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(22,32,71,0.08)] ${isMediaLeft ? "lg:order-1" : "lg:order-2"}`}
          >
            <Image
              src={imgUrl}
              alt={Heading || "Split Section Image"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
