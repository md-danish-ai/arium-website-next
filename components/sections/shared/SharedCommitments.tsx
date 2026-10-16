import Image from "next/image";

interface PillarCard {
  PillarText?: string;
  PillarDescription?: string;
  BarColor?: string;
  PillarHeadingColor?: string;
  PillarBgColorHover?: string;
}

interface SharedCommitmentsProps {
  Heading?: string;
  Description?: string;
  BgImage?: { data?: { attributes?: { url: string; alternativeText?: string } } } | { url: string; alternativeText?: string } | any;
  BgOverlay?: string;
  PillarsDescription?: string;
  PillarCard?: PillarCard[];
}

export default function SharedCommitments({
  Heading,
  Description,
  BgImage,
  BgOverlay,
  PillarsDescription,
  PillarCard
}: SharedCommitmentsProps) {
  const defaultPillars = [
    { PillarText: "We are customer-first", PillarDescription: "We put customers at the center of every decision, delivering value through innovation, investment, and purpose-build network solutions.", BarColor: "#00b4a0" },
    { PillarText: "We are nimble and ready to invest", PillarDescription: "We operate with speed and flexibility, putting capital to work where it can drive the most impact.", BarColor: "#d4882e" },
    { PillarText: "We are built for the long haul", PillarDescription: "We're committed to long-term ownership and lasting partnerships, investing in the infrastructure that will power the future of connectivity.", BarColor: "#7c5cbf" }
  ];

  const pillars = (PillarCard && PillarCard.length > 0 ? PillarCard : null) || defaultPillars;
  
  // Extract image URL safely
  let bgImageUrl = "/assets/images/live_about_commitments_panoramic.png";
  let bgImageAlt = "New York City skyline at sunset";
  
  if (BgImage) {
    if (BgImage.data?.attributes?.url) {
      bgImageUrl = BgImage.data.attributes.url;
      bgImageAlt = BgImage.data.attributes.alternativeText || bgImageAlt;
    } else if (BgImage.url) {
      bgImageUrl = BgImage.url;
      bgImageAlt = BgImage.alternativeText || bgImageAlt;
    }
  }

  const defaultColors = [
    { color: "#00b4a0", rgb: "0, 180, 160" },
    { color: "#d4882e", rgb: "212, 136, 46" },
    { color: "#7c5cbf", rgb: "124, 92, 191" }
  ];

  return (
    <section className="shared-commitments-section section-padding section-light" id="shared-commitments" style={{ background: "transparent", padding: "60px 0 120px", position: "relative", overflow: "hidden", zIndex: 2 }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="shared-commit-hero reveal">
          <div className="shared-commit-hero-img-container">
            <Image 
              src={bgImageUrl} 
              alt={bgImageAlt} 
              fill
              style={{ objectFit: "cover" }}
              className="shared-commit-hero-img"
            />
            <div className="shared-commit-hero-overlay"></div>
            <div className="shared-commit-hero-content">
              <div className="shared-commit-hero-inner">
                <h2 className="shared-commit-hero-title">{Heading || "Our Commitments to Our Customers"}</h2>
                {Description ? (
                  <div 
                    className="shared-commit-desc strapi-richtext-body"
                    dangerouslySetInnerHTML={{ __html: Description }}
                  />
                ) : (
                  <p className="shared-commit-desc">
                    As part of EQT&apos;s Active Core Infrastructure fund, we have the support and financial capacity to invest with conviction. As opposed to many other private equity backed companies, we do not have any timeframe for liquidity, so we can invest and operate for the long term.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="shared-commit-part2 reveal stagger-2">
          <p className="shared-commit-lead">{PillarsDescription || "We are guided by a clear set of commitments that shape how we partner and deliver value:"}</p>

          <div className="shared-commit-pillars">
            {pillars.map((pillar, index) => {
              const colorProps = defaultColors[index % defaultColors.length];
              
              // Handle custom CMS colors if provided
              let barColor = pillar.BarColor || colorProps.color;
              
              // Helper to convert hex to rgb string for the hover background
              let rgbColor = colorProps.rgb;
              if (pillar.BarColor && pillar.BarColor.startsWith('#')) {
                const hex = pillar.BarColor.replace('#', '');
                if (hex.length === 6) {
                  rgbColor = `${parseInt(hex.substring(0, 2), 16)}, ${parseInt(hex.substring(2, 4), 16)}, ${parseInt(hex.substring(4, 6), 16)}`;
                }
              }

              return (
                <div key={index} className="shared-commit-pillar" style={{ "--pillar-color": barColor, "--pillar-color-rgb": rgbColor } as React.CSSProperties}>
                  <div className="shared-commit-pillar-bar"></div>
                  <h3 className="shared-commit-pillar-title">{pillar.PillarText || `Pillar ${index + 1}`}</h3>
                  <p className="shared-commit-pillar-text">{pillar.PillarDescription || ""}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
