import Image from "next/image";
import { Typography } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import { AboutCommitmentsProps } from "./type";

const DEFAULT_BAR_BG_CLASSES = ["bg-[#00b4a0]", "bg-[#d4882e]", "bg-[#7c5cbf]"];

export default function AboutCommitments({
  title,
  description,
  background_overlay,
  commitment_statement,
  background_image,
  commitment_cards = [],
}: AboutCommitmentsProps) {
  return (
    <section
      className="bg-white py-10 sm:py-14 md:py-20 lg:py-24 relative overflow-hidden z-[2]"
      id="shared-commitments"
    >
      <Container className="relative z-[2]">
        {/* Panoramic Hero Banner */}
        <div className="reveal w-full rounded-2xl md:rounded-3xl overflow-hidden mb-6 sm:mb-8 md:mb-14 border border-midnight/[0.08] md:border-white/[0.06] shadow-md md:shadow-xl relative h-[200px] xs:h-[220px] md:h-[320px] lg:h-[480px] xl:h-[500px] flex items-end md:items-center">
          {background_image && (
            <Image
              src={background_image}
              alt={title || "Commitments banner"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px)"
              className="object-cover block"
            />
          )}
          {/* Gradient overlay: Bottom-up on mobile, Left-to-right on desktop */}
          <div
            className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#101830]/90 via-[#101830]/50 md:via-[#101830]/75 to-transparent pointer-events-none"
            style={background_overlay ? { background: background_overlay } : undefined}
          />

          <div className="relative z-[2] w-full flex items-end md:items-center justify-start text-left p-5 xs:p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <div className="max-w-[640px] w-full m-0">
              <Typography variant="h2" uppercase weight="normal">
                {title}
              </Typography>

              {/* Description inside banner - Desktop only (>= md) */}
              {description && (
                <div className="hidden md:block mt-3 lg:mt-4">
                  {description.includes("<") && description.includes(">") ? (
                    <div
                      className="strapi-richtext-body text-white/85 max-w-full text-left text-[0.95rem] lg:text-[1.02rem] [&>p]:m-0 [&>p]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    <Typography
                      variant="b1"
                      as="p"
                      className="text-white/85 max-w-full text-left m-0 text-[0.95rem] lg:text-[1.02rem] leading-relaxed"
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
          <div className="block md:hidden mb-6 sm:mb-8 text-left px-0.5">
            {description.includes("<") && description.includes(">") ? (
              <div
                className="strapi-richtext-body text-midnight/75 text-left text-[0.88rem] sm:text-[0.95rem] [&>p]:m-0 [&>p]:leading-[1.65]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <Typography
                variant="b1"
                as="p"
                className="text-midnight/75 text-left m-0 text-[0.88rem] sm:text-[0.95rem] leading-[1.65]"
              >
                {description}
              </Typography>
            )}
          </div>
        )}

        {/* Commitment Pillars Section */}
        <div className="reveal stagger-2 w-full">
          {commitment_statement && (
            <Typography
              variant="b1"
              as="p"
              className="text-left md:text-center text-midnight/75 md:text-midnight/70 text-[0.95rem] md:text-[1.12rem] mb-6 sm:mb-8 md:mb-10 max-w-[960px] md:mx-auto m-0 leading-relaxed px-0.5"
            >
              {commitment_statement}
            </Typography>
          )}

          <div className="flex flex-col gap-4 sm:gap-5 md:grid md:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-14 max-w-6xl mx-auto">
            {commitment_cards.map((pillar, index) => {
              const defaultBarClass = DEFAULT_BAR_BG_CLASSES[index % DEFAULT_BAR_BG_CLASSES.length];
              const customBarColor = pillar.top_line_color;

              return (
                <div
                  key={pillar.id ?? index}
                  className="flex flex-col items-start text-left md:items-center md:text-center p-0 md:p-3 lg:p-4 rounded-2xl bg-transparent transition-all duration-300 md:hover:-translate-y-1 cursor-default group"
                >
                  {/* Top accent bar: Left-aligned on mobile, Centered on desktop */}
                  <div
                    className={`w-10 h-[3px] rounded-full mb-3 md:mb-6 self-start md:mx-auto transition-all duration-300 md:group-hover:w-16 ${!customBarColor ? defaultBarClass : ""}`}
                    style={customBarColor ? { backgroundColor: customBarColor } : undefined}
                  />

                  {/* Heading: Title case on mobile, Uppercase on desktop */}
                  <Typography
                    variant="pillar-title"
                    weight="bold"
                    className="text-midnight m-0 mb-1 md:mb-3.5 text-left md:text-center w-full normal-case md:uppercase"
                  >
                    {pillar.title}
                  </Typography>

                  {/* Body description */}
                  <Typography
                    variant="b2"
                    as="p"
                    className="text-midnight/65 md:text-midnight/70 m-0 text-left md:text-center w-full leading-[1.6] md:leading-[1.75]"
                  >
                    {pillar.description}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
