import Image from "next/image";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { Typography } from "@ui-element";
import { ConnectionIllustrationSvg } from "@ui-svg";
import { AboutContentWithSideGraphicProps, StrapiMediaLike } from "./type";

function extractImageUrl(media?: StrapiMediaLike | null): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    if ("url" in media && typeof (media as { url?: unknown }).url === "string") {
      return (media as { url: string }).url;
    }
    if (Array.isArray(media) && media.length > 0) {
      const first = media[0];
      if (
        typeof first === "object" &&
        first !== null &&
        "url" in first &&
        typeof first.url === "string"
      ) {
        return first.url;
      }
    }
    const mediaObj = media as Record<string, unknown>;
    const dataObj = mediaObj.data as Record<string, unknown> | undefined;
    const attrs = dataObj?.attributes as Record<string, unknown> | undefined;
    if (typeof attrs?.url === "string") return attrs.url;
    const formats = mediaObj.formats as Record<string, unknown> | undefined;
    const large = formats?.large as Record<string, unknown> | undefined;
    if (typeof large?.url === "string") return large.url;
  }
  return "";
}

export default function AboutContentWithSideGraphic({
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
}: AboutContentWithSideGraphicProps) {
  const mediaInput =
    Media ||
    image ||
    media ||
    propMedia ||
    data?.media ||
    data?.Media ||
    data?.image ||
    data?.Image;
  const extractedUrl = extractImageUrl(mediaInput);
  const imageUrl = extractedUrl
    ? GetStrapiMediaUrl(extractedUrl)
    : "/assets/images/live_connection-illustration.svg";

  const defaultGradient = "bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#DDD3FF]";
  const customGradient = Gradient || gradient || data?.Gradient || data?.gradient;

  const headingText =
    Heading ||
    heading ||
    data?.heading ||
    data?.Heading ||
    data?.title ||
    data?.Title ||
    "A story rooted in connection";
  const bodyText =
    Description ||
    description ||
    data?.description ||
    data?.Description ||
    data?.body ||
    data?.Body;
  const headColor = HeadingColor || headingColor || data?.HeadingColor || data?.headingColor;
  const descColor =
    DescriptionColor || descriptionColor || data?.DescriptionColor || data?.descriptionColor;

  return (
    <section
      className={`story-section-root py-20 lg:py-24 relative overflow-hidden border-none ${!customGradient ? defaultGradient : ""}`}
      style={customGradient ? { background: customGradient } : undefined}
    >
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -right-[100px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.08)_0%,transparent_70%)] -top-[200px] -left-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,218,200,0.12)_0%,transparent_70%)] -bottom-[100px] -left-[50px] pointer-events-none" />

      {extractedUrl ? (
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          width={800}
          height={800}
          unoptimized={imageUrl.endsWith(".svg")}
          className="story-globe-right hidden lg:block absolute -right-8 top-1/2 h-[190%] w-auto translate-x-1/2 -translate-y-1/2 -scale-x-100 opacity-[0.18] [filter:brightness(0)_saturate(0)] pointer-events-none"
        />
      ) : (
        <div className="story-globe-right hidden lg:block absolute -right-8 top-1/2 h-[190%] w-auto translate-x-1/2 -translate-y-1/2 -scale-x-100 opacity-[0.18] [filter:brightness(0)_saturate(0)] pointer-events-none">
          <ConnectionIllustrationSvg className="w-full h-full" />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-[1]">
        <div className="max-w-[760px] text-left">
          <Typography
            as="h2"
            variant="h2"
            uppercase
            className="reveal text-midnight text-left mb-6 leading-[1.35] whitespace-normal lg:whitespace-nowrap"
            style={headColor ? { color: headColor } : undefined}
          >
            {headingText}
          </Typography>
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
                <Typography variant="b1" as="p" className="m-0">
                  {bodyText}
                </Typography>
              </div>
            )
          ) : (
            <div
              className="reveal stagger-1 flex flex-col gap-8 text-midnight/80 text-left text-lg leading-[1.8]"
              style={descColor ? { color: descColor } : undefined}
            >
              <Typography variant="b1" as="p" className="m-0">
                Our world depends on fast, reliable connectivity—from the way we interact with loved
                ones, educate our children, and drive business forward. More than 15 years ago, we
                began building the small cell and distributed antennae system (DAS) infrastructure
                that ensures wireless services works effectively, even in the most challenging
                locations. Across the country, we&apos;re building dense networks and increasing
                capacity, enhancing connectivity in high-demand areas.
              </Typography>
              <Typography variant="b1" as="p" className="m-0">
                We make the process of designing and deploying wireless networks as straightforward
                and predictable as possible, providing a clear path forward that supports your
                vision long into the future.
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className="story-globe-full lg:hidden relative z-[1] overflow-hidden -mt-[15%] -mb-[30%]">
        {extractedUrl ? (
          <Image
            src={imageUrl}
            alt="Connection illustration"
            width={600}
            height={600}
            unoptimized={imageUrl.endsWith(".svg")}
            className="w-[90%] max-w-[90%] h-auto opacity-[0.18] [filter:brightness(0)_saturate(0)] block mx-auto -translate-x-[2%]"
          />
        ) : (
          <div className="w-[90%] max-w-[90%] h-auto opacity-[0.18] [filter:brightness(0)_saturate(0)] block mx-auto -translate-x-[2%]">
            <ConnectionIllustrationSvg className="w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  );
}
