import Image from "next/image";

interface AboutStoryProps {
  data?: {
    title?: string;
    body?: string;
    media?: any[];
  };
}

export default function AboutStory({ data }: AboutStoryProps) {
  const imageUrl = data?.media?.[0]?.url
    ? (data.media[0].url.startsWith("http")
      ? data.media[0].url
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${data.media[0].url}`)
    : "/assets/images/live_connection-illustration.svg";

  return (
    <section className="story-section-root" style={{ background: "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)", padding: "80px 0", position: "relative", overflow: "hidden", border: "none" }}>
      <style>{`
        .story-globe-full { display: none; }
        @media (max-width: 1500px) { .story-globe-right { right: -80px !important; } }
        @media (max-width: 1400px) { .story-globe-right { right: -120px !important; } }
        @media (max-width: 1300px) { .story-globe-right { right: -160px !important; } }
        @media (max-width: 1200px) { .story-globe-right { right: -200px !important; } }
        @media (max-width: 1100px) { .story-globe-right { right: -240px !important; } }
        @media (max-width: 1000px) { 
          .story-globe-right { display: none; }
          .subpage-story-heading { white-space: normal !important; }
          .story-globe-full { display: block; margin-top: -24% !important; margin-bottom: -46% !important; }
          .story-globe-full img { transform: translateX(-2%) !important; }
          .story-section-root { padding: 60px 0 0px !important; }
          .story-section-root .subpage-intro + .subpage-intro { margin-top: 20px !important; }
          .story-section-root .strapi-richtext-body > * + * { margin-top: 20px !important; }
        }
      `}</style>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", left: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>

      <img src={imageUrl} alt="" aria-hidden="true" className="story-globe-right" style={{ position: "absolute", right: "-30px", top: "50%", height: "190%", width: "auto", transform: "translate(50%, -50%) scaleX(-1)", opacity: 0.18, filter: "brightness(0) saturate(0)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "760px", textAlign: "left" }}>
          <h2 className="subpage-story-heading reveal" style={{ color: "var(--color-midnight-blue)", textAlign: "left", fontSize: "clamp(1.75rem, 2.2vw, 2.2rem)", fontWeight: 400, marginBottom: "24px", lineHeight: 1.35, whiteSpace: "nowrap" }}>
            {data?.title || "A story rooted in connection"}
          </h2>
          {data?.body ? (
            <div
              className="reveal stagger-1 strapi-richtext-body"
              style={{ color: "rgba(22,32,71,0.8)", textAlign: "left", fontSize: "1.125rem", lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <div className="reveal stagger-1">
              <p className="subpage-intro" style={{ color: "rgba(22,32,71,0.8)", textAlign: "left" }}>
                Our world depends on fast, reliable connectivity—from the way we interact with loved ones, educate our children, and drive business forward. More than 15 years ago, we began building the small cell and distributed antennae system (DAS) infrastructure that ensures wireless services works effectively, even in the most challenging locations. Across the country, we&apos;re building dense networks and increasing capacity, enhancing connectivity in high-demand areas.
              </p>
              <p className="subpage-intro" style={{ color: "rgba(22,32,71,0.8)", textAlign: "left", marginTop: "36px" }}>
                We make the process of designing and deploying wireless networks as straightforward and predictable as possible, providing a clear path forward that supports your vision long into the future.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="story-globe-full" style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
        <img src={imageUrl} alt="Connection illustration" style={{ width: "90%", maxWidth: "90%", height: "auto", opacity: 0.18, filter: "brightness(0) saturate(0)", display: "block", margin: "0 auto" }} />
      </div>
    </section>
  );
}
