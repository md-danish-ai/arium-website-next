"use client";

import { Typography, DetailedCard } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { DetailedCardGridProps } from "./type";
import { SmallCellsSvg, DasSvg } from "@ui-svg";
import { useSvgDraw } from "@hooks/useSvgDraw";

export default function DetailedCardGrid({
  title,
  description,
  background_color,
  PanelCards = [],
}: DetailedCardGridProps) {
  const containerRef = useSvgDraw();
  const backgroundStyle = background_color ? { background: background_color } : undefined;

  return (
    <section
      ref={containerRef}
      className="py-10 max-[768px]:py-12 md:py-20 lg:py-24 relative overflow-hidden bg-midnight"
      id="infrastructure"
      style={backgroundStyle}
    >
      <div className="infra-grid-bg"></div>

      <div className="infra-particles" id="infra-particles"></div>

      <Container className="relative z-[2]">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Typography
            variant="h3"
            uppercase
            weight="normal"
            className="section-title reveal stagger-1 m-0 text-white"
          >
            {title}
          </Typography>
          <Typography
            variant="b1"
            weight="normal"
            className="section-description reveal stagger-2 max-w-[960px] mx-auto mt-4 md:mt-5 text-white/80"
          >
            {description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 lg:gap-8 max-w-[520px] md:max-w-none mx-auto w-full">
          {PanelCards.map((card, index) => {
            const cardImageUrl =
              typeof card.image === "string"
                ? card.image
                : Array.isArray(card.image)
                  ? card.image[0]?.url
                  : (card.image as { url?: string } | undefined)?.url;

            return (
              <div
                className={`w-full h-full transition-all duration-300 hover:-translate-y-1.5 reveal stagger-${index + 3}`}
                key={card.id ?? index}
              >
                <DetailedCard
                  title={card.title}
                  description={card.description}
                  ctaText={card.CTA_text}
                  ctaLink={card.CTA_url}
                  imageUrl={cardImageUrl}
                  svgCode={card.svg_code}
                  svgComponent={
                    card.svgType === "small-cells" ? (
                      <SmallCellsSvg />
                    ) : card.svgType === "das" ? (
                      <DasSvg />
                    ) : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
