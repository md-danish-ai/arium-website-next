import Link from "next/link";

interface BoardHeroProps {
  heading?: string;
  intro?: string;
}

export default function BoardHero({ heading, intro }: BoardHeroProps) {
  return (
    <section className="subpage-header" id="board-header" style={{ background: "linear-gradient(135deg, #F5C4AC 0%, #FFDAC8 40%, #FFD0B8 70%, #FFE5D8 100%)", padding: "200px 24px 180px", overflow: "visible" }}>
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.15) 0%, transparent 65%)", top: "-100px", right: "-50px", pointerEvents: "none", filter: "blur(40px)" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 60%)", top: "20%", left: "10%", pointerEvents: "none", filter: "blur(50px)" }}></div>
      <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,196,172,0.45) 0%, transparent 65%)", bottom: "10%", right: "20%", pointerEvents: "none", filter: "blur(60px)" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(210,199,255,0.12) 0%, transparent 60%)", bottom: "-200px", left: "-100px", pointerEvents: "none", filter: "blur(30px)" }}></div>
      
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
          <li style={{ color: "#162047", opacity: 0.8, fontWeight: 500 }}>Board of Directors</li>
        </ol>
      </nav>
      
      <div className="subpage-header-inner" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div className="subpage-header-text" style={{ alignItems: "center", textAlign: "center", maxWidth: "960px" }}>
          <h1 className="subpage-title reveal stagger-1">{heading || "Board of Directors"}</h1>
          <p className="subpage-intro reveal stagger-2">
            {intro || "Guiding strategy and governance with decades of industry leadership and investment expertise."}
          </p>
        </div>
      </div>
    </section>
  );
}
