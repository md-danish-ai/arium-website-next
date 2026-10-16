import Link from "next/link";
import ImageCarousel from "../../ui/ImageCarousel";

const venueImages = [
  { src: "/assets/images/overview-buildings-Venues.png", alt: "Fans at a venue" },
  { src: "/assets/images/ov-venue-campus.png", alt: "University campus" },
  { src: "/assets/images/ov-venue-themepark.png", alt: "Theme park visitors" },
  { src: "/assets/images/ov-venue-commercial.png", alt: "Commercial building" },
];

interface WhereVenuesProps {
  data?: {
    title?: string;
    body?: string;
    cta?: { label: string; url: string };
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function WhereVenues({ data }: WhereVenuesProps) {
  const carouselImages = data?.media?.length
    ? data.media.map(img => ({
        src: img.url,
        alt: img.alternativeText || "Venue infrastructure image"
      }))
    : venueImages;

  return (
    <section className="ov-feature ov-feature--flip ov-feature--teal" id="venues-feature">

      <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.18) 0%, transparent 60%)", top: "-180px", left: "-150px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 65%)", bottom: "-180px", right: "-120px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(210,199,255,0.08) 0%, transparent 70%)", top: "30%", right: "20%", pointerEvents: "none" }}></div>
      
      <div className="container ov-feature-inner">
        <div className="ov-feature-text reveal">
          <h2 className="ov-feature-heading">{data?.title || "Buildings and Venues"}</h2>
          {data?.body ? (
            <div 
              className="ov-feature-desc strapi-richtext-body"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="ov-feature-desc">Our distributed antenna systems (DAS) and small cell networks bring advanced connectivity to in-building environments. We partner with large stadiums, commercial buildings, theme parks, campuses, and other private venues, helping customers stay connected in even the most crowded or hard-to-reach areas.</p>
          )}
          <Link href={data?.cta?.url || "/private-venues"} aria-label={`${data?.cta?.label || "Learn more"} about private venues`} className="ov-feature-cta reveal stagger-2">
            {data?.cta?.label || "Learn more"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
        
        <div className="ov-showcase reveal stagger-1">
          <div className="ov-showcase-stage" style={{ height: "100%", width: "100%", position: "relative" }}>
            <img src={carouselImages[0].src} alt={carouselImages[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
