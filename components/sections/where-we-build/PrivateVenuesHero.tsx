import React from "react";
import Link from "next/link";

interface PrivateVenuesHeroProps {
  data?: {
    heroTag?: string;
    heroTitle?: string;
    heroDescription?: string;
    heroCtas?: { label: string; url: string };
  };
}

export default function PrivateVenuesHero({ data }: PrivateVenuesHeroProps) {
  return (
    <section className="subpage-header" id="pv-header" style={{ background: "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)", padding: "200px 24px 120px" }}>

      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>

      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>


      <nav className="reveal" aria-label="Breadcrumb" style={{ position: "absolute", top: "140px", left: 0, right: 0, zIndex: 2, padding: "0 clamp(24px, 4vw, 64px)" }}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.04em" }}>
          <li>
            <Link href="/where-we-build" style={{ color: "#162047", opacity: 0.5, textDecoration: "none", transition: "opacity 0.3s ease" }}>
              Where We Build
            </Link>
          </li>
          <li style={{ color: "#162047", opacity: 0.3, fontSize: "0.7rem" }}>/</li>
          <li style={{ color: "#162047", opacity: 0.8, fontWeight: 500 }}>{data?.heroTag || "Private Venues"}</li>
        </ol>
      </nav>

      <div className="subpage-header-inner" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div className="subpage-header-text" style={{ alignItems: "center", textAlign: "center", maxWidth: "960px" }}>
          <p className="reveal stagger-1" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, color: "#162047", opacity: 0.7, margin: "0 0 16px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {data?.heroTag || "Private Venues"}
          </p>
          <div className="reveal stagger-1" style={{ width: "48px", height: "2px", background: "#162047", margin: "0 auto 20px" }}></div>
          <h1 className="subpage-title reveal stagger-2">{data?.heroTitle || "Bringing advanced connectivity to your property"}</h1>
          <p className="subpage-intro reveal stagger-3">{data?.heroDescription || "Our in-building solutions help private venues keep up with advances and technology, while supporting the connectivity demands of tenants and guests."}</p>
          <div className="reveal stagger-4" style={{ marginTop: "28px" }}>
            <Link href={data?.heroCtas?.url || "/contact"} className="pv-hero-cta">{data?.heroCtas?.label || "Contact Us"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
