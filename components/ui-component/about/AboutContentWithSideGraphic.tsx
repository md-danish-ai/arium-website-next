import Image from "next/image";
import { Typography } from "@ui-element";
import { ConnectionIllustrationSvg } from "@ui-svg";
import { Container } from "@ui-layout/SectionContainer";
import { AboutContentWithSideGraphicProps } from "./type";

export default function AboutContentWithSideGraphic({
  heading,
  bodyText,
  isHtmlBody,
  sideImageSrc,
  gradient,
  headingColor,
  descriptionColor,
}: AboutContentWithSideGraphicProps) {
  const defaultGradient = "bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]";
  const backgroundStyle =
    gradient && !gradient.startsWith("bg-") ? { background: gradient } : undefined;
  const gradientClass = gradient?.startsWith("bg-") ? gradient : defaultGradient;

  return (
    <section
      className={`story-section-root py-20 lg:py-24 relative overflow-hidden border-none ${gradientClass}`}
      style={backgroundStyle}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      {sideImageSrc ? (
        <Image
          src={sideImageSrc}
          alt=""
          aria-hidden="true"
          width={800}
          height={800}
          unoptimized={sideImageSrc.endsWith(".svg")}
          className="story-globe-right hidden lg:block absolute -right-8 top-1/2 h-[190%] w-auto translate-x-1/2 -translate-y-1/2 -scale-x-100 opacity-[0.18] [filter:brightness(0)_saturate(0)] pointer-events-none"
        />
      ) : (
        <div className="story-globe-right hidden lg:block absolute -right-8 top-1/2 h-[190%] w-auto translate-x-1/2 -translate-y-1/2 -scale-x-100 opacity-[0.18] [filter:brightness(0)_saturate(0)] pointer-events-none">
          <ConnectionIllustrationSvg className="w-full h-full" />
        </div>
      )}

      <Container className="relative z-[1]">
        <div className="max-w-[760px] text-left">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="reveal text-midnight text-left mb-6 leading-[1.35] whitespace-normal lg:whitespace-nowrap"
            style={headingColor ? { color: headingColor } : undefined}
          >
            {heading}
          </Typography>

          {isHtmlBody ? (
            <div
              className="reveal stagger-1 strapi-richtext-body text-midnight/80 text-left text-lg leading-[1.8] flex flex-col gap-5 [&>p]:mb-0"
              style={descriptionColor ? { color: descriptionColor } : undefined}
              dangerouslySetInnerHTML={{ __html: bodyText }}
            />
          ) : (
            <div
              className="reveal stagger-1 flex flex-col gap-5 text-midnight/80 text-left text-lg leading-[1.8]"
              style={descriptionColor ? { color: descriptionColor } : undefined}
            >
              {bodyText.split("\n\n").map((para, i) => (
                <Typography variant="b1" as="p" className="m-0" key={i}>
                  {para}
                </Typography>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="story-globe-full lg:hidden relative z-[1] overflow-hidden -mt-[15%] -mb-[30%]">
        {sideImageSrc ? (
          <Image
            src={sideImageSrc}
            alt="Connection illustration"
            width={600}
            height={600}
            unoptimized={sideImageSrc.endsWith(".svg")}
            className="w-[90%] max-w-[90%] h-auto opacity-[0.18] [filter:brightness(0)_saturate(0)] block mx-auto -translate-x-[2%]"
          />
        ) : (
          <div className="w-[90%] max-w-[90%] h-auto opacity-[0.18] [filter:brightness(0)_saturate(0)] block mx-auto -translate-x-[2%]">
            <ConnectionIllustrationSvg className="w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  );
}
