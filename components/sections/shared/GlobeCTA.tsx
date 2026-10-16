"use client";
import Link from "next/link";

interface GlobeCTAProps {
  title?: string;
  heading?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

export default function GlobeCTA({ title, heading, description, buttonText, buttonLink }: GlobeCTAProps) {
  return (
    <section className="section-padding subpage-cta-section" style={{ padding: "100px 0", background: "linear-gradient(135deg, #FFFFCA 0%, #FFF8E1 40%, #FFDAC8 100%)", position: "relative", overflow: "hidden" }}>
      <div className="cta-bg-illustration" style={{ position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%) rotate(-25deg)", width: "720px", height: "130%", pointerEvents: "none" }} aria-hidden="true">

        <img src="/assets/images/connection-globe-blue.svg" alt="" style={{ width: "100%", height: "100%", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 40%, rgba(255,218,200,1) 100%)", pointerEvents: "none" }}></div>
      </div>
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="sol-split reveal" style={{ alignItems: "center" }}>
          <div className="sol-split-text" style={{ maxWidth: "580px" }}>
            {description ? (
              <>
                <h2 className="section-title" style={{ textAlign: "left", fontWeight: 300, marginBottom: "20px", color: "var(--color-midnight-blue)", whiteSpace: "nowrap" }}>
                  {heading || title}
                </h2>
                <div 
                  className="strapi-richtext-body"
                  style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#162047", margin: "0 0 36px" }}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </>
            ) : (
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", lineHeight: 1.5, color: "var(--color-midnight-blue)", margin: "0 0 36px", fontWeight: 300, maxWidth: "580px", textWrap: "balance" }}>
                {title || heading}
              </p>
            )}
            <Link 
              href={buttonLink} 
              style={{ display: "inline-block", padding: "14px 40px", borderRadius: "999px", background: "var(--color-midnight-blue)", color: "var(--color-white)", fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.35s cubic-bezier(0.2,1,0.2,1)", border: "2px solid transparent" }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--color-midnight-blue)";
                e.currentTarget.style.borderColor = "var(--color-midnight-blue)";
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-midnight-blue)";
                e.currentTarget.style.color = "var(--color-white)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {buttonText}
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
