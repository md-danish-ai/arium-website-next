import Image from "next/image";

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
  { title: "Healthcare", description: "Full medical coverage, including dental and vision plans and telehealth" },
  { title: "Financial Security", description: "Competitive 401(k), tuition reimbursement, financial counseling and funded healthcare savings accounts" },
  { title: "Time Off", description: "Flexible paid time off for vacations, holidays, leaves of absence, or personal needs" },
  { title: "Family Support", description: "Paid maternity and paternity leave, adoption benefits, and milk shipping" }
];

export default function CareersBenefits({ data }: CareersBenefitsProps) {
  const benefits = data?.cards?.length ? data.cards : FALLBACK_BENEFITS;
  return (
    <section id="benefits" className="section-light" style={{ padding: "120px 0", background: "transparent !important", position: "relative", overflow: "hidden" }}>
      <div className="infra-grid-bg" aria-hidden="true"></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-header text-center" style={{ marginBottom: "64px" }}>
          <h2 className="section-title reveal stagger-1" style={{ fontWeight: 400, letterSpacing: "0.06em", maxWidth: "880px", margin: "0 auto", fontSize: "2.4rem", lineHeight: 1.45, color: "#162047" }}>
            {data?.title || "Our Total Benefits Package"}
          </h2>
          {data?.body ? (
            <div 
              className="section-description reveal stagger-2" 
              style={{ maxWidth: "900px", margin: "20px auto 0" }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="section-description reveal stagger-2" style={{ maxWidth: "900px", margin: "20px auto 0" }}>We offer competitive compensation and benefits designed to support you at work and in life. Full-time team members are eligible for a comprehensive benefits package that includes:</p>
          )}
        </div>
      </div>

      {/* Full-width pillar grid */}
      <div className="reveal stagger-3" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "100px", padding: "0 48px", maxWidth: "1600px", margin: "0 auto" }}>

        {benefits.map((benefit: any, index) => {
          let iconSrc = STATIC_ICONS[index % STATIC_ICONS.length];
          const customImg = benefit.image?.url || benefit.image?.data?.attributes?.url || (typeof benefit.image === 'string' ? benefit.image : null);
          if (customImg) {
            iconSrc = customImg.startsWith("http") || customImg.startsWith("/") ? customImg : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${customImg}`;
          }

          const bgClass = BENEFIT_CLASSES[index % BENEFIT_CLASSES.length];
          return (
            <div key={index} className={`cr-benefit-pillar ${bgClass}`} style={{ padding: "20px 0", textAlign: "center" }}>
              <Image src={iconSrc} alt={benefit.title} width={128} height={128} className="cr-benefit-icon" />
              <div className="cr-benefit-heading" style={{ color: benefit.TitleColor || "#009886" }}>{benefit.title}</div>
              <p className="cr-benefit-desc">{benefit.description}</p>
            </div>
          );
        })}

      </div>
    </section>
  );
}
