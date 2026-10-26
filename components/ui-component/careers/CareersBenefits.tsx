import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { CareersBenefitsProps, CareersBenefitItem } from "./type";

const BENEFIT_CLASSES = ["cr-teal", "cr-purple", "cr-orange", "cr-teal"];

export default function CareersBenefits({
  title,
  contentHtml,
  description,
  benefits = [],
}: CareersBenefitsProps) {
  return (
    <section
      id="benefits"
      className="section-light py-24 md:py-32 relative overflow-hidden bg-[#ededee]"
      style={{ background: "#ededee" }}
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-[1]">
        <div className="section-header text-center mb-16">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {title}
          </Typography>
          {contentHtml ? (
            <div
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80 text-base md:text-lg leading-relaxed"
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
            const bgClass = BENEFIT_CLASSES[index % BENEFIT_CLASSES.length];
            const iconSrc =
              benefit.iconSrc ||
              "/assets/images/live_careers_Arium-Master-Icons-NoBorder_Healthcare-Benefit.svg";

            return (
              <div
                key={index}
                className={`cr-benefit-pillar ${bgClass} py-5 text-center flex flex-col items-center`}
              >
                <Image
                  src={iconSrc}
                  alt={benefit.title}
                  width={128}
                  height={128}
                  className="cr-benefit-icon w-24 h-24 md:w-32 md:h-32 mb-2 opacity-90 mx-auto"
                />
                <Typography
                  variant="h4"
                  as="h3"
                  uppercase
                  weight="bold"
                  className="cr-benefit-heading mb-2 tracking-wider"
                  style={{ color: benefit.titleColor || "#009886" }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="b2"
                  as="p"
                  className="cr-benefit-desc text-[#162047]/75 max-w-[340px] m-0"
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
