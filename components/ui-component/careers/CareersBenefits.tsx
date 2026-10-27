import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CareersBenefitsProps, CareersBenefitItem } from "./type";

export default function CareersBenefits({
  title,
  contentHtml,
  description,
  benefits = [],
}: CareersBenefitsProps) {
  return (
    <section
      id="benefits"
      className="section-light bg-white py-20 md:py-28 relative overflow-hidden !border-none"
    >
      <Container className="relative z-[1]">
        <div className="text-center mb-16">
          <Typography
            variant="h3"
            as="h2"
            uppercase
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047] tracking-[0.06em]"
          >
            {title}
          </Typography>
          {contentHtml ? (
            <div
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80"
            >
              {description}
            </Typography>
          )}
        </div>
      </Container>

      {/* Full-width pillar grid */}
      <Container className="relative z-[1]">
        <div className="reveal stagger-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit: CareersBenefitItem, index: number) => {
            const iconSrc = benefit.iconSrc || "/images/svg-images/healthcare-benefit.svg";

            return (
              <div key={index} className="py-5 text-center flex flex-col items-center">
                <Image
                  src={iconSrc}
                  alt={benefit.title}
                  width={128}
                  height={128}
                  className="w-24 h-24 md:w-32 md:h-32 mb-4 opacity-90 mx-auto object-contain"
                />
                <Typography
                  variant="h5"
                  as="h4"
                  uppercase
                  weight="bold"
                  className="mb-2 tracking-wider text-[#009886]"
                  style={{ color: benefit.titleColor || "#009886" }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="b2"
                  as="p"
                  className="text-[#162047]/75 max-w-[340px] m-0 leading-relaxed"
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
