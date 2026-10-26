import Image from "next/image";
import ParticleBackground from "@ui-animations/ParticleBackground";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface BenefitCardItem {
  title: string;
  description: string;
  image?: string;
  titleColor?: string;
  descriptionColor?: string;
}

export interface ImageCardGridProps {
  title?: string;
  headingColor?: string;
  cards?: BenefitCardItem[];
  // Backwards-compatible prop wrapper
  data?: {
    title?: string;
    cards?: BenefitCardItem[];
    HeadingColor?: string;
  };
}

export default function ImageCardGrid({ title, headingColor, cards, data }: ImageCardGridProps) {
  const displayTitle = title || data?.title || "Why small cells matter";
  const displayHeadingColor = headingColor || data?.HeadingColor || "#162047";
  const displayCards = cards && cards.length > 0 ? cards : data?.cards || [];

  return (
    <section
      id="benefits"
      className="relative overflow-hidden py-14 md:py-24 lg:py-28 bg-secondary-grey"
    >
      <div className="infra-grid-bg" aria-hidden="true" />
      <ParticleBackground id="benefits-particles" count={35} />

      <div className="absolute -top-[100px] -left-[80px] w-[500px] h-[500px] [background:radial-gradient(circle,rgba(0,232,217,0.04)_0%,transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] [background:radial-gradient(circle,rgba(210,199,255,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <Container className="relative z-[2]">
        <div className="section-header text-center mb-16">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="section-title cm-section-title reveal stagger-1 tracking-[0.08em] max-w-[880px] mx-auto leading-[1.45] text-[#162047]"
            style={{ color: displayHeadingColor }}
          >
            {displayTitle}
          </Typography>
        </div>

        <div className="reveal stagger-2 image-card-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full">
          {displayCards.map((benefit, index) => {
            const imageUrl = benefit.image || "/assets/images/placeholder.png";

            return (
              <div key={index} className="p-0 text-center flex flex-col items-center w-full">
                <div className="mb-4 flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    alt={benefit.title}
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] object-contain block mix-blend-multiply"
                  />
                </div>
                <Typography
                  as="h3"
                  variant="h4"
                  uppercase
                  weight="bold"
                  className="cm-pillar-title leading-none tracking-[0.08em] mb-3 text-2xl md:text-3xl"
                  style={{ color: benefit.titleColor || "#7C5CBF" }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  as="p"
                  variant="b2"
                  className="cm-pillar-desc leading-[1.65] mb-7 w-full text-base"
                  style={{ color: benefit.descriptionColor || "#162047" }}
                >
                  {benefit.description}
                </Typography>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
