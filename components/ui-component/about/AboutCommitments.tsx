import Image from "next/image";
import { Typography } from "@ui-element";
import { GetStrapiMediaUrl } from "@lib/strapi";
import { PillarCard, AboutCommitmentsProps } from "./type";

export default function AboutCommitments({
  Heading,
  Description,
  BgImage,
  PillarsDescription,
  PillarCard,
  data,
}: AboutCommitmentsProps) {
  const defaultPillars: PillarCard[] = [
    {
      PillarText: "We are customer-first",
      PillarDescription:
        "We put customers at the center of every decision, delivering value through innovation, investment, and purpose-build network solutions.",
      BarColor: "#00b4a0",
    },
    {
      PillarText: "We are nimble and ready to invest",
      PillarDescription:
        "We operate with speed and flexibility, putting capital to work where it can drive the most impact.",
      BarColor: "#d4882e",
    },
    {
      PillarText: "We are built for the long haul",
      PillarDescription:
        "We're committed to long-term ownership and lasting partnerships, investing in the infrastructure that will power the future of connectivity.",
      BarColor: "#7c5cbf",
    },
  ];

  const rawPillars =
    (PillarCard && PillarCard.length > 0 ? PillarCard : null) ||
    (data?.cards && data.cards.length > 0 ? data.cards : null) ||
    defaultPillars;
  const pillars: PillarCard[] = rawPillars.map((p) => {
    const item = p as Record<string, unknown>;
    return {
      PillarText: (item.PillarText || item.title || item.heading || "") as string,
      PillarDescription: (item.PillarDescription || item.description || item.body || "") as string,
      BarColor: (item.BarColor || item.barColor) as string | undefined,
      PillarHeadingColor: item.PillarHeadingColor as string | undefined,
      PillarBgColorHover: item.PillarBgColorHover as string | undefined,
    };
  });

  // Extract image URL safely
  let bgImageUrl = "/assets/images/live_about_commitments_panoramic.png";
  let bgImageAlt = "New York City skyline at sunset";

  const resolvedBg = (Array.isArray(data?.media) ? data?.media?.[0] : data?.media) || BgImage;
  if (resolvedBg && typeof resolvedBg === "object") {
    const bgObj = resolvedBg as Record<string, unknown>;
    const dataObj = bgObj.data as Record<string, unknown> | undefined;
    const attrs = (dataObj?.attributes || bgObj.attributes) as Record<string, unknown> | undefined;
    const rawUrl = (attrs?.url || bgObj.url) as string | undefined;
    if (rawUrl) {
      bgImageUrl = rawUrl.startsWith("http") ? rawUrl : GetStrapiMediaUrl(rawUrl);
      const rawAlt = (attrs?.alternativeText || bgObj.alternativeText) as string | undefined;
      if (rawAlt) {
        bgImageAlt = rawAlt;
      }
    }
  }

  const defaultBarBgClasses = ["bg-[#00b4a0]", "bg-[#d4882e]", "bg-[#7c5cbf]"];
  const headingText = Heading || data?.title || "Our Commitments to Our Customers";
  const descriptionText = Description || data?.body;

  return (
    <section
      className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-[2]"
      id="shared-commitments"
    >
      <div className="container mx-auto px-5 sm:px-6 relative z-[2]">
        {/* Panoramic Hero Banner */}
        <div className="reveal w-full rounded-2xl md:rounded-3xl overflow-hidden mb-8 sm:mb-10 md:mb-14 border border-white/[0.06] shadow-xl relative min-h-[240px] xs:min-h-[260px] sm:min-h-[320px] md:h-[480px] lg:h-[500px] flex items-end md:items-center">
          <Image
            src={bgImageUrl}
            alt={bgImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px)"
            className="object-cover block"
          />
          {/* Gradient overlay: Bottom-up on mobile, Left-to-right on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#101830]/95 via-[#101830]/60 md:via-[#101830]/75 to-transparent pointer-events-none" />

          <div className="relative z-[2] w-full flex items-end md:items-center justify-start text-left p-6 sm:p-8 md:p-14 lg:p-20">
            <div className="max-w-[640px] w-full m-0">
              <Typography
                variant="h2"
                as="h2"
                uppercase
                weight="light"
                className="text-white m-0 tracking-[0.05em] leading-[1.25]"
              >
                {headingText}
              </Typography>

              {/* Description inside banner - Desktop only (>= md) */}
              <div className="hidden md:block mt-4">
                {descriptionText ? (
                  <div
                    className="strapi-richtext-body text-white/85 max-w-full text-left [&>p]:m-0 [&>p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: descriptionText }}
                  />
                ) : (
                  <Typography
                    variant="b1"
                    as="p"
                    className="text-white/85 max-w-full text-left m-0 leading-relaxed"
                  >
                    As part of EQT&apos;s Active Core Infrastructure fund, we have the support and
                    financial capacity to invest with conviction. As opposed to many other private
                    equity backed companies, we do not have any timeframe for liquidity, so we can
                    invest and operate for the long term.
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description outside banner - Mobile only (< md) */}
        <div className="block md:hidden mb-6 sm:mb-8 text-left">
          {descriptionText ? (
            <div
              className="strapi-richtext-body text-midnight/80 text-left [&>p]:m-0 [&>p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descriptionText }}
            />
          ) : (
            <Typography
              variant="b1"
              as="p"
              className="text-midnight/80 text-left m-0 leading-relaxed"
            >
              As part of EQT&apos;s Active Core Infrastructure fund, we have the support and
              financial capacity to invest with conviction. As opposed to many other private equity
              backed companies, we do not have any timeframe for liquidity, so we can invest and
              operate for the long term.
            </Typography>
          )}
        </div>

        {/* Commitment Pillars Section - Exactly matching Prod (Image 2) */}
        <div className="reveal stagger-2 w-full">
          <Typography
            variant="b1"
            as="p"
            className="text-center text-midnight/80 mb-10 sm:mb-12 md:mb-16 max-w-[960px] mx-auto m-0 leading-relaxed"
          >
            {PillarsDescription ||
              "We are guided by a clear set of commitments that shape how we partner and deliver value:"}
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14 xl:gap-16 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => {
              const defaultBarClass = defaultBarBgClasses[index % defaultBarBgClasses.length];
              const customBarColor = pillar.BarColor || pillar.barColor;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-2 sm:p-4 rounded-2xl bg-transparent transition-all duration-300 hover:translate-y-[-2px] cursor-default"
                >
                  {/* Centered pill bar */}
                  <div
                    className={`w-10 h-[3px] rounded-full mb-6 mx-auto transition-all duration-300 ${!customBarColor ? defaultBarClass : ""}`}
                    style={customBarColor ? { backgroundColor: customBarColor } : undefined}
                  />

                  {/* Centered uppercase heading */}
                  <Typography
                    variant="h5"
                    as="h3"
                    uppercase
                    weight="semibold"
                    className="text-midnight m-0 mb-3 text-center w-full"
                  >
                    {pillar.PillarText || `Pillar ${index + 1}`}
                  </Typography>

                  {/* Centered body description */}
                  <Typography
                    variant="b3"
                    as="p"
                    className="text-midnight/75 m-0 text-center w-full leading-[1.7]"
                  >
                    {pillar.PillarDescription || ""}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
