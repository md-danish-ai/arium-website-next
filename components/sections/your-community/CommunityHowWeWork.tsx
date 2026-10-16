"use client";
import Image from "next/image";
import Link from "next/link";

interface CommunityHowWeWorkProps {
  data?: {
    title?: string;
    body?: string;
    media?: {
      url: string;
    };
    cta?: {
      label: string;
      url: string;
    };
  };
}

export default function CommunityHowWeWork({ data }: CommunityHowWeWorkProps) {
  const imageUrl = "/assets/images/how-we-work-community.png";
  return (
    <section id="how-we-work" style={{ position: "relative", overflow: "hidden", padding: 0 }}>

      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          fill
          style={{ objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(13,18,36,0.8) 0%, rgba(13,18,36,0.5) 40%, transparent 65%)" }}></div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "200px", zIndex: 1, background: "linear-gradient(180deg, transparent 0%, rgba(13,18,36,0.5) 100%)" }}></div>

      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "150px", zIndex: 1, background: "linear-gradient(180deg, rgba(13,18,36,0.4) 0%, transparent 100%)" }}></div>


      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "160px", paddingBottom: "160px" }}>
        <div style={{ maxWidth: "560px" }}>
          <h2 className="reveal" style={{ color: "var(--color-white)", fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", fontWeight: 400, textTransform: "uppercase", marginBottom: "24px", lineHeight: 1.35, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {data?.title || "How we work in your community"}
          </h2>
          {data?.body ? (
            <div
              className="reveal stagger-1"
              style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "36px", textShadow: "0 1px 12px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", gap: "20px" }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <>
              <p className="reveal stagger-1" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8, margin: "0 0 20px", textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>We are expanding our small cell network across every major U.S. market. We use a structured, collaborative process that balances the needs of local communities, municipalities, and wireless carriers.</p>
              <p className="reveal stagger-2" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8, margin: "0 0 36px", textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>This means building the vital connectivity that meets current needs while being ready for future technologies and growth.</p>
            </>
          )}
          {data?.cta ? (
            <Link href={data.cta.url} aria-label={`${data.cta.label} about how we work in your community`} className="reveal stagger-3" style={{ display: "inline-block", padding: "14px 40px", borderRadius: "999px", background: "var(--color-sky-teal)", color: "var(--color-midnight-blue)", fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.35s cubic-bezier(0.2,1,0.2,1)", border: "2px solid var(--color-sky-teal)" }} onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-sky-teal)'; e.currentTarget.style.borderColor = 'var(--color-sky-teal)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-sky-teal)'; e.currentTarget.style.color = 'var(--color-midnight-blue)'; e.currentTarget.style.borderColor = 'var(--color-sky-teal)' }}>
              {data.cta.label}
            </Link>
          ) : (
            <Link href="/right-of-ways" aria-label="Learn more about how we work in your community" className="reveal stagger-3" style={{ display: "inline-block", padding: "14px 40px", borderRadius: "999px", background: "var(--color-sky-teal)", color: "var(--color-midnight-blue)", fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.35s cubic-bezier(0.2,1,0.2,1)", border: "2px solid var(--color-sky-teal)" }} onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-sky-teal)'; e.currentTarget.style.borderColor = 'var(--color-sky-teal)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-sky-teal)'; e.currentTarget.style.color = 'var(--color-midnight-blue)'; e.currentTarget.style.borderColor = 'var(--color-sky-teal)' }}>
              Learn More
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
