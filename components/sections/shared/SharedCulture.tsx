import React from "react";
import Link from "next/link";

interface CulturePillar {
  Heading?: string;
  Description?: string;
  title?: string;
  description?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

interface SharedCultureProps {
  Heading?: string;
  Description?: string;
  Pillarcard?: CulturePillar[];
  CtaButton?: string;
  CTALink?: string;
  BgImage?: { data?: { attributes?: { url: string; alternativeText?: string } } } | { url: string; alternativeText?: string }[] | any;
  BgGradient?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

export default function SharedCulture({ Heading, Description, Pillarcard, CtaButton, CTALink, BgImage, BgGradient, HeadingColor, DescriptionColor }: SharedCultureProps) {
  const defaultPillars: CulturePillar[] = [
    { Heading: "Leadership", Description: "We're trusted leaders in the industry and we value people who want to help us move fast, make a difference, and solve difficult challenges." },
    { Heading: "Passion", Description: "Our team cares deeply about the businesses and communities we serve. They understand that what we do makes a true difference in people's lives." },
    { Heading: "Optimism", Description: "Our team believes in the transformative power of wireless technology and is excited to play a meaningful role in ushering in a new generation of innovation." }
  ];

  const pillars = (Pillarcard && Pillarcard.length > 0 ? Pillarcard : null) || defaultPillars;

  // Extract media safely based on Strapi v4 or v3 formats
  let mediaUrls = [
    "/assets/images/culture-bg-mobile.jpg",
    "/assets/images/culture-bg.jpg"
  ];
  let mediaAlts = ["Team collaborating", "Team collaborating in modern office"];

  if (BgImage) {
    if (Array.isArray(BgImage) && BgImage.length > 0) {
      mediaUrls = [BgImage[0]?.url || mediaUrls[0], BgImage[1]?.url || BgImage[0]?.url || mediaUrls[1]];
      mediaAlts = [BgImage[0]?.alternativeText || mediaAlts[0], BgImage[1]?.alternativeText || BgImage[0]?.alternativeText || mediaAlts[1]];
    } else if (BgImage.data) {
      const isArray = Array.isArray(BgImage.data);
      const firstMedia = isArray ? BgImage.data[0] : BgImage.data;
      const secondMedia = isArray && BgImage.data.length > 1 ? BgImage.data[1] : firstMedia;

      mediaUrls = [
        firstMedia?.attributes?.url || firstMedia?.url || mediaUrls[0],
        secondMedia?.attributes?.url || secondMedia?.url || mediaUrls[1]
      ];
      mediaAlts = [
        firstMedia?.attributes?.alternativeText || firstMedia?.alternativeText || mediaAlts[0],
        secondMedia?.attributes?.alternativeText || secondMedia?.alternativeText || mediaAlts[1]
      ];
    }
  }

  // Determine optional background gradient if set (ignore misplaced #0a1628 veil gradient so it matches about.html's midnight-blue)
  const isMisplacedVeil = BgGradient && (BgGradient.includes("#0a1628") || BgGradient.includes("10, 22, 40") || BgGradient.includes("10,22,40"));
  const gradientStyle = BgGradient && !isMisplacedVeil ? { background: BgGradient } : { background: "var(--color-midnight-blue)" };

  return (
    <section className="shared-culture-section" style={{ position: "relative", overflow: "hidden", padding: "70px 0 75px", marginTop: "-1px", borderTop: "none", ...gradientStyle }}>
      <div className="shared-culture-bg">
        <picture style={{ width: "100%", height: "100%", display: "block" }}>
          <source media="(max-width: 768px)" srcSet={mediaUrls[0]} />
          <img src={mediaUrls[1]} alt={mediaAlts[1]} className="shared-culture-bg-img" />
        </picture>
      </div>

      <div className="shared-culture-veil"></div>

      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0, 232, 217, 0.06) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none", zIndex: 1 }}></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="shared-culture-content-grid">
          <div className="shared-culture-left-column reveal">
            <h2 className="shared-culture-hero-heading" style={{ color: HeadingColor || undefined }}>{Heading || "Help Us Shape the Future of Connectivity"}</h2>

            {Description ? (
              <div
                className="shared-culture-hero-desc strapi-richtext-body"
                style={{ fontSize: "1.05rem", lineHeight: 1.8, color: DescriptionColor || "rgba(255, 255, 255, 0.8)", marginBottom: "32px" }}
                dangerouslySetInnerHTML={{ __html: Description }}
              />
            ) : (
              <p className="shared-culture-hero-desc" style={{ color: DescriptionColor || undefined }}>Our infrastructure powers the connected world we all rely on. By joining our team, you&apos;ll be at the center of it all, helping us shape the future of connectivity by playing a meaningful role in building the next generation of wireless technology.</p>
            )}

            <div className="shared-culture-pillars-container" style={{ marginTop: "36px", maxWidth: "585px", display: "flex", flexDirection: "column", gap: 0 }}>
              {pillars.map((pillar, index) => (
                <React.Fragment key={index}>
                  <div className={`shared-culture-mobile-pillar shared-culture-pillar-${index + 1}`} style={{ paddingBottom: index === pillars.length - 1 ? 0 : "24px", paddingTop: index === 0 ? 0 : "24px" }}>
                    <div className="shared-culture-mobile-pillar-title" style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: pillar.HeadingColor || "#00e8d9", lineHeight: 1.2, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>{pillar.Heading || pillar.title}</div>
                    <p className="shared-culture-mobile-pillar-desc" style={{ fontSize: "0.9rem", lineHeight: 1.65, color: pillar.DescriptionColor || "rgba(255,255,255,0.8)", margin: 0 }}>{pillar.Description || pillar.description}</p>
                  </div>
                  {index < pillars.length - 1 && (
                    <div className="shared-culture-pillar-divider" style={{ width: "60%", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)", margin: 0 }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="reveal stagger-2" style={{ marginTop: "36px" }}>
              <Link href={CTALink || "/careers"} aria-label={CtaButton || "Explore Careers"} className="shared-dcg-panel-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", marginTop: "16px", whiteSpace: "nowrap" }}>
                <span className="shared-dcg-panel-link-text" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.85)", fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1, transition: "color 0.3s", display: "inline-block", whiteSpace: "nowrap" }}>
                  {CtaButton || "Explore Careers"}
                </span>
                <svg className="shared-dcg-panel-link-arrow" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e8d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", transition: "transform 0.3s" }}>
                  <polyline points="8 17 13 12 8 7"></polyline>
                  <polyline points="14 17 19 12 14 7"></polyline>
                </svg>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

