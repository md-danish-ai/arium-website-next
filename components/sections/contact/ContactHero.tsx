interface ContactHeroProps {
  heading?: string;
  intro?: string;
}

export default function ContactHero({ heading, intro }: ContactHeroProps) {
  return (
    <section className="subpage-header" id="contact-header" style={{ background: "linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 40%, #FFDAC8 100%)", padding: "200px 24px 120px", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow: top-right teal */}
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>
      {/* Ambient glow: bottom-left warm */}
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,200,170,0.15) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>

      <div className="subpage-header-inner" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div className="subpage-header-text" style={{ alignItems: "center", textAlign: "center", maxWidth: "960px" }}>
          <h1 className="subpage-title reveal stagger-1">{heading || "Contact us"}</h1>
          <p className="subpage-intro reveal stagger-2">{intro || "Looking for more information? Or ready to discuss your connectivity needs? Fill out the form so we can connect you to the right team."}</p>
        </div>
      </div>
    </section>
  );
}
