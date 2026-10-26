import React from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography, Button } from "@ui-element";
import { ArrowRightSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";

interface ImageSplitProps {
  data: {
    Heading?: string;
    Description?: string;
    Image?: {
      url?: string;
      alternativeText?: string;
      data?: { attributes?: { url?: string; alternativeText?: string } };
    } | null;
    CTAText?: string;
    CTAUrl?: string;
    ImageAlignment?: string;
    BgGradient?: string;
    HeadingColor?: string;
    DescriptionColor?: string;
  };
}

export default function ImageSplit({ data }: ImageSplitProps) {
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
  const imgUrl = rawImgUrl ? GetStrapiMediaUrl(rawImgUrl) : "/images/placeholder.png";

  const isMediaLeft = ImageAlignment === "Left" || ImageAlignment === "Media Left";

  // Determine background based on BgGradient string from Strapi
  let bgStyle = { background: "#ffffff" }; // Default
  if (BgGradient && BgGradient.includes("gradient")) {
    bgStyle = { background: BgGradient };
  } else if (BgGradient === "Peach") {
    bgStyle = {
      background: "linear-gradient(135deg, #fff5ef 0%, #ffdac8 35%, #ffe4d4 65%, #fff0e8 100%)",
    };
  } else if (BgGradient === "Teal") {
    bgStyle = {
      background: "linear-gradient(135deg, #e3fdfa 0%, #b8f7f0 35%, #c8f9f3 65%, #e0fcf9 100%)",
    };
  } else if (BgGradient) {
    bgStyle = { background: BgGradient };
  }

  return (
    <section
      className="shared-image-split relative overflow-hidden py-24 flex items-center"
      style={bgStyle}
    >
      <Container className="relative z-[1]">
        <div
          className={`image-split-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isMediaLeft ? "image-split-reverse" : ""}`}
        >
          {/* Text Content Area */}
          <div
            className={`image-split-text flex flex-col ${isMediaLeft ? "lg:order-2" : "lg:order-1"}`}
          >
            {Heading && (
              <Typography
                as="h2"
                variant="h2"
                uppercase
                className="text-left tracking-[0.06em] leading-[1.4] text-midnight mb-6"
                style={{ color: HeadingColor || undefined }}
              >
                {Heading}
              </Typography>
            )}

            {Description && (
              <div
                className="strapi-richtext-body text-[1.05rem] leading-[1.8] text-midnight mb-10 opacity-85 flex flex-col gap-4 [&>p]:mb-0"
                style={{ color: DescriptionColor || undefined }}
                dangerouslySetInnerHTML={{ __html: Description }}
              />
            )}

            {CTAText && CTAUrl && (
              <Button
                href={CTAUrl}
                color="primary"
                rightIcon={<ArrowRightSvg />}
                className="self-start"
              >
                {CTAText}
              </Button>
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
      </Container>
    </section>
  );
}
