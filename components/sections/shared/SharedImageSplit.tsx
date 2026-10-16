import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SharedImageSplitProps {
  data: {
    Heading?: string;
    Description?: string;
    Image?: any;
    CTAText?: string;
    CTAUrl?: string;
    ImageAlignment?: string;
    BgGradient?: string;
    HeadingColor?: string;
    DescriptionColor?: string;
  };
}

export default function SharedImageSplit({ data }: SharedImageSplitProps) {
  const {
    Heading,
    Description,
    Image: mediaObj,
    CTAText,
    CTAUrl,
    ImageAlignment,
    BgGradient,
    HeadingColor,
    DescriptionColor,
  } = data;

  const rawImgUrl = mediaObj?.url || mediaObj?.data?.attributes?.url;
  const imgUrl = rawImgUrl
    ? rawImgUrl.startsWith("http")
      ? rawImgUrl
      : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${rawImgUrl}`
    : "/assets/images/placeholder.png";

  const isMediaLeft = ImageAlignment === "Left" || ImageAlignment === "Media Left";

  // Determine background based on BgGradient string from Strapi
  let bgStyle = { background: "#ffffff" }; // Default
  if (BgGradient && BgGradient.includes("gradient")) {
    bgStyle = { background: BgGradient };
  } else if (BgGradient === "Peach") {
    bgStyle = { background: "linear-gradient(135deg, #fff5ef 0%, #ffdac8 35%, #ffe4d4 65%, #fff0e8 100%)" };
  } else if (BgGradient === "Teal") {
    bgStyle = { background: "linear-gradient(135deg, #e3fdfa 0%, #b8f7f0 35%, #c8f9f3 65%, #e0fcf9 100%)" };
  } else if (BgGradient) {
    bgStyle = { background: BgGradient };
  }

  return (
    <section
      className="shared-image-split"
      style={{
        ...bgStyle,
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",

      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className={`image-split-grid ${isMediaLeft ? "image-split-reverse" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: isMediaLeft ? "3fr 2fr" : "2fr 3fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Text Content Area */}
          <div className="image-split-text" style={{ order: isMediaLeft ? 2 : 1 }}>
            {Heading && (
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  textAlign: "left",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  fontSize: "2.4rem",
                  lineHeight: 1.4,
                  color: HeadingColor || "#162047",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                }}
              >
                {Heading}
              </h2>
            )}

            {Description && (
              <div
                className="strapi-richtext-body"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: DescriptionColor || "#162047",
                  marginBottom: "40px",
                  opacity: 0.85,
                }}
                dangerouslySetInnerHTML={{ __html: Description }}
              />
            )}

            {CTAText && CTAUrl && (
              <Link
                href={CTAUrl}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 32px",
                  backgroundColor: "#162047",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderRadius: "50px",
                  border: "2px solid #162047",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                className="image-split-cta"
              >
                {CTAText}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            )}
          </div>

          {/* Media Area */}
          <div
            className="image-split-media"
            style={{
              order: isMediaLeft ? 1 : 2,
              position: "relative",
              width: "100%",
              height: "500px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(22,32,71,0.08)",
            }}
          >
            <Image
              src={imgUrl}
              alt={Heading || "Split Section Image"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
