import Image from "next/image";
import ParticleBackground from "@ui-animations/ParticleBackground";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

interface StrapiMediaShape {
  url?: string;
  alternativeText?: string;
  data?: { attributes?: { url?: string } } | { attributes?: { url?: string } }[];
}

export interface BenefitCard {
  title: string;
  description: string;
  image?: StrapiMediaShape | string;
  TitleColor?: string;
  DescriptionColor?: string;
}

interface ImageCardGridProps {
  data?: {
    title?: string;
    cards?: BenefitCard[];
    HeadingColor?: string;
  };
}

const FALLBACK_BENEFITS: BenefitCard[] = [
  {
    title: "Reliability",
    description:
      "More targeted coverage in hard-to-reach areas minimizes dead spots and ensures consistent connectivity across your community.",
    image: "/assets/images/ov-venue-commercial.png",
  },
  {
    title: "Innovation",
    description:
      "Increased speeds and capacity ensure people get the most from the latest wireless devices and technologies.",
    image: "/assets/images/ov-venue-crowd.png",
  },
  {
    title: "Safety",
    description:
      "Stronger coverage keeps first responders connected to critical information and increases 911 call availability.",
    image: "/assets/images/ov-venue-themepark.png",
  },
];

export default function ImageCardGrid({ data }: ImageCardGridProps) {
  const benefits = data?.cards?.length ? data.cards : FALLBACK_BENEFITS;
  return (
    <section
      id="benefits"
      className="relative overflow-hidden py-14 md:py-24 lg:py-28 bg-secondary-grey"
    >
      <div className="infra-grid-bg" aria-hidden="true" />
      <ParticleBackground id="benefits-particles" count={35} />

      <div className="absolute -top-[100px] -left-[80px] w-[500px] h-[500px] [background:radial-gradient(circle,rgba(0,232,217,0.04)_0%,transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] [background:radial-gradient(circle,rgba(210,199,255,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-[2]">
        <div className="section-header text-center mb-16">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="section-title cm-section-title reveal stagger-1 tracking-[0.08em] max-w-[880px] mx-auto leading-[1.45] text-[#162047]"
            style={{ color: data?.HeadingColor || "#162047" }}
          >
            {data?.title || "Why small cells matter"}
          </Typography>
        </div>

        <div className="reveal stagger-2 image-card-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full">
          {benefits.map((benefit, index) => {
            let extractedUrl = "";
            if (typeof benefit.image === "string") {
              extractedUrl = benefit.image;
            } else if (benefit.image && typeof benefit.image === "object") {
              if ("url" in benefit.image && benefit.image.url) {
                extractedUrl = benefit.image.url;
              } else if (
                "data" in benefit.image &&
                Array.isArray(benefit.image.data) &&
                benefit.image.data[0]?.attributes?.url
              ) {
                extractedUrl = benefit.image.data[0].attributes.url;
              } else if (
                "data" in benefit.image &&
                !Array.isArray(benefit.image.data) &&
                benefit.image.data?.attributes?.url
              ) {
                extractedUrl = benefit.image.data.attributes.url;
              }
            }

            const fallbackImage =
              typeof FALLBACK_BENEFITS[index]?.image === "string"
                ? (FALLBACK_BENEFITS[index].image as string)
                : "/assets/images/placeholder.png";

            const imageUrl = extractedUrl ? GetStrapiMediaUrl(extractedUrl) : fallbackImage;

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
                <Typography
                  as="h3"
                  variant="h4"
                  uppercase
                  weight="bold"
                  className="cm-pillar-title leading-none tracking-[0.08em] mb-3 text-2xl md:text-3xl"
                  style={{ color: benefit.TitleColor || "#7C5CBF" }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  as="p"
                  variant="b2"
                  className="cm-pillar-desc leading-[1.65] mb-7 w-full text-base"
                  style={{ color: benefit.DescriptionColor || "#162047" }}
                >
                  {benefit.description}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
