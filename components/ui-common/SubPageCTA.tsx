import React from "react";
import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { resolveStrapiImage } from "@utils";

export interface SubPageCTAProps {
  prompt_to_cta?: string;
  CTA_text?: string;
  CTA_url?: string;
  background_gradient?: string | null;
  globe_illustration?: unknown;
}

export default function SubPageCTA({
  prompt_to_cta = "",
  CTA_text = "",
  CTA_url = "#",
  background_gradient,
  globe_illustration,
}: SubPageCTAProps) {
  const displayBg =
    background_gradient ||
    "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(255, 248, 225) 40%, rgb(255, 218, 200) 100%)";

  const displayImg = resolveStrapiImage(
    globe_illustration,
    "/images/svg-images/connection-globe.svg"
  );
  const isSvg = displayImg.toLowerCase().endsWith(".svg") || displayImg.includes(".svg");

  return (
    <section className="relative overflow-hidden z-[1]" style={{ background: displayBg }}>
      <Container className="relative z-[2]">
        <div className="w-full max-w-full md:max-w-[580px] lg:max-w-[650px] py-14 sm:py-16 md:py-20 text-left">
          {prompt_to_cta ? (
            <Typography
              as="p"
              variant="h3"
              weight="light"
              className="reveal stagger-1 !tracking-normal leading-[1.5] text-midnight mb-6 md:mb-8 [text-wrap:balance]"
            >
              {prompt_to_cta}
            </Typography>
          ) : null}
          {CTA_text ? (
            <div className="reveal stagger-2 flex justify-start">
              <Button href={CTA_url} color="primary">
                {CTA_text}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>

      <div
        className="absolute top-0 bottom-0 right-[-5%] sm:right-[-1%] md:right-[1%] lg:right-[-2%] h-full pointer-events-none z-[1] flex items-center justify-end overflow-visible opacity-20 sm:opacity-25 md:opacity-40 lg:opacity-65 transition-opacity duration-300"
        aria-hidden="true"
      >
        {displayImg ? (
          <div className="relative h-[80%] sm:h-[80%] md:h-[85%] lg:h-[90%] aspect-[950/713] flex items-center justify-center -rotate-[25deg]">
            <Image
              src={displayImg}
              alt=""
              width={950}
              height={713}
              unoptimized={isSvg}
              className="w-full h-full block object-contain"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
