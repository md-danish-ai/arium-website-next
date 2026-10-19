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
  const defaultPillars: PillarCard[] = [
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

  const defaultBarBgClasses = ["bg-[#00b4a0]", "bg-[#d4882e]", "bg-[#7c5cbf]"];

  return (
    <section className="shared-commitments-section section-padding section-light bg-white pt-16 pb-28 relative overflow-hidden z-[2]" id="shared-commitments">
      <div className="container mx-auto px-6 relative z-[2]">
        <div className="shared-commit-hero reveal w-full rounded-3xl overflow-hidden mb-14 border border-white/[0.06] shadow-xl">
          <div className="shared-commit-hero-img-container relative w-full h-[400px] md:h-[480px]">
            <Image
              src={bgImageUrl}
              alt={bgImageAlt}
              fill
              className="shared-commit-hero-img object-cover block"
            />
            <div className="shared-commit-hero-overlay absolute inset-0 bg-gradient-to-r from-[#101830]/90 via-[#101830]/60 to-transparent pointer-events-none" />
            <div className="shared-commit-hero-content absolute inset-0 flex items-center justify-start text-left p-8 md:p-14 lg:p-20 z-[2]">
              <div className="shared-commit-hero-inner max-w-[640px] m-0">
                <h2 className="shared-commit-hero-title commit-hero-title font-heading text-[clamp(1.8rem,3.2vw,2.6rem)] font-light uppercase tracking-[0.06em] leading-[1.25] text-white m-0">{Heading || "Our Commitments to Our Customers"}</h2>
                {Description ? (
                  <div
                    className="shared-commit-desc commit-desc strapi-richtext-body text-[1.02rem] leading-[1.75] text-white/85 mt-4 max-w-full text-left [&>p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: Description }}
                  />
                ) : (
                  <p className="shared-commit-desc commit-desc text-[1.02rem] leading-[1.75] text-white/85 mt-4 max-w-full text-left">
                    As part of EQT&apos;s Active Core Infrastructure fund, we have the support and financial capacity to invest with conviction. As opposed to many other private equity backed companies, we do not have any timeframe for liquidity, so we can invest and operate for the long term.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="shared-commit-part2 reveal stagger-2">
          <p className="shared-commit-lead text-center text-midnight/80 text-[1.12rem] leading-[1.7] mb-9">{PillarsDescription || "We are guided by a clear set of commitments that shape how we partner and deliver value:"}</p>

          <div className="shared-commit-pillars grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
            {pillars.map((pillar, index) => {
              const barBgClass = defaultBarBgClasses[index % defaultBarBgClasses.length];

              return (
                <div key={index} className="shared-commit-pillar p-4 rounded-2xl text-center flex flex-col items-center cursor-default">
                  <div className={`shared-commit-pillar-bar w-10 h-[3px] rounded-sm mb-6 transition-all duration-400 ${barBgClass}`} />
                  <h3 className="shared-commit-pillar-title font-heading uppercase tracking-[0.06em] text-[0.95rem] font-semibold text-midnight mb-3.5">{pillar.PillarText || `Pillar ${index + 1}`}</h3>
                  <p className="shared-commit-pillar-text text-[0.88rem] leading-[1.75] text-midnight/80 m-0">{pillar.PillarDescription || ""}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
