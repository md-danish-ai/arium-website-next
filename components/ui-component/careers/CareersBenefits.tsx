import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";

interface BenefitCard {
  title: string;
  description: string;
  TitleColor?: string;
  image?: any;
}

interface CareersBenefitsProps {
  data?: {
    title?: string;
    body?: string;
    cards?: BenefitCard[];
  };
}

const STATIC_ICONS = [
  "/assets/images/live_careers_Arium-Master-Icons-NoBorder_Healthcare-Benefit.svg",
  "/assets/images/live_careers_Arium-Master-Icons-NoBorder_Financial-Security.svg",
  "/assets/images/live_careers_Arium-Master-Icons-NoBorder_Time-Off.svg",
  "/assets/images/live_careers_Arium-Master-Icons-NoBorder_Family-Support.svg",
];

const BENEFIT_CLASSES = ["cr-teal", "cr-purple", "cr-orange", "cr-teal"];

const FALLBACK_BENEFITS = [
  {
    title: "Healthcare",
    description: "Full medical coverage, including dental and vision plans and telehealth",
  },
  {
    title: "Financial Security",
    description:
      "Competitive 401(k), tuition reimbursement, financial counseling and funded healthcare savings accounts",
  },
  {
    title: "Time Off",
    description:
      "Flexible paid time off for vacations, holidays, leaves of absence, or personal needs",
  },
  {
    title: "Family Support",
    description: "Paid maternity and paternity leave, adoption benefits, and milk shipping",
  },
];

export default function CareersBenefits({ data }: CareersBenefitsProps) {
  const benefits = data?.cards?.length ? data.cards : FALLBACK_BENEFITS;
  return (
    <section
      id="benefits"
      className="section-light py-24 md:py-32 relative overflow-hidden bg-[#ededee]"
      style={{ background: "#ededee" }}
    >
      <div
        className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-[1]">
        <div className="section-header text-center mb-16">
          <Typography
            variant="h3"
            as="h2"
            className="reveal stagger-1 max-w-[880px] mx-auto text-[#162047]"
          >
            {data?.title || "Our Total Benefits Package"}
          </Typography>
          {data?.body ? (
            <div
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="section-description reveal stagger-2 max-w-[900px] mx-auto mt-5 text-[#162047]/80"
            >
              We offer competitive compensation and benefits designed to support you at work and in
              life. Full-time team members are eligible for a comprehensive benefits package that
              includes:
            </Typography>
          )}
        </div>
      </div>

      {/* Full-width pillar grid */}
      <div className="reveal stagger-3 relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        {benefits.map((benefit: any, index) => {
          let iconSrc = STATIC_ICONS[index % STATIC_ICONS.length];
          const customImg =
            benefit.image?.url ||
            benefit.image?.data?.attributes?.url ||
            (typeof benefit.image === "string" ? benefit.image : null);
          if (customImg) {
            iconSrc = customImg.startsWith("/assets/") ? customImg : GetStrapiMediaUrl(customImg);
          }

          const bgClass = BENEFIT_CLASSES[index % BENEFIT_CLASSES.length];
          return (
            <div
              key={index}
              className={`cr-benefit-pillar ${bgClass} py-5 text-center flex flex-col items-center`}
            >
              <Image
                src={iconSrc}
                alt={benefit.title}
                width={128}
                height={128}
                className="cr-benefit-icon w-24 h-24 md:w-32 md:h-32 mb-2 opacity-90 mx-auto"
              />
              <Typography
                variant="h4"
                as="h3"
                uppercase
                weight="bold"
                className="cr-benefit-heading mb-2 tracking-wider"
                style={{ color: benefit.TitleColor || "#009886" }}
              >
                {benefit.title}
              </Typography>
              <Typography
                variant="b2"
                as="p"
                className="cr-benefit-desc text-[#162047]/75 max-w-[340px] m-0"
              >
                {benefit.description}
              </Typography>
            </div>
          );
        })}
      </div>
    </section>
  );
}
