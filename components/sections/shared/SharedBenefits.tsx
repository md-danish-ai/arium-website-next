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
      <div className="row-storyteller-flow">
        <section className="shared-benefits-section section-light" id="benefits">
          <div className="infra-grid-bg" aria-hidden="true"></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="shared-benefits-header text-center">
              {heading && <h2 className="section-title reveal stagger-1">{heading}</h2>}
              {description && <p className="section-description reveal stagger-2">{description}</p>}
            </div>
          </div>

          {cards && cards.length > 0 && (
            <div className="shared-benefits-grid reveal stagger-3">
              {cards.map((card, index) => {
                const imgUrl = card.image?.url || card.image?.data?.attributes?.url;
                const absoluteImgUrl = imgUrl
                  ? (imgUrl.startsWith("http") ? imgUrl : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${imgUrl}`)
                  : null;

                return (
                  <div key={index} className="shared-benefits-card text-center">
                    <div className="shared-benefits-icon">
                      {absoluteImgUrl && (
                        <Image
                          src={absoluteImgUrl}
                          alt={card.title || "Benefit Icon"}
                          width={128}
                          height={128}
                          className="benefit-img"
                        />
                      )}
                    </div>
                    <h3 className="shared-benefits-title" style={{ color: card.TitleColor || "#009886" }}>{card.title}</h3>
                    <p className="shared-benefits-desc">{card.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      
      {footerText && (
        <section className="reveal shared-eeo-section" id="eeo-statement">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="reveal shared-eeo-container text-center">
              <div className="shared-eeo-text">
                {footerText}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
