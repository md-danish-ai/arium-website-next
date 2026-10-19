import React from 'react';
import Image from 'next/image';

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

export default function SharedBenefits({ heading, description, cards, footerText }: SharedBenefitsProps) {
  if (!heading && !description && (!cards || cards.length === 0)) return null;

  return (
    <>
      <div className="bg-[#ededee]" style={{ background: "#ededee" }}>
        <section className="shared-benefits-section section-light relative overflow-hidden py-28 bg-[#ededee]" id="benefits" style={{ background: "#ededee" }}>
          <div className="infra-grid-bg absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true" />
          <div className="container mx-auto px-6 relative z-[1]">
            <div className="shared-benefits-header text-center mb-10">
              {heading && <h2 className="section-title reveal stagger-1 font-heading font-normal tracking-[0.06em] max-w-[880px] mx-auto text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.45] text-midnight uppercase">{heading}</h2>}
              {description && <p className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-midnight/80 text-base leading-relaxed">{description}</p>}
            </div>
          </div>

          {cards && cards.length > 0 && (
            <div className="shared-benefits-grid reveal stagger-3 relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 px-6 lg:px-12 max-w-[1600px] mx-auto">
              {cards.map((card, index) => {
                const imgUrl = card.image?.url || card.image?.data?.attributes?.url;
                const absoluteImgUrl = imgUrl
                  ? (imgUrl.startsWith("http") ? imgUrl : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${imgUrl}`)
                  : null;

                return (
                  <div key={index} className="shared-benefits-card text-center py-5">
                    <div className="shared-benefits-icon w-32 h-32 opacity-90 mx-auto mb-2 relative flex items-center justify-center">
                      {absoluteImgUrl && (
                        <Image
                          src={absoluteImgUrl}
                          alt={card.title || "Benefit Icon"}
                          width={128}
                          height={128}
                          className="benefit-img w-32 h-32 object-contain"
                        />
                      )}
                    </div>
                    <h3 className="shared-benefits-title font-heading text-[1.3rem] font-bold leading-tight tracking-[0.06em] mb-2 uppercase text-[#009886]" style={{ color: card.TitleColor || undefined }}>{card.title}</h3>
                    <p className="shared-benefits-desc text-base leading-[1.65] text-midnight/90 mx-auto max-w-[380px]">{card.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      
      {footerText && (
        <section className="reveal shared-eeo-section pb-10 bg-[#ededee]" id="eeo-statement" style={{ background: "#ededee" }}>
          <div className="container mx-auto px-6 relative z-[1]">
            <div className="reveal shared-eeo-container text-center">
              <div className="shared-eeo-text max-w-4xl mx-auto text-xs text-midnight/60 leading-relaxed">
                {footerText}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
