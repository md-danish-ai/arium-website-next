import Image from "next/image";
import { Typography } from "@ui-element";
import { AboutCommitmentsProps } from "./type";

const DEFAULT_BAR_BG_CLASSES = ["bg-[#00b4a0]", "bg-[#d4882e]", "bg-[#7c5cbf]"];

export default function AboutCommitments({
  heading,
  description,
  heroBannerImg,
  pillars,
}: AboutCommitmentsProps) {
  return (
    <section
      className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-[2]"
      id="shared-commitments"
    >
      <div className="container relative z-[2]">
        {/* Panoramic Hero Banner */}
        <div className="reveal w-full rounded-2xl md:rounded-3xl overflow-hidden mb-8 sm:mb-10 md:mb-14 border border-white/[0.06] shadow-xl relative min-h-[240px] xs:min-h-[260px] sm:min-h-[320px] md:h-[480px] lg:h-[500px] flex items-end md:items-center">
          <Image
            src={heroBannerImg.src}
            alt={heroBannerImg.alt}
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
                {heading}
              </Typography>

              {/* Description inside banner - Desktop only (>= md) */}
              {description && (
                <div className="hidden md:block mt-4">
                  {description.includes("<") && description.includes(">") ? (
                    <div
                      className="strapi-richtext-body text-white/85 max-w-full text-left [&>p]:m-0 [&>p]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    <Typography
                      variant="b1"
                      as="p"
                      className="text-white/85 max-w-full text-left m-0 leading-relaxed"
                    >
                      {description}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description outside banner - Mobile only (< md) */}
        {description && (
          <div className="block md:hidden mb-6 sm:mb-8 text-left">
            {description.includes("<") && description.includes(">") ? (
              <div
                className="strapi-richtext-body text-midnight/80 text-left [&>p]:m-0 [&>p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <Typography
                variant="b1"
                as="p"
                className="text-midnight/80 text-left m-0 leading-relaxed"
              >
                {description}
              </Typography>
            )}
          </div>
        )}

        {/* Commitment Pillars Section */}
        <div className="reveal stagger-2 w-full">
          <Typography
            variant="b1"
            as="p"
            className="text-center text-midnight/80 mb-10 sm:mb-12 md:mb-16 max-w-[960px] mx-auto m-0 leading-relaxed"
          >
            We are guided by a clear set of commitments that shape how we partner and deliver value:
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14 xl:gap-16 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => {
              const defaultBarClass = DEFAULT_BAR_BG_CLASSES[index % DEFAULT_BAR_BG_CLASSES.length];
              const customBarColor = pillar.barColor;

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
                    {pillar.title}
                  </Typography>

                  {/* Centered body description */}
                  <Typography
                    variant="b3"
                    as="p"
                    className="text-midnight/75 m-0 text-center w-full leading-[1.7]"
                  >
                    {pillar.description}
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
