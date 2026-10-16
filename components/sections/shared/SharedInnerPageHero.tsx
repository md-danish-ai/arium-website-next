"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SharedInnerPageHeroProps {
  id?: string;
  heroTag?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroCtasLabel?: string;
  heroCtasUrl?: string;
  backgroundGradient?: string;
  contentMaxWidth?: string;
}

export default function SharedInnerPageHero({
  id = "inner-hero",
  heroTag,
  heroTitle,
  heroDescription,
  heroCtasLabel,
  heroCtasUrl,
  backgroundGradient,
  contentMaxWidth,
}: SharedInnerPageHeroProps) {
  const pathname = usePathname() || "";

  let parentLabel = "";
  let parentUrl = "";

  if (pathname.includes("/leadership") || pathname.includes("/board-of-directors") || pathname.includes("/about")) {
    parentLabel = "Our Company";
    parentUrl = "/about";
  } else if (pathname.includes("/right-of-ways") || pathname.includes("/private-venues")) {
    parentLabel = "Where We Build";
    parentUrl = "/where-we-build";
  } else if (pathname.includes("/solutions") || pathname.includes("/small-cells") || pathname.includes("/das")) {
    parentLabel = "Our Solutions";
    parentUrl = "/our-solutions";
  } else if (pathname.includes("/community")) {
    parentLabel = "Your Community";
    parentUrl = "/community";
  } else if (pathname.includes("/careers")) {
    parentLabel = "Careers";
    parentUrl = "/careers";
  }

  const formatPageName = (path: string) => {
    const segment = path.split('/').filter(Boolean).pop() || "";
    if (segment === "right-of-ways") return "Right of Way";
    if (segment === "board-of-directors") return "Board of Directors";
    if (segment === "das") return "Distributed Antenna Systems";

    return segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const cleanTitle = formatPageName(pathname);

  return (
    <section
      className="subpage-header"
      id={id}
      style={{
        background: backgroundGradient || "linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 40%, #FFDAC8 100%)",
        padding: `200px 24px ${pathname.includes("/leadership") || pathname.includes("/board-of-directors") ? "180px" : "80px"}`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,200,170,0.15) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>

      {parentLabel && (
        <nav className="reveal" aria-label="Breadcrumb" style={{ position: "absolute", top: "140px", left: 0, right: 0, zIndex: 2, padding: "0 clamp(24px, 4vw, 64px)" }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.04em" }}>
            <li>
              <Link href={parentUrl} style={{ color: "#162047", opacity: 0.5, textDecoration: "none", transition: "opacity 0.3s ease" }}>
                {parentLabel}
              </Link>
            </li>
            <li style={{ color: "#162047", opacity: 0.3, fontSize: "0.7rem" }}>/</li>
            <li style={{ color: "#162047", opacity: 0.8, fontWeight: 500 }}>{cleanTitle}</li>
          </ol>
        </nav>
      )}

      <div className="subpage-header-inner" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div className="subpage-header-text" style={{ alignItems: "center", textAlign: "center", maxWidth: contentMaxWidth || "960px", width: "100%" }}>

          {heroTag && (
            <>
              <p className="reveal stagger-1" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, color: "#162047", opacity: 0.7, margin: "0 0 16px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {heroTag}
              </p>
              <div className="reveal stagger-1" style={{ width: "48px", height: "2px", background: "#162047", margin: "0 auto 20px" }}></div>
            </>
          )}

          {heroTitle && (
            <h1 className="subpage-title reveal stagger-2" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          )}

          {heroDescription && (
            <p className="subpage-intro reveal stagger-3" dangerouslySetInnerHTML={{ __html: heroDescription }} />
          )}

          {heroCtasLabel && heroCtasUrl && (
            <div className="reveal stagger-4" style={{ marginTop: "28px" }}>
              <Link href={heroCtasUrl} className="shared-hero-cta">{heroCtasLabel}</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
