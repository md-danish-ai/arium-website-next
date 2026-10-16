import Link from "next/link";

interface LeadershipHeroProps {
  heading?: string;
  intro?: string;
}

export default function LeadershipHero({ heading, intro }: LeadershipHeroProps) {
  return (
    <section className="subpage-header" id="leadership-header" style={{ background: "linear-gradient(135deg, #B8A9F0 0%, #D2C7FF 40%, #C4B5F7 70%, #DDD5FF 100%)", padding: "200px 24px 180px", overflow: "visible" }}>
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.18) 0%, transparent 65%)", top: "-100px", right: "-50px", pointerEvents: "none", filter: "blur(40px)" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 60%)", top: "20%", left: "10%", pointerEvents: "none", filter: "blur(50px)" }}></div>
      <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,169,240,0.4) 0%, transparent 65%)", bottom: "10%", right: "20%", pointerEvents: "none", filter: "blur(60px)" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 60%)", bottom: "-200px", left: "-100px", pointerEvents: "none", filter: "blur(30px)" }}></div>

      <nav className="reveal" aria-label="Breadcrumb" style={{ position: "absolute", top: "140px", left: 0, right: 0, zIndex: 2, padding: "0 clamp(24px, 4vw, 64px)" }}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.04em" }}>
          <li>
            <Link
              href="/about"
              className="breadcrumb-link"
            >
              Our Company
            </Link>
          </li>
          <li style={{ color: "#162047", opacity: 0.3, fontSize: "0.7rem" }}>/</li>
          <li style={{ color: "#162047", opacity: 0.8, fontWeight: 500 }}>Leadership</li>
        </ol>
      </nav>

      <div className="subpage-header-inner" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div className="subpage-header-text" style={{ alignItems: "center", textAlign: "center", maxWidth: "960px" }}>
          <h1 className="subpage-title reveal stagger-1">{heading || "Our Leadership"}</h1>
          <p className="subpage-intro reveal stagger-2">
            {intro || "Seasoned industry leaders driving strategic growth and operational excellence."}
          </p>
        </div>
      </div>
    </section>
  );
}
