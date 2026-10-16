import React from "react";
import Link from "next/link";

interface CulturePillar {
  title: string;
  description: string;
}

interface CtaItem {
  label: string;
  url: string;
}

interface AboutCultureProps {
  data?: {
    title?: string;
    body?: string;
    cards?: CulturePillar[];
    cta?: CtaItem[];
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function AboutCulture({ data }: AboutCultureProps) {
  const defaultPillars = [
    { title: "Leadership", description: "We're trusted leaders in the industry and we value people who want to help us move fast, make a difference, and solve difficult challenges." },
    { title: "Passion", description: "Our team cares deeply about the businesses and communities we serve. They understand that what we do makes a true difference in people's lives." },
    { title: "Optimism", description: "Our team believes in the transformative power of wireless technology and is excited to play a meaningful role in ushering in a new generation of innovation." }
  ];

  const pillars = (data?.cards && data.cards.length > 0 ? data.cards : null) || defaultPillars;
  const cta = data?.cta?.[0] || { label: "Explore Careers", url: "/careers" };
  return (
    <section id="culture" style={{ position: "relative", overflow: "hidden", padding: "70px 0 75px", marginTop: "-1px", borderTop: "none", background: "var(--color-midnight-blue)" }}>

      <div className="culture-bg">
        <picture style={{ width: "100%", height: "100%", display: "block" }}>
          <source media="(max-width: 768px)" srcSet={data?.media?.[0]?.url || "/assets/images/culture-bg-mobile.jpg"} />
          <img src={data?.media?.[1]?.url || "/assets/images/culture-bg.jpg"} alt={data?.media?.[1]?.alternativeText || "Team collaborating in modern office"} className="culture-bg-img" />
        </picture>
      </div>

      <div className="culture-veil"></div>

      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0, 232, 217, 0.06) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none", zIndex: 1 }}></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        <div className="culture-content-grid">

          <div className="culture-left-column reveal">
            <h2 className="culture-hero-heading">{data?.title || "Help Us Shape the Future of Connectivity"}</h2>

            {data?.body ? (
              <div
                className="culture-hero-desc strapi-richtext-body"
                style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255, 255, 255, 0.8)", marginBottom: "32px" }}
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <p className="culture-hero-desc">Our infrastructure powers the connected world we all rely on. By joining our team, you&apos;ll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.</p>
            )}

            <div className="culture-pillars-container" style={{ marginTop: "36px", maxWidth: "585px", display: "flex", flexDirection: "column", gap: 0 }}>

              {pillars.map((pillar, index) => (
                <React.Fragment key={index}>
                  <div className={`culture-mobile-pillar pillar-${index + 1}`} style={{ paddingBottom: index === pillars.length - 1 ? 0 : "24px", paddingTop: index === 0 ? 0 : "24px" }}>
                    <div className="culture-mobile-pillar-title" style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#00e8d9", lineHeight: 1.2, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>{pillar.title}</div>
                    <p className="culture-mobile-pillar-desc" style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", margin: 0 }}>{pillar.description}</p>
                  </div>
                  {index < pillars.length - 1 && (
                    <div className="culture-pillar-divider" style={{ width: "60%", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)", margin: 0 }}></div>
                  )}
                </React.Fragment>
              ))}

            </div>

            <div className="reveal stagger-2" style={{ marginTop: "36px" }}>
              <Link href={cta.url} className="culture-cta-btn">{cta.label}</Link>
            </div>
          </div>

          <div></div>
        </div>

      </div>
    </section>
  );
}
