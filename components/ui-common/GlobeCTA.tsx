import Image from "next/image";
import Link from "next/link";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

interface GlobeCTAProps {
  title?: string;
  heading?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

export default function GlobeCTA({
  title,
  heading,
  description,
  buttonText,
  buttonLink,
}: GlobeCTAProps) {
  return (
    <section className="py-24 max-md:pt-10 max-md:pb-[270px] bg-gradient-to-br from-[#FFFFCA] via-[#FFF8E1] to-[#FFDAC8] relative overflow-hidden z-[1] max-md:block">
      <div
        className="absolute -right-[8%] top-1/2 -translate-y-1/2 -rotate-[25deg] w-[720px] h-[130%] pointer-events-none max-md:left-1/2 max-md:-translate-x-[51.7%] max-md:bottom-[-110px] max-md:top-auto max-md:right-auto max-md:w-[120%] max-md:max-w-[440px] max-md:h-auto max-md:aspect-[1.15/1] max-md:block max-md:overflow-visible max-md:z-[-1] max-md:rotate-0"
        aria-hidden="true"
      >
        <Image
          src="/assets/images/connection-globe-blue.svg"
          alt=""
          width={993}
          height={958}
          unoptimized
          className="w-full h-full opacity-55 block"
        />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-[#ffdac8]/40 to-[#ffdac8] pointer-events-none" />
      </div>

      <Container className="relative z-[1]">
        <div className="sol-split reveal flex items-center">
          <div className="sol-split-text max-w-[580px]">
            {description ? (
              <>
                <Typography
                  as="h2"
                  variant="h2"
                  uppercase
                  weight="light"
                  className="section-title text-left mb-5 text-midnight whitespace-normal sm:whitespace-nowrap leading-tight"
                >
                  {heading || title}
                </Typography>
                <div
                  className="strapi-richtext-body text-base md:text-[1.05rem] leading-relaxed md:leading-[1.8] text-midnight mb-6 md:mb-9 flex flex-col gap-4 [&>p]:mb-0 font-light"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </>
            ) : (
              <Typography
                as="p"
                variant="h3"
                weight="light"
                className="!tracking-normal !text-[clamp(1.15rem,2.5vw,1.7rem)] leading-[1.5] text-midnight mb-6 md:mb-9 max-w-[580px] [text-wrap:balance]"
              >
                {title || heading}
              </Typography>
            )}
            <Link
              href={buttonLink}
              className="inline-block px-7 sm:px-10 py-2.5 sm:py-3.5 rounded-full bg-midnight text-white font-heading text-[0.8rem] sm:text-[0.9rem] font-medium tracking-[0.06em] uppercase no-underline transition-all duration-350 ease-[cubic-bezier(0.2,1,0.2,1)] border-2 border-transparent hover:bg-transparent hover:text-midnight hover:border-midnight hover:-translate-y-0.5 mt-4 sm:mt-0"
            >
              {buttonText}
            </Link>
          </div>
          <div />
        </div>
      </Container>
    </section>
  );
}
