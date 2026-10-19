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
    <section id="benefits" className="relative overflow-hidden py-[120px] bg-secondary-grey">
      <div className="infra-grid-bg" aria-hidden="true" />
      <ParticleBackground id="benefits-particles" count={35} />

      <div className="absolute -top-[100px] -left-[80px] w-[500px] h-[500px] [background:radial-gradient(circle,rgba(0,232,217,0.04)_0%,transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] [background:radial-gradient(circle,rgba(210,199,255,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-[2]">
        <div className="section-header text-center mb-16">
          <h2 
            className="section-title cm-section-title reveal stagger-1 font-normal tracking-[0.08em] max-w-[880px] mx-auto text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.45] uppercase text-[#162047]"
            style={{ color: data?.HeadingColor || "#162047" }}
          >
            {data?.title || "Why small cells matter"}
          </h2>
        </div>

        <div className="reveal stagger-2 image-card-grid w-full">
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
              <div key={index} className="p-0 text-center flex flex-col items-center w-full">
                <div className="mb-4 flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    alt={benefit.title}
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] object-contain block mix-blend-multiply"
                  />
                </div>
                <div 
                  className="cm-pillar-title font-heading text-[1.55rem] font-bold leading-none tracking-[0.08em] mb-3 uppercase" 
                  style={{ color: benefit.TitleColor || "#7C5CBF" }}
                >
                  {benefit.title}
                </div>
                <p 
                  className="cm-pillar-desc text-[0.92rem] leading-[1.65] mb-7 w-full" 
                  style={{ color: benefit.DescriptionColor || "#162047" }}
                >
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
