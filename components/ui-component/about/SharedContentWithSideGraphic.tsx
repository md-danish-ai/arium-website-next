import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";

interface SharedContentWithSideGraphicProps {
  Heading?: string;
  heading?: string;
  Description?: string;
  description?: string;
  Image?: any;
  image?: any;
  media?: any;
  Media?: any;
  Gradient?: string;
  gradient?: string;
  HeadingColor?: string;
  headingColor?: string;
  DescriptionColor?: string;
  descriptionColor?: string;
  data?: {
    title?: string;
    Title?: string;
    heading?: string;
    Heading?: string;
    body?: string;
    Body?: string;
    description?: string;
    Description?: string;
    media?: any;
    Media?: any;
    image?: any;
    Image?: any;
    gradient?: string;
    Gradient?: string;
    headingColor?: string;
    HeadingColor?: string;
    descriptionColor?: string;
    DescriptionColor?: string;
  };
}



function extractImageUrl(media: any): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (media.url) return media.url;
  if (Array.isArray(media) && media[0]?.url) return media[0].url;
  if (media.data?.attributes?.url) return media.data.attributes.url;
  if (media.formats?.large?.url) return media.formats.large.url;
  return "";
}

export default function SharedContentWithSideGraphic({
  Heading,
  heading,
  Description,
  description,
  Image: Media,
  image,
  media,
  Media: propMedia,
  Gradient,
  gradient,
  HeadingColor,
  headingColor,
  DescriptionColor,
  descriptionColor,
  data,
}: SharedContentWithSideGraphicProps) {
  const mediaInput = Media || image || media || propMedia || data?.media || data?.Media || data?.image || data?.Image;
  const extractedUrl = extractImageUrl(mediaInput);
  const imageUrl = extractedUrl ? GetStrapiMediaUrl(extractedUrl) : "/assets/images/live_connection-illustration.svg";

  const defaultGradient = "bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]";
  const customGradient = Gradient || gradient || data?.Gradient || data?.gradient;

  const headingText = Heading || heading || data?.heading || data?.Heading || data?.title || data?.Title || "A story rooted in connection";
  const bodyText = Description || description || data?.description || data?.Description || data?.body || data?.Body;
  const headColor = HeadingColor || headingColor || data?.HeadingColor || data?.headingColor;
  const descColor = DescriptionColor || descriptionColor || data?.DescriptionColor || data?.descriptionColor;

  return (
    <section 
      className={`story-section-root py-20 lg:py-24 relative overflow-hidden border-none ${!customGradient ? defaultGradient : ""}`} 
      style={customGradient ? { background: customGradient } : undefined}
    >
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
          <h2 
            className="subpage-story-heading reveal text-midnight text-left font-heading text-[clamp(1.75rem,2.2vw,2.2rem)] font-normal mb-6 leading-[1.35] whitespace-normal lg:whitespace-nowrap uppercase"
            style={headColor ? { color: headColor } : undefined}
          >
            {headingText}
          </h2>
          {bodyText ? (
            bodyText.includes("<") && bodyText.includes(">") ? (
              <div
                className="reveal stagger-1 strapi-richtext-body text-midnight/80 text-left text-lg leading-[1.8] flex flex-col gap-5 [&>p]:mb-0"
                style={descColor ? { color: descColor } : undefined}
                dangerouslySetInnerHTML={{ __html: bodyText }}
              />
            ) : (
              <div 
                className="reveal stagger-1 text-midnight/80 text-left text-lg leading-[1.8]"
                style={descColor ? { color: descColor } : undefined}
              >
                <p className="subpage-intro m-0">{bodyText}</p>
              </div>
            )
          ) : (
            <div 
              className="reveal stagger-1 flex flex-col gap-8 text-midnight/80 text-left text-lg leading-[1.8]"
              style={descColor ? { color: descColor } : undefined}
            >
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
        <img 
          src={imageUrl} 
          alt="Connection illustration" 
          className="w-[90%] max-w-[90%] h-auto opacity-[0.18] [filter:brightness(0)_saturate(0)] block mx-auto -translate-x-[2%]" 
        />
      </div>
    </section>
  );
}
