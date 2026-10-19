import Image from "next/image";

interface AboutStoryProps {
  data?: {
    title?: string;
    body?: string;
    media?: any[];
  };
}

export default function AboutStory({ data }: AboutStoryProps) {
  const imageUrl = data?.media?.[0]?.url
    ? (data.media[0].url.startsWith("http")
      ? data.media[0].url
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${data.media[0].url}`)
    : "/assets/images/live_connection-illustration.svg";

  return (
    <section className="story-section-root bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF] py-20 lg:py-24 relative overflow-hidden border-none">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        className="story-globe-right hidden lg:block absolute -right-8 top-1/2 h-[190%] w-auto translate-x-1/2 -translate-y-1/2 -scale-x-100 opacity-[0.18] [filter:brightness(0)_saturate(0)] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-[1]">
        <div className="max-w-[760px] text-left">
          <h2 className="subpage-story-heading reveal text-midnight text-left font-heading text-[clamp(1.75rem,2.2vw,2.2rem)] font-normal mb-6 leading-[1.35] whitespace-normal lg:whitespace-nowrap uppercase">
            {data?.title || "A story rooted in connection"}
          </h2>
          {data?.body ? (
            <div
              className="reveal stagger-1 strapi-richtext-body text-midnight/80 text-left text-lg leading-[1.8] flex flex-col gap-5 [&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          ) : (
            <div className="reveal stagger-1 flex flex-col gap-8 text-midnight/80 text-left text-lg leading-[1.8]">
              <p className="subpage-intro m-0">
                Our world depends on fast, reliable connectivity—from the way we interact with loved ones, educate our children, and drive business forward. More than 15 years ago, we began building the small cell and distributed antennae system (DAS) infrastructure that ensures wireless services works effectively, even in the most challenging locations. Across the country, we&apos;re building dense networks and increasing capacity, enhancing connectivity in high-demand areas.
              </p>
              <p className="subpage-intro m-0">
                We make the process of designing and deploying wireless networks as straightforward and predictable as possible, providing a clear path forward that supports your vision long into the future.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="story-globe-full lg:hidden relative z-[1] overflow-hidden -mt-[15%] -mb-[30%]">
        <img src={imageUrl} alt="Connection illustration" className="w-[90%] max-w-[90%] h-auto opacity-[0.18] [filter:brightness(0)_saturate(0)] block mx-auto -translate-x-[2%]" />
      </div>
    </section>
  );
}
