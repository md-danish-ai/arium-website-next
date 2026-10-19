import Image from "next/image";
import ParticleBackground from "../../animations/ParticleBackground";

interface CommunitySmallCellsProps {
  data?: {
    title?: string;
    body?: string;
    media?: { url: string; alternativeText?: string }[];
  };
}

export default function CommunitySmallCells({ data }: CommunitySmallCellsProps) {
  const rawImgUrl = data?.media?.[0]?.url;
  const imgUrl = rawImgUrl 
    ? (rawImgUrl.startsWith("http") ? rawImgUrl : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${rawImgUrl}`)
    : "/assets/images/live_small-cells-illustration.svg";

  return (
    <section id="what-are-small-cells" className="relative overflow-hidden py-24 min-h-[420px] flex items-center bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />
      
      <div className="container relative z-[1]">
        <div className="sol-split reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="sol-split-text flex flex-col">
            <h2 className="subpage-story-heading text-left font-heading text-3xl md:text-4xl font-normal text-[#162047] uppercase mb-6">
              {data?.title || "What is a small cell?"}
            </h2>
            {data?.body ? (
              <div 
                className="subpage-intro strapi-richtext-body text-[#162047] text-left text-base md:text-lg flex flex-col gap-5 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <div className="text-[#162047] text-left text-base md:text-lg leading-relaxed space-y-5">
                <p className="subpage-intro m-0">When you are driving on a major highway, you can see large cell towers along the road. These towers manage the wireless traffic for miles around them. As wireless traffic grows, the signal becomes strained &mdash; much like a traffic jam on a highway.</p>
                <p className="subpage-intro m-0">Small cells are compact, discreet antennas often mounted on streetlights or utility poles. They boost wireless coverage and capacity in the areas that need it most. Most people don&apos;t even notice them.</p>
                <p className="subpage-intro m-0">Think of small cells as adding extra lanes to the wireless highway &mdash; reducing congestion and helping everyone stay connected.</p>
              </div>
            )}
          </div>
          <div className="sol-illustration-wrapper small-cells-illust flex items-center justify-center lg:justify-end">
            <div className="relative w-[90%] max-w-[440px]">
              <img
                src={imgUrl}
                alt={data?.media?.[0]?.alternativeText || "Small cells illustration"}
                className={`w-full h-auto opacity-85 relative z-[1] ${imgUrl.toLowerCase().endsWith('.svg') ? 'svg-recolor' : ''}`}
                style={{ 
                  filter: "brightness(0) saturate(0) invert(13%) sepia(35%) saturate(3000%) hue-rotate(210deg) brightness(95%) contrast(92%)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
