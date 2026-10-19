import Image from "next/image";

interface CommitmentPillar {
  title: string;
  description: string;
}

interface AboutCommitmentsProps {
  data?: {
    title?: string;
    body?: string;
    cards?: CommitmentPillar[];
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function AboutCommitments({ data }: AboutCommitmentsProps) {
  const defaultPillars = [
    { title: "We are customer-first", description: "We put customers at the center of every decision, delivering value through innovation, investment, and purpose-build network solutions." },
    { title: "We are nimble and ready to invest", description: "We operate with speed and flexibility, putting capital to work where it can drive the most impact." },
    { title: "We are built for the long haul", description: "We're committed to long-term ownership and lasting partnerships, investing in the infrastructure that will power the future of connectivity." }
  ];

  const pillars = (data?.cards && data.cards.length > 0 ? data.cards : null) || defaultPillars;
  const colors = [
    { barBg: "bg-[#00b4a0]", hoverTitle: "group-hover:text-[#00b4a0]" },
    { barBg: "bg-[#d4882e]", hoverTitle: "group-hover:text-[#d4882e]" },
    { barBg: "bg-[#7c5cbf]", hoverTitle: "group-hover:text-[#7c5cbf]" }
  ];
  return (
    <section className="section-padding section-light bg-white py-[60px] pb-[120px] relative overflow-hidden z-[2]" id="commitments">
      <div className="container relative z-[2]">
        <div className="commit-hero reveal w-full rounded-[24px] overflow-hidden mb-14 border border-white/10 shadow-lg">
          <div className="commit-hero-img-container relative w-full h-[320px] md:h-[480px]">
            <Image 
              src={data?.media?.[0]?.url || "/assets/images/live_about_commitments_panoramic.png"} 
              alt={data?.media?.[0]?.alternativeText || "New York City skyline at sunset"} 
              fill
              className="commit-hero-img w-full h-full object-cover block"
            />
            <div className="commit-hero-overlay absolute inset-0 bg-[#101830]/70 md:bg-gradient-to-r md:from-[#101830]/90 md:via-[#101830]/60 md:to-[#101830]/10 pointer-events-none" />
            <div className="commit-hero-content absolute inset-0 flex items-center justify-center md:justify-start text-center md:text-left p-8 md:px-20 md:py-12 z-[2]">
              <div className="commit-hero-inner max-w-full md:max-w-[640px] m-0">
                <h2 className="commit-hero-title font-heading text-white text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-wider leading-snug m-0">
                  {data?.title || "Our Commitments to Our Customers"}
                </h2>
                {data?.body ? (
                  <div 
                    className="commit-desc strapi-richtext-body text-white/85 text-base leading-relaxed mt-4 max-w-full text-center md:text-left"
                    dangerouslySetInnerHTML={{ __html: data.body }}
                  />
                ) : (
                  <p className="commit-desc text-white/85 text-base leading-relaxed mt-4 max-w-full text-center md:text-left">
                    As part of EQT&apos;s Active Core Infrastructure fund, we have the support and financial capacity to invest with conviction. As opposed to many other private equity backed companies, we do not have any timeframe for liquidity, so we can invest and operate for the long term.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="commit-part2 reveal stagger-2">
          <p className="commit-lead text-navy/70 text-lg leading-relaxed mb-9 text-center">
            We are guided by a clear set of commitments that shape how we partner and deliver value:
          </p>

          <div className="commit-pillars grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, index) => {
              const colorProps = colors[index % colors.length];
              return (
                <div 
                  key={index} 
                  className="commit-pillar group p-4 bg-transparent border border-transparent rounded-[20px] text-center flex flex-col cursor-default transition-all duration-300 hover:-translate-y-1" 
                >
                  <div 
                    className={`commit-pillar-bar w-10 h-[3px] rounded-xs mx-auto mb-6 transition-all duration-300 group-hover:w-[60px] ${colorProps.barBg}`}
                  />
                  <h3 className={`commit-pillar-title font-heading uppercase tracking-widest text-[0.95rem] font-semibold text-[#162047] mb-3.5 transition-colors duration-300 ${colorProps.hoverTitle}`}>
                    {pillar.title}
                  </h3>
                  <p className="commit-pillar-text text-[#162047]/65 text-sm leading-relaxed m-0 transition-colors duration-300 group-hover:text-[#162047]/85">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
