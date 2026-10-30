"use client";

import React from "react";
import Image from "next/image";
import ParticleBackground from "@ui-animations/ParticleBackground";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";

export interface BenefitCardItem {
  id?: string | number;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  iconSrc?: string;
  title_color?: string;
  titleColor?: string;
  description_color?: string;
  descriptionColor?: string;
}

export interface BenefitsGridProps {
  id?: string;
  title: string;
  description?: string;
  contentHtml?: string;
  cards?: BenefitCardItem[];
  benefits?: BenefitCardItem[];
  title_color?: string;
}

export default function BenefitsGrid({
  id = "benefits",
  title,
  description,
  contentHtml,
  cards,
  benefits,
  title_color,
}: BenefitsGridProps) {
  const items = cards && cards.length > 0 ? cards : benefits || [];
  if (!items || items.length === 0) return null;

  const isThreeCols = items.length === 3;

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-14 md:py-24 lg:py-28 ${
        isThreeCols ? "bg-secondary-grey" : "bg-white"
      } !border-none`}
    >
      {isThreeCols && (
        <>
          <div className="infra-grid-bg" aria-hidden="true" />
          <ParticleBackground id="benefits-particles" count={35} />
          <div className="absolute -top-[100px] -left-[80px] w-[500px] h-[500px] [background:radial-gradient(circle,rgba(0,232,217,0.04)_0%,transparent_70%)] rounded-full pointer-events-none" />
          <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] [background:radial-gradient(circle,rgba(210,199,255,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />
        </>
      )}

      <Container className="relative z-[2]">
        <div className="text-center mb-16">
          <Typography
            variant={isThreeCols ? "h2" : "h3"}
            as="h2"
            uppercase
            className={`section-title reveal stagger-1 max-w-[880px] mx-auto text-[#162047] ${
              isThreeCols ? "tracking-[0.08em] leading-[1.45]" : "tracking-[0.06em]"
            }`}
            style={title_color ? { color: title_color } : undefined}
          >
            {title}
          </Typography>
          {contentHtml ? (
            <div
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : description ? (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80"
            >
              {description}
            </Typography>
          ) : null}
        </div>

        <div
          className={`reveal stagger-2 grid grid-cols-1 ${
            isThreeCols
              ? "md:grid-cols-3 gap-8 md:gap-16"
              : "sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          } w-full`}
        >
          {items.map((item, index) => {
            const imgSrc = item.image || item.iconSrc || item.icon || "/images/placeholder.png";
            const defaultTitleColor = isThreeCols ? "#7C5CBF" : "#009886";
            const cardTitleColor = item.title_color || item.titleColor || defaultTitleColor;
            const cardDescColor = item.description_color || item.descriptionColor;

            return (
              <div
                key={item.id ?? index}
                className="py-2 text-center flex flex-col items-center w-full"
              >
                <div className="mb-4 flex items-center justify-center">
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    width={120}
                    height={120}
                    className={
                      isThreeCols
                        ? "w-[120px] h-[120px] object-contain block mix-blend-multiply"
                        : "w-24 h-24 md:w-32 md:h-32 opacity-90 mx-auto object-contain block"
                    }
                  />
                </div>
                <Typography
                  variant={isThreeCols ? "h4" : "h5"}
                  as="h3"
                  uppercase
                  weight="bold"
                  className={`mb-3 ${isThreeCols ? "leading-none tracking-[0.08em]" : "tracking-wider"}`}
                  style={{ color: cardTitleColor }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="b2"
                  as="p"
                  className={`text-[#162047]/75 max-w-[340px] m-0 ${
                    isThreeCols ? "leading-[1.65] mb-7 w-full" : "leading-relaxed"
                  }`}
                  style={cardDescColor ? { color: cardDescColor } : undefined}
                >
                  {item.description}
                </Typography>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
