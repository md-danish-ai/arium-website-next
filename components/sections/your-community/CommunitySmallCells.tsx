import Image from "next/image";
import ParticleBackground from "../../animations/ParticleBackground";

interface CommunitySmallCellsProps {
  data?: {
    title?: string;
    body?: string;
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function CommunitySmallCells({ data }: CommunitySmallCellsProps) {
  const rawImgUrl = data?.media?.[0]?.url;
  const imgUrl = rawImgUrl 
    ? (rawImgUrl.startsWith("http") ? rawImgUrl : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${rawImgUrl}`)
    : "/assets/images/live_small-cells-illustration.svg";

  return (
    <section id="what-are-small-cells" style={{ background: "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)", padding: "100px 0", position: "relative", overflow: "hidden", minHeight: "420px", display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", left: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="sol-split reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div className="sol-split-text">
            <h2 className="subpage-story-heading" style={{ color: "var(--color-midnight-blue)", textAlign: "left", fontSize: "2.2rem", fontWeight: 400, marginBottom: "24px", textTransform: "uppercase" }}>
              {data?.title || "What is a small cell?"}
            </h2>
            {data?.body ? (
              <div 
                className="subpage-intro strapi-richtext-body" 
                style={{ color: "#162047", textAlign: "left", fontSize: "1.15rem", display: "flex", flexDirection: "column", gap: "20px" }}
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <>
                <p className="subpage-intro" style={{ color: "#162047", textAlign: "left", fontSize: "1.15rem", marginBottom: "20px" }}>When you are driving on a major highway, you can see large cell towers along the road. These towers manage the wireless traffic for miles around them. As wireless traffic grows, the signal becomes strained &mdash; much like a traffic jam on a highway.</p>
                <p className="subpage-intro" style={{ color: "#162047", textAlign: "left", fontSize: "1.15rem", marginBottom: "20px" }}>Small cells are compact, discreet antennas often mounted on streetlights or utility poles. They boost wireless coverage and capacity in the areas that need it most. Most people don&apos;t even notice them.</p>
                <p className="subpage-intro" style={{ color: "#162047", textAlign: "left", fontSize: "1.15rem", marginBottom: 0 }}>Think of small cells as adding extra lanes to the wireless highway &mdash; reducing congestion and helping everyone stay connected.</p>
              </>
            )}
          </div>
          <div className="sol-illustration-wrapper small-cells-illust" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <div style={{ position: "relative", width: "90%", maxWidth: "440px" }}>
              <img
                src={imgUrl}
                alt={data?.media?.[0]?.alternativeText || "Small cells illustration"}
                className={imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  opacity: 0.85, 
                  position: "relative", 
                  zIndex: 1,
                  filter: "brightness(0) saturate(0) invert(13%) sepia(35%) saturate(3000%) hue-rotate(210deg) brightness(95%) contrast(92%)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
