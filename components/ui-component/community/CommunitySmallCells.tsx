import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CommunitySmallCellsProps } from "./type";

export default function CommunitySmallCells({
  title,
  contentHtml,
  paragraphs = [],
  illustrationSrc,
  illustrationAlt = "Small cells illustration",
}: CommunitySmallCellsProps) {
  const isSvg = illustrationSrc.toLowerCase().endsWith(".svg");

  return (
    <section
      id="what-are-small-cells"
      className="relative overflow-hidden py-16 md:py-24 min-h-[420px] flex items-center bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]"
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <Container className="relative z-[1]">
        <div className="sol-split reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="sol-split-text flex flex-col">
            <Typography as="h2" variant="h2" uppercase className="text-left text-[#162047] mb-6">
              {title}
            </Typography>
            {contentHtml ? (
              <div
                className="subpage-intro strapi-richtext-body text-[#162047] text-left text-base md:text-lg flex flex-col gap-5 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <div className="text-[#162047] text-left text-base md:text-lg leading-relaxed space-y-5">
                {paragraphs.map((paragraph, index) => (
                  <Typography key={index} as="p" variant="b1" className="m-0">
                    {paragraph}
                  </Typography>
                ))}
              </div>
            )}
          </div>
          <div className="sol-illustration-wrapper small-cells-illust flex items-center justify-center lg:justify-end">
            <div className="relative w-[90%] max-w-[440px]">
              <Image
                src={illustrationSrc}
                alt={illustrationAlt}
                width={440}
                height={330}
                unoptimized={isSvg}
                className={`w-full h-auto opacity-85 relative z-[1] ${isSvg ? "svg-recolor" : ""}`}
                style={{
                  filter:
                    "brightness(0) saturate(0) invert(13%) sepia(35%) saturate(3000%) hue-rotate(210deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
