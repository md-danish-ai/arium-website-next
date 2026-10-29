import Image from "next/image";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { resolveStrapiImage } from "@utils";

export interface GlobeCTAProps {
  prompt_to_cta?: string;
  CTA_text?: string;
  CTA_url?: string;
  background_gradient?: string | null;
  globe_illustration?: unknown;
}

export default function GlobeCTA({
  prompt_to_cta = "",
  CTA_text = "",
  CTA_url = "#",
  background_gradient,
  globe_illustration,
}: GlobeCTAProps) {
  const displayBg =
    background_gradient ||
    "linear-gradient(135deg, rgb(255, 255, 202) 0%, rgb(255, 248, 225) 40%, rgb(255, 218, 200) 100%)";

  const displayImg = resolveStrapiImage(
    globe_illustration,
    "/images/svg-images/connection-globe.svg"
  );

  return (
    <section
      className="py-24 max-md:pt-10 max-md:pb-[270px] relative overflow-hidden z-[1] max-md:block"
      style={{ background: displayBg }}
    >
      <div
        className="absolute -right-[8%] top-1/2 -translate-y-1/2 -rotate-[25deg] w-[720px] h-[130%] pointer-events-none max-md:left-1/2 max-md:-translate-x-[51.7%] max-md:bottom-[-110px] max-md:top-auto max-md:right-auto max-md:w-[120%] max-md:max-w-[440px] max-md:h-auto max-md:aspect-[1.15/1] max-md:block max-md:overflow-visible max-md:z-[-1] max-md:rotate-0"
        aria-hidden="true"
      >
        {displayImg ? (
          <Image
            src={displayImg}
            alt=""
            width={993}
            height={958}
            unoptimized
            className="w-full h-full opacity-55 block"
          />
        ) : null}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-[#ffdac8]/40 to-[#ffdac8] pointer-events-none" />
      </div>

      <Container className="relative z-[1]">
        <div className="reveal flex items-center">
          <div className="max-w-[580px]">
            {prompt_to_cta ? (
              <Typography
                as="p"
                variant="h3"
                weight="light"
                className="!tracking-normal leading-[1.5] text-midnight mb-6 md:mb-9 max-w-[580px] [text-wrap:balance]"
              >
                {prompt_to_cta}
              </Typography>
            ) : null}
            {CTA_text ? (
              <Button href={CTA_url} color="primary" className="mt-4 sm:mt-0">
                {CTA_text}
              </Button>
            ) : null}
          </div>
          <div />
        </div>
      </Container>
    </section>
  );
}
