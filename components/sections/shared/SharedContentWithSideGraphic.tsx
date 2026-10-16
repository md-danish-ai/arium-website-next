import Image from "next/image";

interface SharedContentWithSideGraphicProps {
  Heading?: string;
  Description?: string;
  Image?: any;
  Gradient?: string;
  HeadingColor?: string;
  DescriptionColor?: string;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com";

function absoluteUrl(url?: string): string {
  if (!url) return "";
  return url.startsWith("http") || url.startsWith("/") ? url : `${STRAPI_URL}${url}`;
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
  Description,
  Image: Media,
  Gradient,
  HeadingColor,
  DescriptionColor,
}: SharedContentWithSideGraphicProps) {
  
  const extractedUrl = extractImageUrl(Media);
  const imageUrl = extractedUrl ? absoluteUrl(extractedUrl) : "/assets/images/live_connection-illustration.svg";

  const defaultGradient = "linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 40%, #DDD3FF 100%)";
  const backgroundStyle = Gradient || defaultGradient;

  return (
    <section className="shared-story-section-root" style={{ background: backgroundStyle, padding: "80px 0", position: "relative", overflow: "hidden", border: "none" }}>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,232,217,0.08) 0%, transparent 70%)", top: "-200px", left: "-100px", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,218,200,0.12) 0%, transparent 70%)", bottom: "-100px", left: "-50px", pointerEvents: "none" }}></div>

      <img src={imageUrl} alt="" aria-hidden="true" className="shared-story-globe-right" style={{ position: "absolute", right: "-30px", top: "50%", height: "190%", width: "auto", transform: "translate(50%, -50%) scaleX(-1)", opacity: 0.18, filter: "brightness(0) saturate(0)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "760px", textAlign: "left" }}>
          <h2 className="shared-subpage-story-heading reveal" style={{ color: HeadingColor || "var(--color-midnight-blue)", textAlign: "left", fontSize: "clamp(1.75rem, 2.2vw, 2.2rem)", fontWeight: 400, marginBottom: "24px", lineHeight: 1.35, whiteSpace: "nowrap" }}>
            {Heading || "A story rooted in connection"}
          </h2>
          {Description && Description.includes("<") && Description.includes(">") ? (
            <div
              className="reveal stagger-1 shared-strapi-richtext-body"
              style={{ color: DescriptionColor || "rgba(22,32,71,0.8)", textAlign: "left", fontSize: "1.125rem", lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: Description }}
            />
          ) : Description ? (
            <div className="reveal stagger-1">
              <p className="shared-subpage-intro" style={{ color: DescriptionColor || "rgba(22,32,71,0.8)", textAlign: "left", fontSize: "1.125rem", lineHeight: 1.8 }}>
                {Description}
              </p>
            </div>
          ) : (
            <div className="reveal stagger-1">
              <p className="shared-subpage-intro" style={{ color: DescriptionColor || "rgba(22,32,71,0.8)", textAlign: "left" }}>
                Our world depends on fast, reliable connectivity—from the way we interact with loved ones, educate our children, and drive business forward. More than 15 years ago, we began building the small cell and distributed antennae system (DAS) infrastructure that ensures wireless services works effectively, even in the most challenging locations. Across the country, we&apos;re building dense networks and increasing capacity, enhancing connectivity in high-demand areas.
              </p>
              <p className="shared-subpage-intro" style={{ color: DescriptionColor || "rgba(22,32,71,0.8)", textAlign: "left", marginTop: "36px" }}>
                We make the process of designing and deploying wireless networks as straightforward and predictable as possible, providing a clear path forward that supports your vision long into the future.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="shared-story-globe-full" style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
        <img src={imageUrl} alt="Connection illustration" style={{ width: "90%", maxWidth: "90%", height: "auto", opacity: 0.18, filter: "brightness(0) saturate(0)", display: "block", margin: "0 auto" }} />
      </div>
    </section>
  );
}
