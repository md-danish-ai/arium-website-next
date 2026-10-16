import Link from "next/link";
import ImageCarousel from "../../ui/ImageCarousel";

const communityImages = [
  { src: "/assets/images/overview-communities.png", alt: "Community neighborhood" },
  { src: "/assets/images/ov-community-park.png", alt: "Families in a park" },
  { src: "/assets/images/ov-community-street.png", alt: "People on a street" },
  { src: "/assets/images/ov-community-family.png", alt: "Connected family" },
];

interface WhereCommunitiesProps {
  data?: {
    title?: string;
    body?: string;
    cta?: { label: string; url: string };
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function WhereCommunities({ data }: WhereCommunitiesProps) {
  const carouselImages = data?.media?.length
    ? data.media.map(img => ({
        src: img.url,
        alt: img.alternativeText || "Community infrastructure image"
      }))
    : communityImages;

  return (
    <section className="ov-feature ov-feature--peach" id="communities-feature">

      <div style={{ position: "absolute", width: "750px", height: "750px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.12) 0%, transparent 65%)", top: "-250px", right: "-150px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "650px", height: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.35) 0%, transparent 65%)", bottom: "-200px", left: "-120px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(210,199,255,0.1) 0%, transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}></div>
      
      <div className="container ov-feature-inner">
        <div className="ov-feature-text reveal">
          <h2 className="ov-feature-heading">{data?.title || "Communities"}</h2>
          {data?.body ? (
            <div 
              className="ov-feature-desc strapi-richtext-body"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="ov-feature-desc">We&apos;re installing small cells along roadways, sidewalks, and the public right of way to expand wireless coverage and capacity. As technology advances and connectivity needs grow, our solutions help communities by improving service in busy neighborhoods, increasing data speeds, and supporting the latest tech residents rely on.</p>
          )}
          <Link href={data?.cta?.url || "/community"} aria-label={`${data?.cta?.label || "Learn More"} about our work in communities`} className="ov-feature-cta reveal stagger-2">
            {data?.cta?.label || "Learn More"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
        
        <div className="ov-showcase reveal stagger-1">
          <div className="ov-showcase-stage" style={{ height: "100%", width: "100%", position: "relative" }}>
            <img src={carouselImages[0].src} alt={carouselImages[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", borderRadius: "24px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
