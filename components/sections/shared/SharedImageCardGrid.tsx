import Image from "next/image";
import ParticleBackground from "../../animations/ParticleBackground";

interface BenefitCard {
  title: string;
  description: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  TitleColor?: string;
  DescriptionColor?: string;
}

interface SharedImageCardGridProps {
  data?: {
    title?: string;
    cards?: BenefitCard[];
    HeadingColor?: string;
  };
}

const FALLBACK_BENEFITS = [
  {
    title: "Reliability",
    description: "More targeted coverage in hard-to-reach areas minimizes dead spots and ensures consistent connectivity across your community.",
    image: "/assets/images/ov-venue-commercial.png",
  },
  {
    title: "Innovation",
    description: "Increased speeds and capacity ensure people get the most from the latest wireless devices and technologies.",
    image: "/assets/images/ov-venue-crowd.png",
  },
  {
    title: "Safety",
    description: "Stronger coverage keeps first responders connected to critical information and increases 911 call availability.",
    image: "/assets/images/ov-venue-themepark.png",
  },
];

export default function SharedImageCardGrid({ data }: SharedImageCardGridProps) {
  const benefits: any[] = data?.cards?.length ? data.cards : FALLBACK_BENEFITS;
  return (
    <section id="benefits" style={{ background: "var(--color-secondary-grey)", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true"></div>
      <ParticleBackground id="benefits-particles" count={35} />

      <div style={{ position: "absolute", top: "-100px", left: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,232,217,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(210,199,255,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }}></div>



      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header text-center" style={{ marginBottom: "64px" }}>
          <h2 className="section-title cm-section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", maxWidth: "880px", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: data?.HeadingColor || "#162047" }}>
            {data?.title || "Why small cells matter"}
          </h2>
        </div>

        <div className="reveal stagger-2 image-card-grid">
          {benefits.map((benefit, index) => {
            let extractedUrl = "";
            if (typeof benefit.image === 'string') {
              extractedUrl = benefit.image;
            } else if (benefit.image?.url) {
              extractedUrl = benefit.image.url;
            } else if (benefit.image?.data?.attributes?.url) {
              extractedUrl = benefit.image.data.attributes.url;
            } else if (Array.isArray(benefit.image?.data) && benefit.image.data[0]?.attributes?.url) {
              extractedUrl = benefit.image.data[0].attributes.url;
            } else if (Array.isArray(benefit.image) && benefit.image[0]?.url) {
              extractedUrl = benefit.image[0].url;
            }

            const imageUrl = extractedUrl 
              ? (extractedUrl.startsWith('http') ? extractedUrl : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${extractedUrl}`) 
              : (FALLBACK_BENEFITS[index]?.image || '/assets/images/placeholder.png');

            return (
              <div key={index} style={{ padding: 0, textAlign: "center" }}>
                <div style={{ marginBottom: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    src={imageUrl}
                    alt={benefit.title}
                    width={120}
                    height={120}
                    style={{ width: "120px", height: "120px", objectFit: "contain", display: "block", mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="cm-pillar-title" style={{ fontFamily: "var(--font-heading)", fontSize: "1.55rem", fontWeight: 700, color: benefit.TitleColor || "#7C5CBF", lineHeight: 1, letterSpacing: "0.08em", marginBottom: "12px", textTransform: "uppercase" }}>
                  {benefit.title}
                </div>
                <p className="cm-pillar-desc" style={{ fontSize: "0.9rem", lineHeight: 1.65, color: benefit.DescriptionColor || "#162047", margin: "0 0 28px" }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
