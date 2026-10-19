import Link from "next/link";
import ImageCarousel from "@ui-element/ImageCarousel";

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
    <section className="ov-feature ov-feature--peach relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#FFF5EF] via-[#FFDAC8] to-[#FFF0E8]" id="communities-feature">
      <div className="absolute w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.12)_0%,transparent_65%)] -top-[250px] -right-[150px] pointer-events-none" />
      <div className="absolute w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.35)_0%,transparent_65%)] -bottom-[200px] -left-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(210,199,255,0.1)_0%,transparent_70%)] top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="container ov-feature-inner grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-[1]">
        <div className="ov-feature-text reveal flex flex-col gap-5">
          <h2 className="ov-feature-heading font-heading text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-wider text-[#162047] leading-tight m-0">
            {data?.title || "Communities"}
          </h2>
          {data?.body ? (
            <div 
              className="ov-feature-desc strapi-richtext-body text-[#162047]/85 text-base md:text-lg leading-relaxed m-0"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <p className="ov-feature-desc text-[#162047]/85 text-base md:text-lg leading-relaxed m-0">
              We&apos;re installing small cells along roadways, sidewalks, and the public right of way to expand wireless coverage and capacity. As technology advances and connectivity needs grow, our solutions help communities by improving service in busy neighborhoods, increasing data speeds, and supporting the latest tech residents rely on.
            </p>
          )}
          <Link 
            href={data?.cta?.url || "/community"} 
            aria-label={`${data?.cta?.label || "Learn More"} about our work in communities`} 
            className="ov-feature-cta reveal stagger-2 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#162047] bg-[#162047] text-white font-heading text-xs uppercase tracking-widest font-semibold hover:bg-transparent hover:text-[#162047] transition-all duration-300 hover:-translate-y-0.5 self-start mt-2 group"
          >
            {data?.cta?.label || "Learn More"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
        
        <div className="ov-showcase reveal stagger-1">
          <div className="ov-showcase-stage aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative w-full">
            <img src={carouselImages[0].src} alt={carouselImages[0].alt} className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
