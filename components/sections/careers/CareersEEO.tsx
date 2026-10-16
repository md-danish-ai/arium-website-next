interface CareersEEOProps {
  data?: {
    body?: string;
  };
}

export default function CareersEEO({ data }: CareersEEOProps) {
  return (
    <section className="reveal" id="eeo-statement" style={{ padding: "0 0 40px 0", background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f6f8fa 40%, #edf3f2 75%, #efeaf7 100%)", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ maxWidth: "1240px", margin: "100px auto 0", padding: "0 24px", textAlign: "center" }}>
          {data?.body ? (
            <div 
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.74rem, 0.9vw, 0.82rem)", lineHeight: 1.75, color: "rgba(22, 32, 71, 0.82)", margin: "0 auto", fontWeight: 400, letterSpacing: "0.02em", textAlign: "center" }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.74rem, 0.9vw, 0.82rem)", lineHeight: 1.75, color: "rgba(22, 32, 71, 0.82)", margin: "0 auto", fontWeight: 400, letterSpacing: "0.02em", textAlign: "center" }}>We are an equal opportunity employer. We recruit, hire and promote without regard to race, color, religion, creed, national origin or ancestry, ethnicity, sex (including pregnancy or pregnancy related conditions), gender (including gender identity and expression, and status as a transgender individual), sexual orientation, age, physical or mental disability, citizenship, past, current or prospective service in the uniformed services, genetic information, marital status or any other characteristic protected under applicable federal, state or local law.</p>
          )}
        </div>
      </div>
    </section>
  );
}
