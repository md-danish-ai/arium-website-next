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
    <section className="community-section p-0" id="community">
      <div className="community-bg">
        <picture className="w-full h-full block">
          <source media="(max-width: 600px)" srcSet={mobileImg} />
          <img src={desktopImg} alt={data?.title || "Community impact"} className="community-bg-img" />
        </picture>
      </div>

      <div className="community-veil" />

      <div className="container relative z-[2] pt-[70px] pb-[90px]">
        <div className="max-w-[600px]">
          <h2 className="section-title reveal challenges-heading text-white text-[clamp(1.8rem,3vw,2.4rem)] font-normal tracking-[0.06em] mb-6 leading-[1.45] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {data?.title || "Keeping communities safe and connected"}
          </h2>
          <p className="reveal stagger-1 challenges-body text-white/80 text-[1.05rem] leading-[1.8] m-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
            {data?.body || "We work closely with communities to balance the need for essential connectivity with the desire for thoughtfully designed infrastructure that integrates seamlessly with the existing streetscapes."}
          </p>

          <div className="reveal stagger-2 mt-9 max-w-[600px] flex flex-col gap-0">
            {cardsList && cardsList.length > 0 ? (
              cardsList.map((item, index, array) => (
                <div key={index}>
                  <div className={index === 0 ? "pb-6" : index === array.length - 1 ? "pt-6" : "py-6"}>
                    <div className="font-heading text-base font-bold text-teal leading-tight tracking-[0.06em] mb-1.5 uppercase">
                      {item.title}
                    </div>
                    <p className="text-[0.9rem] leading-[1.65] text-white/80 m-0">
                      {item.description}
                    </p>
                  </div>
                  {index < array.length - 1 && (
                    <div className="w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="pb-6">
                  <div className="font-heading text-base font-bold text-teal leading-tight tracking-[0.06em] mb-1.5 uppercase">Reliability</div>
                  <p className="text-[0.9rem] leading-[1.65] text-white/80 m-0">Our infrastructure makes wireless coverage more accessible and reliable, so communities and businesses can stay connected to the people, apps and data they depend on.</p>
                </div>
                <div className="w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                <div className="py-6">
                  <div className="font-heading text-base font-bold text-teal leading-tight tracking-[0.06em] mb-1.5 uppercase">Opportunity</div>
                  <p className="text-[0.9rem] leading-[1.65] text-white/80 m-0">Advanced wireless connectivity helps communities support the technology of today—and tomorrow—while also attracting businesses that require flexible, uninterrupted access to remote data and cloud services.</p>
                </div>
                <div className="w-[60%] h-px bg-gradient-to-r from-white/15 to-transparent m-0" />
                <div className="pt-6">
                  <div className="font-heading text-base font-bold text-teal leading-tight tracking-[0.06em] mb-1.5 uppercase">Safety</div>
                  <p className="text-[0.9rem] leading-[1.65] text-white/80 m-0">In an emergency, reliable wireless service ensures that 911 services remain available, and that police, firefighters and other first responders can access the essential data they need to do their jobs effectively.</p>
                </div>
              </>
            )}
          </div>

          <div className="reveal stagger-3 mt-9">
            <Link 
              href={cta?.url || "/community"} 
              aria-label={`${cta?.label || "Learn More"} about our community impact`} 
              className="community-link-cta group inline-flex items-center gap-2 no-underline"
            >
              <span className="text-xs uppercase tracking-[0.15em] text-white font-body font-normal leading-none transition-colors duration-300 group-hover:text-teal">
                {cta?.label || "Learn More"}
              </span>
              <svg 
                className="community-link-arrow text-teal inline-block transition-transform duration-300 group-hover:translate-x-1" 
                aria-hidden="true" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="8 17 13 12 8 7" />
                <polyline points="14 17 19 12 14 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
