import Link from "next/link";

interface CardItem {
  title: string;
  description: string;
}

interface CommunitySectionProps {
  data?: {
    title?: string;
    body?: string;
    cardItem?: CardItem[];
    cards?: CardItem[];
    media?: any;
    cta?: { label: string; url: string }[];
  };
}

export default function CommunitySection({ data }: CommunitySectionProps) {
  const mediaArray = data?.media ? (Array.isArray(data.media) ? data.media : data.media?.data) : null;
  let mobileImg = "/assets/images/arena-wide-mobile.jpg";
  let desktopImg = "/assets/images/arena_wide.jpg";

  if (mediaArray && mediaArray.length > 0) {
    const formatUrl = (url: string) => url && !url.startsWith('http') && !url.startsWith('/') ? `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${url}` : url;

    // In Strapi, the mobile image is uploaded first (index 0) and desktop second (index 1).
    mobileImg = formatUrl(mediaArray[0]?.attributes?.url || mediaArray[0]?.url) || mobileImg;
    desktopImg = formatUrl(mediaArray[1]?.attributes?.url || mediaArray[1]?.url) || formatUrl(mediaArray[0]?.attributes?.url || mediaArray[0]?.url) || desktopImg;
  }

  const cardsList = data?.cards || data?.cardItem;
  const cta = data?.cta?.[0];

  return (
    <section className="community-section" id="community" style={{ padding: 0 }}>

      <div className="community-bg">
        <picture style={{ width: "100%", height: "100%", display: "block" }}>
          <source media="(max-width: 600px)" srcSet={mobileImg} />
          <img src={desktopImg} alt={data?.title || "Community impact"} className="community-bg-img" />
        </picture>
      </div>

      <div className="community-veil"></div>

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "70px", paddingBottom: "90px" }}>
        <div style={{ maxWidth: "600px" }}>
          <h2 className="section-title reveal challenges-heading" style={{ color: "var(--color-white)", fontSize: "2.4rem", fontWeight: 400, letterSpacing: "0.06em", marginBottom: "24px", lineHeight: 1.45, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {data?.title || "Keeping communities safe and connected"}
          </h2>
          <p className="reveal stagger-1 challenges-body" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.8, margin: 0, textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>
            {data?.body || "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes."}
          </p>

          <div className="reveal stagger-2" style={{ marginTop: "36px", maxWidth: "600px", display: "flex", flexDirection: "column", gap: 0 }}>
            {cardsList && cardsList.length > 0 ? (
              cardsList.map((item, index, array) => (
                <div key={index}>
                  <div style={{ padding: index === 0 ? "0 0 24px 0" : index === array.length - 1 ? "24px 0 0 0" : "24px 0" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#00e8d9", lineHeight: 1.2, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>
                      {item.title}
                    </div>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                  {index < array.length - 1 && (
                    <div style={{ width: "60%", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)", margin: 0 }}></div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div style={{ paddingBottom: "24px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#00e8d9", lineHeight: 1.2, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>Reliability</div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", margin: 0 }}>Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps and data they depend on.</p>
                </div>
                <div style={{ width: "60%", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)", margin: 0 }}></div>
                <div style={{ padding: "24px 0" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#00e8d9", lineHeight: 1.2, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>Opportunity</div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", margin: 0 }}>Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.</p>
                </div>
                <div style={{ width: "60%", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)", margin: 0 }}></div>
                <div style={{ paddingTop: "24px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#00e8d9", lineHeight: 1.2, letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>Safety</div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", margin: 0 }}>In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters and other first responders can access the essential data they need to do their jobs effectively.</p>
                </div>
              </>
            )}
          </div>

          <div className="reveal stagger-3" style={{ marginTop: "36px" }}>
            <Link href={cta?.url || "/community"} aria-label={`${cta?.label || "Learn More"} about our community impact`} className="community-link-cta" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#ffffff", fontFamily: "var(--font-body)", fontWeight: 400, lineHeight: 1, transition: "color 0.3s ease" }}>{cta?.label || "Learn More"}</span>
              <svg className="community-link-arrow" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e8d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", transition: "transform 0.3s ease" }}>
                <polyline points="8 17 13 12 8 7"></polyline>
                <polyline points="14 17 19 12 14 7"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
