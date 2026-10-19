import Image from "next/image";

interface CardItem {
  title: string;
  description: string;
}

interface NetworkChallengesProps {
  title?: string;
  body?: string;
  cardItems?: CardItem[];
  media?: {
    url?: string;
    data?: {
      attributes?: {
        url?: string;
      };
    };
  };
}

export default function NetworkChallenges({ title, body, cardItems, media }: NetworkChallengesProps) {
  let mediaUrl = "";
  if (Array.isArray(media)) {
    mediaUrl = media[0]?.url || "";
  } else {
    mediaUrl = media?.data?.attributes?.url || (media as any)?.url || "";
  }

  const imageUrl = mediaUrl 
    ? (mediaUrl.startsWith('http') ? mediaUrl : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${mediaUrl}`)
    : "/assets/images/challenges-bg.png";

  return (
    <section id="about" className="relative overflow-hidden p-0">
      <div className="absolute inset-0 z-0">
        <Image 
          src={imageUrl} 
          alt="" 
          fill 
          className="object-cover object-top block" 
          aria-hidden="true" 
        />
      </div>
      
      <div 
        className="challenges-veil absolute inset-0 z-[1] [background-image:linear-gradient(90deg,rgba(13,18,36,0.92)_0%,rgba(13,18,36,0.82)_38%,rgba(13,18,36,0.45)_60%,transparent_80%)]" 
      />
      
      <div 
        className="challenges-bottom-gradient absolute inset-x-0 bottom-0 h-[380px] z-[1] [background-image:linear-gradient(180deg,transparent_0%,rgba(13,18,36,0.72)_40%,rgba(13,18,36,0.95)_100%)]" 
      />

      <div className="container challenges-hero-container relative z-[2]">
        <div className="max-w-[620px]">
          <h2 className="section-title reveal text-white text-[clamp(1.8rem,3vw,2.4rem)] font-normal tracking-[0.06em] uppercase mb-6 leading-[1.45] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {title || "Solving the toughest network challenges"}
          </h2>
          <p className="reveal stagger-1 text-white/80 text-[1.05rem] leading-[1.8] m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
            {body || "Deploying a small cell or distributed antenna system (DAS) network involves careful planning, precision engineering, and efficient coordination. Whether in dense neighborhoods, difficult terrain, or high-traffic venues and buildings, our customers rely on our deep expertise and established relationships across the country to help them solve even the most unique coverage and capacity challenges."}
          </p>
        </div>
      </div>

      <div className="challenges-pillars-container relative z-[2] py-12 max-[780px]:pt-0 pb-14">
        <div className="container">
          <div className="reveal stagger-2 challenges-pillars grid grid-cols-1 md:grid-cols-3 gap-[clamp(40px,5vw,80px)] w-full">
            {cardItems && cardItems.length > 0 ? (
              cardItems.map((item, index) => (
                <div className="challenges-pillar pb-5 text-center" key={index}>
                  <div className="challenges-pillar-label font-heading text-[2.2rem] font-bold text-teal leading-none tracking-[0.08em] mb-2 uppercase [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
                    {item.title}
                  </div>
                  <p className="challenges-pillar-desc text-[0.9rem] leading-[1.65] text-white/85 m-0">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="challenges-pillar pb-5 text-center">
                  <div className="challenges-pillar-label font-heading text-[2.2rem] font-bold text-teal leading-none tracking-[0.08em] mb-2 uppercase [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
                    Design
                  </div>
                  <p className="challenges-pillar-desc text-[0.9rem] leading-[1.65] text-white/85 m-0">
                    We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity.
                  </p>
                </div>

                <div className="challenges-pillar pb-5 text-center">
                  <div className="challenges-pillar-label font-heading text-[2.2rem] font-bold text-teal leading-none tracking-[0.08em] mb-2 uppercase [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
                    Implement
                  </div>
                  <p className="challenges-pillar-desc text-[0.9rem] leading-[1.65] text-white/85 m-0">
                    We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure.
                  </p>
                </div>

                <div className="challenges-pillar pb-5 text-center">
                  <div className="challenges-pillar-label font-heading text-[2.2rem] font-bold text-teal leading-none tracking-[0.08em] mb-2 uppercase [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
                    Optimize
                  </div>
                  <p className="challenges-pillar-desc text-[0.9rem] leading-[1.65] text-white/85 m-0">
                    We partner with leading firms to conduct radio frequency (RF) testing and optimization, ensuring the network continues to perform as expected.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
