import React from "react";
import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

interface BenefitCard {
  id?: number;
  title: string;
  description: string;
  image?: any;
  TitleColor?: string;
}

interface SharedBenefitsProps {
  heading: string;
  description: string;
  cards: BenefitCard[];
  footerText?: string;
}

export default function SharedBenefits({
  heading,
  description,
  cards,
  footerText,
}: SharedBenefitsProps) {
  if (!heading && !description && (!cards || cards.length === 0)) return null;

  return (
    <>
      <div className="bg-[#ededee]" style={{ background: "#ededee" }}>
        <section
          className="shared-benefits-section section-light relative overflow-hidden py-16 md:py-24 lg:py-28 bg-[#ededee]"
          id="benefits"
          style={{ background: "#ededee" }}
        >
          <div
            className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none"
            aria-hidden="true"
          />
          <div className="container mx-auto px-6 relative z-[1]">
            <div className="shared-benefits-header text-center mb-8 md:mb-12">
              {heading && (
                <Typography
                  variant="h3"
                  uppercase
                  className="section-title reveal stagger-1 text-midnight text-center max-w-[880px] mx-auto"
                >
                  {heading}
                </Typography>
              )}
              {description && (
                <Typography
                  variant="b1"
                  className="section-description reveal stagger-2 text-midnight/80 text-center max-w-[900px] mx-auto mt-4 md:mt-5"
                >
                  {description}
                </Typography>
              )}
            </div>
          </div>

          {cards && cards.length > 0 && (
            <div className="shared-benefits-grid reveal stagger-3 relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 px-6 lg:px-12 max-w-[1600px] mx-auto">
              {cards.map((card, index) => {
                const imgUrl = card.image?.url || card.image?.data?.attributes?.url;
                const absoluteImgUrl = imgUrl ? GetStrapiMediaUrl(imgUrl) : null;

                return (
                  <div key={index} className="shared-benefits-card text-center py-4 md:py-5">
                    <div className="shared-benefits-icon w-24 h-24 md:w-32 md:h-32 opacity-90 mx-auto mb-3 md:mb-4 relative flex items-center justify-center">
                      {absoluteImgUrl && (
                        <Image
                          src={absoluteImgUrl}
                          alt={card.title || "Benefit Icon"}
                          width={128}
                          height={128}
                          className="benefit-img w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <Typography
                      variant="h4"
                      uppercase
                      className="shared-benefits-title text-[#009886] mb-2"
                      style={{ color: card.TitleColor || undefined }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="b2"
                      className="shared-benefits-desc text-midnight/90 mx-auto max-w-[380px]"
                    >
                      {card.description}
                    </Typography>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {footerText && (
        <section
          className="reveal shared-eeo-section pb-10 bg-[#ededee]"
          id="eeo-statement"
          style={{ background: "#ededee" }}
        >
          <div className="container mx-auto px-6 relative z-[1]">
            <div className="reveal shared-eeo-container text-center">
              <Typography
                variant="b4"
                as="div"
                className="shared-eeo-text max-w-4xl mx-auto text-midnight/60 normal-case leading-relaxed"
              >
                {footerText}
              </Typography>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
