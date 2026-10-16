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
    { color: "#00b4a0", rgb: "0, 180, 160" },
    { color: "#d4882e", rgb: "212, 136, 46" },
    { color: "#7c5cbf", rgb: "124, 92, 191" }
  ];
  return (
    <section className="section-padding section-light" id="commitments" style={{ background: "transparent", padding: "60px 0 120px", position: "relative", overflow: "hidden", zIndex: 2 }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="commit-hero reveal">
          <div className="commit-hero-img-container">
            <Image 
              src={data?.media?.[0]?.url || "/assets/images/live_about_commitments_panoramic.png"} 
              alt={data?.media?.[0]?.alternativeText || "New York City skyline at sunset"} 
              fill
              style={{ objectFit: "cover" }}
              className="commit-hero-img"
            />
            <div className="commit-hero-overlay"></div>
            <div className="commit-hero-content">
              <div className="commit-hero-inner">
                <h2 className="commit-hero-title">{data?.title || "Our Commitments to Our Customers"}</h2>
                {data?.body ? (
                  <div 
                    className="commit-desc strapi-richtext-body"
                    dangerouslySetInnerHTML={{ __html: data.body }}
                  />
                ) : (
                  <p className="commit-desc">
                    As part of EQT&apos;s Active Core Infrastructure fund, we have the support and financial capacity to invest with conviction. As opposed to many other private equity backed companies, we do not have any timeframe for liquidity, so we can invest and operate for the long term.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="commit-part2 reveal stagger-2">
          <p className="commit-lead">We are guided by a clear set of commitments that shape how we partner and deliver value:</p>

          <div className="commit-pillars">
            {pillars.map((pillar, index) => {
              const colorProps = colors[index % colors.length];
              return (
                <div key={index} className="commit-pillar" style={{ "--pillar-color": colorProps.color, "--pillar-color-rgb": colorProps.rgb } as React.CSSProperties}>
                  <div className="commit-pillar-bar"></div>
                  <h3 className="commit-pillar-title">{pillar.title}</h3>
                  <p className="commit-pillar-text">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
