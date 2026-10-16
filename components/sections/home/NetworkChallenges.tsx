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
    <section id="about" style={{ position: "relative", overflow: "hidden", padding: 0 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image 
          src={imageUrl} 
          alt="" 
          fill 
          style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} 
          aria-hidden="true" 
        />
      </div>
      
      <div className="challenges-veil" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(13, 18, 36, 0.92) 0%, rgba(13, 18, 36, 0.82) 38%, rgba(13, 18, 36, 0.45) 60%, transparent 80%)" }}></div>
      
      <div className="challenges-bottom-gradient" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "380px", zIndex: 1, background: "linear-gradient(180deg, transparent 0%, rgba(13, 18, 36, 0.72) 40%, rgba(13, 18, 36, 0.95) 100%)" }}></div>

      <div className="container challenges-hero-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "620px" }}>
          <h2 className="section-title reveal" style={{ color: "var(--color-white)", fontSize: "2.4rem", fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "24px", lineHeight: 1.45, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {title || "Solving the toughest network challenges"}
          </h2>
          <p className="reveal stagger-1" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.8, margin: 0, textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>
            {body || "Deploying a small cell or distributed antenna system (DAS) network involves careful planning, precision engineering, and efficient coordination. Whether in dense neighborhoods, difficult terrain, or high-traffic venues and buildings, our customers rely on our deep expertise and established relationships across the country to help them solve even the most unique coverage and capacity challenges."}
          </p>
        </div>
      </div>

      <div className="challenges-pillars-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="container">
          <div className="reveal stagger-2 challenges-pillars">
            {cardItems && cardItems.length > 0 ? (
              cardItems.map((item, index) => (
                <div className="challenges-pillar" key={index}>
                  <div className="challenges-pillar-label">
                    {item.title}
                  </div>
                  <p className="challenges-pillar-desc">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="challenges-pillar">
                  <div className="challenges-pillar-label">
                    Design
                  </div>
                  <p className="challenges-pillar-desc">
                    We identify the best network technology, equipment, and architecture designs based on a careful assessment of structure and required capacity.
                  </p>
                </div>

                <div className="challenges-pillar">
                  <div className="challenges-pillar-label">
                    Implement
                  </div>
                  <p className="challenges-pillar-desc">
                    We bring together the right partners—coordinating and collaborating to deploy the necessary infrastructure.
                  </p>
                </div>

                <div className="challenges-pillar">
                  <div className="challenges-pillar-label">
                    Optimize
                  </div>
                  <p className="challenges-pillar-desc">
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
